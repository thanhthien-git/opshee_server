"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const mongoose_1 = require("@nestjs/mongoose");
const products_scheme_1 = require("../../models/scheme/products.scheme");
const redis_module_1 = require("../redis/redis/redis.module");
const redis_service_1 = require("../redis/redis/redis.service");
const product_redis_service_1 = require("./product.redis.service");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: products_scheme_1.Product.name, schema: products_scheme_1.ProductSchema }]),
            redis_module_1.RedisModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, redis_service_1.RedisService, product_redis_service_1.RedisProductService],
    })
], ProductModule);
