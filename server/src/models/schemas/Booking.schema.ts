import { ObjectId } from 'mongodb'
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}
interface IBooking {
  _id?: ObjectId
  room_id: ObjectId
  user_id: ObjectId
  check_in: string
  payment_method: number
  status: BookingStatus
  created_at?: string
  updated_at?: string
}

export default class Booking {
  _id?: ObjectId
  room_id: ObjectId
  user_id: ObjectId
  check_in: string
  payment_method: number
  status: BookingStatus
  created_at?: string
  updated_at?: string
  constructor(booking: IBooking) {
    const date = new Date().toISOString()
    this._id = booking._id || new ObjectId()
    this.room_id = booking.room_id
    this.user_id = booking.user_id
    this.check_in = booking.check_in
    this.status = booking.status
    this.payment_method = booking.payment_method
    this.created_at = booking.created_at || date
    this.updated_at = booking.updated_at || date
  }
}
