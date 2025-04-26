import { Types } from 'mongoose';
export declare class AddToCartDto {
    productId: Types.ObjectId;
    shopId: bigint;
    productVaritionId: Types.ObjectId;
    stock: number;
}
