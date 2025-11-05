import { User } from 'src/tables/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TimeGame {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  final_score: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (winner) => winner.tg_winner)
  @JoinColumn()
  winner: User;

  @ManyToOne(() => User, (winner) => winner.tg_looser)
  @JoinColumn()
  looser: User;
}
