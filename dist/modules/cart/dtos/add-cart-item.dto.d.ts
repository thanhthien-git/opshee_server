import { Types } from 'mongoose';
export declare class AddCartItemDto {
    productId: Types.ObjectId;
    productVariation: Types.ObjectId;
    quantity: number;
}
