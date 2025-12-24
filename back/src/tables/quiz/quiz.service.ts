import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
// import { typeQuizEnum } from '../../@types/tables/quiz';
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

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async findBestScoreByType(
    searchScoreboardQuizDto: SearchScoreboardQuizDto,
  ): Promise<Quiz[]> {
    const quizFound = await this.quizRepository.find({
      where: { type: searchScoreboardQuizDto.type },
    });
    return quizFound
      .filter((qf) => qf.scoreFound === qf.scoreTotal)
      .sort((a: Quiz, b: Quiz) => a.timerFinished - b.timerFinished)
      .slice(0, searchScoreboardQuizDto.length);
  }

  async findOne(id: string): Promise<Quiz | null> {
    return await this.quizRepository.findOne({ where: { id } });
  }

  async findAllByPlayer(userID: string): Promise<Quiz[]> {
    const quizFound = await this.quizRepository.find({
      where: { player: { id: userID } },
    });
    return quizFound.sort(
      (a: Quiz, b: Quiz) => b.created_at.getTime() - a.created_at.getTime(),
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.quizRepository.delete(id);
    return { message: `Quiz ${id} deleted` };
  }
}
