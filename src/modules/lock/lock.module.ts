import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis/redis.module';
import { LockUtil } from './lock.service';

@Module({
  imports: [RedisModule],
  providers: [LockUtil],
  exports: [LockUtil],
})
export class LockModule {}
