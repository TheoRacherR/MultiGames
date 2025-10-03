import { Module } from '@nestjs/common';
import { MinesweeperService } from './minesweeper.service';
import { MinesweeperController } from './minesweeper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Minesweeper } from './entities/minesweeper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Minesweeper])],
  controllers: [MinesweeperController],
  providers: [MinesweeperService],
})
export class MinesweeperModule {}
