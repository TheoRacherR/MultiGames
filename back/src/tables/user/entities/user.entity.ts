import { country, userRole } from 'src/@types/tables/user';
import { Battleship } from 'src/tables/battleship/entities/battleship.entity';
import { BattleshipElo } from 'src/tables/battleship_elo/entities/battleship_elo.entity';
import { Minesweeper } from 'src/tables/minesweeper/entities/minesweeper.entity';
import { Room } from 'src/tables/room/entities/room.entity';
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
}
