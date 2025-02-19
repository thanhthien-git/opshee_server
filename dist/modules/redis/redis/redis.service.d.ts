export declare class RedisService {
    private client;
    private REDIS_URL;
    private REDIS_TTL;
    constructor();
    set(key: string, value: any, ttl?: number): Promise<void>;
    getOrSet<T>(key: string, callback: () => Promise<T>, ttl?: number): Promise<T>;
    delete(key: string): Promise<void>;
}
