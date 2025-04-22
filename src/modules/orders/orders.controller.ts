import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('create')
  async create(@Req() req, @Body() dto: CreateOrderDto) {
    const userId = req.userId;
    return await this.orderService.create(dto, userId);
  }
}
