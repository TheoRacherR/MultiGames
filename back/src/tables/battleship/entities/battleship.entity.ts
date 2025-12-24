import { User } from '../../../tables/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Battleship {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  final_score: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (winner) => winner.bs_winner)
  @JoinColumn()
  winner: User;

  @ManyToOne(() => User, (winner) => winner.bs_looser)
  @JoinColumn()
  looser: User;
}
