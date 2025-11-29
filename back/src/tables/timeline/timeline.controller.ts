import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TimeLineService } from './timeline.service';
import { CreateTimeLineDto } from './dto/create-timeline.dto';
import { TimeLine } from './entities/timeline.entity';
import { SearchScoreboardTimeLineDto } from './dto/search-scoreboard-timeline.dto';
import { FormatedScoreboard } from 'src/@types/tables/games';

@Controller('timeline')
export class TimeLineController {
  constructor(private readonly timelineService: TimeLineService) {}

  @Post()
  async create(
    @Body() createTimeLineDto: CreateTimeLineDto,
  ): Promise<{ message: string }> {
    return await this.timelineService.create(createTimeLineDto);
  }

  @Get()
  async findAll(): Promise<TimeLine[]> {
    return await this.timelineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimeLine | null> {
    const timeline = await this.timelineService.findOne(id);
    if (timeline) return timeline;
    else
      throw new HttpException(`TimeLine ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Post('/scoreboard')
  async findTopScoreboard(
    @Body() searchScoreboardTimeLineDto: SearchScoreboardTimeLineDto,
  ): Promise<FormatedScoreboard[]> {
    const timeLineFound = await this.timelineService.findBestScoreByType(
      searchScoreboardTimeLineDto,
    );
    const timeLineFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < timeLineFound.length; index++) {
      timeLineFormated.push({
        user: {
          id: timeLineFound[index].player.id,
          pseudo: timeLineFound[index].player.pseudo,
          country: timeLineFound[index].player.country,
        },
        score: `${timeLineFound[index].score}`,
      });
    }
    return timeLineFormated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const timelineToEloFound = await this.timelineService.findOne(id);
    if (!timelineToEloFound)
      throw new HttpException(`TimeLine ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.timelineService.remove(id);
  }
}
