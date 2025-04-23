import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, RedisClientType } from '@redis/client';
import { CONFIG } from '../../../config/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private readonly logger = new Logger(RedisService.name);
  private REDIS_URL = CONFIG.redis.url;
  private REDIS_TTL = parseInt(CONFIG.redis.ttl) || 300;

  constructor() {
    this.client = createClient({
      url: this.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
        connectTimeout: 10000,
      },
    });
    this.client.on('ready', () => this.logger.log('Redis connected'));
    this.client.on('error', (err) =>
      this.logger.error(`Redis connection failed: ${err}`),
    );
    this.client.on('reconnecting', () =>
      this.logger.log('Redis reconnecting...'),
    );
  }

  getClient() {
    return this.client;
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async set(key: string, value: any, ttl = this.REDIS_TTL): Promise<void> {
    const jsonData = JSON.stringify(value);
    await this.client.set(key, jsonData, { EX: ttl });
  }

  async get<T>(key: string): Promise<T | undefined> {
    try {
      const data = await this.client.get(key);
      return JSON.parse(data) as T;
    } catch (err) {
      this.logger.warn(`Get key error : ${err.message}`);
      throw err;
    }
  }

  async getOrSet<T>(
    key: string,
    callback: () => Promise<T>,
    ttl = this.REDIS_TTL,
  ): Promise<T> {
    const cachedData = await this.client.get(key);
    if (cachedData) {
      console.log(`is exist in cache`);
      return JSON.parse(cachedData);
    }
    console.log(`isnt exist, set to cache`);
    const setData = await callback();
    await this.set(key, setData, ttl);
    return setData;
  }

  async checkCacheMemo<T>(
    cacheKey: string,
    callback: () => Promise<T>,
    fallbackValue: T | null = null,
  ): Promise<T | undefined> {
    try {
      let response: T = await this.get(cacheKey);
      if (response) {
        this.logger.log(`Cache hit for key : ${cacheKey}`);
        return response;
      }
      response = await callback();
      await this.set(cacheKey, response, this.REDIS_TTL);
      this.logger.log(`Set value for key : ${cacheKey}`);
      return response;
    } catch (err) {
      this.logger.error('Error in checkCacheMemo:', err);

      if (fallbackValue) {
        this.logger.log(`Returning fallback value for key: ${cacheKey}`);
        return fallbackValue;
      }

      throw new Error(err);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
