import { UserEntity } from 'src/models/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id?: bigint;

  @Column()
  user_id: number;

  @Column()
  order_price: number;

  @Column()
  order_discount: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  order_create_at?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  order_update_at?: Date;

  @Column()
  order_status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'SET NULL' })
  user?: UserEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  order_items? : OrderItemEntity[]
}
