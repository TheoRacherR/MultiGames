import { Module } from '@nestjs/common';
import { MinesweeperService } from './minesweeper.service';
import { MinesweeperController } from './minesweeper.controller';

@Module({
  controllers: [MinesweeperController],
  providers: [MinesweeperService],
})
export class MinesweeperModule {}
