import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis/redis.service';
export declare class CartService {
    private cartRepository;
    private redisService;
    private readonly logger;
    private CART_CACHE_KEY;
    constructor(cartRepository: Repository<CartEntity>, redisService: RedisService);
    private createCart;
    getCart(userId: number): Promise<CartEntity>;
}
