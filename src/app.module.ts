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
import { RedisModule } from './modules/redis/redis/redis.module';
import { DatabaseModule } from './modules/database/database.module';
import { TokenModule } from './modules/jwt/jwt.module';

@Module({
  imports: [
    //import app modules
    AuthModule,
    UsersModule,
    ProductModule,
    RedisModule,
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
    DatabaseModule,
    //register for jwt service
    TokenModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
