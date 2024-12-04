export const ERROR_MESSAGE = {
  USER_NOT_FOUND: 'Không tìm thấy người dùng',
  WRONG_PASSWORD: 'Sai mật khẩu',
};

export const ERROR_AUTH = {
  EXISTED: (field: string) => {
    return `${field} đã tồn tại`;
  },
};

export const NOTIFY = {
  SIGN_UP_SUCCESS: 'Tạo tài khoản thành công!',
};
