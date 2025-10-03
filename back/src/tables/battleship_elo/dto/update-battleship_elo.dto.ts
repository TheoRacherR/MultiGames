import { PartialType } from '@nestjs/mapped-types';
import { CreateBattleshipEloDto } from './create-battleship_elo.dto';
import { IsInt, IsOptional } from 'class-validator';
import { User } from 'src/tables/user/entities/user.entity';

export class UpdateBattleshipEloDto extends PartialType(
  CreateBattleshipEloDto,
) {
  @IsOptional()
  @IsInt()
  score: number;

  @IsOptional()
  user: User;
}
