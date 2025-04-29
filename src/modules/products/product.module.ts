import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from '../../modules/products/schemes/products.scheme';
import { RedisModule } from '../redis/redis/redis.module';
import {  } from '../redis/redis/redis.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import {
  ProductVariation  ,
  ProductVariationSchema,
} from './schemes/product-variation.scheme';
import { ProductService } from './product.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductVariation.name, schema: ProductVariationSchema },
    ]),
    RedisModule,
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
  exports: [ProductService],
})
export class ProductModule {}
