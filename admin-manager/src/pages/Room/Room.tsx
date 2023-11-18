import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getRooms } from '~/apis/auth.api'
import useQueryParams from '~/hooks/useQueryParams'
import { RoomResponse } from '~/types/auth.type'
import { RoomType } from '~/types/room.type'
import RoomItem from './RoomItem'
import RoomLoading from '~/components/RoomLoading'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
// Define props interface used
const LIMIT = '6'
interface IRoomProps {}
const Room: React.FC<IRoomProps> = (_props: IRoomProps) => {
  const queryParams = useQueryParams()
  const { data, isLoading } = useQuery({
    queryKey: ['rooms', queryParams],
    queryFn: () => getRooms({}),
    refetchOnWindowFocus: false,
    keepPreviousData: true
  })
  const _data = data?.data as RoomResponse
  const rooms: RoomType[] = _data?.data?.rooms || []
  return (
    <>
      <div className='header p-5'>
        <div className='left'>
          <h1>Xem phòng</h1>
          <div className='flex' aria-label='Breadcrumb'>
            <ol className='inline-flex items-center space-x-1 md:space-x-3'>
              <li className='inline-flex items-center'>
                <NavLink
                  to={usePath.rooms}
                  className={({ isActive }) =>
                    classNames({
                      'inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white':
                        !isActive,
                      'inline-flex items-center text-sm font-medium text-blue-600 ': isActive
                    })
                  }
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
                </NavLink>
              </li>
            </ol>
          </div>
        </div>
        <div>
          <button
            type='button'
            className='text-white flex gap-2 items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            <i className='bx bx-filter-alt'></i>
            <span className='text-base'>Lọc tìm kiếm</span>
          </button>
        </div>
      </div>

      <div className='p-5'>
        <div>
          <div className='bg-white rounded-xl py-6 sm:py-8 lg:py-12'>
            <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
              {!isLoading && (
                <div className='grid gap-4 sm:grid-cols-1 md:gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8'>
                  {rooms.length > 0 ? (
                    rooms.map((room: RoomType) => <RoomItem room={room} key={room._id} />)
                  ) : (
                    <div>Dữ liệu trống</div>
                  )}
                </div>
              )}
              {isLoading && <RoomLoading></RoomLoading>}
            </div>
            <ul className='list-style-none flex justify-center mt-10'>
              <li>
                {_data?.data?.page === 1 ? (
                  <div className='pointer-events-none flex items-center relative rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
                      />
                    </svg>
                  </div>
                ) : (
                  <Link
                    to={`/room?page=${_data?.data?.page - 1}&limit=${_data?.data?.pageSize}`}
                    className='relative flex items-center rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
                      />
                    </svg>
                  </Link>
                )}
              </li>
              {Array(_data?.data?.totalPages || 0)
                .fill(0)
                .map((_, index) => {
                  const _page = index + 1
                  console.log
                  return (
                    <li key={index}>
                      <Link
                        className={classNames(
                          `relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300`,
                          {
                            'text-primary-700 dark:text-white': _page === _data?.data?.page,
                            'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white':
                              _page !== _data?.data?.page
                          }
                        )}
                        to={`/room?page=${_page}&limit=${_data.data.pageSize}`}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  )
                })}
              <li>
                {_data?.data?.page === _data?.data?.totalPages ? (
                  <span className='relative pointer-events-none flex cursor-not-allowed items-center rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                      />
                    </svg>
                  </span>
                ) : (
                  <Link
                    to={`/room?page=${_data?.data?.page + 1}&limit=${_data?.data?.pageSize}`}
                    className='relative flex items-center rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                      />
                    </svg>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default Room
