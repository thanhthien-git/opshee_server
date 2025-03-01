import { Model } from 'mongoose';
import { ProductDocument } from 'src/modules/products/schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductRepository {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getProductById(id: string): Promise<void>;
    create(data: CreateProductDto, shopId: string): Promise<void>;
}
