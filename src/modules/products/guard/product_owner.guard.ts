import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ROLE } from '../../../enum/role.enum';
import { ProductService } from '../product.service';

export class ProductOwnerShipGuard implements CanActivate {
  constructor(private productService: ProductService) {}

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
