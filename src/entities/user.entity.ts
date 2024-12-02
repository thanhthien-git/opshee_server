import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'text' })
  user_name: string;

  @Column({ type: 'text' })
  user_phone: string;

  @Column({ type: 'text' })
  user_email: string;

  @Column({ type: 'text' })
  user_password: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  user_create_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  user_update_at: Date;

  @Column({ type: 'jsonb', nullable: true })
  user_address: object;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'boolean', default: false })
  isBanned: boolean;

  @Column({ type: 'text', default: 'user' })
  role: string;
}
