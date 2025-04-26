import { IsNotEmpty } from 'class-validator';
import { EXPRESS_TYPE } from '../enums/express-type.enum';
import { PAID_TYPE } from '../enums/paid-type.enum';
import { IOrderItem } from '../interfaces/order-item.interface';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'at least 1 product in cart' })
  products: IOrderItem[];
  @IsNotEmpty({ message: "Address can't be null" })
  "userAddress": string;
  @IsNotEmpty({ message: 'Please choose a express type' })
  expressType: keyof typeof EXPRESS_TYPE;
  @IsNotEmpty({ message: 'Invalid paid type' })
  paidType: keyof typeof PAID_TYPE;
}
