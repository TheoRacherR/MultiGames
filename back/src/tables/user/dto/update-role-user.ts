import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { userRole } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserRoleDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEnum(userRole)
  role: userRole;

  // id of the user who update
  // need to have admin role
  @IsNotEmpty()
  @IsString()
  userID: string;
}
