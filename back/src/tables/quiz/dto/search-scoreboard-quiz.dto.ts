import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { typeQuizEnum } from 'src/@types/tables/quiz';

export class SearchScoreboardQuizDto {
  @IsNotEmpty()
  @IsEnum(typeQuizEnum)
  type: typeQuizEnum;

  @IsNotEmpty()
  @IsInt()
  length: number;
}
