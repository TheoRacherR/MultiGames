import { IsInt, IsNotEmpty } from 'class-validator';

export class SearchScoreboardTimeLineDto {
  @IsNotEmpty()
  @IsInt()
  length: number;
}
