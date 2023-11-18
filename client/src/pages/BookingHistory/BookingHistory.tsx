import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { getBookings } from '~/apis/auth.api'
import { AppContext } from '~/context/app.context'
import { BookingType } from '~/types/booking.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import BookingItems from './BookingItem'

const BookingHistory: React.FC = () => {
  const { user } = useContext(AppContext)
  const { data } = useQuery({
    queryKey: ['booking/userId', user._id],
    queryFn: () => {
      return getBookings(user._id as string)
    },
    enabled: !!user._id,
    refetchOnWindowFocus: true
  })
  const bookingData = data?.data as ResponseSuccessAPI<BookingType[]>
  const bookings = bookingData?.data || []
  return (
    <div className='mt-24 container mx-auto bg-white py-5 mb-5 rounded-lg'>
      <div className='text-gray-900 font-semibold p-3 uppercase'>Lịch sử đặt phòng của tôi</div>
      <hr />
      <div className='relative grid h-[100%] min-h-[100vh] place-items-start overflow-x-auto shadow-md sm:rounded-lg py-3'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                NGÀY ĐẶT PHÒNG
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                MÃ PHÒNG
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                TIỀN CỌC
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                PHƯƠNG THỨC THANH TOÁN
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                TRẠNG THÁI
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 && bookings?.map((booking) => <BookingItems key={booking._id} booking={booking} />)}
            {bookings.length === 0 && (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-4 text-center' colSpan={5}>
                  Bạn chưa có lịch sử đặt phòng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default BookingHistory
