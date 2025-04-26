import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_item')
export class CartItemEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;

  @Column({ type: 'bigint' })
  cart_id: bigint;

  @Column({ type: 'text' })
  product_id: string;

  @Column({ type: 'text' })
  product_variation_id: string;

  @Column({ type: 'integer' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  item_create_at?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  item_update_at?: Date;

  @ManyToOne(() => CartEntity, (item) => item.cart_items, {onDelete: "CASCADE"})
  cart?: CartEntity;
}
