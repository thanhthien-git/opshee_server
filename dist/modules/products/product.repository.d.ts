import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/modules/products/schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductModel, ProductModelDocument } from './schemes/product-variation.scheme';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductRepository {
    private productModel;
    private productItem;
    private readonly cloudinaryService;
    constructor(productModel: Model<ProductDocument>, productItem: Model<ProductModelDocument>, cloudinaryService: CloudinaryService);
    getProductById(id: string): Promise<void>;
    create(createProductDto: CreateProductDto, shopId: string): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        variation: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ProductModel> & ProductModel & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, ProductModel> & ProductModel & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateProduct(updateDto: UpdateProductDto): Promise<{
        updatedProduct: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        updatedProductItem: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
