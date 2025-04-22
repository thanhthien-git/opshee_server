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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@redis/client");
const config_1 = require("../../../config/config");
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.logger = new common_1.Logger(RedisService_1.name);
        this.REDIS_URL = config_1.CONFIG.redis.url;
        this.REDIS_TTL = parseInt(config_1.CONFIG.redis.ttl) || 300;
        this.client = (0, client_1.createClient)({
            url: this.REDIS_URL,
            socket: {
                reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
                connectTimeout: 10000,
            },
        });
        this.client.on('ready', () => this.logger.log('Redis connected'));
        this.client.on('error', (err) => this.logger.error(`Redis connection failed: ${err}`));
        this.client.on('reconnecting', () => this.logger.log('Redis reconnecting...'));
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
    async set(key, value, ttl = this.REDIS_TTL) {
        const jsonData = JSON.stringify(value);
        await this.client.set(key, jsonData, { EX: ttl });
    }
    async get(key) {
        try {
            const data = await this.client.get(key);
            return JSON.parse(data);
        }
        catch (err) {
            this.logger.warn(`Get key error : ${err.message}`);
            throw err;
        }
    }
    async getOrSet(key, callback, ttl = this.REDIS_TTL) {
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
    async delete(key) {
        await this.client.del(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
