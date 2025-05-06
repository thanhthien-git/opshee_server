import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';
import { CancleOrderDto } from './dtos/cancel-order.dto';
export declare class OrdersController {
    private orderService;
    constructor(orderService: OrdersService);
    getOrder(req: any): Promise<import("./entities/order.entity").Order[]>;
    getOrderById(orderId: string): Promise<import("./entities/order.entity").Order>;
    getOrderByShop(req: any): Promise<import("./entities/order-item.entity").OrderItemEntity[]>;
    create(req: any, dto: CreateOrderDto): Promise<void>;
    cancle(req: any, dto: CancleOrderDto): Promise<import("typeorm").UpdateResult>;
}
