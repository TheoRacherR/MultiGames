import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-role-user';
import { InjectRepository } from '@nestjs/typeorm';
import { country, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserPsswdDto } from './dto/update-psswd-user';

export interface UsersFormated {
  id: string;
  email: string;
  pseudo: string;
  country: country;
  created_at: Date;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
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
    await this.userRepository.update(id, updateUserRoleDto);
    return {
      message: `User role of user ${id} updated to '${updateUserRoleDto.role}'`,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: `User ${id} deleted` };
  }
}
