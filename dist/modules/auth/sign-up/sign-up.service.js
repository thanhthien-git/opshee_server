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
exports.SignUpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../models/entities/user.entity");
const typeorm_2 = require("typeorm");
const message_1 = require("../../../constants/message");
const brcypt_service_1 = require("../../../modules/bcrypt/brcypt.service");
let SignUpService = class SignUpService {
    async checkIsExist(validateDto) {
        const user = await this.userRepository.findOne({
            where: [
                { user_email: validateDto.userEmail },
                { user_phone: validateDto.userPhone },
                { user_name: validateDto.userName },
            ],
        });
        if (user) {
            const existingInfo = [];
            if (user.user_name === validateDto.userName)
                existingInfo.push('Tên người dùng');
            if (user.user_phone === validateDto.userPhone)
                existingInfo.push('Số điện thoại');
            if (user.user_email === validateDto.userEmail)
                existingInfo.push('Email');
            throw new common_1.BadRequestException({
                message: message_1.ERROR_AUTH.EXISTED(`${existingInfo.join(', ')}`),
            });
        }
    }
    async signUp(userDto) {
        const { userPhone, userPassword } = userDto;
        const hashedPassword = await brcypt_service_1.BcryptService.encryptString(userPassword);
        const existPhone = await this.userRepository.findOneBy({
            user_phone: userPhone,
        });
        if (existPhone) {
            throw new common_1.BadRequestException({
                message: message_1.ERROR_AUTH.EXISTED('Username'),
            });
        }
        const createRequest = {
            user_first_name: userDto.userFirstName,
            user_last_name: userDto.userLastName,
            date_of_birth: userDto.dayOfBirth,
            user_name: userDto.userName,
            user_phone: userPhone,
            user_password: hashedPassword,
            user_create_at: new Date(),
            user_update_at: new Date(),
            role: userDto.role,
            isBanned: false,
            isDeleted: false,
        };
        const user = this.userRepository.create(createRequest);
        await this.userRepository.save(user);
        return {
            message: message_1.NOTIFY.SIGN_UP_SUCCESS,
        };
    }
};
exports.SignUpService = SignUpService;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], SignUpService.prototype, "userRepository", void 0);
exports.SignUpService = SignUpService = __decorate([
    (0, common_1.Injectable)()
], SignUpService);
