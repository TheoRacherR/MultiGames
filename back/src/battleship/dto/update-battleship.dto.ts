import { PartialType } from '@nestjs/mapped-types';
import { CreateBattleshipDto } from './create-battleship.dto';

export class UpdateBattleshipDto extends PartialType(CreateBattleshipDto) {}
