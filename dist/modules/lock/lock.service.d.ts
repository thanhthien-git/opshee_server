import { RedisService } from '../redis/redis/redis.service';
export declare class LockUtil {
    private redLock;
    private readonly logger;
    private static readonly DEFAULT_TTL;
    constructor(redisService: RedisService);
    lockAndExcute<T>(lockey: string, callback: () => Promise<void>, ttl?: number): Promise<void>;
}
