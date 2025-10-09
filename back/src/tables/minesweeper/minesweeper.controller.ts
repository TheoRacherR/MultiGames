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
import { MinesweeperService } from './minesweeper.service';
import { CreateMinesweeperDto } from './dto/create-minesweeper.dto';
import { Minesweeper } from './entities/minesweeper.entity';
import { SearchScoreboardMinesweeperDto } from './dto/search-scoreboard-minesweeper.dto';
import { FormatedScoreboard } from 'src/@types/tables/games';

@Controller('minesweeper')
export class MinesweeperController {
  constructor(private readonly minesweeperService: MinesweeperService) {}

  @Post()
  async create(
    @Body() createMinesweeperDto: CreateMinesweeperDto,
  ): Promise<{ message: string }> {
    return await this.minesweeperService.create(createMinesweeperDto);
  }

  @Get()
  async findAll(): Promise<Minesweeper[]> {
    return await this.minesweeperService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Minesweeper | null> {
    const minesweeper = await this.minesweeperService.findOne(id);
    if (minesweeper) return minesweeper;
    else
      throw new HttpException(
        `Minesweeper ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Post('/scoreboard')
  async findTopScoreboard(
    @Body() searchScoreboardMinesweeperDto: SearchScoreboardMinesweeperDto,
  ): Promise<FormatedScoreboard[]> {
    const minesweeperFound = await this.minesweeperService.findBestScoreByType(
      searchScoreboardMinesweeperDto,
    );
    const minesweeperFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < minesweeperFound.length; index++) {
      minesweeperFormated.push({
        user: {
          id: minesweeperFound[index].player.id,
          pseudo: minesweeperFound[index].player.pseudo,
          country: minesweeperFound[index].player.country,
        },
        score: `Mode: ${minesweeperFound[index].level}, in ${minesweeperFound[index].score}s`,
      });
    }
    return minesweeperFormated;
  }

  @Get('/user/:userID')
  async findAllByPlayer(
    @Param('userID') userID: string,
  ): Promise<FormatedScoreboard[]> {
    const minesweeperFound =
      await this.minesweeperService.findAllByPlayer(userID);
    const minesweeperFormated: FormatedScoreboard[] = [];
    for (let index = 0; index < minesweeperFound.length; index++) {
      minesweeperFormated.push({
        user: {
          id: minesweeperFound[index].player.id,
          pseudo: minesweeperFound[index].player.pseudo,
          country: minesweeperFound[index].player.country,
        },
        score: `Mode: ${minesweeperFound[index].level}, in ${minesweeperFound[index].score}s`,
      });
    }
    return minesweeperFormated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const minesweeperToEloFound = await this.minesweeperService.findOne(id);
    if (!minesweeperToEloFound)
      throw new HttpException(
        `Minesweeper ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.minesweeperService.remove(id);
  }
}
