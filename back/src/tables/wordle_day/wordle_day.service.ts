import { Injectable } from '@nestjs/common';
import { CreateWordleDayDto } from './dto/create-wordle_day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WordleDay } from './entities/wordle_day.entity';
import { Equal, Repository } from 'typeorm';
import { UpdateWordleDayDto } from './dto/update-wordle_day.dto';

@Injectable()
export class WordleDayService {
  constructor(
    @InjectRepository(WordleDay)
    private wordleDayRepository: Repository<WordleDay>,
  ) {}

  async create(
    createWordleDayDto: CreateWordleDayDto,
  ): Promise<{ message: string }> {
    await this.wordleDayRepository.insert({ ...createWordleDayDto });
    return { message: 'Wordle Day created' };
  }

  async findOne(id: string): Promise<WordleDay | null> {
    return await this.wordleDayRepository.findOne({ where: { id } });
  }

  async findOneByTargetDate(date: Date): Promise<WordleDay[]> {
    const dateFormated = new Date(date);
    return await this.wordleDayRepository.find({
      where: {
        targetDay: Equal(
          new Date(
            dateFormated.getFullYear(),
            dateFormated.getMonth(),
            dateFormated.getDate(),
          ),
        ),
      },
    });
  }

  async update(
    id: string,
    updateWordleDayDto: UpdateWordleDayDto,
  ): Promise<{ message: string }> {
    await this.wordleDayRepository.update(id, updateWordleDayDto);
    return { message: `User ${id} updated` };
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.wordleDayRepository.delete(id);
    return { message: `Wordle Day ${id} deleted` };
  }
}
