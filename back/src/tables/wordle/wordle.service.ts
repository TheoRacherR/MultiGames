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

  async create(createWordleDto: CreateWordleDto): Promise<{ message: string }> {
    await this.wordleRepository.insert({
      ...createWordleDto,
    });
    return { message: `Wordle created` };
  }

  async findAll(): Promise<Wordle[]> {
    return await this.wordleRepository.find();
  }

  async findBestScoreByType(
    searchScoreboardWordleDto: SearchScoreboardWordleDto,
  ): Promise<Wordle[]> {
    const wordleFound = await this.wordleRepository.find({
      where: { won: true },
    });
    return wordleFound
      .filter(
        (word) =>
          new Date(word.created_at).getDate() === new Date().getDate() &&
          new Date(word.created_at).getMonth() === new Date().getMonth() &&
          new Date(word.created_at).getFullYear() === new Date().getFullYear(),
      )
      .sort((a: Wordle, b: Wordle) => a.nbTry - b.nbTry)
      .slice(0, searchScoreboardWordleDto.length);
  }

  async findOne(id: string): Promise<Wordle | null> {
    return await this.wordleRepository.findOne({ where: { id } });
  }

  async findAllByPlayer(userID: string): Promise<Wordle[]> {
    const wordleFound = await this.wordleRepository.find({
      where: { player: { id: userID } },
    });
    return wordleFound.sort(
      (a: Wordle, b: Wordle) => b.created_at.getTime() - a.created_at.getTime(),
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.wordleRepository.delete(id);
    return { message: `Wordle ${id} deleted` };
  }
}
