import { RedisService } from '../redis/redis/redis.service';
import { ProductVariationDocument } from '../products/schemes/product-variation.scheme';
import { Model } from 'mongoose';
export declare class StocksService {
    private readonly redisService;
    private productVariationModel;
    private readonly lockUtil;
    private readonly logger;
    constructor(redisService: RedisService, productVariationModel: Model<ProductVariationDocument>);
    getStock(variationId: string): Promise<number>;
    updateStock(variationId: string, quantity: number): Promise<void>;
}
