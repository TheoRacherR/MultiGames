import { Injectable } from '@nestjs/common';
import { CreateTimeLineDto } from './dto/create-timeline.dto';
import { TimeLine } from './entities/timeline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchScoreboardTimeLineDto } from './dto/search-scoreboard-timeline.dto';

@Injectable()
export class TimeLineService {
  constructor(
    @InjectRepository(TimeLine)
    private timeLineRepository: Repository<TimeLine>,
  ) {}

  async create(createTimeLineDto: CreateTimeLineDto): Promise<{
    message: string;
  }> {
    await this.timeLineRepository.insert({
      ...createTimeLineDto,
    });
    return { message: `TimeLine created` };
  }

  async findAll(): Promise<TimeLine[]> {
    return await this.timeLineRepository.find();
  }

  async findBestScoreByType(
    searchScoreboardTimeLineDto: SearchScoreboardTimeLineDto,
  ): Promise<TimeLine[]> {
    const timeLineFound = await this.timeLineRepository.find();
    return timeLineFound
      .sort((a: TimeLine, b: TimeLine) => a.score - b.score)
      .slice(0, searchScoreboardTimeLineDto.length);
  }

  async findOne(id: string): Promise<TimeLine | null> {
    return await this.timeLineRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.timeLineRepository.delete(id);
    return { message: `TimeLine ${id} deleted` };
  }
}
