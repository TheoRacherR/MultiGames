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
import { BattleshipEloService } from './battleship_elo.service';
import { CreateBattleshipEloDto } from './dto/create-battleship_elo.dto';
import { BattleshipElo } from './entities/battleship_elo.entity';
import { SearchScoreboardBattleshipEloDto } from './dto/search-scoreboard-battleship_elo.dto';
import { FormatedScoreboard } from 'src/@types/tables/games';

@Controller('battleship-elo')
export class BattleshipEloController {
  constructor(private readonly battleshipEloService: BattleshipEloService) {}

  @Post()
  async create(
    @Body() createBattleshipEloDto: CreateBattleshipEloDto,
  ): Promise<{ message: string }> {
    return await this.battleshipEloService.create(createBattleshipEloDto);
  }

  @Get()
  async findAll(): Promise<BattleshipElo[]> {
    return await this.battleshipEloService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BattleshipElo | null> {
    const battleshipElo = await this.battleshipEloService.findOne(id);
    if (battleshipElo) return battleshipElo;
    else
      throw new HttpException(
        `Battleship Elo ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Post('/scoreboard')
  async findTopScoreboard(
    @Body() searchScoreboardBattleshipEloDto: SearchScoreboardBattleshipEloDto,
  ): Promise<FormatedScoreboard[]> {
    const battleshipEloFound =
      await this.battleshipEloService.findBestScoreByType(
        searchScoreboardBattleshipEloDto,
      );
    const battleshipEloFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < battleshipEloFound.length; index++) {
      battleshipEloFormated.push({
        user: {
          id: battleshipEloFound[index].user.id,
          pseudo: battleshipEloFound[index].user.pseudo,
          country: battleshipEloFound[index].user.country,
        },
        score: `${battleshipEloFound[index].score} elo`,
      });
    }
    return battleshipEloFormated;
  }

  @Get('/user/:userID')
  async findAllByPlayer(
    @Param('userID') userID: string,
  ): Promise<FormatedScoreboard[]> {
    const battleshipEloFound =
      await this.battleshipEloService.findAllByPlayer(userID);
    const battleshipEloFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < battleshipEloFound.length; index++) {
      battleshipEloFormated.push({
        user: {
          id: battleshipEloFound[index].user.id,
          pseudo: battleshipEloFound[index].user.pseudo,
          country: battleshipEloFound[index].user.country,
        },
        score: `${battleshipEloFound[index].score} elo`,
      });
    }
    return battleshipEloFormated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const battleshipToEloFound = await this.battleshipEloService.findOne(id);
    if (!battleshipToEloFound)
      throw new HttpException(
        `Battleship Elo ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.battleshipEloService.remove(id);
  }
}
