import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { StocksService } from '../stocks/stocks.service';
import { ProductRepository } from '../products/product.repository';
import { IOrderItem } from './interfaces/order-item.interface';
import { OrderContextService } from './context/order-context.service';
export declare class OrdersService {
    private orderReposity;
    private orderItemRepository;
    private stockService;
    private productService;
    private readonly context;
    constructor(orderReposity: Repository<Order>, orderItemRepository: Repository<Order>, stockService: StocksService, productService: ProductRepository, context: OrderContextService);
    validateItem(orderItem: IOrderItem): Promise<{
        item: OrderItemEntity;
        price: number;
    }>;
    createOrderItem(dto: CreateOrderDto): Promise<{
        orderItems: OrderItemEntity[];
        orderPrice: number;
    }>;
    create(dto: CreateOrderDto, userId: number): Promise<void>;
}
