import { User } from 'src/tables/user/entities/user.entity';
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

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (owner) => owner.rooms)
  @JoinColumn()
  owner: User;
}
