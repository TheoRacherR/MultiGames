import { IsInt, IsNotEmpty } from 'class-validator';
import { User } from 'src/tables/user/entities/user.entity';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsInt()
  scoreFound: number;

  @IsNotEmpty()
  @IsInt()
  scoreTotal: number;

  @IsNotEmpty()
  player: User;
}
