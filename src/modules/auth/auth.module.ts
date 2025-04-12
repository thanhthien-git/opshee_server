import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInService } from './sign-in/sign-in.service';
import { SignUpService } from './sign-up/sign-up.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../models/entities/user.entity';
import { EmailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../bcrypt/brcypt.service';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TokenModule],
  controllers: [AuthController],
  providers: [
    SignInService,
    SignUpService,
    EmailService,
    UsersService,
    BcryptService,
    TokenService,
  ],
})
export class AuthModule {}
