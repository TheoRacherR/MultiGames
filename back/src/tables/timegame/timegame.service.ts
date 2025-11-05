import { Injectable } from '@nestjs/common';
import { CreateTimeGameDto } from './dto/create-timegame.dto';
import { TimeGame } from './entities/timegame.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimeGameService {
  constructor(
    @InjectRepository(TimeGame)
    private timeGameRepository: Repository<TimeGame>,
  ) {}

  async create(createTimeGameDto: CreateTimeGameDto): Promise<{
    message: string;
  }> {
    await this.timeGameRepository.insert({
      ...createTimeGameDto,
    });
    return { message: `TimeGame created` };
  }

  async findAll(): Promise<TimeGame[]> {
    return await this.timeGameRepository.find();
  }

  async findOne(id: string): Promise<TimeGame | null> {
    return await this.timeGameRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.timeGameRepository.delete(id);
    return { message: `TimeGame ${id} deleted` };
  }
}
