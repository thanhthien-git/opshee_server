import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisProductService } from '../product.service';
import { ROLE } from '../../../enum/role.enum';

export class ProductOwnerShipGuard implements CanActivate {
  constructor(private productService: RedisProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId, role } = request;
    const productId = request.query.productId;
    if (role !== ROLE.USER) return false;
    if (role === ROLE.ADMIN) return true;
    const product = await this.productService.getProductById(productId);

    return product === userId;
  }
}
