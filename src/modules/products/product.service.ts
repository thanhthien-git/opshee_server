import { Injectable, Req, UseGuards } from '@nestjs/common';
import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from '../../guards/role/role.guard';
import { Product } from './schemes/products.scheme';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
@UseGuards(RolesGuard)
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
