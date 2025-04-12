import mongoose, { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../../modules/products/schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductModel, ProductModelDocument } from './schemes/product-variation.scheme';
import { UpdateProductDto } from './dto/update-product.dto';
import { FitlerDto } from './dto/filter-product.dto';
import { PaginatedResponse } from '../../interface/paginated-response';
export declare class ProductRepository {
    private productModel;
    private productItem;
    private readonly cloudinaryService;
    constructor(productModel: Model<ProductDocument>, productItem: Model<ProductModelDocument>, cloudinaryService: CloudinaryService);
    getProductById(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: mongoose.mongo.BSON.ObjectId;
    }> & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: mongoose.mongo.BSON.ObjectId;
    }> & {
        __v: number;
    }>;
    create(createProductDto: CreateProductDto, shopId: string): Promise<{
        product: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: mongoose.mongo.BSON.ObjectId;
        }> & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: mongoose.mongo.BSON.ObjectId;
        }> & {
            __v: number;
        };
        variation: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, ProductModel> & ProductModel & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }> & mongoose.Document<unknown, {}, ProductModel> & ProductModel & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    update(updateDto: UpdateProductDto): Promise<{
        updatedProduct: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: mongoose.mongo.BSON.ObjectId;
        }> & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: mongoose.mongo.BSON.ObjectId;
        }> & {
            __v: number;
        };
        updatedProductItem: mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: mongoose.mongo.BSON.ObjectId;
        }> & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: mongoose.mongo.BSON.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    delete(productId: string, shopId: string): Promise<{
        variationsRemoved: boolean;
        productDeleted: number;
    }>;
    removeVariations(productId: string): Promise<Document>;
    private getProductPriceRange;
    search(filter: FitlerDto): Promise<PaginatedResponse<Product>>;
}
