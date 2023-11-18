export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface BookingType {
  _id: string
  room_id: string
  user_id: string
  check_in: string
  payment_method: number
  status: BookingStatus
  created_at: string
  updated_at: string
}
export interface BookingBody {
  room_id: string
  user_id: string
  payment_method: number
  check_in: string
  status: BookingStatus
}
