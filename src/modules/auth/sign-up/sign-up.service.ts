import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sigu-up.dto';
import { ERROR_AUTH, NOTIFY } from 'src/constants/message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  async checkIsExist(userPhone: string) {
    return await this.userRepository.findOneBy({
      user_phone: userPhone,
    });
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
    };

    const user = this.userRepository.create(createRequest);
    await this.userRepository.save(user);
    return {
      message: NOTIFY.SIGN_UP_SUCCESS,
    };
  }
}
