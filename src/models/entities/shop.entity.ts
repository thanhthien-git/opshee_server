import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shops')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  shop_id?: number;

  @Column({ type: 'text' })
  shop_name: string;

  @Column({ type: 'text' })
  shop_phone: string;

  @Column({ type: 'text' })
  shop_email: string;

  @Column({ type: 'text' })
  shop_password: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  shop_create_at?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  shop_update_at?: Date;

  @Column({ type: 'text' })
  shop_type: string;

  @Column({ type: 'boolean' })
  is_favourite: boolean;

  @Column({ type: 'boolean' })
  is_Deleted: boolean;
}
