/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { TokenValidateDto } from './dto/tokenValidation-auth.dto ';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('verifyToken')
  async verifyToken(@Headers() TokenValidateDto: TokenValidateDto): Promise<{
    result: object;
  }> {
    const res = await this.authService.verifyToken(TokenValidateDto);
    return res;
  }

  @Post('validateToken')
  async validateToken(
    @Body(ValidationPipe) TokenValidateDto: TokenValidateDto,
  ) {
    return await this.authService.validateToken(TokenValidateDto);
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) LoginDto: LoginDto): Promise<string> {
    return await this.authService.login(LoginDto);
  }
}
