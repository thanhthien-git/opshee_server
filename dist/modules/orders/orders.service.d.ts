import { Order } from './entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { StocksService } from '../stocks/stocks.service';
import { OrderContextService } from './context/order-context.service';
import { ORDER_STATUS } from './enums/order-status.enum';
import { RedisService } from '../redis/redis/redis.service';
import { ProductService } from '../products/product.service';
export declare class OrdersService {
    private orderReposity;
    private orderItemRepository;
    private stockService;
    private productService;
    private readonly context;
    private redisService;
    constructor(orderReposity: Repository<Order>, orderItemRepository: Repository<OrderItemEntity>, stockService: StocksService, productService: ProductService, context: OrderContextService, redisService: RedisService);
    private readonly logger;
    private ORDER_CACHE_KEY;
    private validateItem;
    private createOrderDetails;
    create(dto: CreateOrderDto, userId: number): Promise<void>;
    getById(orderId: string): Promise<Order>;
    getOrderByUser(userId: number): Promise<Order[]>;
    getOrderByShop(shopId: string): Promise<OrderItemEntity[]>;
    updateOrderStatus(orderId: string, status: keyof typeof ORDER_STATUS): Promise<UpdateResult>;
    cancelOrder(orderId: string): Promise<UpdateResult>;
}
