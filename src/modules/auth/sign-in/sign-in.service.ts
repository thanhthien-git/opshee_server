import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ERROR_MESSAGE } from '../../../constants/message';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interface/jwt-payload';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

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
    const isMatch = await this.comparePassword(
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

    return await this.generateToken(payload);
  }
}
