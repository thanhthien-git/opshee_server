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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_1 = require("../../constants/message");
const user_entity_1 = require("../../models/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    async getUserById(id) {
        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });
        if (user.isDeleted === true || user.isBanned === true) {
            throw new common_1.BadRequestException({ message: message_1.ERROR_MESSAGE.USER_NOT_FOUND });
        }
        const { isBanned, isDeleted, user_password, ...props } = user;
        return { ...props };
    }
    async updateInfo(data) {
        try {
            const { userId, user_first_name, user_last_name, date_of_birth } = data;
            await this.userRepository.update(Number(userId), {
                user_first_name: user_first_name,
                user_last_name: user_last_name,
                date_of_birth: date_of_birth,
            });
            return {
                message: message_1.SUCCESS_MESSAGE.UPDATE_SUCCESS,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: message_1.ERROR_MESSAGE.UPDATE_FAILED });
        }
    }
    async changePassword(data) {
        try {
            const { userId, newPassword } = data;
            const hashed = bcrypt.hashSync(newPassword, 10);
            await this.userRepository.update(Number(userId), {
                user_password: hashed,
            });
            return {
                message: message_1.SUCCESS_MESSAGE.CHANGE_PASSWORD_SUCCESS,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: message_1.ERROR_MESSAGE.CHANGE_PASSWORD_FAILED,
            });
        }
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "userRepository", void 0);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
