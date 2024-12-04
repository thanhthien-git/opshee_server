import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sigu-up.dto';
import { SignUpService } from './sign-up.service';
import { ERROR_AUTH } from 'src/constants/message';

@Controller('/auth')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('verify-phone')
  async verifyPhone(@Body() phone: string) {
    const isExist = await this.signUpService.checkIsExist(phone);

    if (isExist) {
      throw new BadRequestException({
        message: ERROR_AUTH.EXISTED('Số điện thoại'),
      });
    }
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.signUpService.signUp(signUpDto);
  }
}
