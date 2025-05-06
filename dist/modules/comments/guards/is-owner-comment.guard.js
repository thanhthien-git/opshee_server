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
exports.IsOwnerComment = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("../comments.service");
const role_1 = require("../../../constants/role");
let IsOwnerComment = class IsOwnerComment {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { userId, role } = request;
        if (role === role_1.ROLE.ADMIN)
            return true;
        const commentId = request.body.commentId;
        const canDelete = await this.commentService.canDelete(commentId, userId);
        return canDelete;
    }
};
exports.IsOwnerComment = IsOwnerComment;
exports.IsOwnerComment = IsOwnerComment = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], IsOwnerComment);
