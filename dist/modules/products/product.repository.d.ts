import mongoose, { Model } from 'mongoose';
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
        product: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        variation: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, ProductModel> & ProductModel & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }> & mongoose.Document<unknown, {}, ProductModel> & ProductModel & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
    }>;
    update(updateDto: UpdateProductDto): Promise<{
        updatedProduct: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
        updatedProductItem: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Product> & Product & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>;
    }>;
    delete(productId: string, shopId: string): Promise<[Document, mongoose.mongo.DeleteResult]>;
    removeVariations(productId: string): Promise<Document>;
}
