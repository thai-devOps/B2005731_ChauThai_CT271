import { ObjectId } from 'mongodb'
import { Utility, UtilityRoomType } from './Utility.schema'
import { RoomStatus } from '~/constants/room'

interface RoomType {
  _id?: ObjectId
  name: string
  description: string
  area: number
  price: number
  deposit: number
  images: string[]
  address: string
  utilities: UtilityRoomType[]
  status?: RoomStatus
  roomer?: ObjectId
  capacity: number
  created_at?: string
  updated_at?: string
}
export default class Room {
  _id?: ObjectId
  name: string
  description: string
  area: number
  price: number
  deposit: number
  images: string[]
  address: string
  utilities: UtilityRoomType[]
  status: RoomStatus
  roomer?: ObjectId
  capacity: number
  created_at?: string
  updated_at?: string
  constructor(room: RoomType) {
    const date = new Date().toISOString()
    this._id = room._id || new ObjectId()
    this.name = room.name
    this.price = room.price
    this.deposit = room.deposit
    this.area = room.area
    this.address = room.address
    this.description = room.description
    this.images = room.images
    this.status = room.status || RoomStatus.available
    this.roomer = room.roomer || new ObjectId()
    this.capacity = room.capacity
    this.utilities = room.utilities
    this.created_at = room.created_at || date
    this.updated_at = room.updated_at || date
  }
}
