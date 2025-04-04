import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from 'src/modules/products/schemes/products.scheme';
import { RedisModule } from '../redis/redis/redis.module';
import { RedisService } from '../redis/redis/redis.service';
import { RedisProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import {
  ProductModel,
  ProductModelSchema,
} from './schemes/product-variation.scheme';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductModel.name, schema: ProductModelSchema },
    ]),
    RedisModule,
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    RedisService,
    RedisProductService,
    CloudinaryService,
  ],
})
export class ProductModule {}
