import { Battleship } from 'src/battleship/entities/battleship.entity';
import { BattleshipElo } from 'src/battleship_elo/entities/battleship_elo.entity';
import { Minesweeper } from 'src/minesweeper/entities/minesweeper.entity';
import { Room } from 'src/room/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum country {
  FRANCE = '🇫🇷',
  USA = '🇺🇸',
  UK = '🇬🇧',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Room, (room) => room.owner)
  room: Room;

  @OneToMany(() => Minesweeper, (minesweeper) => minesweeper.player)
  minesweeper: Minesweeper;

  @OneToOne(() => BattleshipElo, (bs_elo) => bs_elo.user)
  bs_elo: BattleshipElo;

  @OneToMany(() => Battleship, (bs_winner) => bs_winner.winner)
  bs_winner: Battleship;

  @OneToMany(() => Battleship, (bs_looser) => bs_looser.looser)
  bs_looser: Battleship;
}
