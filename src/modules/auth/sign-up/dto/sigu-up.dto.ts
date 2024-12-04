import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @IsString()
  @IsNotEmpty()
  userFirstName: string;

  @IsString()
  @IsNotEmpty()
  userLastName: string;

  @IsDate()
  @Type(() => Date)
  dayOfBirth: Date;
}
