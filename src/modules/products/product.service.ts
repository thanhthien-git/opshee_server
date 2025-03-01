import { Body, Injectable, Req, UseGuards } from '@nestjs/common';
import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/decorators/role.decorators';
import { ROLE } from 'src/enum/role.enum';

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

  async create(createProductDto: CreateProductDto, @Req() req) {
    //STEP 1: create product first
       //---upload image--- : upload to storage -> assign to productImage using a string[]
       //---define product data include its id---
       //---using mongooose.create with out storing

    //STEP 2: 1. by using variation list -> create a two dimension array [axb] to store variation index
    //        then assign to this product
    //        2. save to database with this productId
    
    //STEP 3: save to database and return the respone
    return req;
  }
}
