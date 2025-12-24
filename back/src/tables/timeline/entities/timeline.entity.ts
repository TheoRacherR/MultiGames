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
export class TimeLine {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (player) => player.timeline_game, { eager: true })
  @JoinColumn()
  player: User;
}
