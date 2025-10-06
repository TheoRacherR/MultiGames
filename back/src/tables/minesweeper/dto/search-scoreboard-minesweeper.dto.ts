import { IsInt, IsNotEmpty } from 'class-validator';

export class SearchScoreboardMinesweeperDto {
  @IsNotEmpty()
  @IsInt()
  length: number;
}
