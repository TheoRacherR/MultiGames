import { Injectable } from '@nestjs/common';
import { CreateBattleshipDto } from './dto/create-battleship.dto';
import { Battleship } from './entities/battleship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BattleshipService {
  constructor(
    @InjectRepository(Battleship)
    private battleshipRepository: Repository<Battleship>,
  ) {}

  async create(createBattleshipDto: CreateBattleshipDto): Promise<{
    message: string;
  }> {
    await this.battleshipRepository.insert({
      ...createBattleshipDto,
    });
    return { message: `Battleship created` };
  }

  async findAll(): Promise<Battleship[]> {
    return await this.battleshipRepository.find();
  }

  async findOne(id: string): Promise<Battleship | null> {
    return await this.battleshipRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.battleshipRepository.delete(id);
    return { message: `Battleship ${id} deleted` };
  }
}
