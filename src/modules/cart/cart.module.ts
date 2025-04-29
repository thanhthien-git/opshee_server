import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { RedisService } from '../redis/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity])],
  providers: [CartService, RedisService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
