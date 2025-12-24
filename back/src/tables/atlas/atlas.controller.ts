import { FormatedScoreboard } from '../../@types/tables/games';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AtlasService } from './atlas.service';
import { CreateAtlasDto } from './dto/create-atlas.dto';
import { Atlas } from './entities/atlas.entity';
import { SearchScoreboardAtlasDto } from './dto/search-scoreboard-atlas.dto';

@Controller('atlas')
export class AtlasController {
  constructor(private readonly atlasService: AtlasService) {}

  @Post()
  async create(
    @Body() createAtlasDto: CreateAtlasDto,
  ): Promise<{ message: string }> {
    return await this.atlasService.create(createAtlasDto);
  }

  @Get()
  async findAll(): Promise<Atlas[]> {
    return await this.atlasService.findAll();
  }

  @Get('/user/:userID')
  async findAllByPlayer(
    @Param('userID') userID: string,
  ): Promise<FormatedScoreboard[]> {
    const atlasFound = await this.atlasService.findAllByPlayer(userID);
    const atlasFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < atlasFound.length; index++) {
      atlasFormated.push({
        user: {
          id: atlasFound[index].player.id,
          pseudo: atlasFound[index].player.pseudo,
          country: atlasFound[index].player.country,
        },
        score: atlasFound[index].score.toString(),
      });
    }
    return atlasFormated;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Atlas | null> {
    const atlas = await this.atlasService.findOne(id);
    if (atlas) return atlas;
    else throw new HttpException(`Atlas ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Post('/scoreboard')
  async findTopScoreboard(
    @Body() searchScoreBoardAtlas: SearchScoreboardAtlasDto,
  ): Promise<FormatedScoreboard[]> {
    const atlasFound = await this.atlasService.findBestScoreByType(
      searchScoreBoardAtlas,
    );
    const atlasFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < atlasFound.length; index++) {
      atlasFormated.push({
        user: {
          id: atlasFound[index].player.id,
          pseudo: atlasFound[index].player.pseudo,
          country: atlasFound[index].player.country,
        },
        score: atlasFound[index].score.toString(),
      });
    }
    return atlasFormated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const atlasToFound = await this.atlasService.findOne(id);
    if (!atlasToFound)
      throw new HttpException(`Atlas ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.atlasService.remove(id);
  }
}
