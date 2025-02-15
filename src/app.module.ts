import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CONFIG_DATABASE } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [
    //import app modules
    AuthModule,
    UsersModule,
    ProductModule,
    //render landing page
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
      serveStaticOptions: {
        cacheControl: true,
        maxAge: 43200000,
        immutable: true,
      },
    }),
    //connect database
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: { rejectUnauthorized: false },
    }),
    CONFIG_DATABASE.load_env,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    //register for jwt service
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
