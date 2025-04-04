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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const platform_express_1 = require("@nestjs/platform-express");
const role_guard_1 = require("../../guards/role/role.guard");
const role_enum_1 = require("../../enum/role.enum");
const role_decorators_1 = require("../../decorators/role.decorators");
const product_repository_1 = require("./product.repository");
const filter_product_dto_1 = require("./dto/filter-product.dto");
let ProductController = class ProductController {
    constructor(redisProductService, productRepository) {
        this.redisProductService = redisProductService;
        this.productRepository = productRepository;
    }
    async getProductById(id) {
        return await this.redisProductService.getProductById(id);
    }
    async getDailyDiscover(req) {
        return await req;
    }
    async search(dto) {
        console.log(typeof dto.productHighestPrice);
        return dto;
    }
    async create(files, data, req) {
        let parsedData = JSON.parse(data);
        const requestData = {
            productImages: files,
            ...parsedData,
        };
        const userId = req.user.userId;
        return await this.productRepository.create(requestData, userId);
    }
    async update(files, data) {
        let parsedData = JSON.parse(data);
        let requestData = {
            modelList: parsedData.variation,
            productId: parsedData.productId,
            productImage: files,
            ...parsedData,
        };
        return await this.productRepository.update(requestData);
    }
    async delete(productId, req) {
        const shopId = req.user.userId;
        return await this.productRepository.delete(productId, shopId);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDailyDiscover", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FitlerDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, role_decorators_1.Roles)(role_enum_1.ROLE.SHOP),
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, role_decorators_1.Roles)(role_enum_1.ROLE.SHOP),
    (0, common_1.Patch)('update'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, role_decorators_1.Roles)(role_enum_1.ROLE.SHOP),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.RedisProductService,
        product_repository_1.ProductRepository])
], ProductController);
