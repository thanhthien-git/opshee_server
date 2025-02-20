import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';
export declare class RedisProductService {
    private readonly productRepository;
    private readonly redisService;
    constructor(productRepository: ProductRepository, redisService: RedisService);
    getProductById(id: string): Promise<void>;
}
