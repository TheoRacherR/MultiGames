import { Injectable } from '@nestjs/common';
import { CreateMinesweeperDto } from './dto/create-minesweeper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Minesweeper } from './entities/minesweeper.entity';
import { Repository } from 'typeorm';
import { SearchScoreboardMinesweeperDto } from './dto/search-scoreboard-minesweeper.dto';

@Injectable()
export class MinesweeperService {
  constructor(
    @InjectRepository(Minesweeper)
    private minesweeperRepository: Repository<Minesweeper>,
  ) {}

  async create(
    createMinesweeperDto: CreateMinesweeperDto,
  ): Promise<{ message: string }> {
    await this.minesweeperRepository.insert({
      ...createMinesweeperDto,
    });
    return { message: `Minesweeper created` };
  }

  async findAll(): Promise<Minesweeper[]> {
    return await this.minesweeperRepository.find();
  }

  async findBestScoreByType(
    searchScoreboardMinesweeperDto: SearchScoreboardMinesweeperDto,
  ): Promise<Minesweeper[]> {
    const minesweeperFound = await this.minesweeperRepository.find({
      where: { won: true },
    });
    return minesweeperFound
      .sort((a: Minesweeper, b: Minesweeper) => a.score - b.score)
      .slice(0, searchScoreboardMinesweeperDto.length);
  }

  async findOne(id: string): Promise<Minesweeper | null> {
    return await this.minesweeperRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.minesweeperRepository.delete(id);
    return { message: `Minesweeper ${id} deleted` };
  }
}
