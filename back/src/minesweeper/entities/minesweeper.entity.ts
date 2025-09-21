import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum levels {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
}

@Entity()
export class Minesweeper {
  @PrimaryGeneratedColumn()
  id: number;

  // number of sec of the game
  @Column()
  score: number;

  @Column()
  won: boolean;

  @Column({
    type: 'enum',
    enum: levels,
    default: levels.EASY,
  })
  level: levels;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (player) => player.minesweeper)
  @JoinColumn()
  player: User;
}
