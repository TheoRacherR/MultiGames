import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { levels } from '../entities/minesweeper.entity';
import { User } from 'src/tables/user/entities/user.entity';

export class CreateMinesweeperDto {
  @IsNotEmpty()
  @IsBoolean()
  score: number;

  @IsNotEmpty()
  @IsBoolean()
  won: boolean;

  @IsNotEmpty()
  @IsEnum(levels)
  level: levels;

  @IsNotEmpty()
  player: User;
}
