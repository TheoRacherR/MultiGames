import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { country } from 'src/@types/tables/user';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @IsNotEmpty()
  @IsEnum(country)
  country: country;
}
