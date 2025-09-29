import { Injectable } from '@nestjs/common';
import { CreateBattleshipEloDto } from './dto/create-battleship_elo.dto';
import { UpdateBattleshipEloDto } from './dto/update-battleship_elo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleshipElo } from './entities/battleship_elo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BattleshipEloService {
  constructor(
    @InjectRepository(BattleshipElo)
    private battleshipEloRepository: Repository<BattleshipElo>,
  ) {}

  async create(createBattleshipEloDto: CreateBattleshipEloDto) {
    await this.battleshipEloRepository.insert({
      ...createBattleshipEloDto,
    });
    return { message: `BattleshipElo created` };
  }

  async findAll() {
    return await this.battleshipEloRepository.find();
  }

  async findOne(id: string): Promise<BattleshipElo | null> {
    return await this.battleshipEloRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBattleshipEloDto: UpdateBattleshipEloDto) {
    await this.battleshipEloRepository.update(id, updateBattleshipEloDto);
    return { message: `BattleshipElo ${id} updated` };
  }

  async remove(id: string) {
    await this.battleshipEloRepository.delete(id);
    return { message: `BattleshipElo ${id} deleted` };
  }
}
