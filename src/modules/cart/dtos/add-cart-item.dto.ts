import { Types } from 'mongoose';

export class AddCartItemDto {
  productId: Types.ObjectId;
  productVariation: Types.ObjectId;
  quantity: number;
}
