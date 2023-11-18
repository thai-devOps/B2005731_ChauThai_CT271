import { ObjectId } from 'mongodb'
interface UserType {
  _id?: ObjectId
  name: string
  phone_number: string
  email: string
  date_of_birth?: string
  password: string
  created_at?: string
  updated_at?: string
  role?: 'admin' | 'user'
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  address?: string // optional
  avatar?: string // optional
  cccd?: string // optional
  gender?: string // optional
}
export default class User {
  _id: ObjectId
  name: string
  phone_number: string
  email: string
  date_of_birth: string
  role: 'admin' | 'user'
  password: string
  created_at: string
  updated_at: string
  address: string // optional
  avatar: string // optional
  forgot_password_token: string // jwt hoặc ''
  cccd: string // optional
  gender: string // optional

  constructor(user: UserType) {
    const date = new Date().toISOString()
    this._id = user._id || new ObjectId()
    this.avatar = user.avatar || 'Chưa cập nhật'
    this.name = user.name
    this.date_of_birth = user.date_of_birth || 'Chưa cập nhật'
    this.email = user.email
    this.role = user.role || 'user'
    this.password = user.password
    this.forgot_password_token = user.forgot_password_token || ''
    this.phone_number = user.phone_number
    this.address = user.address || 'Chưa cập nhật'
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.cccd = user.cccd || 'Chưa cập nhật'
    this.gender = user.gender || 'Chưa cập nhật'
  }
}
