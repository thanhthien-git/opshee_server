import { HttpStatus } from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis/redis.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { CartItemEntity } from './entities/cart-item.entity';
export declare class CartService {
    private cartRepository;
    private cartItemRepitory;
    private redisService;
    private readonly logger;
    private CART_CACHE_KEY;
    constructor(cartRepository: Repository<CartEntity>, cartItemRepitory: Repository<CartItemEntity>, redisService: RedisService);
    private createCart;
    getCart(userId?: number, cartId?: bigint): Promise<CartEntity>;
    private isExistInCart;
    private updateCartQuantity;
    addToCart(dto: AddToCartDto, userId: number): Promise<HttpStatus>;
    removeCartItem(ids: bigint[], cartId: bigint): Promise<HttpStatus>;
    private addCartItem;
    updateCartItem(cartItem: CartItemEntity): Promise<import("typeorm").UpdateResult>;
    private getCartItem;
}
