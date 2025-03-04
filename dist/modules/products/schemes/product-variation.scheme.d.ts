import { HydratedDocument, Types } from 'mongoose';
export declare class ProductModel {
    product_id: Types.ObjectId;
    model_list: ModelItem[];
}
export type ModelItem = {
    tier_index: number[];
    isDefault: boolean;
    price: number;
    stock: number;
};
export type ProductModelDocument = HydratedDocument<ProductModel>;
export declare const ProductModelSchema: import("mongoose").Schema<ProductModel, import("mongoose").Model<ProductModel, any, any, any, import("mongoose").Document<unknown, any, ProductModel> & ProductModel & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductModel>> & import("mongoose").FlatRecord<ProductModel> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
