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
import { FormatedScoreboard } from 'src/@types/tables/games';
import { WordleFormatedToday } from 'src/@types/tables/wordle';

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

  @Get('/user/:userID')
  async findAllByPlayer(
    @Param('userID') userID: string,
  ): Promise<FormatedScoreboard[]> {
    const wordleFound = await this.wordleService.findAllByPlayer(userID);
    const wordleFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < wordleFound.length; index++) {
      wordleFormated.push({
        user: {
          id: wordleFound[index].player.id,
          pseudo: wordleFound[index].player.pseudo,
          country: wordleFound[index].player.country,
        },
        score:
          wordleFound[index].nbTry > 1
            ? `${wordleFound[index].nbTry} tries`
            : `${wordleFound[index].nbTry} try`,
      });
    }
    return wordleFormated;
  }

  @Get('/today/:userID/:wordleDayID')
  async findTodayByPlayer(
    @Param('userID') userID: string,
    @Param('wordleDayID') wordleDayID: string,
  ): Promise<WordleFormatedToday | null> {
    const wordle = await this.wordleService.findTodayByPlayer(
      userID,
      wordleDayID,
    );
    if (wordle) return wordle;
    else
      throw new HttpException(
        `Today's Wordle for user ${userID} not found`,
        HttpStatus.NOT_FOUND,
      );
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
  ): Promise<FormatedScoreboard[]> {
    const wordleFound = await this.wordleService.findBestScoreByType(
      searchScoreboardWordleDto,
    );
    const wordleFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < wordleFound.length; index++) {
      wordleFormated.push({
        user: {
          id: wordleFound[index].player.id,
          pseudo: wordleFound[index].player.pseudo,
          country: wordleFound[index].player.country,
        },
        score:
          wordleFound[index].nbTry > 1
            ? `${wordleFound[index].nbTry} tries`
            : `${wordleFound[index].nbTry} try`,
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
