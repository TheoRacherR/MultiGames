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

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto): Promise<{ message: string }> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Quiz | null> {
    const battleship = await this.quizService.findOne(id);
    if (battleship) return battleship;
    else throw new HttpException(`Quiz ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const battleshipToEloFound = await this.quizService.findOne(id);
    if (!battleshipToEloFound)
      throw new HttpException(`Quiz ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.quizService.remove(id);
  }
}
