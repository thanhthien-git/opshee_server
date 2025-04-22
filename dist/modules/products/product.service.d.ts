import { RedisService } from '../redis/redis/redis.service';
import { ProductRepository } from './product.repository';
export declare class RedisProductService {
    private readonly productRepository;
    private readonly redisService;
    constructor(productRepository: ProductRepository, redisService: RedisService);
    getProductById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
        _id: import("bson").ObjectId;
    }> & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
        _id: import("bson").ObjectId;
    }> & {
        __v: number;
    }>;
}
