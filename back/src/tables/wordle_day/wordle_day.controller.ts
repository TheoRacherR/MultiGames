import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Patch,
} from '@nestjs/common';
import { WordleDayService } from './wordle_day.service';
import { CreateWordleDayDto } from './dto/create-wordle_day.dto';
import { WordleDay } from './entities/wordle_day.entity';
import { UpdateWordleDayDto } from './dto/update-wordle_day.dto';

@Controller('wordle-day')
export class WordleDayController {
  constructor(private readonly wordleDayService: WordleDayService) {}

  @Post()
  async create(
    @Body() createWordleDayDto: CreateWordleDayDto,
  ): Promise<{ message: string }> {
    const searchWordleDay = await this.wordleDayService.findOneByTargetDate(
      createWordleDayDto.targetDay,
    );
    if (searchWordleDay.length > 0)
      throw new HttpException(
        `Target day ${new Date(createWordleDayDto.targetDay)} already exists`,
        HttpStatus.CONFLICT,
      );
    const wordleDayCreated =
      await this.wordleDayService.create(createWordleDayDto);
    return wordleDayCreated;
  }

  @Get('/:date')
  async findOneByTargetDate(
    @Param('date') date: Date,
  ): Promise<WordleDay | null> {
    const wordleDay = await this.wordleDayService.findOneByTargetDate(date);
    if (wordleDay.length > 0) return wordleDay[0];
    else
      throw new HttpException(
        `Wordle day ${date} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWordleDayDto: UpdateWordleDayDto,
  ): Promise<{ message: string }> {
    if (updateWordleDayDto.targetDay) {
      const searchWordleDay = await this.wordleDayService.findOneByTargetDate(
        updateWordleDayDto.targetDay,
      );
      if (searchWordleDay.length > 0)
        throw new HttpException(
          `Target day ${new Date(updateWordleDayDto.targetDay)} already exists`,
          HttpStatus.CONFLICT,
        );
    }
    const wordleDayUpdate = await this.wordleDayService.update(
      id,
      updateWordleDayDto,
    );
    return wordleDayUpdate;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const wordleDayToFound = await this.wordleDayService.findOne(id);
    if (!wordleDayToFound)
      throw new HttpException(
        `Wordle day ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.wordleDayService.remove(id);
  }
}
