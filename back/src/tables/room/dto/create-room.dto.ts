import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/tables/user/entities/user.entity';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  max_size: number;

  @IsNotEmpty()
  owner: User;
}
