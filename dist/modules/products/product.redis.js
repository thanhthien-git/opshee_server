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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisProductService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis/redis/redis.service");
const product_proxy_1 = require("./product.proxy");
let RedisProductService = class RedisProductService {
    constructor(productRepository, redisService) {
        this.productRepository = productRepository;
        this.redisService = redisService;
    }
    async getProductById(id) {
        return await this.redisService.getOrSet(id, async () => {
            return this.productRepository.getProductById(id);
        });
    }
};
exports.RedisProductService = RedisProductService;
exports.RedisProductService = RedisProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof product_proxy_1.ProductRepository !== "undefined" && product_proxy_1.ProductRepository) === "function" ? _a : Object, redis_service_1.RedisService])
], RedisProductService);
