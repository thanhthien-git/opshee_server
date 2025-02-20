import { RedisProductService } from './product.service';
export declare class ProductController {
    private readonly redisProductService;
    constructor(redisProductService: RedisProductService);
    getProductById(id: string): Promise<void>;
}
