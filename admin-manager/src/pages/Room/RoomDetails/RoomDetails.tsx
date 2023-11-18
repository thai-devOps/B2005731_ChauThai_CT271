import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getRoomById } from '~/apis/auth.api'
import Footer from '~/components/Footer'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'
import useQueryParams from '~/hooks/useQueryParams'
import { ResponseRoomDetails, RoomStatus } from '~/types/room.type'
import { formatCurrency } from '~/utils/utils'
const RoomDetails: React.FC = () => {
  const queryParams = useQueryParams()
  const { data, isLoading } = useQuery({
    queryKey: ['room/id', queryParams?.id],
    queryFn: () => getRoomById(queryParams?.id),
    refetchOnWindowFocus: false,
    keepPreviousData: true
  })
  const _data = data?.data as ResponseRoomDetails
  const room = _data?.data
  let roomStatus: React.ReactNode = null
  if (room?.status === RoomStatus.avalible) {
    roomStatus = (
      <div className='flex justify-between items-center relative'>
        <span className='text-custom-success '>Phòng trống</span>
        <span className='w-5 h-5 absolute right-0 bg-custom-success rounded-full'></span>
      </div>
    )
  }
  if (room?.status === RoomStatus.rented) {
    roomStatus = (
      <div className='flex justify-between items-center'>
        <span className='w-5 h-5 bg-custom-success rounded-full'></span>
        Phòng đã thuê
      </div>
    )
  }
  const { setIsLoading } = useContext(AppContext)

  React.useEffect(() => {
    setIsLoading(isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [isLoading, setIsLoading])
  return (
    <>
      <div className='header p-5'>
        <div className='left'>
          <h1>Xem phòng</h1>
          <div className='flex' aria-label='Breadcrumb'>
            <ol className='inline-flex items-center space-x-1 md:space-x-3'>
              <li className='inline-flex items-center'>
                <Link
                  to={usePath.rooms}
                  className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
                >
                  <svg
                    className='w-3 h-3 mr-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 18 18'
                  >
                    <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z' />
                  </svg>
                  Xem phòng
                </Link>
              </li>
              {room && (
                <li>
                  <div className='flex items-center'>
                    <svg
                      className='w-3 h-3 text-gray-400 mx-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='m1 9 4-4-4-4'
                      />
                    </svg>
                    <NavLink
                      className={({ isActive }) =>
                        classNames({
                          'ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white':
                            !isActive,
                          'ml-1 text-sm font-medium text-blue-600 md:ml-2 dark:hover:text-white': isActive
                        })
                      }
                      to={usePath.roomDetails + `?id=${room?._id || ''}`}
                    >
                      {capitalize(room?.name)}
                    </NavLink>
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
      <div className='grid gap-4 p-10 border bg-white/90 sm:grid-cols-1 md:gap-6 lg:grid-cols-1 xl:grid-cols-1 xl:gap-8'>
        {!isLoading && (
          <div className='flex flex-col  items-center overflow-hidden rounded-lg border md:flex-row'>
            <div className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-white md:h-full md:w-32 lg:w-1/2 '>
              <img
                src={room?.images}
                loading='lazy'
                alt={room?.name}
                className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
              />
            </div>
            <div className='flex flex-col bg-white gap-2 p-4 lg:p-6 w-full'>
              {roomStatus}
              <h2 className='text-xl font-bold text-gray-800'>{room?.name}</h2>
              <div className='flex items-center justify-start md:justify-between'>
                <span className='text-gray-500'>Giá phòng: </span>
                <span className='text-red-500 text-lg font-bold'>{formatCurrency(room?.price || 0)}</span>
              </div>
              <ul className='space-y-4 text-left text-gray-500 dark:text-gray-400'>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>{room?.description}</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>Diện tích: {room?.area} m2</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>
                    Số người ở tối đa:{' '}
                    <span className='font-semibold text-gray-900 dark:text-white'>{room?.max_guest} người</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>
                    Tiền điện:
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {' '}
                      {formatCurrency(room?.electric || 0)}/kW
                    </span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>
                    Tiền nước:
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {' '}
                      {formatCurrency(room?.water || 0)}/m3
                    </span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>
                    Tiện ích:{' '}
                    <span className='font-semibold text-gray-900 dark:text-white'>{room?.utilities?.join(', ')}</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                  <span>
                    Ưu đãi đặc biệt: <span className='font-semibold text-gray-900 dark:text-white'>Miễn phí Wifi</span>
                  </span>
                </li>
              </ul>
              <span className='text-gray-500'>Địa chỉ: {room?.address}</span>
              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center'
                >
                  THUÊ PHÒNG
                </button>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div role='status' className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center'>
            <div className='flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700'>
              <svg
                className='w-10 h-10 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
            <div className='w-full'>
              <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5' />
              <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]' />
            </div>
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  )
}

export default RoomDetails
