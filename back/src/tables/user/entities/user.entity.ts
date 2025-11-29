import { country, userRole, userStatus } from 'src/@types/tables/user';
import { Battleship } from 'src/tables/battleship/entities/battleship.entity';
import { BattleshipElo } from 'src/tables/battleship_elo/entities/battleship_elo.entity';
import { Minesweeper } from 'src/tables/minesweeper/entities/minesweeper.entity';
import { Quiz } from 'src/tables/quiz/entities/quiz.entity';
import { Room } from 'src/tables/room/entities/room.entity';
import { TimeLine } from 'src/tables/timeline/entities/timeline.entity';
import { Wordle } from 'src/tables/wordle/entities/wordle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 20 })
  pseudo: string;

  @Column({
    type: 'enum',
    enum: country,
    default: country.UK,
  })
  country: country;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole.USER,
  })
  role: userRole;

  @Column({
    type: 'enum',
    enum: userStatus,
    default: userStatus.TO_ACTIVE,
  })
  status: userStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Room, (rooms) => rooms.owner)
  rooms: Room[];

  @OneToMany(() => Minesweeper, (minesweeper) => minesweeper.player)
  minesweeper: Minesweeper;

  @OneToOne(() => BattleshipElo, (bs_elo) => bs_elo.user)
  bs_elo: BattleshipElo;

  @OneToMany(() => Battleship, (bs_winner) => bs_winner.winner)
  bs_winner: Battleship;

  @OneToMany(() => Battleship, (bs_looser) => bs_looser.looser)
  bs_looser: Battleship;

  @OneToMany(() => TimeLine, (timeline_game) => timeline_game.player)
  timeline_game: TimeLine;

  @OneToMany(() => Quiz, (quiz) => quiz.player)
  quiz: Quiz;

  @OneToMany(() => Wordle, (wordle) => wordle.player)
  wordle: Wordle;
}
