import { IsString, IsNotEmpty } from 'class-validator';

export class TokenValidateDto {
  @IsNotEmpty()
  @IsString()
  public token: string;
}
