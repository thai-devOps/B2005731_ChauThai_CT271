import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { PiNotePencilFill } from 'react-icons/pi'
import { getAllBookings } from '~/apis/auth.api'
import BookingItems from './Booking/BookingItem'

// Define props interface used
interface IUserProps {
  children: React.ReactNode
}
const User: React.FC<IUserProps> = () => {
  const { data } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => {
      return getAllBookings({
        page: '1',
        limit: '5'
      })
    },
    refetchOnWindowFocus: true,
    retry: 1
  })
  const bookingData = data?.data?.data
  const bookings = bookingData?.bookings || []

  return (
    <div className='h-[100%] min-h-[100vh] place-items-center'>
      <div className='header bg-white p-5 rounded-md'>
        <div className='left'>
          <h1>Đơn đặt phòng</h1>
          <div className='text-3xl text-yellow-400'>
            <PiNotePencilFill />
          </div>
        </div>
      </div>
      <div className='bg-white p-5 rounded-md mt-5 grid h-[100%] min-h-[60vh]'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3 truncate '>
                  TÊN KHÁCH HÀNG
                </th>
                <th scope='col' className='px-6 py-3 truncate text-center'>
                  MÃ PHÒNG
                </th>
                <th scope='col' className='px-6 py-3 text-center truncate'>
                  Tiền cọc
                </th>
                <th scope='col' className='px-6 py-3 text-center truncate'>
                  Phương thức thanh toán
                </th>
                <th scope='col' className='px-6 py-3 text-center truncate'>
                  Trạng thái thanh toán
                </th>
                <th scope='col' className='px-6 py-3 text-center truncate'>
                  Trạng thái
                </th>
                <th scope='col' className='px-6 py-3 text-center truncate'>
                  Ngày đặt cọc
                </th>
                <th scope='col' className='px-6 py-3 text-center truncate'>
                  THAO TÁC
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => <BookingItems key={booking._id} booking={booking} />)
              ) : (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td
                    colSpan={7}
                    className='px-6  text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white h-[40vh]'
                  >
                    Không có đơn đặt phòng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default User
