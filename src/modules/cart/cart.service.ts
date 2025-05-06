import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { In, InsertResult, Repository } from 'typeorm';
import { Utils } from '../../utils/util';
import { RedisService } from '../redis/redis/redis.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { CartItemEntity } from './entities/cart-item.entity';
import { UpdateCartItemDto } from './dtos/update-cart.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  private CART_CACHE_KEY = (key: string) => `cartId:${key}`;
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private cartItemRepitory: Repository<CartItemEntity>,

    private redisService: RedisService,
  ) {}

  async createCart(userId: number): Promise<InsertResult> {
    try {
      const id = Utils.generateBigInt();
      return await this.cartRepository.insert({
        id: id,
        user_id: userId,
        update_at: new Date(),
      });
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err);
    }
  }

  async getCart(userId?: number, cartId?: bigint): Promise<CartEntity> {
    try {
      let key = userId ? userId : cartId;
      let query = userId ? { user_id: userId } : { id: cartId };

      const cacheKey = this.CART_CACHE_KEY(String(key));
      return this.redisService.checkCacheMemo(cacheKey, async () => {
        return await this.cartRepository.findOne({
          where: query,
          relations: ['cart_item'],
        });
      });
    } catch (err) {
      this.logger.debug(err);
      throw new BadRequestException(err);
    }
  }
  private isExistInCart(
    cartItems: CartItemEntity[],
    checkItem: string,
  ): CartItemEntity | undefined {
    const item = cartItems.find(
      (item) => item.product_variation_id === checkItem,
    );
    return item;
  }

  private async updateCartQuantity(cartId: bigint, quantity: number) {
    return await this.cartRepository.update(
      { id: cartId },
      {
        item_count: quantity,
      },
    );
  }

  async addToCart(dto: AddToCartDto, userId: number): Promise<HttpStatus> {
    try {
      const { productId, productVaritionId, quantity } = dto;
      let currentCart = await this.getCart(userId);
      let { id, item_count } = currentCart;
      item_count += quantity;
      //check is exist
      let cartItem = this.isExistInCart(
        currentCart.cart_items,
        String(productVaritionId),
      );

      if (cartItem) {
        cartItem.quantity += quantity;
        await Promise.all([
          this.updateCartItem({
            cartItemId: cartItem.id,
            quantity: cartItem.quantity,
          }),
          this.updateCartQuantity(id, item_count),
        ]);

        return HttpStatus.ACCEPTED;
      }

      cartItem = {
        cart_id: id,
        product_id: productId,
        product_variation_id: productVaritionId,
        quantity: quantity,
        item_create_at: new Date(),
        item_update_at: new Date(),
        id: Utils.generateBigInt(),
      };
      await Promise.all([
        this.addCartItem(cartItem),
        this.updateCartQuantity(id, item_count),
      ]);
      return HttpStatus.ACCEPTED;
    } catch (err) {
      this.logger.error(`error when add to cart : ${err}`);
      throw new BadRequestException(err);
    }
  }

  async removeCartItem(ids: bigint[], cartId: bigint): Promise<HttpStatus> {
    try {
      let cart = await this.getCart(null, cartId);

      for (const item of cart.cart_items) {
        if (ids.includes(item.cart_id)) {
          cart.item_count -= item.quantity;
        }
      }

      await Promise.all([
        this.cartItemRepitory.delete({
          id: In(ids),
        }),
        this.updateCartQuantity(cartId, cart.item_count),
      ]);

      return HttpStatus.ACCEPTED;
    } catch (err) {
      this.logger.error(`Error while remove product from cart`);
      throw new BadRequestException(err);
    }
  }

  //#region Cart Item
  private async addCartItem(item: CartItemEntity): Promise<InsertResult> {
    try {
      return await this.cartItemRepitory.insert(item);
    } catch (err) {
      this.logger.error(`error while add cart item : ${err}`);
      throw new BadRequestException(err);
    }
  }
  async updateCartItem(dto: UpdateCartItemDto) {
    return await this.cartItemRepitory.update(
      { id: dto.cartItemId },
      { quantity: dto.quantity },
    );
  }
  private async getCartItem(cartItemId: bigint): Promise<CartItemEntity> {
    return await this.cartItemRepitory.findOne({
      where: { id: cartItemId },
    });
  }
  //#endregion
}
