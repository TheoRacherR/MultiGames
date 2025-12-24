import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { levels } from '../../../@types/tables/minesweeper';
import { User } from '../../../tables/user/entities/user.entity';

export class CreateMinesweeperDto {
  @IsNotEmpty()
  @IsInt()
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
