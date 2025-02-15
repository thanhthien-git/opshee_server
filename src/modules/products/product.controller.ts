import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getProductById(@Query('id') id: string) {
    return await this.productService.getProductById(id);
  }
}
