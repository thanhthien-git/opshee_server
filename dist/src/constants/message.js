"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFY = exports.ERROR_AUTH = exports.ERROR_MESSAGE = void 0;
exports.ERROR_MESSAGE = {
    USER_NOT_FOUND: 'Không tìm thấy người dùng',
    WRONG_PASSWORD: 'Sai mật khẩu',
};
exports.ERROR_AUTH = {
    EXISTED: (field) => {
        return `${field} đã tồn tại`;
    },
};
exports.NOTIFY = {
    SIGN_UP_SUCCESS: 'Tạo tài khoản thành công!',
};
//# sourceMappingURL=message.js.map