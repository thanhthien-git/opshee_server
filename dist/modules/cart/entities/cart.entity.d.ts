import { CartItemEntity } from './cart-item.entity';
export declare class CartEntity {
    id: bigint;
    user_id: number;
    update_at: Date;
    item_count: number;
    cart_items?: CartItemEntity[];
}
