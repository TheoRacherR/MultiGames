import { IsNotEmpty, IsString } from 'class-validator';

export class CheckWordWordleDto {
  @IsNotEmpty()
  @IsString()
  word: string;
}
