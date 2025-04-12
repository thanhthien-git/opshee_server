import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from '../../../models/entities/shop.entity';
import { ShopController } from './shop.controller';
import { TokenModule } from '../../../modules/token/token.module';
import { TokenService } from '../../../modules/token/token.service';
import { OwnerShipGuard } from '../guards/ownership.guard';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity]), TokenModule],
  controllers: [ShopController],
  providers: [TokenService, OwnerShipGuard, ShopService],
})
export class ShopModule {}
