import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class SearchScoreboardAtlasDto {
  @IsNotEmpty()
  @IsInt()
  length: number;
}
