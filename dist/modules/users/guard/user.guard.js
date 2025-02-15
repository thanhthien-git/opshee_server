"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
class UserGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const bodyUserId = request.body.userId || request.params.userId;
        if (!user || user.userId !== bodyUserId) {
            throw new common_1.ForbiddenException('Bạn không có quyền này');
        }
        return true;
    }
}
exports.UserGuard = UserGuard;
