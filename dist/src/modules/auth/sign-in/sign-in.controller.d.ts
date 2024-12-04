import { SignInService } from './sign-in.service';
import { LoginDto } from './dto/login.dto';
export declare class SignInController {
    private readonly signInService;
    constructor(signInService: SignInService);
    signIn(loginDto: LoginDto): Promise<string>;
}
