import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';
import { Product } from './schemes/products.scheme';
export declare class RedisProductService {
    private readonly productRepository;
    private readonly redisService;
    constructor(productRepository: ProductRepository, redisService: RedisService);
    getProductById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: import("bson").ObjectId;
    }> & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: import("bson").ObjectId;
    }> & {
        __v: number;
    }>;
}
