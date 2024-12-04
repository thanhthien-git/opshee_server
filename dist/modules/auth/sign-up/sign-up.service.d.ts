import { UserEntity } from '../../../entities/user.entity';
import { SignUpDto } from './dto/sigu-up.dto';
export declare class SignUpService {
    private userRepository;
    checkIsExist(userPhone: string): Promise<UserEntity>;
    signUp(userDto: SignUpDto): Promise<any>;
}
