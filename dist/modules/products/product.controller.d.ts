import { RedisProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductRepository } from './product.repository';
export declare class ProductController {
    private readonly redisProductService;
    private readonly productRepository;
    private readonly storageService;
    constructor(redisProductService: RedisProductService, productRepository: ProductRepository, storageService: CloudinaryService);
    getProductById(id: string): Promise<void>;
    create(files: Express.Multer.File[], data: string, req: any): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        variation: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/product-variation.scheme").ProductModel> & import("./schemes/product-variation.scheme").ProductModel & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/product-variation.scheme").ProductModel> & import("./schemes/product-variation.scheme").ProductModel & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(files: Express.Multer.File[], data: string): Promise<{
        updatedProduct: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        updatedProductItem: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
