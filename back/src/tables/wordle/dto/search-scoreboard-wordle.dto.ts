import { IsInt, IsNotEmpty } from 'class-validator';

export class SearchScoreboardWordleDto {
  @IsNotEmpty()
  @IsInt()
  length: number;
}
