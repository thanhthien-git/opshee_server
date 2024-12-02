import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGE } from 'src/constants/message';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const isEmail = /\S+@\S+\.\S+/.test(loginDto.username);
    //login option
    const option = isEmail
      ? { user_email: loginDto.username }
      : { user_phone: loginDto.username };

    const user = await this.userRepository.findOne({ where: option });

    if (!user) {
      throw new BadRequestException({ message: ERROR_MESSAGE.USER_NOT_FOUND });
    }
    //password comparation
    const isMatch = await this.comparePassword(
      loginDto.password,
      user.user_password,
    );

    if (!isMatch) {
      throw new BadRequestException({ messsage: ERROR_MESSAGE.WRONG_PASSWORD });
    }

    return user;
  }
}
