import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../products/schemes/products.scheme';
import {
  ProductModel,
  ProductModelSchema,
} from '../products/schemes/product-variation.scheme';
import { RedisModule } from '../redis/redis/redis.module';
import { StocksService } from './stocks.service';
import { LockModule } from '../lock/lock.module';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductModel.name, schema: ProductModelSchema },
    ]),
    RedisModule,
    ProductModule,
    LockModule,
  ],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
