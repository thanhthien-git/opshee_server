import { UserEntity } from '../../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dto/sign-up/sigu-up.dto';
import { ValidateDto } from '../dto/sign-up/validate.dto';
import { CartService } from 'src/modules/cart/cart.service';
export declare class SignUpService {
    private userRepository;
    private cartService;
    constructor(userRepository: Repository<UserEntity>, cartService: CartService);
    checkIsExist(validateDto: ValidateDto): Promise<void>;
    signUp(userDto: SignUpDto): Promise<any>;
}
