import { PartialType } from '@nestjs/mapped-types';
import { CreateBattleshipEloDto } from './create-battleship_elo.dto';

export class UpdateBattleshipEloDto extends PartialType(CreateBattleshipEloDto) {}
