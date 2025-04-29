import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  email: string;
}
