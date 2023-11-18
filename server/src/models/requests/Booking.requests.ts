import { BookingStatus } from '../schemas/Booking.schema'

export interface BookingBody {
  room_id: string
  user_id: string
  payment_method: number
  check_in: string
  status: BookingStatus
}
