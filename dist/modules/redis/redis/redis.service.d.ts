import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private client;
    private readonly logger;
    private REDIS_URL;
    private REDIS_TTL;
    constructor();
    getClient(): RedisClientType;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    get<T>(key: string): Promise<T | undefined>;
    getOrSet<T>(key: string, callback: () => Promise<T>, ttl?: number): Promise<T>;
    delete(key: string): Promise<void>;
}
