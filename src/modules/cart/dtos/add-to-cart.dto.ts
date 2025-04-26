import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class AddToCartDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(String(value)))
  productId: Types.ObjectId;

  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  shopId: bigint;

  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(String(value)))
  productVaritionId: Types.ObjectId;

  @IsNotEmpty()
  stock: number;
}
