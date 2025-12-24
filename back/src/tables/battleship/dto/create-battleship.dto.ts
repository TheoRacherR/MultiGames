import { IsInt, IsNotEmpty } from 'class-validator';
import { User } from '../../../tables/user/entities/user.entity';

export class CreateBattleshipDto {
  @IsNotEmpty()
  @IsInt()
  final_score: number;

  @IsNotEmpty()
  winner: User;

  @IsNotEmpty()
  looser: User;
}
