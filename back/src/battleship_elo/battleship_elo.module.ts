import { Module } from '@nestjs/common';
import { BattleshipEloService } from './battleship_elo.service';
import { BattleshipEloController } from './battleship_elo.controller';

@Module({
  controllers: [BattleshipEloController],
  providers: [BattleshipEloService],
})
export class BattleshipEloModule {}
