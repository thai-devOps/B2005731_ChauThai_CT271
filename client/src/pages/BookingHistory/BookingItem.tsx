import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { getRoomDetails, userCancelBooking } from '~/apis/auth.api'
import { BookingStatus, BookingType } from '~/types/booking.type'
import { RoomType } from '~/types/room.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { formatCurrency } from '~/utils/utils'
import {} from '@paypal/react-paypal-js'
interface BookingItemsProps {
  booking: BookingType
}
const BookingItems: React.FC<BookingItemsProps> = ({ booking }) => {
  const { data } = useQuery({
    queryKey: ['room-booking', booking.room_id],
    queryFn: () => {
      return getRoomDetails(booking.room_id).then((res) => res.data as ResponseSuccessAPI<RoomType>)
    }
  })
  const queryClient = useQueryClient()
  const room = data?.data as RoomType
  let renderBookingStatusBadge = null
  let renderPaymentMethodBadge = null
  if (booking.payment_method === 0) {
    renderPaymentMethodBadge = <span className='py-1 px-2.5 rounded-md bg-green-700 text-white'>Trực tiếp</span>
  }
  if (booking.payment_method === 1) {
    renderPaymentMethodBadge = <span className='py-1 px-2.5 rounded-md bg-green-700 text-white'>Paypal</span>
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
  const parsedDate = new Date(booking.check_in)
  const day = parsedDate.getUTCDate()
  const month = parsedDate.getUTCMonth() + 1 // Months are zero-based
  const year = parsedDate.getUTCFullYear()
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`
  const cancelBookingMutation = useMutation({
    mutationFn: (bookingId: string) => {
      return userCancelBooking(bookingId)
    }
  })
  const handleCancelBooking = (bookingId: string) => {
    cancelBookingMutation.mutate(bookingId, {
      onSuccess: async () => {
        toast.success('Hủy đặt phòng thành công')
        await queryClient.invalidateQueries(['booking/userId'])
      },
      onError: () => {
        toast.error('Hủy đặt phòng thất bại')
      }
    })
  }
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {formattedDate}
      </th>
      <td className='px-6 py-4 text-center'>{room?.name}</td>
      <td className='px-6 py-4 text-red-500 font-medium text-center'>{formatCurrency(room?.deposit || 0)}</td>
      <td className='px-6 py-4 text-center'>{renderPaymentMethodBadge}</td>
      <td className='px-6 py-4 text-center truncate'>{renderBookingStatusBadge}</td>
      <td className='px-6 py-4 text-center'>
        {booking?.status === BookingStatus.PENDING ? (
          <button
            type='button'
            onClick={() => handleCancelBooking(booking?._id)}
            className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            HỦY
          </button>
        ) : (
          <button
            type='button'
            disabled
            className='text-white cursor-not-allowed bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            HỦY
          </button>
        )}
      </td>
    </tr>
  )
}
export default BookingItems
