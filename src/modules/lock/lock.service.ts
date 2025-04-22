import Redlock from 'redlock';
import { RedisService } from '../redis/redis/redis.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LockUtil {
  private redLock: Redlock;
  private readonly logger = new Logger(LockUtil.name);
  private static readonly DEFAULT_TTL = 10000;

  constructor(redisService: RedisService) {
    this.redLock = new Redlock([redisService.getClient() as any], {
      retryCount: 10,
      retryDelay: 200,
      retryJitter: 100,
    });
  }

  async lockAndExcute<T>(
    lockey: string,
    callback: () => Promise<void>,
    ttl = LockUtil.DEFAULT_TTL,
  ) {
    const lock = await this.redLock.acquire([lockey], ttl);
    this.logger.debug(`Accquire lock for ${lockey}`);
    try {
      return await callback();
    } catch (err) {
      this.logger.error(`Failed to lock and excute the lock ${lockey}`);
      throw err;
    } finally {
      try {
        await lock.release();
        this.logger.debug(`Released lock for ${lockey}`);
      } catch (releaseErr) {
        this.logger.error(`Failed to release lock ${lockey}`, releaseErr.stack);
      }
    }
  }
}
