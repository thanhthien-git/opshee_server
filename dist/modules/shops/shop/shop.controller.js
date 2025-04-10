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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const sign_up_dto_1 = require("../dto/sign-up.dto");
const login_dto_1 = require("../dto/login.dto");
const shop_service_1 = require("./shop.service");
const filter_dto_1 = require("../dto/filter.dto");
const update_dto_1 = require("../dto/update.dto");
const role_enum_1 = require("../../../enum/role.enum");
const role_decorators_1 = require("../../../decorators/role.decorators");
const ownership_guard_1 = require("../guards/ownership.guard");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    async register(data) {
        return await this.shopService.register(data);
    }
    async login(data) {
        return await this.shopService.login(data);
    }
    async search(data) {
        return await this.shopService.getShopByName(data.shopName);
    }
    async update(dto, req) {
        dto.shopId = req.userId;
        return await this.shopService.update(dto);
    }
};
exports.ShopController = ShopController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.ShopRegisterDto]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.ShopLoginDTO]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.ShopFilterDto]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(ownership_guard_1.OwnerShipGuard),
    (0, role_decorators_1.Roles)(role_enum_1.ROLE.SHOP),
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.ShopUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "update", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)('shop'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
