import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { OrdersService } from 'src/modules/orders/orders.service';

@Injectable()
export class IsPuschargedGuard implements CanActivate {
  constructor(private orderService: OrdersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request;
    const productId = request.query.productId;
    const isBuyed = await this.orderService.isPuscharge(productId, userId);
    return !!isBuyed;
  }
}
