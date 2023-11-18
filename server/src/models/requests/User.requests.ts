import { JwtPayload } from 'jsonwebtoken'

export interface RegisterBody {
  name: string
  phone_number: string
  email: string
  password: string
  confirm_password?: string
}
export interface CreateAccountBody {
  name: string
  phone_number: string
  email: string
  password: string
  role: 'admin' | 'user'
  gender?: string
  date_of_birth?: string
  address?: string
  avatar?: string
  cccd?: string
}
export interface LoginBody {
  email: string
  password: string
}
export interface LogoutBody {
  refresh_token: string
}
export interface TokenPayload extends JwtPayload {
  userId: string
  email: string
  role: string
  created_at: string
  exp: number
  iat: number
}

export interface ProfileBody {
  _id: string
  name: string
  phone_number: string
  email: string
  cccd: string
  avatar: string
  address: string
  date_of_birth: string
  gender: string
  role: 'admin' | 'user'
}
