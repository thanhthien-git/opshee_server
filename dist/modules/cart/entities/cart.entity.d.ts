import { CartItemEntity } from './cart-item.entity';
export declare class CartEntity {
    id: bigint;
    user_id: number;
    update_at: Date;
    cart_items?: CartItemEntity[];
}
