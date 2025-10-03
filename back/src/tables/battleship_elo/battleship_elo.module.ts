import { Module } from '@nestjs/common';
import { BattleshipEloService } from './battleship_elo.service';
import { BattleshipEloController } from './battleship_elo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleshipElo } from './entities/battleship_elo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BattleshipElo])],
  controllers: [BattleshipEloController],
  providers: [BattleshipEloService],
})
export class BattleshipEloModule {}
