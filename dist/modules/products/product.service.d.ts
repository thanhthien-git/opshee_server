import mongoose, { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductModel, ProductModelDocument } from './schemes/product-variation.scheme';
import { UpdateProductDto } from './dto/update-product.dto';
import { FitlerDto } from './dto/filter-product.dto';
import { PaginatedResponse } from '../../interface/paginated-response';
import { RedisService } from '../redis/redis/redis.service';
export declare class ProductService {
    private productModel;
    private productItem;
    private readonly cloudinaryService;
    private readonly redisService;
    private readonly logger;
    constructor(productModel: Model<ProductDocument>, productItem: Model<ProductModelDocument>, cloudinaryService: CloudinaryService, redisService: RedisService);
    getProductById(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: mongoose.mongo.BSON.ObjectId;
    }> & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: mongoose.mongo.BSON.ObjectId;
    }> & {
        __v: number;
    }>;
    private stringToObjects;
    getProductVariation(ids: string[]): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, ProductModel> & ProductModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }> & mongoose.Document<unknown, {}, ProductModel> & ProductModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
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
        variation: mongoose.MergeType<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, ProductModel> & ProductModel & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }> & mongoose.Document<unknown, {}, ProductModel> & ProductModel & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }, Omit<ProductModel, "_id">>[];
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
