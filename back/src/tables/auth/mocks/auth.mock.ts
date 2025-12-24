import { LoginDto } from '../dto/login-auth.dto';
import { country } from '../../../@types/tables/user';
import { CreateUserDto } from '../../../tables/user/dto/create-user.dto';

export const authLoginMock: LoginDto = {
  email: 'theo@gmail.com',
  password: 'toor',
};

export const authRegisterMock: CreateUserDto = {
  firstname: 'Theo',
  lastname: 'RACHER RAULIN',
  email: 'tcvcvcvcvo@gmail.com',
  password: 'root',
  pseudo: 'theoRR',
  country: country.FRANCE,
};

export const authRegisterEmailFoundMock: CreateUserDto = {
  firstname: 'Theo',
  lastname: 'RACHER RAULIN',
  email: 'theo@gmail.com',
  password: 'root',
  pseudo: 'theoRR',
  country: country.FRANCE,
};
