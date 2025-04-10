import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisProductService } from '../product.service';
export declare class ProductOwnerShipGuard implements CanActivate {
    private productService;
    constructor(productService: RedisProductService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
