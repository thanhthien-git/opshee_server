import { HydratedDocument } from 'mongoose';
import { IBase } from 'src/interface/base.interface';
export declare class Product {
    product_name: string;
    product_category: number[];
    product_brand_id: number;
    product_attributes: {
        name: string[];
        value: string[];
    };
    product_images: string[];
    product_variation_list: {
        custom_value: string;
        value_list: {
            custom_value: string;
        }[];
    }[];
    product_condition: boolean;
    product_updated_at: Date;
    product_created_at: Date;
    shop_id: number;
}
export interface IProduct extends IBase {
    product_name: string;
    product_category: number[];
    product_brand_id: number;
    product_attributes: {
        name: string[];
        value: string[];
    };
    product_images: string[];
    product_variation_list: {
        custom_value: string;
        value_list: {
            custom_value: string;
        }[];
    }[];
    product_condition: boolean;
    product_updated_at: Date;
    product_created_at: Date;
    shop_id: number;
}
export type ProductDocument = HydratedDocument<Product>;
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product> & Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
