"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_MESSAGE = exports.SUCCESS_MESSAGE = exports.NOTIFY = exports.ERROR_AUTH = exports.ERROR_MESSAGE = void 0;
exports.ERROR_MESSAGE = {
    USER_NOT_FOUND: 'Không tìm thấy người dùng',
    WRONG_PASSWORD: 'Sai mật khẩu',
    CHANGE_PASSWORD_FAILED: 'Đổi mật khẩu thất bại',
    CHANGE_PASSWORD_WRONG_FORMAT: 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái in hoa',
    UPDATE_FAILED: 'Cập nhật thất bại',
};
exports.ERROR_AUTH = {
    EXISTED: (field) => {
        return `${field} đã tồn tại`;
    },
};
exports.NOTIFY = {
    SIGN_UP_SUCCESS: 'Tạo tài khoản thành công!',
};
exports.SUCCESS_MESSAGE = {
    UPDATE_SUCCESS: 'Cập nhật thành công',
    CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
};
exports.ORDER_MESSAGE = {
    CREATE: {
        SUCCESS: "Order create success",
        FAILED: "Order create failed, please try again later!"
    }
};
