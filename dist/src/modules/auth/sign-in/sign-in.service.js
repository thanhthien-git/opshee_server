"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../entities/user.entity");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const message_1 = require("../../../constants/message");
const jwt_1 = require("@nestjs/jwt");
let SignInService = class SignInService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async generateToken(payload) {
        return this.jwtService.sign(payload);
    }
    async comparePassword(password, hashPassword) {
        return await bcrypt.compare(password, hashPassword);
    }
    async login(loginDto) {
        const isEmail = /\S+@\S+\.\S+/.test(loginDto.username);
        const option = isEmail
            ? { user_email: loginDto.username }
            : { user_phone: loginDto.username };
        const user = await this.userRepository.findOne({ where: option });
        if (!user) {
            throw new common_1.BadRequestException({ message: message_1.ERROR_MESSAGE.USER_NOT_FOUND });
        }
        const isMatch = await this.comparePassword(loginDto.password, user.user_password);
        if (!isMatch) {
            throw new common_1.BadRequestException({ messsage: message_1.ERROR_MESSAGE.WRONG_PASSWORD });
        }
        const payload = {
            userId: user.user_id,
            userEmail: user.user_email,
            role: user.role,
        };
        return await this.generateToken(payload);
    }
};
exports.SignInService = SignInService;
exports.SignInService = SignInService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SignInService);
//# sourceMappingURL=sign-in.service.js.map