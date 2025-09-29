import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { country } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  pseudo?: string;

  @IsOptional()
  @IsEnum(country)
  country?: country;
}
