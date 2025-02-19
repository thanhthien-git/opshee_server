import { Model } from 'mongoose';
import { ProductDocument } from 'src/models/scheme/products.scheme';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getProductById(id: string): Promise<void>;
}
