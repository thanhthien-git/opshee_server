"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LockUtil_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockUtil = void 0;
const redlock_1 = require("redlock");
const redis_service_1 = require("../redis/redis/redis.service");
const common_1 = require("@nestjs/common");
let LockUtil = LockUtil_1 = class LockUtil {
    constructor(redisService) {
        this.logger = new common_1.Logger(LockUtil_1.name);
        this.redLock = new redlock_1.default([redisService.getClient()], {
            retryCount: 10,
            retryDelay: 200,
            retryJitter: 100,
        });
    }
    async lockAndExcute(lockey, callback, ttl = LockUtil_1.DEFAULT_TTL) {
        const lock = await this.redLock.acquire([lockey], ttl);
        this.logger.debug(`Accquire lock for ${lockey}`);
        try {
            return await callback();
        }
        catch (err) {
            this.logger.error(`Failed to lock and excute the lock ${lockey}`);
            throw err;
        }
        finally {
            try {
                await lock.release();
                this.logger.debug(`Released lock for ${lockey}`);
            }
            catch (releaseErr) {
                this.logger.error(`Failed to release lock ${lockey}`, releaseErr.stack);
            }
        }
    }
};
exports.LockUtil = LockUtil;
LockUtil.DEFAULT_TTL = 10000;
exports.LockUtil = LockUtil = LockUtil_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], LockUtil);
