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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserFormated,
  userRole,
  userStatus,
  UserWithPassword,
} from '../../@types/tables/user';
import { UpdateUserRoleDto } from './dto/update-role-user';
import { UpdateUserPsswdDto } from './dto/update-psswd-user';
import { UpdateUserStatusDto } from './dto/update-status-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserFormated> {
    const user = await this.userService.findOne(id);
    if (user) return user;
    else throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Get('email/:email')
  async findOneByEmail(
    @Param('email') email: string,
  ): Promise<UserWithPassword> {
    const user = await this.userService.findOneByEmail(email);
    if (user) return user;
    else
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Post()
  async create(@Body() userInfos: CreateUserDto): Promise<{ message: string }> {
    return await this.userService.create(userInfos);
  }

  @Patch('info/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    return await this.userService.updateInfos(id, updateUserDto);
  }

  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPsswdDto,
  ): Promise<{ message: string }> {
    return await this.userService.updatePassword(id, updateUserDto);
  }

  @Patch('role/:id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<{ message: string }> {
    const userFound = await this.userService.findOne(updateUserRoleDto.userID);
    if (userFound) {
      if (userFound.role === userRole.ADMIN) {
        return await this.userService.updateRole(id, updateUserRoleDto);
      } else
        throw new HttpException(
          `User ${updateUserRoleDto.userID} not admin`,
          HttpStatus.FORBIDDEN,
        );
    } else
      throw new HttpException(
        `User ${updateUserRoleDto.userID} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<{ message: string }> {
    const userFound = await this.userService.findOne(
      updateUserStatusDto.userID,
    );
    if (userFound) {
      if (
        userFound.role === userRole.ADMIN ||
        (id === updateUserStatusDto.userID &&
          userFound.status === userStatus.ACTIVE &&
          updateUserStatusDto.status === userStatus.DESACTIVATE)
      ) {
        return await this.userService.updateStatus(id, updateUserStatusDto);
      } else
        throw new HttpException(
          `User ${updateUserStatusDto.userID} not admin or user ${updateUserStatusDto.userID} cannot desactivate his own account`,
          HttpStatus.FORBIDDEN,
        );
    } else
      throw new HttpException(
        `User ${updateUserStatusDto.userID} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const userFound = await this.userService.findOne(id);
    if (!userFound)
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.userService.delete(id);
  }
}
