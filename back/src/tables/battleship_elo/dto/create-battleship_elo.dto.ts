import { IsInt, IsNotEmpty } from 'class-validator';
import { User } from '../../../tables/user/entities/user.entity';

export class CreateBattleshipEloDto {
  @IsNotEmpty()
  @IsInt()
  score: number;

  @IsNotEmpty()
  user: User;
}
