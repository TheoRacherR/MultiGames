import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Atlas {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (player) => player.atlas, { eager: true })
  @JoinColumn()
  player: User;
}
