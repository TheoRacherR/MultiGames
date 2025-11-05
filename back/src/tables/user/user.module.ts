import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Room } from '../room/entities/room.entity';
import { Minesweeper } from '../minesweeper/entities/minesweeper.entity';
import { Battleship } from '../battleship/entities/battleship.entity';
import { BattleshipElo } from '../battleship_elo/entities/battleship_elo.entity';
import { TimeGame } from '../timegame/entities/timegame.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Room,
      Minesweeper,
      Battleship,
      BattleshipElo,
      TimeGame,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],

  exports: [UserService],
})
export class UserModule {}
