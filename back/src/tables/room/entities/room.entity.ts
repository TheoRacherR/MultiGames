import { roomType } from '../../../@types/tables/room';
import { User } from '../../../tables/user/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  max_size: number;

  @Column({
    type: 'enum',
    enum: roomType,
    default: roomType.OTHER,
  })
  type: roomType;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (owner) => owner.rooms)
  @JoinColumn()
  owner: User;
}
