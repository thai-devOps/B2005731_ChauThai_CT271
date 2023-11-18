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
  // handle price number with error message when user input string or empty string or null or undefined required
  price: yup
    .number()
    .required('Bạn cần nhập giá phòng')
    .typeError('Giá phòng phải là một số')
    .test('is-number', 'Giá phòng không hợp lệ', (value) => !isNaN(value)),
  area: yup
    .number()
    .required('Bạn cần nhập diện tích')
    .typeError('Diện tích phải là một số')
    .test('is-number', 'Diện tích không hợp lệ', (value) => !isNaN(value)),
  address: yup.string().required('Bạn cần nhập địa chỉ phòng'),
  description: yup.string().required('Bạn cần nhập mô tả phòng'),
  images: yup.string().required('Bạn cần nhập hình ảnh phòng'),
  deposit: yup
    .number()
    .required('Bạn cần nhập tiền đặt cọc')
    .typeError('Tiền đặt cọc phải là một số')
    .test('is-number', 'Tiền cọc không hợp lệ', (value) => !isNaN(value)),
  capacity: yup
    .number()
    .required('Bạn cần nhập số lượng người tối đa')
    .typeError('Số lượng người tối đa phải là một số')
    .test('is-number', 'Số lượng người tối đa không hợp lệ', (value) => !isNaN(value)),
  status: yup.string().required('Bạn cần chọn trạng thái phòng')
})

export const createAccountSchema = yup.object({
  name: yup.string().required('Bạn cần nhập họ tên'),
  role: yup.string().required('Bạn cần nhập quyền'),
  phone_number: yup
    .string()
    .required('Bạn cần nhập số điện thoại')
    .min(10, 'Số điện thoại không hợp lệ')
    .max(10, 'Số điện thoại không hợp lệ'),
  email: yup.string().required('Bạn cần nhập email').email('Email không đúng định dạng'),
  password: yup.string().required('Bạn cần nhập mật khẩu').min(6, 'Mật khẩu phải có độ dài từ 6 kí tự'),
  address: yup.string().optional(),
  date_of_birth: yup.string().optional(),
  cccd: yup.string().optional(),
  gender: yup.string().optional(),
  avatar: yup.string().optional()
})

export const createUtilitySchema = yup.object({
  name: yup.string().required('Bạn cần nhập tên tiện ích'),
  price: yup.number().required('Bạn cần nhập giá tiện ích'),
  unit: yup.string().required('Bạn cần nhập đơn vị tiện ích')
})
export const updateUtilitySchema = yup.object({
  name: yup.string().optional(),
  price: yup.number().optional(),
  unit: yup.string().optional()
})
export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Mật khẩu không được để trống'),
  new_password: yup.string().required('Mật khẩu không được để trống'),
  confirm_new_password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .oneOf([yup.ref('new_password')], 'Mật khẩu không khớp')
})
export type CreateAccountType = yup.InferType<typeof createAccountSchema>
export type FormRegisterType = yup.InferType<typeof schema>
export type ProfileType = yup.InferType<typeof profileSchema>
export type RoomTypeForm = yup.InferType<typeof roomSchema>
export type FormLoginType = yup.InferType<typeof LoginSchema>
export type CreateUtilityType = yup.InferType<typeof createUtilitySchema>
export type UpdateUtilityType = yup.InferType<typeof updateUtilitySchema>
export type ResetFormType = yup.InferType<typeof resetPasswordSchema>
