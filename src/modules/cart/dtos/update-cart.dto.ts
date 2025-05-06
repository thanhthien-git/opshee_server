import { Transform } from 'class-transformer';

export class UpdateCartItemDto {
  @Transform(({ value }) => BigInt(value))
  cartItemId: bigint;
  quantity: number;
}
