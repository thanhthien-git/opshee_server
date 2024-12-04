import { SignUpDto } from './dto/sigu-up.dto';
import { SignUpService } from './sign-up.service';
export declare class SignUpController {
    private readonly signUpService;
    constructor(signUpService: SignUpService);
    verifyPhone(phone: string): Promise<void>;
    signUp(signUpDto: SignUpDto): Promise<any>;
}
