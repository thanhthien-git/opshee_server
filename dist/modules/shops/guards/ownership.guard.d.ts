import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ShopEntity } from 'src/models/entities/shop.entity';
import { Repository } from 'typeorm';
export declare class OwnerShipGuard implements CanActivate {
    private readonly shopRepository;
    constructor(shopRepository: Repository<ShopEntity>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
