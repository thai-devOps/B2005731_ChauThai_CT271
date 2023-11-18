import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { confirmBooking, deleteBookingById, getRoomById, getUserById } from '~/apis/auth.api'
import { BookingStatus, BookingType } from '~/types/booking.type'
import { RoomType } from '~/types/room.type'
import { User } from '~/types/user.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { formatCurrency } from '~/utils/utils'
interface BookingItemsProps {
  booking: BookingType
}
const BookingItems: React.FC<BookingItemsProps> = ({ booking }) => {
  const { data: roomData } = useQuery({
    queryKey: ['room-booking', booking.room_id],
    queryFn: () => {
      return getRoomById(booking.room_id)
    }
  })
  const { data: userData } = useQuery({
    queryKey: ['user-bookings', booking.user_id],
    queryFn: () => {
      return getUserById(booking.user_id)
    },
    refetchOnWindowFocus: true,
    enabled: !!booking.user_id
  })
  const deleteBookingMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteBookingById(id)
    }
  })
  const handleDeleteBookings = (bookingId: string) => {
    deleteBookingMutation.mutate(bookingId, {
      onSuccess: async () => {
        alert('Xóa đơn đặt phòng thành công')
        deleteBookingMutation.reset()
        await queryClient.invalidateQueries(['bookings'])
      }
    })
  }

  const room = (roomData?.data as ResponseSuccessAPI<RoomType>)?.data
  const user = (userData?.data as ResponseSuccessAPI<User>)?.data
  // format check in date from isostring to dd/mm/yyyy
  const parsedDate = new Date(booking.check_in)
  const day = parsedDate.getUTCDate()
  const month = parsedDate.getUTCMonth() + 1 // Months are zero-based
  const year = parsedDate.getUTCFullYear()

  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`
  let renderBookingStatusBadge = null
  let renderPaymentMethodBadge = null
  let renderCheckPaidBadge = null
  if (booking.payment_method === 1) {
    renderCheckPaidBadge = (
      <span className='flex justify-center items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 text-green-500 font-bold'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
        </svg>
      </span>
    )
  }
  if (booking.payment_method === 0) {
    if (booking.status === BookingStatus.CONFIRMED) {
      renderCheckPaidBadge = (
        <span className='flex justify-center items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-green-500 font-bold'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
          </svg>
        </span>
      )
    } else {
      renderCheckPaidBadge = <span className='flex justify-center items-center'>Chờ thanh toán</span>
    }
  }
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
  const confirmBookingMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) => {
      return confirmBooking({ id, status })
    }
  })
  const queryClient = useQueryClient()
  const handleConfirmBooking = (bookingId: string) => {
    confirmBookingMutation.mutate(
      { id: bookingId, status: BookingStatus.CONFIRMED },
      {
        onSuccess: async () => {
          confirmBookingMutation.reset()
          await queryClient.invalidateQueries(['bookings'])
        }
      }
    )
  }
  const handleRejectBooking = (bookingId: string) => {
    confirmBookingMutation.mutate(
      { id: bookingId, status: BookingStatus.CANCELLED },
      {
        onSuccess: async () => {
          confirmBookingMutation.reset()
          await queryClient.invalidateQueries(['bookings'])
        }
      }
    )
  }
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {user?.name}
      </th>
      <td className='px-6 py-4 text-center'>{room?.name}</td>
      <td className='px-6 py-4 text-center'>{formatCurrency(room?.deposit || 0)}</td>
      <td className='px-6 py-4 text-center'>{renderPaymentMethodBadge}</td>
      <td className='px-6 py-4 text-center truncate'>{renderCheckPaidBadge}</td>
      <td className='px-6 py-4 text-center truncate'>{renderBookingStatusBadge}</td>
      <td className='px-6 py-4 text-center truncate'>{formattedDate}</td>
      <td className='px-6 py-4 text-center truncate'>
        {booking.status === BookingStatus.PENDING ? (
          <div className='flex justify-center items-center'>
            <button
              type='button'
              onClick={() => handleConfirmBooking(booking._id)}
              className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center'
            >
              XÁC NHẬN
            </button>
            <button
              type='button'
              onClick={() => handleRejectBooking(booking._id)}
              className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-5 py-2.5 text-center ms-3'
            >
              TỪ CHỐI
            </button>
          </div>
        ) : (
          <div className='flex justify-end items-center'>
            <button
              type='button'
              onClick={() => handleDeleteBookings(booking._id)}
              className='text-white flex items-center gap-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
              <span>XÓA</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
export default BookingItems
