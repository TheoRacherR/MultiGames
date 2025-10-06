import { Module } from '@nestjs/common';
import { WordleService } from './wordle.service';
import { WordleController } from './wordle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wordle } from './entities/wordle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wordle])],
  controllers: [WordleController],
  providers: [WordleService],
})
export class WordleModule {}
