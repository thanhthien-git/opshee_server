import { Transform } from 'class-transformer';

export class RemoveCartItemDto {
  @Transform(({ value }) => value.map((v: string) => BigInt(v)))
  ids: bigint[];

  @Transform(({ value }) => BigInt(value))
  cartId: bigint;
}
