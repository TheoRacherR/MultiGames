import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { typeQuizEnum } from 'src/@types/tables/quiz';
import { User } from 'src/tables/user/entities/user.entity';

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
