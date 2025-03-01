import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './modules/products/product.module';
import { RedisModule } from './modules/redis/redis/redis.module';
import { DatabaseModule } from './modules/database/database.module';
import { ShopModule } from './modules/shops/shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { ShopMiddleware } from './middlewares/auth/shop.middleware';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { TokenModule } from './modules/token/token.module';

const PROTECTED_ROUTES = ['user'];
@Module({
  imports: [
    //import app modules
    AuthModule,
    UsersModule,
    ProductModule,
    RedisModule,
    CloudinaryModule,
    TokenModule,
    ShopModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    JwtModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...PROTECTED_ROUTES);
    consumer.apply(ShopMiddleware).forRoutes('product');
  }
}
