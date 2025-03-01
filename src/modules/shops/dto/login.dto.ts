import { IsNotEmpty } from 'class-validator';

export class ShopLoginDTO {
  @IsNotEmpty()
  shop_phone: string;

  @IsNotEmpty()
  shop_password;
}
