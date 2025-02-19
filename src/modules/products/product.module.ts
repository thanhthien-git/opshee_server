import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/scheme/products.scheme';
import { RedisModule } from '../redis/redis/redis.module';
import { RedisService } from '../redis/redis/redis.service';
import { RedisProductService } from './product.redis.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    RedisModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, RedisService, RedisProductService],
})
export class ProductModule {}
