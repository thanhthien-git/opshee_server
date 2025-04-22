import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../products/schemes/products.scheme';
import {
  ProductModel,
  ProductModelSchema,
} from '../products/schemes/product-variation.scheme';
import { RedisModule } from '../redis/redis/redis.module';
import { StocksService } from './stocks.service';
import { ProductRepository } from '../products/product.repository';
import { LockModule } from '../lock/lock.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductModel.name, schema: ProductModelSchema },
    ]),
    RedisModule,
    LockModule
  ],
  providers: [ProductRepository],
  exports: [StocksService],
})
export class StocksModule {}
