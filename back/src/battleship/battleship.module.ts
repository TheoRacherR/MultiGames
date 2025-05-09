import { Module } from '@nestjs/common';
import { BattleshipService } from './battleship.service';
import { BattleshipController } from './battleship.controller';

@Module({
  controllers: [BattleshipController],
  providers: [BattleshipService],
})
export class BattleshipModule {}
