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
export function convertVNDtoUSD(amountInVND: number) {
  if (typeof amountInVND !== 'number') {
    throw new Error('Invalid input. Amount and exchange rate must be numbers.')
  }

  // Chuyển đổi và làm tròn đến hai chữ số thập phân
  const amountInUSD = (amountInVND / 23000).toFixed(2)

  return amountInUSD
}
