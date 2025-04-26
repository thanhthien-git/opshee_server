import { EXPRESS_TYPE } from '../enums/express-type.enum';
import { PAID_TYPE } from '../enums/paid-type.enum';
import { IOrderItem } from '../interfaces/order-item.interface';
export declare class CreateOrderDto {
    products: IOrderItem[];
    "userAddress": string;
    expressType: keyof typeof EXPRESS_TYPE;
    paidType: keyof typeof PAID_TYPE;
}
