"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOwnerShipGuard = void 0;
const role_enum_1 = require("../../../enum/role.enum");
class ProductOwnerShipGuard {
    constructor(productService) {
        this.productService = productService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { userId, role } = request;
        const productId = request.query.productId;
        if (role !== role_enum_1.ROLE.USER)
            return false;
        if (role === role_enum_1.ROLE.ADMIN)
            return true;
        const product = await this.productService.getProductById(productId);
        return product === userId;
    }
}
exports.ProductOwnerShipGuard = ProductOwnerShipGuard;
