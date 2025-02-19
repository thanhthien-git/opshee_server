import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/constants/message';
import { UserEntity } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { UpdateInfoDto } from './dto/update-info.dto';
import { EmailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (user.isDeleted === true || user.isBanned === true) {
      throw new BadRequestException({ message: ERROR_MESSAGE.USER_NOT_FOUND });
    }

    const { isBanned, isDeleted, user_password, ...props } = user;
    return { ...props };
  }

  async updateInfo(data: UpdateInfoDto) {
    try {
      const { userId, user_first_name, user_last_name, date_of_birth } = data;
      await this.userRepository.update(Number(userId), {
        user_first_name: user_first_name,
        user_last_name: user_last_name,
        date_of_birth: date_of_birth,
      });
      return {
        message: SUCCESS_MESSAGE.UPDATE_SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException({ message: ERROR_MESSAGE.UPDATE_FAILED });
    }
  }

  async changePassword(data: ChangePasswordDto) {
    try {
      const { userId, newPassword } = data;
      const hashed = bcrypt.hashSync(newPassword, 10);

      await this.userRepository.update(Number(userId), {
        user_password: hashed,
      });

      return {
        message: SUCCESS_MESSAGE.CHANGE_PASSWORD_SUCCESS,
      };
    } catch (error) {
      throw new BadRequestException({
        message: ERROR_MESSAGE.CHANGE_PASSWORD_FAILED,
      });
    }
  }
}
