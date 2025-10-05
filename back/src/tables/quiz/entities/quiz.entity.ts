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
export class Quiz {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  scoreFound: number;

  @Column()
  scoreTotal: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (player) => player.quiz)
  @JoinColumn()
  player: User;
}
