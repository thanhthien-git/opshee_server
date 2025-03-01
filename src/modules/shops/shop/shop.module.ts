import { Module } from '@nestjs/common';
import { AuthShopService } from '../auth/shop.auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from 'src/models/entities/shop.entity';
import { ShopController } from './shop.controller';
import { TokenModule } from 'src/modules/token/token.module';
import { TokenService } from 'src/modules/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity]), TokenModule],
  controllers: [ShopController],
  providers: [AuthShopService, TokenService],
})
export class ShopModule {}
