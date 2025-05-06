import { Transform } from 'class-transformer';

export class CancleOrderDto {
  @Transform(({ value }) => BigInt(value))
  orderId: bigint;
}
