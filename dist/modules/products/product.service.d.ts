import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/models/scheme/products.scheme';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getProductById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
