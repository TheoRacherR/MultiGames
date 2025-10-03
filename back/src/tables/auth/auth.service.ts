import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
// import { UserInfoService } from '../user-info/user-info.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { userRole } from 'src/@types/tables/user';
import { LoginDto } from './dto/login-auth.dto';
import { TokenValidateDto } from './dto/tokenValidation-auth.dto ';
import { JsonWebTokenError } from 'jsonwebtoken';
// import { UserInfo } from '../user-info/entities/user-info.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    // private userInfoService: UserInfoService,
    private jwtService: JwtService,
  ) {}

  async verifyToken(
    TokenValidateDto: TokenValidateDto,
  ): Promise<{ result: object }> {
    if (!TokenValidateDto.token) {
      throw new BadRequestException('Token is missing');
    }
    try {
      const token = TokenValidateDto.token;
      const result = this.jwtService.verify(token, {
        secret: process.env.jwt_secret,
      });
      return result;
    } catch (e) {
      if (e instanceof JsonWebTokenError || e instanceof SyntaxError) {
        throw new BadRequestException('Invalid token');
      }
    }
    throw new BadRequestException('Invalid token');
  }

  async validateToken(TokenValidateDto: TokenValidateDto) {
    if (!TokenValidateDto.token) {
      throw new BadRequestException('Token is missing');
    }

    try {
      const { id } = this.jwtService.verify(TokenValidateDto.token, {
        secret: process.env.jwt_secret,
      });
      const user = await this.userService.findOne(id);
      // const detail: UserInfo = await this.userInfoService.findOneByUserId(id);

      if (!user) {
        throw new BadRequestException('Invalid user');
      }

      // const userInfo = detail;

      return {
        isConnected: true,
        id: user.id,
        role: user.role,
        isAdmin: user.role === userRole.ADMIN,
        // userInfo: userInfo,
      };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }

      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new HttpException(
        'User unknown from email',
        HttpStatus.UNAUTHORIZED,
      );
      //TODO PROD : set line below
      //throw new BadRequestException('Invalid email or password');
    }
    // const detail = await this.userInfoService.findOneByUserId(user.id);

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Password not valid', HttpStatus.UNAUTHORIZED);
      //TODO PROD : set line below
      //throw new BadRequestException('Invalid email or password');
    }

    const payload = { id: user.id, role: user.role };
    const options = { secret: process.env.jwt_secret };
    const token: string = this.jwtService.sign(payload, options);
    return token;
  }

  async register(registerDto: CreateUserDto): Promise<{ message: string }> {
    const userFound = await this.userService.findOneByEmail(registerDto.email);
    if (userFound)
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);
    return await this.userService.create(registerDto);
  }
}
