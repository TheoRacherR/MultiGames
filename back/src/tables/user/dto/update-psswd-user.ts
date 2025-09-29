import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserPsswdDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  password: string;
}
