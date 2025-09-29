import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { levels } from '../entities/minesweeper.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMinesweeperDto } from './create-minesweeper.dto';

export class UpdateMinesweeperDto extends PartialType(CreateMinesweeperDto) {
  @IsOptional()
  @IsBoolean()
  score?: number;

  @IsOptional()
  @IsBoolean()
  won?: boolean;

  @IsOptional()
  @IsEnum(levels)
  level?: levels;
}
