import { Injectable, UseGuards } from '@nestjs/common';
import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';
import { RolesGuard } from '../../guards/role/role.guard';

@Injectable()
@UseGuards(RolesGuard)
export class RedisProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly redisService: RedisService,
  ) {}

  async getProductById(id: string) {
    const cacheKey = `product:${id}`;
    return await this.redisService.getOrSet(cacheKey, async () => {
      return this.productRepository.getProductById(id);
    });
  }
}
