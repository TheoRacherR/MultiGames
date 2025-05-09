import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { BattleshipModule } from './battleship/battleship.module';
import { BattleshipEloModule } from './battleship_elo/battleship_elo.module';
import { MinesweeperModule } from './minesweeper/minesweeper.module';

@Module({
  imports: [UserModule, RoomModule, BattleshipModule, BattleshipEloModule, MinesweeperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
