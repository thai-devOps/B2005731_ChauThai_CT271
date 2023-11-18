import { RoomStatus } from '~/constants/room'
import { UtilityRoomType } from '../schemas/Utility.schema'

export interface CreateRoomBody {
  name: string
  description: string
  area: number
  price: number
  deposit: number
  images: string
  address: string
  utilities: string[]
  status: RoomStatus
  roomer: string
  capacity: number
  created_at?: string
}
export interface GetRoomsQuery {
  page?: string | number
  limit?: string | number
  sort_by?: 'price' | 'area' | 'capacity' | 'created_at'
  order?: 'asc' | 'desc'
  address?: string
  price?: string | number
  area?: string | number
  capacity?: string | number
  utilities?: string | number
}
