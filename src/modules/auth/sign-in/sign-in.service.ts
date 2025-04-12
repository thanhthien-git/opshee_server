import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../models/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ERROR_MESSAGE } from '../../../constants/message';
import { LoginDto } from '../dto/sign-in/login.dto';
import { JwtPayload } from '../../../interface/jwt-payload';
import { BcryptService } from '../../../modules/bcrypt/brcypt.service';
import { TokenService } from '../../../modules/token/token.service';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
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
    const isMatch = await BcryptService.comparePassword(
      loginDto.password,
      user.user_password,
    );

    if (!isMatch) {
      throw new BadRequestException({ message: ERROR_MESSAGE.WRONG_PASSWORD });
    }

    const payload: JwtPayload = {
      userId: user.user_id,
      userEmail: user.user_email,
      role: user.role,
    };

    return this.tokenService.generateToken(payload);
  }
}
