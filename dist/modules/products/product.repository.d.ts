import { Model } from 'mongoose';
import { ProductDocument } from 'src/models/schemes/products.scheme';
export declare class ProductRepository {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getProductById(id: string): Promise<void>;
}
