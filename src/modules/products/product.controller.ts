import { Controller, Get, Query } from '@nestjs/common';
import { RedisProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly redisProductService: RedisProductService) {}

  @Get()
  async getProductById(@Query('id') id: string) {
    return await this.redisProductService.getProductById(id);
  }
}
