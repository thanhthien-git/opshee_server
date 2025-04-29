import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateDto {
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
  userEmail: string;
}
