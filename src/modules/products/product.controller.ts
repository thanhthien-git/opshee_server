import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { RedisProductService } from './product.redis.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly redisProductService: RedisProductService,
  ) {}

  @Get()
  async getProductById(@Query('id') id: string) {
    return await this.redisProductService.getProductById(id);
  }
}
