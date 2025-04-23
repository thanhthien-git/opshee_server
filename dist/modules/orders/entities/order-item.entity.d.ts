import { Order } from './order.entity';
import { ShopEntity } from '../../../models/entities/shop.entity';
export declare class OrderItemEntity {
    order_item_id?: bigint;
    order_id?: bigint;
    product_id: string;
    product_name: string;
    order_item_quantity: number;
    order_item_price: number;
    shop_id: number;
    order?: Order;
    shop?: ShopEntity;
}
