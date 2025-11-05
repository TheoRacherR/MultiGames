import { Module } from '@nestjs/common';
import { TimeGameService } from './timegame.service';
import { TimeGameController } from './timegame.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeGame } from './entities/timegame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeGame])],
  controllers: [TimeGameController],
  providers: [TimeGameService],
})
export class TimeGameModule {}
