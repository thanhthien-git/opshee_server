import { UserEntity } from '../../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/sign-in/login.dto';
import { TokenService } from 'src/modules/token/token.service';
export declare class SignInService {
    private userRepository;
    private tokenService;
    constructor(userRepository: Repository<UserEntity>, tokenService: TokenService);
    login(loginDto: LoginDto): Promise<string>;
}
