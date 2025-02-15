import { SignUpDto } from '../dto/sign-up/sigu-up.dto';
import { ValidateDto } from '../dto/sign-up/validate.dto';
export declare class SignUpService {
    private userRepository;
    checkIsExist(validateDto: ValidateDto): Promise<void>;
    signUp(userDto: SignUpDto): Promise<any>;
}
