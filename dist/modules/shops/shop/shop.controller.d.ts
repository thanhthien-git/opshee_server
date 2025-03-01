import { AuthShopService } from '../auth/shop.auth.service';
import { ShopRegisterDto } from '../dto/sign-up.dto';
import { ShopLoginDTO } from '../dto/login.dto';
export declare class ShopController {
    private readonly authService;
    constructor(authService: AuthShopService);
    register(data: ShopRegisterDto): Promise<boolean>;
    login(data: ShopLoginDTO): Promise<string>;
}
