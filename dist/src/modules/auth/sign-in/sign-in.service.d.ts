import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interface/jwt-payload';
export declare class SignInService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    generateToken(payload: JwtPayload): Promise<string>;
    comparePassword(password: string, hashPassword: string): Promise<boolean>;
    login(loginDto: LoginDto): Promise<string>;
}
