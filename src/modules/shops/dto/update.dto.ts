import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShopUpdateDto {
  @IsString()
  @IsNotEmpty()
  shopName: string;

  @IsString()
  @IsNotEmpty()
  shopEmail: string;

  @IsString()
  @IsNotEmpty()
  shopPhone: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;
}
