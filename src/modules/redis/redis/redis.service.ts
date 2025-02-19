import { Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  private REDIS_URL = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  private REDIS_TTL = parseInt(process.env.REDIS_TTL) || 300;

  constructor() {
    this.client = createClient({ url: this.REDIS_URL });
    this.client.connect();
    this.client.on('ready', () => {
      console.log('redis connected');
    });
    this.client.on('error', (err) => {
      console.log(`redis connected failed : ${err}`);
    });
  }

  async set(key: string, value: any, ttl = this.REDIS_TTL): Promise<void> {
    const jsonData = JSON.stringify(value);
    await this.client.set(key, jsonData, { EX: ttl });
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

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
