import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from '../../../tables/user/entities/user.entity';
import { WordleDay } from '../../../tables/wordle_day/entities/wordle_day.entity';

export class CreateWordleDto {
  @IsNotEmpty()
  nbTry: number;

  @IsNotEmpty()
  @IsBoolean()
  won: boolean;

  @IsNotEmpty()
  player: User;

  @IsNotEmpty()
  word: WordleDay;
}
