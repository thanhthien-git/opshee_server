import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { InsertResult, Repository } from 'typeorm';
import { Utils } from '../../utils/util';
import { RedisService } from '../redis/redis/redis.service';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  private CART_CACHE_KEY = (key: string) => `cartId:${key}`;
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    private redisService: RedisService,
  ) {}
  private async createCart(userId: number): Promise<InsertResult> {
    try {
      const id = Utils.generateBigInt();
      return await this.cartRepository.insert({
        id: id,
        user_id: userId,
        update_at: new Date(),
      });
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err);
    }
  }

  async getCart(userId: number): Promise<CartEntity> {
    try {
      const cacheKey = this.CART_CACHE_KEY(String(userId));
      return this.redisService.checkCacheMemo(cacheKey, async () => {
        return await this.cartRepository.findOne({
          where: { user_id: userId },
          relations: ['cart_item'],
        });
      });
    } catch (err) {
      this.logger.debug(err);
      throw new BadRequestException(err);
    }
  }
}
