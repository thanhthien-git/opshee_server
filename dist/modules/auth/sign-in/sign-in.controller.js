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
exports.SignInController = void 0;
const common_1 = require("@nestjs/common");
const sign_in_service_1 = require("./sign-in.service");
const login_dto_1 = require("./dto/login.dto");
let SignInController = class SignInController {
    constructor(signInService) {
        this.signInService = signInService;
    }
    async signIn(loginDto) {
        return this.signInService.login(loginDto);
    }
};
exports.SignInController = SignInController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], SignInController.prototype, "signIn", null);
exports.SignInController = SignInController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [sign_in_service_1.SignInService])
], SignInController);
