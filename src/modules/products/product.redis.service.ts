import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis/redis.service';
import { ProductService } from './product.service';

@Injectable()
export class RedisProductService {
  constructor(
    private readonly productService: ProductService,
    private readonly redisService: RedisService,
  ) {}

  async getProductById(id: string) {
    return await this.redisService.getOrSet(id, async () => {
      return this.productService.getProductById(id);
    });
  }
}
