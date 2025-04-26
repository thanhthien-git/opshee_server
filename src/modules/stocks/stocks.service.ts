import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis/redis.service';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductVariation,
  ProductVariationDocument,
} from '../products/schemes/product-variation.scheme';
import { Model, Types } from 'mongoose';
import { lockey } from '../lock/constants/lockey';
import { LockUtil } from '../lock/lock.service';

@Injectable()
export class StocksService {
  private readonly lockUtil: LockUtil;
  private readonly logger = new Logger(StocksService.name);
  constructor(
    private readonly redisService: RedisService,
    @InjectModel(ProductVariation.name)
    private productVariationModel: Model<ProductVariationDocument>,
  ) {
    this.lockUtil = new LockUtil(redisService);
  }

  async getStock(variationId: string): Promise<number> {
    try {
      const cacheKey = `variation:stock:${variationId}`;
      const cacheStock = await this.redisService.get<number>(cacheKey);

      if (cacheStock) {
        this.logger.debug(`Variation ${variationId} stock is ${cacheStock}`);
        return cacheStock;
      }
      const _id = new Types.ObjectId(variationId);
      const variation = await this.productVariationModel.findById(_id);
      await this.redisService.set(cacheKey, variation.variation_details.stock);
    } catch (err) {
      this.logger.error(err.message);
      throw err;
    }
  }

  async updateStock(variationId: string, quantity: number): Promise<void> {
    try {
      const cacheKey = `variation:stock:${variationId}`;
      const key = lockey(cacheKey);
      await this.lockUtil.lockAndExcute(key, async () => {
        console.log(`update stock for ${variationId}`);
        await this.redisService.set(cacheKey, quantity);
      });
    } catch (err) {
      this.logger.error(err.message);
      throw err;
    }
  }
}
