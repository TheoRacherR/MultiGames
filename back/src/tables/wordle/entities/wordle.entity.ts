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
export class Wordle {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nbTry: number;

  @Column()
  won: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (player) => player.minesweeper, { eager: true })
  @JoinColumn()
  player: User;
}
