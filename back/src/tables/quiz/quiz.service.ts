import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

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
    return await this.quizRepository.find();
  }

  async findOne(id: string): Promise<Quiz | null> {
    return await this.quizRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.quizRepository.delete(id);
    return { message: `Quiz ${id} deleted` };
  }
}
