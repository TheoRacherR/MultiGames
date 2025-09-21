import { PartialType } from '@nestjs/mapped-types';
import { CreateMinesweeperDto } from './create-minesweeper.dto';

export class UpdateMinesweeperDto extends PartialType(CreateMinesweeperDto) {}
