"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_scheme_1 = require("../products/schemes/products.scheme");
const product_variation_scheme_1 = require("../products/schemes/product-variation.scheme");
const redis_module_1 = require("../redis/redis/redis.module");
const stocks_service_1 = require("./stocks.service");
const lock_module_1 = require("../lock/lock.module");
const product_module_1 = require("../products/product.module");
let StocksModule = class StocksModule {
};
exports.StocksModule = StocksModule;
exports.StocksModule = StocksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: products_scheme_1.Product.name, schema: products_scheme_1.ProductSchema },
                { name: product_variation_scheme_1.ProductModel.name, schema: product_variation_scheme_1.ProductModelSchema },
            ]),
            redis_module_1.RedisModule,
            product_module_1.ProductModule,
            lock_module_1.LockModule,
        ],
        providers: [stocks_service_1.StocksService],
        exports: [stocks_service_1.StocksService],
    })
], StocksModule);
