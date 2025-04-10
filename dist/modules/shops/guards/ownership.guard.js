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
exports.OwnerShipGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_1 = require("../../../constants/role");
const shop_entity_1 = require("../../../models/entities/shop.entity");
const typeorm_2 = require("typeorm");
let OwnerShipGuard = class OwnerShipGuard {
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { userId, role } = req;
        if (role === role_1.ROLE.USER)
            return false;
        const currentUser = await this.shopRepository.findOne({
            where: {
                shop_id: userId,
            },
        });
        if (currentUser.is_Deleted)
            return false;
        return currentUser.shop_id === userId;
    }
};
exports.OwnerShipGuard = OwnerShipGuard;
exports.OwnerShipGuard = OwnerShipGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shop_entity_1.ShopEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OwnerShipGuard);
