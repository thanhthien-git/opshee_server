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
const mongoose_1 = require("@nestjs/mongoose");
const products_scheme_1 = require("./schemes/products.scheme");
const redis_module_1 = require("../redis/redis/redis.module");
const redis_service_1 = require("../redis/redis/redis.service");
const product_service_1 = require("./product.service");
const product_repository_1 = require("./product.repository");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const product_variation_scheme_1 = require("./schemes/product-variation.scheme");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: products_scheme_1.Product.name, schema: products_scheme_1.ProductSchema },
                ,
                { name: product_variation_scheme_1.ProductModel.name, schema: product_variation_scheme_1.ProductModelSchema },
            ]),
            redis_module_1.RedisModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [
            product_repository_1.ProductRepository,
            redis_service_1.RedisService,
            product_service_1.RedisProductService,
            cloudinary_service_1.CloudinaryService,
        ],
    })
], ProductModule);
