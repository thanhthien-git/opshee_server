import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from './dtos/update-cart.dto';
import { RemoveCartItemDto } from './dtos/remove-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get()
  async getCart(@Req() req) {
    const userId = req.userId;
    return await this.cartService.getCart(userId);
  }

  @Post('add')
  async addToCart(@Body() dto: AddToCartDto, @Req() req) {
    const userId = req.userId;
    return await this.cartService.addToCart(dto, userId);
  }

  @Patch('update')
  async updateCartItem(@Body() dto: UpdateCartItemDto) {
    return await this.cartService.updateCartItem(dto);
  }

  @Delete('removeItem')
  async removeCartItem(@Body() dto: RemoveCartItemDto) {
    const { ids, cartId } = dto;
    return await this.cartService.removeCartItem(ids, cartId);
  }
}
