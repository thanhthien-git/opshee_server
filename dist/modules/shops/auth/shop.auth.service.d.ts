import { ShopLoginDTO } from '../dto/login.dto';
import { ShopEntity } from 'src/models/entities/shop.entity';
import { Repository } from 'typeorm';
import { TokenService } from 'src/modules/token/token.service';
import { ShopRegisterDto } from '../dto/sign-up.dto';
export declare class AuthShopService {
    private readonly shopRepository;
    private readonly tokenService;
    constructor(shopRepository: Repository<ShopEntity>, tokenService: TokenService);
    findByPhone(phone: string): Promise<ShopEntity>;
    register(data: ShopRegisterDto): Promise<boolean>;
    login(data: ShopLoginDTO): Promise<string>;
}
