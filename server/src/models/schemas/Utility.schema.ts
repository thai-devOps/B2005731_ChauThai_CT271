import { ObjectId } from 'mongodb'

export enum UtilityStatus {
  inavalible = 'Không có sẵn',
  active = 'Đang sử dụng',
  repairing = 'Đang sửa chữa',
  default = 'Mặc định'
}

export interface UtilityType {
  _id: ObjectId
  name: string // tên tiện ích
  price: number // giá tiền
  unit: string // đơn vị tính (m3, kWh, ...)
  created_at: string
  updated_at?: string
}
export interface UtilityRoomType {
  _id?: ObjectId
  name: string // tên tiện ích
  price: number // giá tiền
  unit?: string // đơn vị tính (m3, kWh, ...),
  status?: UtilityStatus
}

export class Utility {
  _id: ObjectId
  name: string // tên tiện ích
  price: number // giá tiền
  unit?: string // đơn vị tính (m3, kWh, ...)
  created_at: string
  updated_at: string

  constructor(utility: UtilityType) {
    const date = new Date().toISOString()
    this._id = utility._id || new ObjectId()
    this.name = utility.name
    this.price = utility.price
    this.unit = utility.unit || ''
    this.created_at = utility.created_at || date
    this.updated_at = utility.updated_at || date
  }
}
