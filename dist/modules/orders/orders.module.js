"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
const order_entity_1 = require("./entities/order.entity");
const user_entity_1 = require("../../models/entities/user.entity");
const shop_entity_1 = require("../../models/entities/shop.entity");
const stocks_module_1 = require("../stocks/stocks.module");
const order_context_service_1 = require("./context/order-context.service");
const product_module_1 = require("../products/product.module");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_item_entity_1.OrderItemEntity, order_entity_1.Order, user_entity_1.UserEntity, shop_entity_1.ShopEntity]),
            stocks_module_1.StocksModule,
            product_module_1.ProductModule,
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, order_context_service_1.OrderContextService],
        exports: [orders_service_1.OrdersService, order_context_service_1.OrderContextService],
    })
], OrdersModule);
