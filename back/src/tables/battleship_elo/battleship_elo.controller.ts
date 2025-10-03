import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BattleshipEloService } from './battleship_elo.service';
import { CreateBattleshipEloDto } from './dto/create-battleship_elo.dto';
import { UpdateBattleshipEloDto } from './dto/update-battleship_elo.dto';
import { BattleshipElo } from './entities/battleship_elo.entity';

@Controller('battleship-elo')
export class BattleshipEloController {
  constructor(private readonly battleshipEloService: BattleshipEloService) {}

  @Post()
  create(
    @Body() createBattleshipEloDto: CreateBattleshipEloDto,
  ): Promise<{ message: string }> {
    return this.battleshipEloService.create(createBattleshipEloDto);
  }

  @Get()
  findAll(): Promise<BattleshipElo[]> {
    return this.battleshipEloService.findAll();
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBattleshipEloDto: UpdateBattleshipEloDto,
  ): Promise<{ message: string }> {
    const battleshipToEloFound = await this.battleshipEloService.findOne(id);
    if (!battleshipToEloFound)
      throw new HttpException(
        `Battleship Elo ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else
      return await this.battleshipEloService.update(id, updateBattleshipEloDto);
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
