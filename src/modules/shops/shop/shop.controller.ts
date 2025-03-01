import { Body, Controller, Post } from '@nestjs/common';
import { AuthShopService } from '../auth/shop.auth.service';
import { ShopRegisterDto } from '../dto/sign-up.dto';
import { ShopLoginDTO } from '../dto/login.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly authService: AuthShopService) {}

  @Post('register')
  async register(@Body() data: ShopRegisterDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: ShopLoginDTO) {
    return await this.authService.login(data);
  }
}
