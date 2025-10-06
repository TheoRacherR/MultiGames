import { levels } from 'src/@types/tables/minesweeper';
import { User } from 'src/tables/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Minesweeper {
  @PrimaryGeneratedColumn()
  id: string;

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

  @ManyToOne(() => User, (player) => player.minesweeper, { eager: true })
  @JoinColumn()
  player: User;
}
