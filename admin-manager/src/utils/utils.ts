import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from '~/constants/httpStatusCode.emum'

export function isAxiosError<T>(err: unknown): err is AxiosError<T> {
  return axios.isAxiosError(err)
}
export function isAxiosUnprocessableEntityError<FormError>(err: unknown): err is AxiosError<FormError> {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isAxiosUnauthorizedError<AuthorizedError>(err: unknown): err is AxiosError<AuthorizedError> {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.Unauthorized
}
export function isAxiosAccessTokenExpired(err: unknown): boolean {
  return (
    isAxiosUnauthorizedError<{
      message: string
    }>(err) && err.response?.data.message === 'Access_token expired'
  )
}
export function convertUTCtoCustomFormat(utcTimestamp: string): string {
  const utcDate = new Date(utcTimestamp)
  const day = utcDate.getUTCDate()
  const month = utcDate.getUTCMonth() + 1 // Months are zero-based, so we add 1
  const year = utcDate.getUTCFullYear()

  // Create a string in the desired format
  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`

  return formattedDate
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

export function formatDateTime(date: string): string {
  const parsedDate: Date = new Date(date)

  // Format the date in the desired format
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const formattedDate: string = parsedDate.toLocaleDateString(undefined, options)
  const dateParts = formattedDate.split('/')
  const formattedDateNew = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`
  return formattedDateNew
}
// handle config room status for table room list;
/**
 *  available = 'available',
  rented = 'rented',lease, hire,
  pending = 'pending',
  unavailable = 'unavailable',
  repairing = 'repairing',
  moving_out = 'moving_out',
 */

export function handleConfigRoomStatus(status: string): string {
  switch (status) {
    case 'available':
      return 'Còn trống'
    case 'rented':
      return 'Đã đặt cọc'
    case 'staying':
      return 'Đang ở'
    case 'pending':
      return 'Đang chờ'
    case 'repairing':
      return 'Đang sửa chữa'
    case 'moving_out':
      return 'Sắp dọn ra'
    default:
      return 'Không xác định'
  }
}
