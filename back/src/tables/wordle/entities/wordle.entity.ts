import { User } from 'src/tables/user/entities/user.entity';
import { WordleDay } from 'src/tables/wordle_day/entities/wordle_day.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wordle {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nbTry: number;

  @Column()
  won: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (player) => player.wordle, { eager: true })
  @JoinColumn()
  player: User;

  @ManyToOne(() => WordleDay, (word) => word.wordle)
  @JoinColumn()
  word: WordleDay;
}
