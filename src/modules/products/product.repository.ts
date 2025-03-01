import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/modules/products/schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async getProductById(id: string): Promise<void> {
    return await this.productModel.findById(id);
  }

  async create(data: CreateProductDto, shopId: string) {
    console.log(data);
  }
}
