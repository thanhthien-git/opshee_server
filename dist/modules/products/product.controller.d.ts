import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    private readonly storageService;
    constructor(productService: ProductService, storageService: CloudinaryService);
    getProductById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
        _id: import("bson").ObjectId;
    }> & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
        _id: import("bson").ObjectId;
    }> & {
        __v: number;
    }>;
    getDailyDiscover(req: any): Promise<any>;
    create(files: Express.Multer.File[], data: string, req: any): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
            _id: import("bson").ObjectId;
        }> & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
            _id: import("bson").ObjectId;
        }> & {
            __v: number;
        };
        variation: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/product-variation.scheme").ProductModel> & import("./schemes/product-variation.scheme").ProductModel & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/product-variation.scheme").ProductModel> & import("./schemes/product-variation.scheme").ProductModel & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }, Omit<import("./schemes/product-variation.scheme").ProductModel, "_id">>[];
    }>;
    update(files: Express.Multer.File[], data: string): Promise<{
        updatedProduct: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
            _id: import("bson").ObjectId;
        }> & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
            _id: import("bson").ObjectId;
        }> & {
            __v: number;
        };
        updatedProductItem: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
            _id: import("bson").ObjectId;
        }> & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./schemes/products.scheme").Product> & import("./schemes/products.scheme").Product & Required<{
            _id: import("bson").ObjectId;
        }> & {
            __v: number;
        };
    }>;
    delete(productId: string, req: any): Promise<{
        variationsRemoved: boolean;
        productDeleted: number;
    }>;
}
