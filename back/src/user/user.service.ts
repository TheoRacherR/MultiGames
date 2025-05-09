import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { country, User } from './entities/user.entity';
import { Repository } from 'typeorm';

export interface UsersFormated {
  id: number;
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

  // async findAll(): Promise<UsersFormated[]> {
  //   const usersData = await this.userRepository.find();
  //   const usersDataFormated = usersData.map((item) => ({
  //     id: item.id,
  //     email: item.email,
  //     pseudo: item.pseudo,
  //     country: item.country,
  //     created_at: item.created_at,
  //   }));
  //   return usersDataFormated;
  // }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(userInfos: CreateUserDto): Promise<{ message: string }> {
    await this.userRepository.insert(userInfos);
    return { message: `User created` };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return `User ${id} updated`;
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: `User ${id} deleted` };
  }
}
