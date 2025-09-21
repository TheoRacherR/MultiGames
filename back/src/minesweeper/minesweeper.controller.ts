import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinesweeperService } from './minesweeper.service';
import { CreateMinesweeperDto } from './dto/create-minesweeper.dto';
import { UpdateMinesweeperDto } from './dto/update-minesweeper.dto';

@Controller('minesweeper')
export class MinesweeperController {
  constructor(private readonly minesweeperService: MinesweeperService) {}

  @Post()
  create(@Body() createMinesweeperDto: CreateMinesweeperDto) {
    return this.minesweeperService.create(createMinesweeperDto);
  }

  @Get()
  findAll() {
    return this.minesweeperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minesweeperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinesweeperDto: UpdateMinesweeperDto) {
    return this.minesweeperService.update(+id, updateMinesweeperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minesweeperService.remove(+id);
  }
}
