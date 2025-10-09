import {
  Column,
  CreateDateColumn,
  Entity,
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
}
