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
import { MinesweeperService } from './minesweeper.service';
import { CreateMinesweeperDto } from './dto/create-minesweeper.dto';
import { UpdateMinesweeperDto } from './dto/update-minesweeper.dto';
import { Minesweeper } from './entities/minesweeper.entity';

@Controller('minesweeper')
export class MinesweeperController {
  constructor(private readonly minesweeperService: MinesweeperService) {}

  @Post()
  create(
    @Body() createMinesweeperDto: CreateMinesweeperDto,
  ): Promise<{ message: string }> {
    return this.minesweeperService.create(createMinesweeperDto);
  }

  @Get()
  findAll(): Promise<Minesweeper[]> {
    return this.minesweeperService.findAll();
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMinesweeperDto: UpdateMinesweeperDto,
  ): Promise<{ message: string }> {
    const minesweeperToEloFound = await this.minesweeperService.findOne(id);
    if (!minesweeperToEloFound)
      throw new HttpException(
        `Minesweeper ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.minesweeperService.update(id, updateMinesweeperDto);
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
