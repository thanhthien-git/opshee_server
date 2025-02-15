export const ERROR_MESSAGE = {
  USER_NOT_FOUND: 'Không tìm thấy người dùng',
  WRONG_PASSWORD: 'Sai mật khẩu',
  CHANGE_PASSWORD_FAILED: "Đổi mật khẩu thất bại",
  CHANGE_PASSWORD_WRONG_FORMAT: "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái in hoa"
};

export const ERROR_AUTH = {
  EXISTED: (field: string) => {
    return `${field} đã tồn tại`;
  },
};

export const NOTIFY = {
  SIGN_UP_SUCCESS: 'Tạo tài khoản thành công!',
};

export const SUCCESS_MESSAGE = {
  CHANGE_PASSWORD_SUCCESS : "Đổi mật khẩu thành công"
}