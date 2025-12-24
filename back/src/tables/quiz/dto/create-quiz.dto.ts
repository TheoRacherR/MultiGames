import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { typeQuizEnum } from '../../../@types/tables/quiz';
import { User } from '../../../tables/user/entities/user.entity';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsInt()
  scoreFound: number;

  @IsNotEmpty()
  @IsInt()
  scoreTotal: number;

  @IsNotEmpty()
  timerFinished: number;

  @IsNotEmpty()
  @IsEnum(typeQuizEnum)
  type: typeQuizEnum;

  @IsNotEmpty()
  player: User;
}
