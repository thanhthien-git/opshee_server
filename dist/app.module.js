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
const sign_in_module_1 = require("./modules/auth/sign-in/sign-in.module");
const config_1 = require("./config/config");
const typeorm_1 = require("@nestjs/typeorm");
const sign_up_module_1 = require("./modules/auth/sign-up/sign-up.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sign_in_module_1.SignInModule,
            sign_up_module_1.SignUpModule,
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
        ],
    })
], AppModule);
