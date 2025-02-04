import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @IsString()
  @IsNotEmpty()
  userEmail: string;
}
