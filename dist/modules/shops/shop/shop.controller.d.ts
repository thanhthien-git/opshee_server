import { ShopRegisterDto } from '../dto/sign-up.dto';
import { ShopLoginDTO } from '../dto/login.dto';
import { ShopService } from './shop.service';
import { ShopFilterDto } from '../dto/filter.dto';
import { ShopUpdateDto } from '../dto/update.dto';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    register(data: ShopRegisterDto): Promise<boolean>;
    login(data: ShopLoginDTO): Promise<string>;
    search(data: ShopFilterDto): Promise<import("../../../interface/paginated-response").PaginatedResponse<import("../../../models/entities/shop.entity").ShopEntity>>;
    update(dto: ShopUpdateDto, req: any): Promise<import("typeorm").UpdateResult>;
}
