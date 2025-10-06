import { Injectable } from '@nestjs/common';
import { CreateWordleDto } from './dto/create-wordle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wordle } from './entities/wordle.entity';
import { Repository } from 'typeorm';
import { SearchScoreboardWordleDto } from './dto/search-scoreboard-wordle.dto';

@Injectable()
export class WordleService {
  constructor(
    @InjectRepository(Wordle)
    private wordleRepository: Repository<Wordle>,
  ) {}

  async create(createWordleDto: CreateWordleDto) {
    await this.wordleRepository.insert({
      ...createWordleDto,
    });
    return { message: `Wordle created` };
  }

  async findAll() {
    return await this.wordleRepository.find();
  }

  async findBestScoreByType(
    searchScoreboardWordleDto: SearchScoreboardWordleDto,
  ) {
    const wordleFound = await this.wordleRepository.find({
      where: { created_at: new Date(), won: true },
    });
    return wordleFound
      .sort((a: Wordle, b: Wordle) => a.nbTry - b.nbTry)
      .slice(0, searchScoreboardWordleDto.length);
  }

  async findOne(id: string): Promise<Wordle | null> {
    return await this.wordleRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.wordleRepository.delete(id);
    return { message: `Wordle ${id} deleted` };
  }
}
