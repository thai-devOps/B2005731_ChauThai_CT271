import { BookingsResponse } from '~/types/booking.type'
import { RoomType } from '~/types/room.type'
import { UtilitiesParams, Utility } from '~/types/utility.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import https from '~/utils/https'
import { CreateAccountType, ProfileType } from '~/utils/rules'

export const responsePaths = {
  register: '/user/register',
  create: '/user/create-account',
  login: '/user/login',
  changePassword: '/user/change-password',
  logout: '/user/logout',
  refreshToken: '/user/refresh-token',
  getUserProfile: '/user/profile',
  updateProfile: '/user/profile',
  getRooms: '/rooms',
  getAllRooms: '/rooms/getAll',
  getAllUsers: '/user/all'
}

export const registerAccount = (body: { email: string; password: string; name: string; phone_number: string }) =>
  https.post(responsePaths.register, body)
export const loginAccount = (body: { email: string; password: string }) => https.post(responsePaths.login, body)
export const logoutAccount = (body: { refresh_token: string }) => https.post(responsePaths.logout, body)
export const refreshToken = (body: { refresh_token: string }) => https.post(responsePaths.refreshToken, body)

export const getUserProfile = () => https.get(responsePaths.getUserProfile)
export const updateProfile = (data: ProfileType) => https.put(responsePaths.updateProfile, data)
export const getUserById = (id: string) => https.get(`/user/${id}`)
export const getRooms = (params: { page: string; limit: string }) =>
  https.get(`/rooms?page=${params.page}&limit=${params.limit}`)
export const getUserPaginate = (params: { page: string; limit: string }) =>
  https.get(`/user?page=${params.page}&limit=${params.limit}`)
export const getAllRooms = () => https.get(responsePaths.getAllRooms)
/**
 * @description: get all users
 */
export const getAllUsers = () => https.get(responsePaths.getAllUsers)

export const getRoomById = (id: string) => https.get(`/rooms/${id}`)

export const createRoom = (data: RoomType) => https.post('/rooms', data)

export const updateRoomById = (id: string, data: RoomType) => https.put(`/rooms/${id}`, data)

export const deleteUser = (id: string) => https.delete(`/user/${id}`)
export const createUserAccount = (data: CreateAccountType) => https.post(responsePaths.create, data)

export const getAllUtilities = (data: UtilitiesParams) => https.get(`/utilities?page=${data.page}&limit=${data.limit}`)

export const getAllUtilitiesNopaginate = () => https.get(`/utilities/getAll`)
export const createUtility = (data: Utility) => https.post('/utilities', data)
export const updateUtilityById = (id: string, data: Utility) => https.put(`/utilities/${id}`, data)
export const deleteUtilityById = (id: string) => https.delete(`/utilities/${id}`)

export const deleteRoomById = (id: string) => https.delete(`/rooms/${id}`)

export const getAllBookings = (params: { page: string; limit: string }) =>
  https.get<ResponseSuccessAPI<BookingsResponse>>(`/bookings?page=${params.page}&limit=${params.limit}`)

export const confirmBooking = ({ id, status }: { id: string; status: string }) =>
  https.put(`/bookings/${id}`, { status })

export const rejectedBooking = ({ id, status }: { id: string; status: string }) =>
  https.put(`/bookings/${id}`, { status })

export const deleteBookingById = (id: string) => https.delete(`/bookings/${id}`)

export const getBookingByUserIdRoomId = ({ user_id, room_id }: { user_id: string; room_id: string }) =>
  https.get(`/bookings/info?user_id=${user_id}&room_id=${room_id}`)

// handle reset password

export const changePassword = ({ password, new_password }: { password: string; new_password: string }) =>
  https.put(`${responsePaths.changePassword}`, { password, new_password })
