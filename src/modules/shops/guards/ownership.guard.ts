import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE } from 'src/constants/role';
import { ShopEntity } from 'src/models/entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerShipGuard implements CanActivate {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { userId, role } = req;

    if (role === ROLE.USER) return false;

    const currentUser = await this.shopRepository.findOne({
      where: {
        shop_id: userId,
      },
    });

    if (currentUser.is_Deleted) return false;

    return currentUser.shop_id === userId;
  }
}
