import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BookingBody } from '~/models/requests/Booking.requests'
import bookingService from '~/services/bookings.services'

export const bookingMiddleware = async (
  req: Request<ParamsDictionary, any, BookingBody>,
  res: Response,
  next: NextFunction
) => {
  // So sánh nếu user đã đặt phòng thì không cho đặt phòng nữa (có thể làm ở đây hoặc ở controller)
  const { user_id, room_id } = req.body
  // check exist booking with user_id and room_id
  const booking = await bookingService.checkExistBooking(user_id, room_id)
  if (booking) {
    return res.status(400).json({
      message: 'Bạn đã đặt phòng này rồi'
    })
  }
  next()
}
