import { Injectable } from '@nestjs/common';
import { CreateBattleshipDto } from './dto/create-battleship.dto';
import { UpdateBattleshipDto } from './dto/update-battleship.dto';

@Injectable()
export class BattleshipService {
  create(createBattleshipDto: CreateBattleshipDto) {
    return 'This action adds a new battleship';
  }

  findAll() {
    return `This action returns all battleship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} battleship`;
  }

  update(id: number, updateBattleshipDto: UpdateBattleshipDto) {
    return `This action updates a #${id} battleship`;
  }

  remove(id: number) {
    return `This action removes a #${id} battleship`;
  }
}
