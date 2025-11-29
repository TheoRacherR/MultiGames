import { IsInt, IsNotEmpty } from 'class-validator';
import { User } from 'src/tables/user/entities/user.entity';

export class CreateTimeLineDto {
  @IsNotEmpty()
  @IsInt()
  score: number;

  @IsNotEmpty()
  player: User;
}
