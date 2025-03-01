"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../../config/config");
const shop_entity_1 = require("../../models/entities/shop.entity");
const user_entity_1 = require("../../models/entities/user.entity");
const ENTITIES = [user_entity_1.UserEntity, shop_entity_1.ShopEntity];
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.CONFIG_DATABASE.load_env,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: config_1.CONFIG.database.postgres,
                entities: [...ENTITIES],
                autoLoadEntities: true,
                ssl: { rejectUnauthorized: false },
            }),
            mongoose_1.MongooseModule.forRoot(config_1.CONFIG.database.mongo),
        ],
    })
], DatabaseModule);
