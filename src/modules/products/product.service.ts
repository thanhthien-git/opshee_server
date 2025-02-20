import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';

@Injectable()
export class RedisProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly redisService: RedisService,
  ) {}

  async getProductById(id: string) {
    return await this.redisService.getOrSet(id, async () => {
      return this.productRepository.getProductById(id);
    });
  }
}
