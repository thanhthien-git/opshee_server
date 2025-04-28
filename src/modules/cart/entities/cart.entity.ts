import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Entity('users_wish_list')
export class CartEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;

  @Column({ type: 'integer' })
  user_id: number;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @Column({ type: 'integer' })
  item_count: number;

  @OneToMany(() => CartItemEntity, (item) => item.cart)
  cart_items?: CartItemEntity[];
}
