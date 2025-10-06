import { Injectable } from '@nestjs/common';
import { CreateBattleshipEloDto } from './dto/create-battleship_elo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleshipElo } from './entities/battleship_elo.entity';
import { Repository } from 'typeorm';
import { SearchScoreboardBattleshipEloDto } from './dto/search-scoreboard-battleship_elo.dto';

@Injectable()
export class BattleshipEloService {
  constructor(
    @InjectRepository(BattleshipElo)
    private battleshipEloRepository: Repository<BattleshipElo>,
  ) {}

  async create(createBattleshipEloDto: CreateBattleshipEloDto): Promise<{
    message: string;
  }> {
    await this.battleshipEloRepository.insert({
      ...createBattleshipEloDto,
    });
    return { message: `BattleshipElo created` };
  }

  async findAll(): Promise<BattleshipElo[]> {
    return await this.battleshipEloRepository.find();
  }

  async findOne(id: string): Promise<BattleshipElo | null> {
    return await this.battleshipEloRepository.findOne({ where: { id } });
  }

  async findBestScoreByType(
    searchScoreboardBattleshipEloDto: SearchScoreboardBattleshipEloDto,
  ): Promise<BattleshipElo[]> {
    const battleshipEloFound = await this.battleshipEloRepository.find();
    return battleshipEloFound
      .sort((a: BattleshipElo, b: BattleshipElo) => a.score - b.score)
      .slice(0, searchScoreboardBattleshipEloDto.length);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.battleshipEloRepository.delete(id);
    return { message: `BattleshipElo ${id} deleted` };
  }
}
