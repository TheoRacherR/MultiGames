import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BattleshipEloService } from './battleship_elo.service';
import { CreateBattleshipEloDto } from './dto/create-battleship_elo.dto';
import { UpdateBattleshipEloDto } from './dto/update-battleship_elo.dto';

@Controller('battleship-elo')
export class BattleshipEloController {
  constructor(private readonly battleshipEloService: BattleshipEloService) {}

  @Post()
  create(@Body() createBattleshipEloDto: CreateBattleshipEloDto) {
    return this.battleshipEloService.create(createBattleshipEloDto);
  }

  @Get()
  findAll() {
    return this.battleshipEloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.battleshipEloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBattleshipEloDto: UpdateBattleshipEloDto) {
    return this.battleshipEloService.update(+id, updateBattleshipEloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.battleshipEloService.remove(+id);
  }
}
