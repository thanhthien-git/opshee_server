import { HydratedDocument } from 'mongoose';
import { ProductAtribute, ProductVariation } from '../types/product.type';
import { ObjectId } from 'mongodb';
export declare class Product {
    _id: ObjectId;
    product_name: string;
    product_category: number[];
    product_brand_id: number;
    product_attributes: ProductAtribute[];
    product_images: string[];
    product_variation_list: ProductVariation[];
    product_condition: boolean;
    product_updated_at: Date;
    product_created_at: Date;
    product_lowest_price: number;
    product_highest_price: number;
    shop_id: number;
}
export type ProductDocument = HydratedDocument<Product>;
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product> & Product & Required<{
    _id: ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & Required<{
    _id: ObjectId;
}> & {
    __v: number;
}>;
