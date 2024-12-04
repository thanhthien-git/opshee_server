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
exports.SignUpController = void 0;
const common_1 = require("@nestjs/common");
const sigu_up_dto_1 = require("./dto/sigu-up.dto");
const sign_up_service_1 = require("./sign-up.service");
const message_1 = require("../../../constants/message");
let SignUpController = class SignUpController {
    constructor(signUpService) {
        this.signUpService = signUpService;
    }
    async verifyPhone(phone) {
        const isExist = await this.signUpService.checkIsExist(phone);
        if (isExist) {
            throw new common_1.BadRequestException({
                message: message_1.ERROR_AUTH.EXISTED('Số điện thoại'),
            });
        }
    }
    async signUp(signUpDto) {
        return await this.signUpService.signUp(signUpDto);
    }
};
exports.SignUpController = SignUpController;
__decorate([
    (0, common_1.Post)('verify-phone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "verifyPhone", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sigu_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "signUp", null);
exports.SignUpController = SignUpController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [sign_up_service_1.SignUpService])
], SignUpController);
