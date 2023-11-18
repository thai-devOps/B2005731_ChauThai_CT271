import { BookingBody } from '~/models/requests/Booking.requests'
import databaseSetvices from './database.services'
import Booking, { BookingStatus } from '~/models/schemas/Booking.schema'
import { ObjectId } from 'mongodb'
import { RoomStatus } from '~/constants/room'

class BookingService {
  public createBooking = async (payload: BookingBody) => {
    const result = await databaseSetvices.bookings.insertOne(
      new Booking({
        user_id: new ObjectId(payload.user_id),
        room_id: new ObjectId(payload.room_id),
        check_in: payload.check_in,
        payment_method: payload.payment_method,
        status: payload.status
      })
    )
    return result
  }
  // get all bookings admin manager
  public getBookings = async ({
    condition,
    sort_by,
    order,
    page,
    limit
  }: {
    condition: any
    sort_by: string
    order: string
    page: number
    limit: number
  }) => {
    const [bookings, totalBookings] = await Promise.all([
      databaseSetvices.bookings
        .find(condition)
        .sort({ check_in: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseSetvices.bookings.countDocuments(condition)
    ])
    return {
      bookings,
      paginate: {
        page: page,
        limit: limit,
        totalItems: totalBookings,
        page_size: Math.ceil(totalBookings / limit)
      }
    }
  }
  // get all bookings of user by id user
  public getBookingsByUserId = async (userId: string) => {
    // get booking by user order desc by check_in
    const bookings = await databaseSetvices.bookings
      .find({ user_id: new ObjectId(userId) })
      .sort({ check_in: -1 })
      .toArray()
    return bookings
  }
  public updateBookingStatus = async (id: string, status: BookingStatus) => {
    const result = await databaseSetvices.bookings.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
    if (status === BookingStatus.CANCELLED) {
      const booking = await databaseSetvices.bookings.findOne({ _id: new ObjectId(id) })
      if (booking) {
        const room = await databaseSetvices.rooms.findOne({ _id: booking.room_id })
        if (room) {
          await databaseSetvices.rooms.updateOne({ _id: booking.room_id }, { $set: { status: RoomStatus.available } })
        }
      }
    } else if (status === BookingStatus.CONFIRMED) {
      const booking = await databaseSetvices.bookings.findOne({ _id: new ObjectId(id) })
      if (booking) {
        const room = await databaseSetvices.rooms.findOne({ _id: booking.room_id })
        if (room) {
          await databaseSetvices.rooms.updateOne(
            { _id: booking.room_id },
            { $set: { status: RoomStatus.rented, roomer: new ObjectId(booking.user_id) } }
          )
        }
      }
    } else {
      const booking = await databaseSetvices.bookings.findOne({ _id: new ObjectId(id) })
      if (booking) {
        const room = await databaseSetvices.rooms.findOne({ _id: booking.room_id })
        if (room) {
          await databaseSetvices.rooms.updateOne({ _id: booking.room_id }, { $set: { status: RoomStatus.pending } })
        }
      }
    }

    return result
  }

  public deleteBooking = async (id: string) => {
    const result = await databaseSetvices.bookings.deleteOne({ _id: new ObjectId(id) })
    return result
  }

  // check exist booking with user_id and room_id
  public checkExistBooking = async (user_id: string, room_id: string) => {
    const booking = await databaseSetvices.bookings.findOne({
      user_id: new ObjectId(user_id),
      room_id: new ObjectId(room_id)
    })
    return booking
  }

  public getBookingByUserIdRoomId = async (user_id: string, room_id: string) => {
    const booking = await databaseSetvices.bookings.findOne({
      user_id: new ObjectId(user_id),
      status: BookingStatus.CONFIRMED,
      room_id: new ObjectId(room_id)
    })
    return booking
  }
}
const bookingService = new BookingService()
export default bookingService
