import * as yup from 'yup'
export const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập họ tên'),
    phone_number: yup
      .string()
      .required('Bạn cần nhập số điện thoại')
      .min(10, 'Số điện thoại không hợp lệ')
      .max(10, 'Số điện thoại không hợp lệ'),
    email: yup
      .string()
      .required('Bạn cần nhập email')
      .email('Email không đúng định dạng')
      .min(5, 'Email phải có độ dài từ 5 - 160 ký tự')
      .max(160, 'Email phải có độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Bạn cần nhập mật khẩu')
      .min(6, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự')
      .max(160, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Bạn cần nhập lại mật khẩu')
      .min(6, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự')
      .max(160, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự')
      .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
    accepted_condition: yup.bool().oneOf([true], 'Bạn cần đồng ý với điều khoản và điều kiện của chúng tôi.').required()
  })
  .required()
export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .required('Bạn cần nhập email')
      .email('Email không đúng định dạng')
      .min(5, 'Email phải có độ dài từ 5 - 160 ký tự')
      .max(160, 'Email phải có độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Bạn cần nhập mật khẩu')
      .min(6, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự')
      .max(160, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự')
  })
  .required()
export const profileSchema = yup.object({
  _id: yup.string().required('Bạn cần nhập id'),
  cccd: yup.string().required('Bạn cần nhập số chứng minh nhân dân'),
  avatar: yup.string().required('Bạn cần nhập avatar'),
  address: yup.string().required('Bạn cần nhập địa chỉ'),
  date_of_birth: yup.string().required('Bạn cần nhập ngày sinh'),
  gender: yup.string().required('Bạn cần nhập giới tính'),
  name: yup.string().required('Bạn cần nhập họ tên'),
  phone_number: yup
    .string()
    .required('Bạn cần nhập số điện thoại')
    .min(10, 'Số điện thoại không hợp lệ')
    .max(10, 'Số điện thoại không hợp lệ'),
  email: yup
    .string()
    .required('Bạn cần nhập email')
    .email('Email không đúng định dạng')
    .min(5, 'Email phải có độ dài từ 5 - 160 ký tự')
    .max(160, 'Email phải có độ dài từ 5 - 160 ký tự'),
  role: yup.string().required('Bạn cần nhập quyền')
})
export const roomSchema = yup.object({
  name: yup.string().required('Bạn cần nhập tên phòng'),
  price: yup.string().required('Bạn cần nhập giá phòng'),
  area: yup.string().required('Bạn cần nhập diện tích phòng'),
  address: yup.string().required('Bạn cần nhập địa chỉ phòng'),
  description: yup.string().required('Bạn cần nhập mô tả phòng'),
  images: yup.string().required('Bạn cần nhập hình ảnh phòng'),
  utilities: yup.string().required('Bạn cần nhập tiện ích phòng'),
  deposit: yup.string().required('Bạn cần nhập tiền đặt cọc'),
  capacity: yup.string().required('Bạn cần nhập số lượng người tối đa'),
  water: yup.string().required('Bạn cần nhập giá nước'),
  electric: yup.string().required('Bạn cần nhập giá điện'),
  status: yup.string().required('Bạn cần nhập trạng thái phòng')
})
export const searchRoomSchema = yup.object({
  address: yup.string().optional(),
  price: yup.string().optional(),
  area: yup.string().optional(),
  capacity: yup.string().optional()
})
export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Mật khẩu không được để trống'),
  new_password: yup.string().required('Mật khẩu không được để trống'),
  confirm_new_password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .oneOf([yup.ref('new_password')], 'Mật khẩu không khớp')
})

export type FormSearchRoomType = yup.InferType<typeof searchRoomSchema>

export type FormRegisterType = yup.InferType<typeof schema>
export type ProfileType = yup.InferType<typeof profileSchema>
export type RoomTypeForm = yup.InferType<typeof roomSchema>
export type FormLoginType = yup.InferType<typeof LoginSchema>
export type ResetFormType = yup.InferType<typeof resetPasswordSchema>
