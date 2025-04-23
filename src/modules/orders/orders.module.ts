import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { UserEntity } from 'src/models/entities/user.entity';
import { ShopEntity } from 'src/models/entities/shop.entity';
import { StocksModule } from '../stocks/stocks.module';
import { OrderContextService } from './context/order-context.service';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity, Order, UserEntity, ShopEntity]),
    StocksModule,
    ProductModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderContextService],
  exports: [OrdersService, OrderContextService],
})
export class OrdersModule {}
