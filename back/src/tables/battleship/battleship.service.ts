import { Injectable } from '@nestjs/common';
import { CreateBattleshipDto } from './dto/create-battleship.dto';
import { UpdateBattleshipDto } from './dto/update-battleship.dto';
import { Battleship } from './entities/battleship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BattleshipService {
  constructor(
    @InjectRepository(Battleship)
    private battleshipRepository: Repository<Battleship>,
  ) {}

  async create(createBattleshipDto: CreateBattleshipDto) {
    await this.battleshipRepository.insert({
      ...createBattleshipDto,
    });
    return { message: `Battleship created` };
  }

  async findAll() {
    return await this.battleshipRepository.find();
  }

  async findOne(id: string): Promise<Battleship | null> {
    return await this.battleshipRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBattleshipDto: UpdateBattleshipDto) {
    await this.battleshipRepository.update(id, updateBattleshipDto);
    return { message: `Battleship ${id} updated` };
  }

  async remove(id: string) {
    await this.battleshipRepository.delete(id);
    return { message: `Battleship ${id} deleted` };
  }
}
