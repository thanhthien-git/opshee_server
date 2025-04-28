import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddToCartDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  productVaritionId: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  quantity: number;
}
