import { RedisProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { FitlerDto } from './dto/filter-product.dto';
export declare class ProductController {
    private readonly redisProductService;
    private readonly productRepository;
    constructor(redisProductService: RedisProductService, productRepository: ProductRepository);
    getProductById(id: string): Promise<void>;
    getDailyDiscover(req: any): Promise<any>;
    search(dto: FitlerDto): Promise<FitlerDto>;
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
    delete(productId: string, req: any): Promise<[Document, import("mongodb").DeleteResult]>;
}
