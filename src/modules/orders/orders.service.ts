import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ORDER_MESSAGE } from 'src/constants/message';
import { StocksService } from '../stocks/stocks.service';
import { Utils } from 'src/utils/util';
import { ProductRepository } from '../products/product.repository';
import { IOrderItem } from './interfaces/order-item.interface';
import { OrderContextService } from './context/order-context.service';
import { ORDER_STATUS } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderReposity: Repository<Order>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<Order>,
    private stockService: StocksService,
    private productService: ProductRepository,
    private readonly context: OrderContextService,
  ) {}

  async validateItem(
    orderItem: IOrderItem,
  ): Promise<{ item: OrderItemEntity; price: number }> {
    const itemInStock = await this.stockService.getStock(orderItem.productId);
    const itemPrice = await this.productService.getVaritionPrice(
      orderItem.productId,
    );
    //return err if stock is not valid
    if (itemInStock < 0 || itemInStock < orderItem.quantity) {
      throw new BadRequestException({
        message: `out of stock : ${orderItem.productName}`,
      });
    }
    const item: OrderItemEntity = {
      order_item_id: Utils.generateBigInt(),
      order_id: this.context.getOrderId(),
      order_item_price: itemPrice,
      order_item_quantity: orderItem.quantity,
      product_id: orderItem.productId,
      product_name: orderItem.productName,
    };
    const price = item.order_item_quantity * item.order_item_price;
    return { item, price };
  }

  async createOrderItem(
    dto: CreateOrderDto,
  ): Promise<{ orderItems: OrderItemEntity[]; orderPrice: number }> {
    try {
      let orderItems: OrderItemEntity[] = [];
      let orderPrice = 0;
      const { products } = dto;
      //create order items
      for (const product of products) {
        const { item, price } = await this.validateItem(product);
        orderItems.push(item);
        orderPrice += price;
      }
      return { orderItems, orderPrice };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async create(dto: CreateOrderDto, userId: number) {
    try {
      const { products, expressType, userAddress, paidType } = dto;
      let orderId = Utils.generateBigInt();
      this.context.setOrderId(orderId);
      //step 1: create order item  by validating the stock
      const { orderPrice, orderItems } = await this.createOrderItem(dto);
      console.log(`the orderItems : ${orderItems}`);
      console.log(`the order price: ${orderPrice}`);
      //add to the db step
      const order: Order = {
        order_id: orderId,
        order_discount: 0,
        order_price: orderPrice,
        order_status: ORDER_STATUS.PENDING,
        user_id: userId,
        order_create_at: new Date(),
        order_update_at: new Date(),
      };
      console.log(`the total order is :${order}`);
      //insert order to db
    } catch (err) {
      throw new BadRequestException({ message: ORDER_MESSAGE.CREATE.FAILED });
    }
  }
}
