const responseMessage = {
  error: {
    default: 'Lỗi',
    internalServerError: 'Lỗi hệ thống',
    unauthorized: {
      default: 'Thông tin đăng nhập không chính xác',
      refresh_token_empty: 'Refresh token không được gửi',
      refresh_token_invalid: 'Refresh token không hợp lệ',
      access_token_empty: 'Access token không được gửi',
      invalid_access_token: 'Access token không hợp lệ',
      invalid_refresh_token: 'Refresh token không hợp lệ',
      refresh_token_not_exists: 'Refresh token không tồn tại',
      user_not_exists: 'Người dùng không tồn tại',
      used_or_not_exitst_refresh_token: 'Refresh token đã được sử dụng hoặc không tồn tại'
    },
    unprocessableEntity: {
      default: 'Lỗi validate',
      role: {
        empty: 'Quyền không được để trống'
      },
      email: {
        empty: 'Email không được để trống',
        invalid: 'Email không hợp lệ',
        existed: 'Email đã tồn tại',
        notExists: 'Email không tồn tại'
      },
      password: {
        empty: 'Mật khẩu không được để trống',
        invalid: 'Mật khẩu phải có ít nhất 6 ký tự',
        incorrect: 'Mật khẩu không chính xác',
        weak: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
        notMatch: 'Mật khẩu không khớp',
        notMatchOldPassword: 'Mật khẩu cũ không đúng'
      },
      name: {
        empty: 'Tên không được để trống',
        invalid: 'Tên không hợp lệ'
      },
      phone: {
        empty: 'Số điện thoại không được để trống',
        invalid: 'Số điện thoại không hợp lệ'
      },
      address: {
        empty: 'Địa chỉ không được để trống',
        invalid: 'Địa chỉ không hợp lệ'
      },
      avatar: {
        empty: 'Ảnh đại diện không được để trống',
        invalid: 'Ảnh đại diện không hợp lệ'
      },
      gender: {
        empty: 'Giới tính không được để trống',
        invalid: 'Giới tính không hợp lệ'
      },
      date_of_birth: {
        empty: 'Ngày sinh không được để trống',
        invalid: 'Ngày sinh không hợp lệ'
      },
      incorrect_password_or_email: 'Thông tin đăng nhập không chính xác'
    }
  },
  success: {
    register: 'Đăng ký thành công',
    login: 'Đăng nhập thành công',
    signout: 'Đăng xuất thành công',
    refresh_token: 'Refresh token thành công',
    get_user_profile: 'Lấy thông tin người dùng thành công',
    update_user_profile: 'Cập nhật thông tin người dùng thành công',
    get_all_users_paginate: 'Lấy danh sách người dùng thành công'
  }
}
export default responseMessage
