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
import { RolesGuard } from '../../guards/role/role.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ERROR_MESSAGE } from '../../constants/message';
import { passwordRegex } from '../../constants/regex';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('user')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  @ApiBearerAuth('access-token')
  async getById(@Req() req) {
    return this.userService.getUserById(req.user.userId);
  }

  @Patch('/change-password')
  @ApiBearerAuth('access-token')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newPassword: { type: 'string', example: 'myNewPassword123' },
      },
      required: ['newPassword'],
    },
  })
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
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateInfoDto })
  async updateUser(@Req() req, @Body() data: UpdateInfoDto) {
    const updateData: UpdateInfoDto = { userId: req.user.userId, ...data };
    return await this.userService.updateInfo(updateData);
  }
}
