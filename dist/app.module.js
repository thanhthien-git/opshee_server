"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const auth_middleware_1 = require("./middlewares/auth/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const product_module_1 = require("./modules/products/product.module");
const redis_module_1 = require("./modules/redis/redis/redis.module");
const database_module_1 = require("./modules/database/database.module");
const shop_module_1 = require("./modules/shops/shop/shop.module");
const config_1 = require("@nestjs/config");
const shop_middleware_1 = require("./middlewares/auth/shop.middleware");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
const token_module_1 = require("./modules/token/token.module");
const orders_service_1 = require("./modules/orders/orders.service");
const lock_service_1 = require("./modules/lock/lock.service");
const PROTECTED_ROUTES = ['user'];
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(...PROTECTED_ROUTES);
        consumer
            .apply(shop_middleware_1.ShopMiddleware)
            .exclude({ path: 'product/search', method: common_1.RequestMethod.GET }, { path: 'product/:id', method: common_1.RequestMethod.GET }, { path: 'product', method: common_1.RequestMethod.GET })
            .forRoutes('product');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            product_module_1.ProductModule,
            redis_module_1.RedisModule,
            cloudinary_module_1.CloudinaryModule,
            token_module_1.TokenModule,
            shop_module_1.ShopModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            jwt_1.JwtModule,
            orders_service_1.OrdersService,
            lock_service_1.LockUtil,
        ],
    })
], AppModule);
