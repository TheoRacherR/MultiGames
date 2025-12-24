import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { userStatus } from '../../../@types/tables/user';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserStatusDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEnum(userStatus)
  status: userStatus;

  // id of the user who update
  // need to have admin role
  @IsNotEmpty()
  @IsString()
  userID: string;
}
