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
var StocksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis/redis/redis.service");
const mongoose_1 = require("@nestjs/mongoose");
const product_variation_scheme_1 = require("../products/schemes/product-variation.scheme");
const mongoose_2 = require("mongoose");
const lockey_1 = require("../lock/constants/lockey");
const lock_service_1 = require("../lock/lock.service");
let StocksService = StocksService_1 = class StocksService {
    constructor(redisService, productVariationModel) {
        this.redisService = redisService;
        this.productVariationModel = productVariationModel;
        this.logger = new common_1.Logger(StocksService_1.name);
        this.lockUtil = new lock_service_1.LockUtil(redisService);
    }
    async getStock(variationId) {
        try {
            const cacheKey = `variation:stock:${variationId}`;
            const cacheStock = await this.redisService.get(cacheKey);
            if (cacheStock) {
                this.logger.debug(`Variation ${variationId} stock is ${cacheStock}`);
                return cacheStock;
            }
            const _id = new mongoose_2.Types.ObjectId(variationId);
            const variation = await this.productVariationModel.findById(_id);
            await this.redisService.set(cacheKey, variation.variation_details.stock);
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
    async updateStock(variationId, quantity) {
        try {
            const cacheKey = `variation:stock:${variationId}`;
            const key = (0, lockey_1.lockey)(cacheKey);
            await this.lockUtil.lockAndExcute(key, async () => {
                console.log(`update stock for ${variationId}`);
                await this.redisService.set(cacheKey, quantity);
            });
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = StocksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(product_variation_scheme_1.ProductModel.name)),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        mongoose_2.Model])
], StocksService);
