import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShopRegisterDto } from '../dto/sign-up.dto';
import { ShopLoginDTO } from '../dto/login.dto';
import { ShopService } from './shop.service';
import { ShopFilterDto } from '../dto/filter.dto';
import { ShopUpdateDto } from '../dto/update.dto';
import { ROLE } from '../../../enum/role.enum';
import { Roles } from '../../../decorators/role.decorators';
import { OwnerShipGuard } from '../guards/ownership.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('register')
  async register(@Body() data: ShopRegisterDto) {
    return await this.shopService.register(data);
  }

  @Post('login')
  async login(@Body() data: ShopLoginDTO) {
    return await this.shopService.login(data);
  }

  @Get('search')
  async search(@Query() data: ShopFilterDto) {
    return await this.shopService.getShopByName(data.shopName);
  }

  @UseGuards(OwnerShipGuard)
  @Roles(ROLE.SHOP)
  @Patch('update')
  async update(@Body() dto: ShopUpdateDto, @Req() req) {
    dto.shopId = req.userId;
    return await this.shopService.update(dto);
  }
}
