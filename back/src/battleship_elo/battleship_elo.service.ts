import { Injectable } from '@nestjs/common';
import { CreateBattleshipEloDto } from './dto/create-battleship_elo.dto';
import { UpdateBattleshipEloDto } from './dto/update-battleship_elo.dto';

@Injectable()
export class BattleshipEloService {
  create(createBattleshipEloDto: CreateBattleshipEloDto) {
    return 'This action adds a new battleshipElo';
  }

  findAll() {
    return `This action returns all battleshipElo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} battleshipElo`;
  }

  update(id: number, updateBattleshipEloDto: UpdateBattleshipEloDto) {
    return `This action updates a #${id} battleshipElo`;
  }

  remove(id: number) {
    return `This action removes a #${id} battleshipElo`;
  }
}
