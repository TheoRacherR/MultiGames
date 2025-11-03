import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-role-user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserPsswdDto } from './dto/update-psswd-user';
import { UserFormated, UserWithPassword } from 'src/@types/tables/user';
import { UpdateUserStatusDto } from './dto/update-status-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<UserFormated | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<UserWithPassword | null> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create(userInfos: CreateUserDto): Promise<{ message: string }> {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(userInfos.password, salt);
    await this.userRepository.save({
      ...userInfos,
      password: passwordHashed,
    });
    return { message: `User created` };
  }

  async updateInfos(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    await this.userRepository.update(id, updateUserDto);
    return { message: `User ${id} updated` };
  }

  async updatePassword(
    id: string,
    userInfo: UpdateUserPsswdDto,
  ): Promise<{ message: string }> {
    let newHashedPassword = userInfo.password;
    const newSalt = await bcrypt.genSalt();
    newHashedPassword = await bcrypt.hash(userInfo.password, newSalt);

    await this.userRepository.update(id, { password: newHashedPassword });
    return { message: `User ${id} updated` };
  }

  async updateRole(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<{ message: string }> {
    await this.userRepository.update(id, { role: updateUserRoleDto.role });
    return {
      message: `User role of user ${id} updated to '${updateUserRoleDto.role}'`,
    };
  }

  async updateStatus(
    id: string,
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<{ message: string }> {
    await this.userRepository.update(id, {
      status: updateUserStatusDto.status,
    });
    return {
      message: `User status of user ${id} updated to '${updateUserStatusDto.status}'`,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: `User ${id} deleted` };
  }
}
