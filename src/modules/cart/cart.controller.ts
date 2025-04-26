import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AddToCartDto } from './dtos/add-to-cart.dto';

@Controller('cart')
export class CartController {
  @Get()
  async getCart(@Req() req) {
    return `getting cart...`;
  }

  @Post()
  async addToCart(@Body() dto: AddToCartDto, @Req() req) {
    return `add to cart`;
  }
}
