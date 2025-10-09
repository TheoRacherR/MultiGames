import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { SearchScoreboardQuizDto } from './dto/search-scoreboard-quiz.dto';
import { FormatedScoreboard } from 'src/@types/tables/games';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(
    @Body() createQuizDto: CreateQuizDto,
  ): Promise<{ message: string }> {
    return await this.quizService.create(createQuizDto);
  }

  @Get()
  async findAll(): Promise<Quiz[]> {
    return await this.quizService.findAll();
  }

  @Get('/user/:userID')
  async findAllByPlayer(
    @Param('userID') userID: string,
  ): Promise<FormatedScoreboard[]> {
    const quizFound = await this.quizService.findAllByPlayer(userID);
    const quizFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < quizFound.length; index++) {
      quizFormated.push({
        user: {
          id: quizFound[index].player.id,
          pseudo: quizFound[index].player.pseudo,
          country: quizFound[index].player.country,
        },
        score: `${Math.trunc(quizFound[index].timerFinished / 60)}m ${quizFound[index].timerFinished % 60}s`,
      });
    }
    return quizFormated;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Quiz | null> {
    const battleship = await this.quizService.findOne(id);
    if (battleship) return battleship;
    else throw new HttpException(`Quiz ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Post('/scoreboard')
  async findTopScoreboard(
    @Body() searchScoreboardQuizDto: SearchScoreboardQuizDto,
  ): Promise<FormatedScoreboard[]> {
    const quizFound = await this.quizService.findBestScoreByType(
      searchScoreboardQuizDto,
    );
    const quizFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < quizFound.length; index++) {
      quizFormated.push({
        user: {
          id: quizFound[index].player.id,
          pseudo: quizFound[index].player.pseudo,
          country: quizFound[index].player.country,
        },
        score: `${Math.trunc(quizFound[index].timerFinished / 60)}m ${quizFound[index].timerFinished % 60}s`,
      });
    }
    return quizFormated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const battleshipToEloFound = await this.quizService.findOne(id);
    if (!battleshipToEloFound)
      throw new HttpException(`Quiz ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.quizService.remove(id);
  }
}
