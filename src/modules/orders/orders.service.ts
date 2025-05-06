import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ORDER_MESSAGE } from '../../constants/message';
import { StocksService } from '../stocks/stocks.service';
import { Utils } from '../../utils/util';
import { IOrderItem } from './interfaces/order-item.interface';
import { OrderContextService } from './context/order-context.service';
import { ORDER_STATUS } from './enums/order-status.enum';
import { RedisService } from '../redis/redis/redis.service';
import { ProductService } from '../products/product.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderReposity: Repository<Order>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    private stockService: StocksService,
    private productService: ProductService,
    private readonly context: OrderContextService,
    private redisService: RedisService,
  ) {}
  private readonly logger = new Logger(OrdersService.name);
  private ORDER_CACHE_KEY = (key: string) => `order:${key}`;

  private async validateItem(orderItem: IOrderItem): Promise<number> {
    const itemInStock = await this.stockService.getStock(orderItem.productId);

    //return err if stock is not valid
    if (itemInStock < 0 || itemInStock < orderItem.quantity) {
      throw new BadRequestException({
        message: `Out of stock : ${orderItem.productName}`,
      });
    }

    return itemInStock;
  }

  private async createOrderDetails(
    products: IOrderItem[],
    userId: number,
    isPuscharge = false,
  ): Promise<{ order: Order; orderItems: OrderItemEntity[] }> {
    try {
      let orderItems: OrderItemEntity[] = [];
      let totalPrice = 0;
      const orderId = this.context.getOrderId();
      const ids: string[] = products.map((product) => product.productId);
      this.logger.debug(ids);
      //create order items
      const variations = await this.productService.getProductVariation(ids);
      this.logger.debug(variations);
      for (let i = 0; i < products.length; i++) {
        //validate stock step
        let inStock = await this.validateItem(products[i]);
        //desctruting infomation of each variations
        const { productId, productName, quantity, shopId } = products[i];
        const { tier_index, price } = variations[i].variation_details;
        let itemPrice = price * quantity;
        //create details of order items
        let item: OrderItemEntity = {
          user_id: userId,
          order_item_id: Utils.generateBigInt(),
          order_item_price: itemPrice,
          order_item_quantity: inStock,
          product_name: `${productName}_${tier_index}`,
          product_id: productId,
          shop_id: Number(shopId),
          order_id: orderId,
        };
        //push order item to order
        orderItems.push(item);
        totalPrice += itemPrice;
      }

      //create order detail
      const order: Order = {
        order_id: orderId,
        order_discount: 0,
        order_price: totalPrice,
        order_status: ORDER_STATUS.PENDING,
        user_id: userId,
        order_create_at: new Date(),
        order_update_at: new Date(),
        is_puscharge: isPuscharge,
      };

      //return order & order items
      return { order, orderItems };
    } catch (err) {
      this.logger.debug(err);
      throw new BadRequestException(err);
    }
  }

  async create(dto: CreateOrderDto, userId: number, isPuscharge = false) {
    try {
      const { products, expressType, userAddress, paidType } = dto;
      let orderId = Utils.generateBigInt();
      this.context.setOrderId(orderId);
      //step 1: create order item  by validating the stock
      const { order, orderItems } = await this.createOrderDetails(
        products,
        userId,
        isPuscharge,
      );
      //add to the db step
      //first -> update product variation stock first -> 1. saving to redis 2. after 10 minutes, save to the database
      //insert order to db - using Job Queue avoid crash server
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException({ message: ORDER_MESSAGE.CREATE.FAILED });
    }
  }

  async getById(orderId: string, userId?: number): Promise<Order> {
    try {
      const cacheKey = this.ORDER_CACHE_KEY(orderId);
      const id = BigInt(orderId);
      const query = userId
        ? { order_id: id, user_id: userId }
        : { order_id: id };
      const order = await this.redisService.checkCacheMemo(
        cacheKey,
        async () => {
          return await this.orderReposity.findOne({
            where: { ...query },
            relations: ['order_items'],
          });
        },
        new Order(),
      );
      return order;
    } catch (err) {
      this.logger.error(`Error when querying order id : ${orderId}`);
      throw new Error(err);
    }
  }

  async getOrderByUser(userId: number): Promise<Order[]> {
    try {
      const cacheKey = this.ORDER_CACHE_KEY(`userId:${String(userId)}`);
      const orders: Order[] =
        await this.redisService.checkCacheMemo(cacheKey, async () => {
          return await this.orderReposity.find({
            where: { user_id: userId },
          });
        }, [new Order()]);

      return orders;
    } catch (err) {
      this.logger.error(`Error when querying user's order history : ${userId}`);
      throw new Error(err);
    }
  }

  async getOrderByShop(shopId: string): Promise<OrderItemEntity[]> {
    try {
      const cacheKey = this.ORDER_CACHE_KEY(`shopId:${String(shopId)}`);
      const orders: OrderItemEntity[] = await this.redisService.checkCacheMemo(
        cacheKey,
        async () => {
          return await this.orderItemRepository.find({
            where: { shop_id: Number(shopId) },
          });
        },
        null,
      );

      return orders;
    } catch (err) {
      this.logger.error(`Error when querying user's order history : ${shopId}`);
      throw new Error(err);
    }
  }

  async updateOrderStatus(
    orderId: string,
    status: keyof typeof ORDER_STATUS,
  ): Promise<UpdateResult> {
    try {
      return this.orderReposity.update(
        {
          order_id: BigInt(orderId),
        },
        {
          order_status: status,
        },
      );
    } catch (err) {
      this.logger.error(`Error while changing status of order: ${orderId}`);
      throw new Error(err);
    }
  }

  async cancelOrder(orderId: bigint): Promise<UpdateResult> {
    try {
      return await this.orderReposity.update(
        {
          order_id: BigInt(orderId),
        },
        {
          order_status: ORDER_STATUS.CANCEL,
        },
      );
    } catch (err) {
      this.logger.error(`Error while cancel orderId: ${orderId}`);
      throw new Error(err);
    }
  }

  async isPuscharge(productId: string, userId: number): Promise<boolean> {
    try {
      const order = await this.orderItemRepository.findOne({
        where: { user_id: userId, product_id: productId },
      });
      return !!order;
    } catch (err) {
      this.logger.error(
        `Error while checking is purcharge :${productId} - user: ${userId}`,
      );
      throw new Error(err);
    }
  }
}
