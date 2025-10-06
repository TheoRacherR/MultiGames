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
import { WordleService } from './wordle.service';
import { CreateWordleDto } from './dto/create-wordle.dto';
import { Wordle } from './entities/wordle.entity';
import { SearchScoreboardWordleDto } from './dto/search-scoreboard-wordle.dto';
import { WordleFormatedScoreboard } from 'src/@types/tables/wordle';

@Controller('wordle')
export class WordleController {
  constructor(private readonly wordleService: WordleService) {}

  @Post()
  async create(
    @Body() createWordleDto: CreateWordleDto,
  ): Promise<{ message: string }> {
    return await this.wordleService.create(createWordleDto);
  }

  @Get()
  async findAll(): Promise<Wordle[]> {
    return await this.wordleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wordle | null> {
    const wordle = await this.wordleService.findOne(id);
    if (wordle) return wordle;
    else
      throw new HttpException(`Wordle ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Post('/scoreboard')
  async findTopScoreboard(
    @Body() searchScoreboardWordleDto: SearchScoreboardWordleDto,
  ): Promise<WordleFormatedScoreboard[]> {
    const wordleFound = await this.wordleService.findBestScoreByType(
      searchScoreboardWordleDto,
    );
    const wordleFormated: WordleFormatedScoreboard[] = [];
    for (let index = 0; index < wordleFound.length; index++) {
      wordleFormated.push({
        user: {
          id: wordleFound[index].player.id,
          pseudo: wordleFound[index].player.pseudo,
          country: wordleFound[index].player.country,
        },
        score: wordleFound[index].nbTry,
      });
    }
    return wordleFormated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const wordleToEloFound = await this.wordleService.findOne(id);
    if (!wordleToEloFound)
      throw new HttpException(`Wordle ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.wordleService.remove(id);
  }
}
