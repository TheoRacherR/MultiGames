import { Module } from '@nestjs/common';
import { AtlasService } from './atlas.service';
import { AtlasController } from './atlas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atlas } from './entities/atlas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atlas])],
  controllers: [AtlasController],
  providers: [AtlasService],
})
export class AtlasModule {}
