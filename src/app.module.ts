import { Module } from '@nestjs/common';
import { SignInModule } from './modules/auth/sign-in/sign-in.module';
import { CONFIG_DATABASE } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpModule } from './modules/auth/sign-up/sign-up.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    SignInModule,
    SignUpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
      serveStaticOptions: {
        cacheControl: true,
        maxAge: 43200000,
        immutable: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: { rejectUnauthorized: false },
    }),
    CONFIG_DATABASE.load_env,
  ],
})
export class AppModule {}
