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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPuschargedGuard = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../../orders/orders.service");
let IsPuschargedGuard = class IsPuschargedGuard {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request;
        const productId = request.query.productId;
        const isBuyed = await this.orderService.isPuscharge(productId, userId);
        return !!isBuyed;
    }
};
exports.IsPuschargedGuard = IsPuschargedGuard;
exports.IsPuschargedGuard = IsPuschargedGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], IsPuschargedGuard);
