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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const typeorm_2 = require("typeorm");
const util_1 = require("../../utils/util");
const redis_service_1 = require("../redis/redis/redis.service");
let CartService = CartService_1 = class CartService {
    constructor(cartRepository, redisService) {
        this.cartRepository = cartRepository;
        this.redisService = redisService;
        this.logger = new common_1.Logger(CartService_1.name);
        this.CART_CACHE_KEY = (key) => `cartId:${key}`;
    }
    async createCart(userId) {
        try {
            const id = util_1.Utils.generateBigInt();
            return await this.cartRepository.insert({
                id: id,
                user_id: userId,
                update_at: new Date(),
            });
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.BadRequestException(err);
        }
    }
    async getCart(userId) {
        try {
            const cacheKey = this.CART_CACHE_KEY(String(userId));
            return this.redisService.checkCacheMemo(cacheKey, async () => {
                return await this.cartRepository.findOne({
                    where: { user_id: userId },
                    relations: ['cart_item'],
                });
            });
        }
        catch (err) {
            this.logger.debug(err);
            throw new common_1.BadRequestException(err);
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        redis_service_1.RedisService])
], CartService);
