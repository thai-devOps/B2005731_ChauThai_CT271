import { BookingBody, BookingStatus } from '~/types/booking.type'
import { RoomListConfig } from '~/types/room.type'
import https from '~/utils/https'
import { ProfileType } from '~/utils/rules'

export const responsePaths = {
  register: '/user/register',
  login: '/user/login',
  changePassword: '/user/change-password',
  logout: '/user/logout',
  refreshToken: '/user/refresh-token',
  getUserProfile: '/user/profile',
  updateProfile: '/user/profile',
  getRooms: '/rooms',
  getRoomsAvailable: '/rooms/available',
  getAllRooms: '/rooms/all'
}

export const registerAccount = (body: { email: string; password: string }) => https.post(responsePaths.register, body)
export const loginAccount = (body: { email: string; password: string }) => https.post(responsePaths.login, body)
export const logoutAccount = (body: { refresh_token: string }) => https.post(responsePaths.logout, body)
export const refreshToken = (body: { refresh_token: string }) => https.post(responsePaths.refreshToken, body)
export const getUserProfile = () => https.get(responsePaths.getUserProfile)
export const updateProfile = (data: ProfileType) => https.put(responsePaths.updateProfile, data)
export const getRooms = (params: {
  page: string
  limit: string
  sort_by: string
  order: string
  address: string
  price: string
  area: string
  capacity: string
}) =>
  https.get(
    `/rooms?page=${params.page}&limit=${params.limit}&sort_by=${params.sort_by}&order=${params.order}&address=${params.address}&price=${params.price}&area=${params.area}&capacity=${params.capacity}`
  )
export const getAllUtilitiesNopaginate = () => https.get(`/utilities/getAll`)
export const getRoomsAvailable = (params: RoomListConfig) => https.get(`/rooms/available`, { params })

export const userCancelBooking = (id: string) => https.put(`/bookings/${id}`, { status: BookingStatus.CANCELLED })
export const getAllRooms = () => https.get(responsePaths.getAllRooms)
export const getRoomDetails = (id: string) => https.get(`/rooms/${id}`)
export const createRoom = (data: any) => https.post('/rooms', data)

// create booking api omit _id field, createdAt, updatedAt use Omit<>
export const createBooking = (data: BookingBody) => https.post('/bookings', data)
// get booking api
export const getBookings = (id: string) => https.get('/bookings/user/' + id)

export const changePassword = ({ password, new_password }: { password: string; new_password: string }) =>
  https.put(`${responsePaths.changePassword}`, { password, new_password })

export const getAllRoomsSamePrice = (price: number, room_id: string) =>
  https.get(`/rooms/price/${price}?exclude=${room_id}`)
