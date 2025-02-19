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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const role_guard_1 = require("../../guards/role/role.guard");
const message_1 = require("../../constants/message");
const regex_1 = require("../../constants/regex");
const update_info_dto_1 = require("./dto/update-info.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getById(req) {
        return this.userService.getUserById(req.user.userId);
    }
    async changePassword(req, newPassword) {
        if (!regex_1.passwordRegex.test(newPassword)) {
            throw new common_1.BadRequestException({
                message: message_1.ERROR_MESSAGE.CHANGE_PASSWORD_WRONG_FORMAT,
            });
        }
        const data = {
            userId: req.user.userId,
            newPassword: newPassword,
        };
        return this.userService.changePassword(data);
    }
    async updateUser(req, data) {
        const updateData = { userId: req.user.userId, ...data };
        return await this.userService.updateInfo(updateData);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)('/change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('/update-user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_info_dto_1.UpdateInfoDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('/users'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
