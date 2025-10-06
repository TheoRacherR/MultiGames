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
import { BattleshipService } from './battleship.service';
import { CreateBattleshipDto } from './dto/create-battleship.dto';
import { Battleship } from './entities/battleship.entity';

@Controller('battleship')
export class BattleshipController {
  constructor(private readonly battleshipService: BattleshipService) {}

  @Post()
  async create(
    @Body() createBattleshipDto: CreateBattleshipDto,
  ): Promise<{ message: string }> {
    return await this.battleshipService.create(createBattleshipDto);
  }

  @Get()
  async findAll(): Promise<Battleship[]> {
    return await this.battleshipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Battleship | null> {
    const battleship = await this.battleshipService.findOne(id);
    if (battleship) return battleship;
    else
      throw new HttpException(
        `Battleship ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const battleshipToEloFound = await this.battleshipService.findOne(id);
    if (!battleshipToEloFound)
      throw new HttpException(
        `Battleship ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.battleshipService.remove(id);
  }
}
