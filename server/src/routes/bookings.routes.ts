import { Router } from 'express'
import bookingsController from '~/controllers/bookings.controllers'
import { bookingMiddleware } from '~/middlewares/booking.middleware'
import { wrapRequestHanlers } from '~/utils/handles'

const bookingRouter = Router()

/**
 * description: create a new booking for a user
 * request: POST /bookings
 * response: 201
 * tags: bookings
 * security: bearerAuth
 * body: {userId: string, roomId: string, checkIn: string, bookingStatus: BookingStatus}
 */
bookingRouter.post('/', bookingMiddleware, wrapRequestHanlers(bookingsController.createBooking))

/**
 * description: get all bookings admin manager
 * request: GET /bookings
 * response: 200
 * tags: bookings
 * security: bearerAuth
 * query: condition, sort_by, order, page, limit
 */
bookingRouter.get('/', wrapRequestHanlers(bookingsController.getBookings))

/**
 * description: Update booking status by id
 * request: PUT /bookings/:id
 * response: 200
 * tags: bookings
 * security: bearerAuth
 * body: {status: BookingStatus}
 */

bookingRouter.put('/:id', wrapRequestHanlers(bookingsController.updateBookingById))

/**
 * description: delete booking by id
 * request: DELETE /bookings/:id
 * response: 200
 * tags: bookings
 * security: bearerAuth
 */
bookingRouter.delete('/:id', wrapRequestHanlers(bookingsController.deleteBookingById))

/**
 * description: get bookings by user id
 */
bookingRouter.get('/user/:id', wrapRequestHanlers(bookingsController.getBookingsByUserId))

/**
 * description: get bookings by room id and user id
 * request: GET /bookings/info
 * response: 200
 * tags: bookings
 * security: bearerAuth
 * query: user_id, room_id
 */
bookingRouter.get('/info', wrapRequestHanlers(bookingsController.getBookingByUserIdRoomId))
export default bookingRouter
