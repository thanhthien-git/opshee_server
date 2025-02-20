import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.proxy';
export declare class RedisProductService {
    private readonly productRepository;
    private readonly redisService;
    constructor(productRepository: ProductRepository, redisService: RedisService);
    getProductById(id: string): Promise<any>;
}
