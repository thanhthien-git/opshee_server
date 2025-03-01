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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisProductService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis/redis/redis.service");
const product_repository_1 = require("./product.repository");
const create_product_dto_1 = require("./dto/create-product.dto");
const role_guard_1 = require("../../guards/role/role.guard");
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
    async create(createProductDto, req) {
        return req;
    }
};
exports.RedisProductService = RedisProductService;
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], RedisProductService.prototype, "create", null);
exports.RedisProductService = RedisProductService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        redis_service_1.RedisService])
], RedisProductService);
