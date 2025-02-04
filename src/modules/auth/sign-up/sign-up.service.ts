import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dto/sign-up/sigu-up.dto';
import { ERROR_AUTH, NOTIFY } from '../../../constants/message';
import * as bcrypt from 'bcrypt';
import { ValidateDto } from '../dto/sign-up/validate.dto';

@Injectable()
export class SignUpService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  async checkIsExist(validateDto: ValidateDto) {
    const user = await this.userRepository.findOne({
      where: [
        { user_email: validateDto.userEmail },
        { user_phone: validateDto.userPhone },
        { user_name: validateDto.userName },
      ],
    });

    if (user) {
      const existingInfo: Array<string> = [];
      if (user.user_name === validateDto.userName)
        existingInfo.push('Tên người dùng');
      if (user.user_phone === validateDto.userPhone)
        existingInfo.push('Số điện thoại');
      if (user.user_email === validateDto.userEmail) existingInfo.push('Email');

      throw new BadRequestException({
        message: ERROR_AUTH.EXISTED(`${existingInfo.join(', ')}`),
      });
    }
  }

  async signUp(userDto: SignUpDto): Promise<any> {
    const { userPhone } = userDto;
    const hashedPassword = bcrypt.hashSync(userDto.userPassword, 10);
    const existPhone = await this.userRepository.findOneBy({
      user_phone: userPhone,
    });

    if (existPhone) {
      throw new BadRequestException({
        message: ERROR_AUTH.EXISTED('Username'),
      });
    }
    const createRequest: UserEntity = {
      user_first_name: userDto.userFirstName,
      user_last_name: userDto.userLastName,
      date_of_birth: userDto.dayOfBirth,
      user_name: userDto.userName,
      user_phone: userPhone,
      user_password: hashedPassword,
      user_create_at: new Date(),
      user_update_at: new Date(),
      role: userDto.role,
      isBanned: true,
      isDeleted: true,
    };

    const user = this.userRepository.create(createRequest);
    await this.userRepository.save(user);
    return {
      message: NOTIFY.SIGN_UP_SUCCESS,
    };
  }
}
