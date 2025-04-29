import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userPhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userFirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userLastName: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  dayOfBirth: Date;

  @ApiProperty()
  role: string;
}
