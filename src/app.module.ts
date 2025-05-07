import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { OrdersModule } from './modules/orders/orders.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { CartModule } from './modules/cart/cart.module';
import { CommentsModule } from './modules/comments/comments.module';

const PROTECTED_ROUTES = ['user', 'orders', 'cart', 'comments'];
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
    OrdersModule,
    StocksModule,
    CartModule,
    CommentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...PROTECTED_ROUTES);
    consumer
      .apply(ShopMiddleware)
      .exclude(
        { path: 'product/search', method: RequestMethod.GET },
        { path: 'product/:id', method: RequestMethod.GET },
        { path: 'product', method: RequestMethod.GET },
      )
      .forRoutes('product');
  }
}
