export interface User {
  _id: string
  name: string
  phone_number: string
  email: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
  role: 'admin' | 'user'
  forgot_password_token: string // jwt hoặc '' nếu đã xác thực email

  address: string // optional
  avatar: string // optional
  cccd: string // optional
  gender: string // optional
}
export interface UserListPaginate {
  users: User[]
  pagination: {
    page: number | string
    limit: number | string
    totalItems: number | string
    page_size: number | string
  }
}
