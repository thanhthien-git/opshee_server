import { ProductService } from './product.service';
import { RedisProductService } from './product.redis.service';
export declare class ProductController {
    private readonly productService;
    private readonly redisProductService;
    constructor(productService: ProductService, redisProductService: RedisProductService);
    getProductById(id: string): Promise<void>;
}
