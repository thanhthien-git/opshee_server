import { HydratedDocument, Types } from 'mongoose';
export declare class ProductVariation {
    _id?: Types.ObjectId;
    product_id?: Types.ObjectId;
    variation_details: VariationDetail;
}
export type VariationDetail = {
    tier_index: number[];
    isDefault: boolean;
    price: number;
    stock: number;
    image?: string;
};
export type ProductVariationDocument = HydratedDocument<ProductVariation>;
export declare const ProductVariationSchema: import("mongoose").Schema<ProductVariation, import("mongoose").Model<ProductVariation, any, any, any, import("mongoose").Document<unknown, any, ProductVariation> & ProductVariation & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductVariation, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductVariation>> & import("mongoose").FlatRecord<ProductVariation> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
