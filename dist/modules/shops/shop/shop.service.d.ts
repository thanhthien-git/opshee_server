import { PaginatedResponse } from '../../../interface/paginated-response';
import { ShopEntity } from '../../../models/entities/shop.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ShopUpdateDto } from '../dto/update.dto';
import { ShopLoginDTO } from '../dto/login.dto';
import { TokenService } from '../../../modules/token/token.service';
import { ShopRegisterDto } from '../dto/sign-up.dto';
export declare class ShopService {
    private readonly shopRepository;
    private readonly tokenService;
    constructor(shopRepository: Repository<ShopEntity>, tokenService: TokenService);
    findByPhone(phone: string): Promise<ShopEntity>;
    register(data: ShopRegisterDto): Promise<boolean>;
    login(data: ShopLoginDTO): Promise<string>;
    getShopByName(name: string, page?: number, pageSize?: number): Promise<PaginatedResponse<ShopEntity>>;
    update(dto: ShopUpdateDto): Promise<UpdateResult>;
}
