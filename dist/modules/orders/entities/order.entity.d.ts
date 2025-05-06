import { UserEntity } from '../../../models/entities/user.entity';
import { OrderItemEntity } from './order-item.entity';
export declare class Order {
    order_id?: bigint;
    user_id: number;
    order_price: number;
    order_discount: number;
    order_create_at?: Date;
    order_update_at?: Date;
    order_status: string;
    is_puscharge: boolean;
    user?: UserEntity;
    order_items?: OrderItemEntity[];
}
