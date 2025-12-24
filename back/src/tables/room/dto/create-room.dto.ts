import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { roomType } from '../../../@types/tables/room';
import { User } from '../../../tables/user/entities/user.entity';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  max_size: number;

  @IsNotEmpty()
  @IsEnum(roomType)
  type: roomType;

  @IsNotEmpty()
  owner: User;
}
