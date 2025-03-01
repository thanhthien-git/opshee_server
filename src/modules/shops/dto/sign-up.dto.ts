import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ShopRegisterDto {
  @IsString()
  @IsNotEmpty()
  shop_phone: string;

  @IsString()
  @IsNotEmpty()
  shop_name: string;

  @IsString()
  @IsNotEmpty()
  shop_password: string;

  @IsEmail()
  @IsNotEmpty()
  shop_email: string;
}
