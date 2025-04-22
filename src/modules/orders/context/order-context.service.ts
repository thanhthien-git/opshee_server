import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class OrderContextService {
  private orderId: bigint;

  setOrderId(orderId: bigint): void {
    this.orderId = orderId;
  }

  getOrderId(): bigint {
    return this.orderId;
  }
}
