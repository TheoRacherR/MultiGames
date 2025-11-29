import { Module } from '@nestjs/common';
import { TimeLineService } from './timeline.service';
import { TimeLineController } from './timeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeLine } from './entities/timeline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeLine])],
  controllers: [TimeLineController],
  providers: [TimeLineService],
})
export class TimeLineModule {}
