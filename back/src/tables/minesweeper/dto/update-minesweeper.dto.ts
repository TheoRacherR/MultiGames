import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMinesweeperDto } from './create-minesweeper.dto';
import { levels } from 'src/@types/tables/minesweeper';

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
