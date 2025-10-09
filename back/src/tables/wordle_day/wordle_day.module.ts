import { Module } from '@nestjs/common';
import { WordleDayService } from './wordle_day.service';
import { WordleDayController } from './wordle_day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordleDay } from './entities/wordle_day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordleDay])],
  controllers: [WordleDayController],
  providers: [WordleDayService],
})
export class WordleDayModule {}
