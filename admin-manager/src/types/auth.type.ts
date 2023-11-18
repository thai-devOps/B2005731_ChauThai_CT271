import { RoomType } from './room.type'
import { User } from './user.type'
import { ResponseSuccessAPI } from './utils.type'

export type Auth = ResponseSuccessAPI<{
  access_token: string
  exp_AT: number
  exp_RT: number
  refresh_token: string
  user: User
}>
export type RoomResponse = ResponseSuccessAPI<{
  rooms: RoomType[]
  paginate: {
    page: number
    limit: number
    totalItems: number
    page_size: number
  }
}>

export type UserResponse = ResponseSuccessAPI<{
  pagination: {
    page: number
    limit: number
    totalItems: number
    page_size: number
  }
  users: User[]
}>
