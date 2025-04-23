import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ProductService } from '../product.service';
export declare class ProductOwnerShipGuard implements CanActivate {
    private productService;
    constructor(productService: ProductService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
