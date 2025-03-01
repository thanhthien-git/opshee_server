import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/guards/role/role.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ERROR_MESSAGE } from 'src/constants/message';
import { passwordRegex } from 'src/constants/regex';
import { UpdateInfoDto } from './dto/update-info.dto';

@Controller('user')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  async getById(@Req() req) {
    return this.userService.getUserById(req.user.userId);
  }

  @Patch('/change-password')
  async changePassword(@Req() req, @Body('newPassword') newPassword: string) {
    if (!passwordRegex.test(newPassword)) {
      throw new BadRequestException({
        message: ERROR_MESSAGE.CHANGE_PASSWORD_WRONG_FORMAT,
      });
    }
    const data: ChangePasswordDto = {
      userId: req.user.userId,
      newPassword: newPassword,
    };
    return this.userService.changePassword(data);
  }

  @Patch('/update-user')
  async updateUser(@Req() req, @Body() data: UpdateInfoDto) {
    const updateData: UpdateInfoDto = { userId: req.user.userId, ...data };
    return await this.userService.updateInfo(updateData);
  }
}
