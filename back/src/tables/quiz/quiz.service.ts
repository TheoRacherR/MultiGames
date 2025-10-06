import { QuizEntity } from './../../@types/tables/quiz';
import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
// import { typeQuizEnum } from 'src/@types/tables/quiz';
import { SearchScoreboardQuizDto } from './dto/search-scoreboard-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<{ message: string }> {
    await this.quizRepository.insert({ ...createQuizDto });
    return { message: 'Quiz created' };
  }

  async findAll() {
    const req = await this.quizRepository.find();
    return req;
  }

  async findBestScoreByType(searchScoreboardQuizDto: SearchScoreboardQuizDto) {
    const quizFound = await this.quizRepository.find({
      where: { type: searchScoreboardQuizDto.type },
    });
    return quizFound
      .filter((qf) => qf.scoreFound === qf.scoreTotal)
      .sort((a: QuizEntity, b: QuizEntity) => a.timerFinished - b.timerFinished)
      .slice(0, searchScoreboardQuizDto.length);
  }

  async findOne(id: string): Promise<Quiz | null> {
    return await this.quizRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.quizRepository.delete(id);
    return { message: `Quiz ${id} deleted` };
  }
}
