export enum RoomStatus {
  available = 'available',
  rented = 'rented',
  pending = 'pending',
  unavailable = 'unavailable',
  repairing = 'repairing',
  moving_out = 'moving_out'
}

export interface UtilityType {
  _id: string
  name: string // tên tiện ích
  price: number // giá tiền
  unit: string // đơn vị tính (m3, kWh, ...)
  created_at: string
  updated_at: string
}

export type RoomType = {
  _id: string
  name: string
  price: number
  area: number
  address: string
  description: string
  images: string[]
  utilities: UtilityType[]
  status: RoomStatus
  roomer: string
  capacity: number
  deposit: number
  created_at: Date
  updated_at: Date
}
export type ResponseRoomDetails = {
  message: string
  data: RoomType
}
export interface RoomListConfig {
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
