import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUserById } from '~/apis/auth.api'
import { BookingStatus, BookingType } from '~/types/booking.type'
import { User } from '~/types/user.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
interface BookingItemRecentProps {
  booking: BookingType
}
const BookingItemRecent: React.FC<BookingItemRecentProps> = ({ booking }) => {
  const { data: userData } = useQuery({
    queryKey: ['user-bookings', booking.user_id],
    queryFn: () => {
      return getUserById(booking.user_id)
    },
    refetchOnWindowFocus: true,
    enabled: !!booking.user_id
  })
  const user = (userData?.data as ResponseSuccessAPI<User>)?.data
  // format check in date from isostring to dd/mm/yyyy
  const parsedDate = new Date(booking.check_in)
  const day = parsedDate.getUTCDate()
  const month = parsedDate.getUTCMonth() + 1 // Months are zero-based
  const year = parsedDate.getUTCFullYear()

  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`
  let renderBookingStatusBadge = null
  let renderPaymentMethodBadge = null

  if (booking.payment_method === 0) {
    renderPaymentMethodBadge = <span className='py-1 px-2.5 rounded-md bg-yellow-400 text-white'>Trực tiếp</span>
  }
  if (booking.payment_method === 1) {
    renderPaymentMethodBadge = <span className='py-1 px-2.5 rounded-md bg-yellow-400 text-white'>Paypal</span>
  }
  if (booking.status === BookingStatus.PENDING) {
    renderBookingStatusBadge = <span className='py-1 px-2.5 rounded-md bg-blue-700 text-white'>Đang chờ</span>
  }
  if (booking.status === BookingStatus.CONFIRMED) {
    renderBookingStatusBadge = <span className='py-1 px-2.5 rounded-md bg-green-700 text-white'>Đã xác nhận</span>
  }
  if (booking.status === BookingStatus.CANCELLED) {
    renderBookingStatusBadge = <span className='py-1 px-2.5 rounded-md bg-red-700 text-white'>Đã hủy</span>
  }
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {user?.name}
      </th>
      <td className='px-6 py-4 truncate'>{formattedDate}</td>
      <td className='px-6 py-4'>{renderPaymentMethodBadge}</td>
      <td className='px-6 py-4 truncate'>{renderBookingStatusBadge}</td>
    </tr>
  )
}
export default BookingItemRecent
