import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { maxLengthWord, minLengthWord } from 'src/utils/Wordle';

export class CreateWordleDayDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(minLengthWord)
  @MaxLength(maxLengthWord)
  @NotContains(' ')
  word: string;

  @IsNotEmpty()
  @IsDateString()
  targetDay: Date;
}
