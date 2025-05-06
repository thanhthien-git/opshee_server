import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';
import { CancleOrderDto } from './dtos/cancel-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  async getOrder(@Req() req) {
    return await this.orderService.getOrderByUser(req.userId);
  }

  @Get()
  async getOrderById(@Query('orderId') orderId: string) {
    return await this.orderService.getById(orderId);
  }
  @Get('shop')
  async getOrderByShop(@Req() req) {
    return await this.orderService.getOrderByShop(req.userId);
  }

  @Post('create')
  async create(@Req() req, @Body() dto: CreateOrderDto) {
    const userId = req.userId;
    return await this.orderService.create(dto, userId);
  }

  @Post('cancel')
  async cancle(@Req() req, @Body() dto: CancleOrderDto) {
    const { orderId } = dto;
    return await this.orderService.cancelOrder(orderId);
  }
}
