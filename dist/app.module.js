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
const config_1 = require("./config/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const auth_middleware_1 = require("./middlewares/auth/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const config_2 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const product_module_1 = require("./modules/products/product.module");
const redis_module_1 = require("./modules/redis/redis/redis.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('users');
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
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                exclude: ['/api*'],
                serveStaticOptions: {
                    cacheControl: true,
                    maxAge: 43200000,
                    immutable: true,
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.POSTGRES_URL,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                ssl: { rejectUnauthorized: false },
            }),
            config_1.CONFIG_DATABASE.load_env,
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL),
            jwt_1.JwtModule.registerAsync({
                imports: [config_2.ConfigModule],
                inject: [config_2.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
    })
], AppModule);
