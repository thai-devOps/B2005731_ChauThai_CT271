export type ResponseRooms = {
  message: string
  data?: RoomType[]
}

export interface RoomListConfig {
  page?: number | string
  limit?: number | string
  status?: RoomStatus
  owner?: string
  search?: string
}

export enum RoomStatus {
  available = 'available',
  rented = 'rented',
  staying = 'staying', // đang ở
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
  _id?: string
  name: string
  price: number
  area: number
  address: string
  description: string
  images: string[] | string
  utilities: UtilityType[] | string[]
  status: RoomStatus | string
  roomer?: string
  capacity: number
  deposit: number
  created_at?: string
  updated_at?: string
}

export interface UpdateRoomBody {
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
  created_at: string
}

export type ResponseRoomDetails = {
  message: string
  data: RoomType
}
export interface RoomListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'created_at' | 'price' | 'capacity' | 'area'
  order?: 'asc' | 'desc'
  exclude?: string
  price_max?: number | string
  price_min?: number | string
}
