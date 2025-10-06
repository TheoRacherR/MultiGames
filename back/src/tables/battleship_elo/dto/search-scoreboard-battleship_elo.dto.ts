import { IsInt, IsNotEmpty } from 'class-validator';

export class SearchScoreboardBattleshipEloDto {
  @IsNotEmpty()
  @IsInt()
  length: number;
}
