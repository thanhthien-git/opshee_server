"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const sign_in_service_1 = require("./sign-in/sign-in.service");
const sign_up_service_1 = require("./sign-up/sign-up.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../models/entities/user.entity");
const mail_service_1 = require("../mail/mail.service");
const users_service_1 = require("../users/users.service");
const brcypt_service_1 = require("../bcrypt/brcypt.service");
const token_service_1 = require("../token/token.service");
const token_module_1 = require("../token/token.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]), token_module_1.TokenModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            sign_in_service_1.SignInService,
            sign_up_service_1.SignUpService,
            mail_service_1.EmailService,
            users_service_1.UsersService,
            brcypt_service_1.BcryptService,
            token_service_1.TokenService,
        ],
    })
], AuthModule);
