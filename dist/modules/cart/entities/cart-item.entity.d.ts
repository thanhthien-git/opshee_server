import { CartEntity } from './cart.entity';
export declare class CartItemEntity {
    id: bigint;
    cart_id: bigint;
    product_id: string;
    product_variation_id: string;
    quantity: number;
    item_create_at?: Date;
    item_update_at?: Date;
    cart?: CartEntity;
}
