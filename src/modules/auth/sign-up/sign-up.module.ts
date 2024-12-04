import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
