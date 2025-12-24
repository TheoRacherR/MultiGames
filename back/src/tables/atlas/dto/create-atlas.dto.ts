import { IsNotEmpty, IsInt } from 'class-validator';
import { User } from '../../../tables/user/entities/user.entity';

export class CreateAtlasDto {
  @IsNotEmpty()
  @IsInt()
  score: number;

  @IsNotEmpty()
  player: User;
}
