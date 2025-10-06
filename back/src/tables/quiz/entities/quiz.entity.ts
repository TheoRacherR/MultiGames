import { typeQuizEnum } from 'src/@types/tables/quiz';
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

  @Column()
  timerFinished: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  type: typeQuizEnum;

  @ManyToOne(() => User, (player) => player.quiz, { eager: true })
  @JoinColumn()
  player: User;
}
