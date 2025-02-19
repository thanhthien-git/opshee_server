import { UserEntity } from '../../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/sign-in/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interface/jwt-payload';
import { EmailService } from 'src/modules/mail/mail.service';
import { UsersService } from 'src/modules/users/users.service';
export declare class SignInService {
    private userRepository;
    private jwtService;
    private emailService;
    private userService;
    private TOKEN_EXPIRE_TIME;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService, emailService: EmailService, userService: UsersService);
    generateToken(payload: JwtPayload): Promise<string>;
    login(loginDto: LoginDto): Promise<string>;
}
