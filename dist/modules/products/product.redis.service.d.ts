import { RedisService } from '../redis/redis/redis.service';
import { ProductService } from './product.service';
export declare class RedisProductService {
    private readonly productService;
    private readonly redisService;
    constructor(productService: ProductService, redisService: RedisService);
    getProductById(id: string): Promise<void>;
}
