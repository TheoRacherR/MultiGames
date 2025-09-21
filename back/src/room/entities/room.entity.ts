import { User } from 'src/user/entities/user.entity';
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
  id: number;

  @Column()
  password: string;

  @Column()
  max_size: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (owner) => owner.room)
  @JoinColumn()
  owner: User;
}
