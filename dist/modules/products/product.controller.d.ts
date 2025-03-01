import { RedisProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly redisProductService;
    private readonly storageService;
    constructor(redisProductService: RedisProductService, storageService: CloudinaryService);
    getProductById(id: string): Promise<void>;
    create(data: CreateProductDto, req: any): Promise<any>;
}
