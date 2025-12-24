import { Injectable } from '@nestjs/common';
import { CreateAtlasDto } from './dto/create-atlas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Atlas } from './entities/atlas.entity';
import { Repository } from 'typeorm';
import { SearchScoreboardAtlasDto } from './dto/search-scoreboard-atlas.dto';

@Injectable()
export class AtlasService {
  constructor(
    @InjectRepository(Atlas)
    private atlasRepository: Repository<Atlas>,
  ) {}

  async create(createAtlasDto: CreateAtlasDto): Promise<{ message: string }> {
    await this.atlasRepository.insert({ ...createAtlasDto });
    return { message: 'Atlas created' };
  }

  async findAll(): Promise<Atlas[]> {
    return await this.atlasRepository.find();
  }

  async findBestScoreByType(
    searchScoreboardAtlasDto: SearchScoreboardAtlasDto,
  ): Promise<Atlas[]> {
    const atlasFound = await this.atlasRepository.find();
    return atlasFound
      .sort((a: Atlas, b: Atlas) => a.score - b.score)
      .slice(0, searchScoreboardAtlasDto.length);
  }

  async findOne(id: string): Promise<Atlas | null> {
    return await this.atlasRepository.findOne({ where: { id } });
  }

  async findAllByPlayer(userID: string): Promise<Atlas[]> {
    const atlasFound = await this.atlasRepository.find({
      where: { player: { id: userID } },
    });
    return atlasFound.sort(
      (a: Atlas, b: Atlas) => b.created_at.getTime() - a.created_at.getTime(),
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.atlasRepository.delete(id);
    return { message: `Atlas ${id} deleted` };
  }
}
