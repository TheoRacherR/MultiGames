import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<{ message: string }> {
    await this.roomRepository.insert({
      ...createRoomDto,
    });
    return { message: `Room created` };
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find();
  }

  async findOne(id: string): Promise<Room | null> {
    return await this.roomRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<{ message: string }> {
    await this.roomRepository.update(id, updateRoomDto);
    return { message: `Room ${id} updated` };
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.roomRepository.delete(id);
    return { message: `Room ${id} deleted` };
  }
}
