import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { CreateWordleDayDto } from './create-wordle_day.dto';
import { PartialType } from '@nestjs/mapped-types';
import { maxLengthWord, minLengthWord } from '../../../utils/Wordle';

export class UpdateWordleDayDto extends PartialType(CreateWordleDayDto) {
  @IsOptional()
  @IsString()
  @MinLength(minLengthWord)
  @MaxLength(maxLengthWord)
  @NotContains(' ')
  word?: string;

  @IsOptional()
  @IsDateString()
  targetDay?: Date;
}
