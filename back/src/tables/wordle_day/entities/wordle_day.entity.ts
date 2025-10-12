import { Wordle } from 'src/tables/wordle/entities/wordle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WordleDay {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  word: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ unique: true })
  targetDay: Date;

  @OneToMany(() => Wordle, (wordle) => wordle.word)
  wordle: Wordle;
}
