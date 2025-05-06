import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ShopEntity } from '../../../models/entities/shop.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  order_item_id?: bigint;

  @Column({ type: 'bigint' })
  order_id?: bigint;

  @Column()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  order_item_quantity: number;

  @Column()
  order_item_price: number;

  @Column()
  user_id: number;

  @Column()
  shop_id: number;

  @ManyToOne(() => Order, (order) => order.order_items, {
    onDelete: 'SET NULL',
  })
  order?: Order;

  @ManyToOne(() => ShopEntity, (shop) => shop.orders, { onDelete: 'SET NULL' })
  shop?: ShopEntity;
}
