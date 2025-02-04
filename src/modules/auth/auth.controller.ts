import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignInService } from './sign-in/sign-in.service';
import { SignUpService } from './sign-up/sign-up.service';
import { LoginDto } from './dto/sign-in/login.dto';
import { ValidateDto } from './dto/sign-up/validate.dto';
import { SignUpDto } from './dto/sign-up/sigu-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInService: SignInService,
    private readonly signUpService: SignUpService,
  ) {}
  //#region : Login Controller
  @Post('/login')
  @UsePipes()
  async signIn(@Body() loginDto: LoginDto) {
    return this.signInService.login(loginDto);
  }
  //#endregion

  //#region : Sign Up Controller
  @Post('/verify-phone')
  async verifyPhone(@Body() validateData: ValidateDto) {
    return this.signUpService.checkIsExist(validateData);
  }
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpService.signUp(signUpDto);
  }
  //#endregion
}
