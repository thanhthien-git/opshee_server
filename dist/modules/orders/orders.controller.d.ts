import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private orderService;
    constructor(orderService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<void>;
}
