import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BookingBody } from '~/models/requests/Booking.requests'
import { BookingStatus } from '~/models/schemas/Booking.schema'
import bookingService from '~/services/bookings.services'
import { responseSuccess } from '~/utils/response'
const createBooking = async (req: Request<ParamsDictionary, any, BookingBody>, res: Response) => {
  const booking = req.body
  const result = await bookingService.createBooking(booking)
  responseSuccess(res, {
    message: 'create a new booking for a user',
    data: result
  })
}

// get all bookings admin manager
const getBookings = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { condition, sort_by, order, page, limit } = req.query as { [key: string]: string | number }
  const result = await bookingService.getBookings({
    condition,
    sort_by: sort_by as string,
    order: order as string,
    page: parseInt(page as string) || 1,
    limit: parseInt(limit as string) || 1000
  })
  responseSuccess(res, {
    message: 'get all bookings admin manager',
    data: result
  })
}

const updateBookingById = async (req: Request<ParamsDictionary, any, { status: BookingStatus }>, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  const result = await bookingService.updateBookingStatus(id, status)
  responseSuccess(res, {
    message: 'Update booking status by id',
    data: result
  })
}

const deleteBookingById = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { id } = req.params
  const result = await bookingService.deleteBooking(id)
  responseSuccess(res, {
    message: 'delete booking by id',
    data: result
  })
}
const getBookingsByUserId = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { id } = req.params
  const result = await bookingService.getBookingsByUserId(id)
  responseSuccess(res, {
    message: 'get bookings by user id',
    data: result
  })
}

const getBookingByUserIdRoomId = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id, room_id } = req.query as { [key: string]: string }
  const result = await bookingService.getBookingByUserIdRoomId(user_id, room_id)
  responseSuccess(res, {
    message: 'get bookings by user id and room id',
    data: result
  })
}

const bookingsController = {
  createBooking,
  getBookings,
  updateBookingById,
  deleteBookingById,
  getBookingsByUserId,
  getBookingByUserIdRoomId
}
export default bookingsController
