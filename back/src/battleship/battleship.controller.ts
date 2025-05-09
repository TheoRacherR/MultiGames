import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BattleshipService } from './battleship.service';
import { CreateBattleshipDto } from './dto/create-battleship.dto';
import { UpdateBattleshipDto } from './dto/update-battleship.dto';

@Controller('battleship')
export class BattleshipController {
  constructor(private readonly battleshipService: BattleshipService) {}

  @Post()
  create(@Body() createBattleshipDto: CreateBattleshipDto) {
    return this.battleshipService.create(createBattleshipDto);
  }

  @Get()
  findAll() {
    return this.battleshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.battleshipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBattleshipDto: UpdateBattleshipDto) {
    return this.battleshipService.update(+id, updateBattleshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.battleshipService.remove(+id);
  }
}
