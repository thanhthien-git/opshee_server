import { CanActivate, ExecutionContext } from '@nestjs/common';
import { OrdersService } from 'src/modules/orders/orders.service';
export declare class IsPuschargedGuard implements CanActivate {
    private orderService;
    constructor(orderService: OrdersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
