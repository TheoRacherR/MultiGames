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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<{ message: string }> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Room | null> {
    const room = await this.roomService.findOne(id);
    if (room) return room;
    else throw new HttpException(`Room ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<{ message: string }> {
    const roomToEloFound = await this.roomService.findOne(id);
    if (!roomToEloFound)
      throw new HttpException(`Room ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const roomToEloFound = await this.roomService.findOne(id);
    if (!roomToEloFound)
      throw new HttpException(`Room ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.roomService.remove(id);
  }
}
