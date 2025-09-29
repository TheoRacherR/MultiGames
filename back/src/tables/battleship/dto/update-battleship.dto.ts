import { PartialType } from '@nestjs/mapped-types';
import { CreateBattleshipDto } from './create-battleship.dto';
import { IsInt, IsOptional } from 'class-validator';
import { User } from 'src/tables/user/entities/user.entity';

export class UpdateBattleshipDto extends PartialType(CreateBattleshipDto) {
  @IsOptional()
  @IsInt()
  final_score?: number;

  @IsOptional()
  winner?: User;

  @IsOptional()
  looser?: User;
}
