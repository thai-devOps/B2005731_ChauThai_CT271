import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { HiOutlineIdentification } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { getBookingByUserIdRoomId, getRoomById, getUserById } from '~/apis/auth.api'
import { BookingType } from '~/types/booking.type'
import { RoomStatus, RoomType } from '~/types/room.type'
import { User } from '~/types/user.type'
import { Utility } from '~/types/utility.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { formatCurrency } from '~/utils/utils'
const RoomDetail: React.FC = () => {
  // get room id from url
  const { id } = useParams()
  const { data, isLoading: isLoadingRoom } = useQuery({
    queryKey: ['detail-room-plain', id],
    queryFn: () => getRoomById(id as string)
  })
  const roomData = data?.data as ResponseSuccessAPI<RoomType>
  const room = roomData?.data || []
  const roomerId = (room.roomer as string) || ''
  const { data: roomer, isLoading: isLoadingRoomer } = useQuery({
    queryKey: ['detail-roomer', roomerId],
    queryFn: () => getUserById(roomerId),
    enabled: !!roomerId // only call when roomerId is not empty
  })
  const roomerData = roomer?.data as ResponseSuccessAPI<User>
  const roomerInfo = roomerData?.data || null
  const { data: bookingData } = useQuery({
    queryKey: ['booking-info', roomerId, id],
    queryFn: () =>
      getBookingByUserIdRoomId({
        user_id: roomerId,
        room_id: id as string
      }),
    enabled: !!roomerId // only call when roomerId is not empty
  })
  const bookingInfo = bookingData?.data as ResponseSuccessAPI<BookingType>
  const booking = bookingInfo?.data || null
  const parsedDate = new Date(booking?.check_in)
  const day = parsedDate.getUTCDate()
  const month = parsedDate.getUTCMonth() + 1 // Months are zero-based
  const year = parsedDate.getUTCFullYear()

  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`
  return (
    <>
      <div className='header px-5 py-3 bg-white rounded-md mb-5'>
        <div className='left'>
          <h1>Chi tiết phòng trọ</h1>
        </div>
      </div>
      <div className='mt-5 py-5 bg-white grid grid-cols-1 place-items-center md:grid-cols-2 gap-5'>
        <div>
          {!isLoadingRoom && room && (
            <div className='flex flex-col items-center overflow-hidden rounded-lg border'>
              <div className='group relative block h-52 w-full shrink-0 self-start overflow-hidden bg-gray-100 '>
                <img
                  src={room.images[0]}
                  loading='lazy'
                  alt={room.name}
                  className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
                />
                <div className='absolute top-0 right-0 px-2 py-1 bg-white rounded-bl-lg dark:bg-gray-900'>
                  <span
                    className={classNames('text-xs font-semibold leading-none', {
                      'text-green-500': room.status === RoomStatus.available,
                      'text-red-500': room.status === RoomStatus.rented,
                      'text-yellow-500': room.status === RoomStatus.pending,
                      'text-gray-500': room.status === RoomStatus.unavailable,
                      'text-blue-500': room.status === RoomStatus.repairing
                    })}
                  >
                    {room.status}
                  </span>
                </div>
              </div>
              {/* <div className='w-full h-56'>
              <img
                src={room.images.toString().split(',')[0]}
                loading='lazy'
                alt={room.name}
                className='h-full w-full bg-white object-cover'
              />
            </div> */}
              <div className='flex flex-col gap-2 p-4 lg:p-6 w-full bg-white'>
                <h2 className='text-xl font-bold text-gray-800'>{room.name}</h2>
                <span className='text-start text-gray-500 truncate'>{room.description}</span>
                <div className='flex items-center justify-between md:justify-between truncate'>
                  <span className='text-gray-500'>Giá phòng: </span>
                  <div>
                    <span className='text-red-500 text-lg font-bold'>{formatCurrency(room.price)}</span>
                    <span className='text-xs'>/tháng</span>
                  </div>
                </div>
                <ul className='space-y-4 text-left text-gray-500 dark:text-gray-400'>
                  <li className='flex items-center space-x-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
                      />
                    </svg>

                    <span>Diện tích: {room.area} m2</span>
                  </li>
                  <li className='flex items-center space-x-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                      />
                    </svg>
                    <span>
                      Số người ở tối đa:{' '}
                      <span className='font-semibold text-gray-900 dark:text-white'>{room.capacity} người</span>
                    </span>
                  </li>
                  <li className='flex items-center space-x-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                      />
                    </svg>

                    <span>
                      Tiện ích:{' '}
                      {room.utilities.map((util, index) => (
                        <span key={index} className='font-semibold text-gray-900 dark:text-white'>
                          {(util as Utility).name}
                          {index !== room.utilities.length - 1 && ', '}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
                <span className='text-gray-500 truncate'>Địa chỉ: {room.address}</span>
              </div>
            </div>
          )}
          {isLoadingRoom && (
            <div
              role='status'
              className='w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700'
            >
              <div className='flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700'>
                <svg
                  className='w-10 h-10 text-gray-200 dark:text-gray-600'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 16 20'
                >
                  <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
                  <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                </svg>
              </div>
              <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
              <div className='flex items-center mt-4 space-x-3'>
                <svg
                  className='w-10 h-10 text-gray-200 dark:text-gray-700'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                </svg>
                <div>
                  <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2' />
                  <div className='w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                </div>
              </div>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </div>
        <div className='h-full'>
          {!isLoadingRoomer && roomerInfo && (
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <div className='text-center text-gray-900 text-2xl my-5'>Thông tin khách thuê</div>
              <img
                src={roomerInfo.avatar}
                alt={roomerInfo.name}
                className='w-32 h-32 object-cover rounded-full mx-auto'
              />
              <h2 className='text-xl font-semibold mt-4 mb-3'>
                <div className='flex flex-wrap items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 text-gray-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                  <span>{roomerInfo.name}</span>
                </div>
              </h2>
              <p className='text-gray-600 flex items-center flex-wrap gap-3 mb-3'>
                <HiOutlineIdentification />
                {roomerInfo.cccd}
              </p>
              <p className='text-gray-600 flex items-center flex-wrap gap-3 mb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4 text-gray-400'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z'
                  />
                </svg>

                {roomerInfo.date_of_birth}
              </p>
              <p className='text-gray-600 flex items-center flex-wrap gap-3 mb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4 text-gray-400'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                  />
                </svg>
                {roomerInfo.phone_number}
              </p>
              <p className='text-gray-600 flex items-center flex-wrap gap-3 mb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4 text-gray-400'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>

                {roomerInfo.address}
              </p>
              <p className='text-gray-600 flex items-center flex-wrap gap-3 mb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4 text-gray-400'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                  />
                </svg>
                Ngày đặt phòng: {' '}
                {formattedDate}
              </p>
            </div>
          )}
          {!isLoadingRoomer && !roomerInfo && (
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <div className='text-center text-gray-900 text-2xl my-5'>Thông tin khách thuê</div>
              <img
                src='../../../../public/img/user.png'
                alt={'Chưa có khách thuê'}
                className='w-32 h-32 object-cover rounded-full mx-auto'
              />
              <h2 className='text-xl font-semibold mt-4 mb-3'>
                <div className='flex flex-wrap items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 text-gray-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                  <span>Chưa có thông tin</span>
                </div>
              </h2>
            </div>
          )}
          {isLoadingRoomer && !roomerInfo && (
            <div
              role='status'
              className='w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700'
            >
              <div className='flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700'>
                <svg
                  className='w-10 h-10 text-gray-200 dark:text-gray-600'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 16 20'
                >
                  <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
                  <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                </svg>
              </div>
              <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
              <div className='flex items-center mt-4 space-x-3'>
                <svg
                  className='w-10 h-10 text-gray-200 dark:text-gray-700'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                </svg>
                <div>
                  <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2' />
                  <div className='w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                </div>
              </div>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default RoomDetail
