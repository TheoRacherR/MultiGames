import { Injectable } from '@nestjs/common';
import { CreateMinesweeperDto } from './dto/create-minesweeper.dto';
import { UpdateMinesweeperDto } from './dto/update-minesweeper.dto';

@Injectable()
export class MinesweeperService {
  create(createMinesweeperDto: CreateMinesweeperDto) {
    return 'This action adds a new minesweeper';
  }

  findAll() {
    return `This action returns all minesweeper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} minesweeper`;
  }

  update(id: number, updateMinesweeperDto: UpdateMinesweeperDto) {
    return `This action updates a #${id} minesweeper`;
  }

  remove(id: number) {
    return `This action removes a #${id} minesweeper`;
  }
}
