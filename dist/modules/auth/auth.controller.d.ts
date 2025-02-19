import { SignInService } from './sign-in/sign-in.service';
import { SignUpService } from './sign-up/sign-up.service';
import { LoginDto } from './dto/sign-in/login.dto';
import { ValidateDto } from './dto/sign-up/validate.dto';
import { SignUpDto } from './dto/sign-up/sigu-up.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
export declare class AuthController {
    private readonly signInService;
    private readonly signUpService;
    constructor(signInService: SignInService, signUpService: SignUpService);
    signIn(loginDto: LoginDto): Promise<string>;
    verifyPhone(validateData: ValidateDto): Promise<void>;
    signUp(signUpDto: SignUpDto): Promise<any>;
    requestForgotPassword(data: ForgotPasswordDto): Promise<ForgotPasswordDto>;
}
