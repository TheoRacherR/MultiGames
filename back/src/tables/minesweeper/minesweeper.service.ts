import { Injectable } from '@nestjs/common';
import { CreateMinesweeperDto } from './dto/create-minesweeper.dto';
import { UpdateMinesweeperDto } from './dto/update-minesweeper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Minesweeper } from './entities/minesweeper.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MinesweeperService {
  constructor(
    @InjectRepository(Minesweeper)
    private minesweeperRepository: Repository<Minesweeper>,
  ) {}

  async create(createMinesweeperDto: CreateMinesweeperDto) {
    await this.minesweeperRepository.insert({
      ...createMinesweeperDto,
    });
    return { message: `Minesweeper created` };
  }

  async findAll() {
    return await this.minesweeperRepository.find();
  }

  async findOne(id: string): Promise<Minesweeper | null> {
    return await this.minesweeperRepository.findOne({ where: { id } });
  }

  async update(id: string, updateMinesweeperDto: UpdateMinesweeperDto) {
    await this.minesweeperRepository.update(id, updateMinesweeperDto);
    return { message: `Minesweeper ${id} updated` };
  }

  async remove(id: string) {
    await this.minesweeperRepository.delete(id);
    return { message: `Minesweeper ${id} deleted` };
  }
}
