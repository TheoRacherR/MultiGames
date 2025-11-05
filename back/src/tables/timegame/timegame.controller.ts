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
import { TimeGameService } from './timegame.service';
import { CreateTimeGameDto } from './dto/create-timegame.dto';
import { TimeGame } from './entities/timegame.entity';

@Controller('timegame')
export class TimeGameController {
  constructor(private readonly timegameService: TimeGameService) {}

  @Post()
  async create(
    @Body() createTimeGameDto: CreateTimeGameDto,
  ): Promise<{ message: string }> {
    return await this.timegameService.create(createTimeGameDto);
  }

  @Get()
  async findAll(): Promise<TimeGame[]> {
    return await this.timegameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimeGame | null> {
    const timegame = await this.timegameService.findOne(id);
    if (timegame) return timegame;
    else
      throw new HttpException(`TimeGame ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const timegameToEloFound = await this.timegameService.findOne(id);
    if (!timegameToEloFound)
      throw new HttpException(`TimeGame ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.timegameService.remove(id);
  }
}
