import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { levels } from 'src/@types/tables/minesweeper';
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
