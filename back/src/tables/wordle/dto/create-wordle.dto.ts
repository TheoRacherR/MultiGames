import { IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from 'src/tables/user/entities/user.entity';

export class CreateWordleDto {
  @IsNotEmpty()
  nbTry: number;

  @IsNotEmpty()
  @IsBoolean()
  won: boolean;

  @IsNotEmpty()
  player: User;
}
