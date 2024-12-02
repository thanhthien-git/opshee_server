import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { LoginDto } from './dto/login.dto';

@Controller('/auth')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('/login')
  @UsePipes()
  async signIn(@Body() loginDto: LoginDto) {
    return this.signInService.login(loginDto);
  }
}
