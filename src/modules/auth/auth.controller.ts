import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes()
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
