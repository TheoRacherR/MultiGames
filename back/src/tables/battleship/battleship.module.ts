import { Module } from '@nestjs/common';
import { BattleshipService } from './battleship.service';
import { BattleshipController } from './battleship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battleship } from './entities/battleship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battleship])],
  controllers: [BattleshipController],
  providers: [BattleshipService],
})
export class BattleshipModule {}
