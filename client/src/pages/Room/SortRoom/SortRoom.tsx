import classNames from 'classnames'
import { omit } from 'lodash'
import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import Popover from '~/components/Popover'
import { sortBy } from '~/constants/product'
import { usePath } from '~/constants/usePath'
import { RoomListConfig } from '~/types/room.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
  path: string
  limit: number
  totalIems: number
}
const SortRoom: React.FC<Props> = ({ queryConfig, pageSize, path, limit, totalIems }) => {
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const { sort_by = sortBy.created_at, order } = queryConfig
  const isActiveSortBy = (sortByValue: Exclude<RoomListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<RoomListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: usePath.rooms,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<RoomListConfig['order'], undefined>) => {
    navigate({
      pathname: usePath.rooms,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  const handleSortArea = (orderValue: Exclude<RoomListConfig['order'], undefined>) => {
    navigate({
      pathname: usePath.rooms,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.area,
        order: orderValue
      }).toString()
    })
  }
  const handleSortCapacity = (orderValue: Exclude<RoomListConfig['order'], undefined>) => {
    navigate({
      pathname: usePath.rooms,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.capacity,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-2 rounded-md mb-5'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div className='text-gray-600'>Sắp xếp theo</div>
          <button
            onClick={() => handleSort(sortBy.created_at)}
            className={classNames(
              'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  dark:text-white  dark:focus:ring-blue-800',
              {
                'from-purple-600 to-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300':
                  isActiveSortBy(sortBy.created_at),
                'group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-900':
                  !isActiveSortBy(sortBy.created_at)
              }
            )}
          >
            <span
              className={classNames(
                'relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                {
                  '': isActiveSortBy(sortBy.created_at),
                  'bg-white text': !isActiveSortBy(sortBy.created_at)
                }
              )}
            >
              Mới nhất
            </span>
          </button>
          <Popover
            children={
              <button
                className={classNames(
                  'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  dark:text-white  dark:focus:ring-blue-800',
                  {
                    'from-purple-600 to-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300':
                      isActiveSortBy(sortBy.price),
                    'group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-900':
                      !isActiveSortBy(sortBy.price)
                  }
                )}
              >
                <span
                  className={classNames(
                    'relative flex items-center gap-5 px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                    {
                      '': isActiveSortBy(sortBy.price),
                      'bg-white text': !isActiveSortBy(sortBy.price)
                    }
                  )}
                >
                  <span>{!order ? 'Giá' : order === 'asc' ? 'Giá tăng dần' : 'Giá giảm dần'}</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 '
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
                </span>
              </button>
            }
            renderPopover={
              <ul className='w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                <li
                  onClick={() => handlePriceOrder('asc')}
                  className='w-full cursor-pointer flex items-center hover:text-blue-600 justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'
                >
                  <span>Giá</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18' />
                  </svg>
                </li>

                <li
                  onClick={() => handlePriceOrder('desc')}
                  className='w-full cursor-pointer hover:text-blue-600 flex items-center justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600
                '
                >
                  <span>Giá</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3' />
                  </svg>
                </li>
              </ul>
            }
          ></Popover>
          <Popover
            children={
              <button
                className={classNames(
                  'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  dark:text-white  dark:focus:ring-blue-800',
                  {
                    'from-purple-600 to-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300':
                      isActiveSortBy(sortBy.area),
                    'group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-900':
                      !isActiveSortBy(sortBy.area)
                  }
                )}
              >
                <span
                  className={classNames(
                    'relative flex items-center gap-5 px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                    {
                      '': isActiveSortBy(sortBy.area),
                      'bg-white text': !isActiveSortBy(sortBy.area)
                    }
                  )}
                >
                  <span>{!order ? 'Diện tích' : order === 'asc' ? 'DT tăng dần' : 'DT giảm dần'}</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 '
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
                </span>
              </button>
            }
            renderPopover={
              <ul className='w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                <li
                  onClick={() => handleSortArea('asc')}
                  className='w-full cursor-pointer flex items-center hover:text-blue-600 justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'
                >
                  <span>Diện tích</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18' />
                  </svg>
                </li>

                <li
                  onClick={() => handleSortArea('desc')}
                  className='w-full cursor-pointer hover:text-blue-600 flex items-center justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600
                '
                >
                  <span>Diện tích</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3' />
                  </svg>
                </li>
              </ul>
            }
          ></Popover>
          <Popover
            children={
              <button
                className={classNames(
                  'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  dark:text-white  dark:focus:ring-blue-800',
                  {
                    'from-purple-600 to-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300':
                      isActiveSortBy(sortBy.capacity),
                    'group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-900':
                      !isActiveSortBy(sortBy.capacity)
                  }
                )}
              >
                <span
                  className={classNames(
                    'relative flex items-center gap-5 px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                    {
                      '': isActiveSortBy(sortBy.capacity),
                      'bg-white text': !isActiveSortBy(sortBy.capacity)
                    }
                  )}
                >
                  <span>{!order ? 'SL người ở' : order === 'asc' ? 'SL tăng dần' : 'SL giảm dần'}</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 '
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
                </span>
              </button>
            }
            renderPopover={
              <ul className='w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                <li
                  onClick={() => handleSortCapacity('asc')}
                  className='w-full cursor-pointer flex items-center hover:text-blue-600 justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'
                >
                  <span>Số lượng</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18' />
                  </svg>
                </li>

                <li
                  onClick={() => handleSortCapacity('desc')}
                  className='w-full cursor-pointer hover:text-blue-600 flex items-center justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600
                '
                >
                  <span>Số lượng</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3' />
                  </svg>
                </li>
              </ul>
            }
          ></Popover>
        </div>
        <div className='flex items-center flex-wrap gap-2 justify-end'>
          <div className='flex flex-col items-center'>
            {totalIems > 0 && (
              <span className='text-sm text-gray-700 dark:text-gray-400'>
                Hiển thị <span className='font-semibold text-gray-900 dark:text-white'>{(page - 1) * limit + 1}</span> -{' '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {page * limit > totalIems ? totalIems : page * limit}
                </span>{' '}
                | <span className='font-semibold text-gray-900 dark:text-white'>{totalIems}</span> phòng
              </span>
            )}
            {totalIems > 0 && (
              <div className='flex items-center mt-1'>
                {page === 1 ? (
                  <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </span>
                ) : (
                  <Link
                    to={{
                      pathname: path,
                      search: createSearchParams({
                        ...queryConfig,
                        page: (page - 1).toString()
                      }).toString()
                    }}
                    className='mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </Link>
                )}
                {page === pageSize ? (
                  <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  </span>
                ) : (
                  <Link
                    to={{
                      pathname: path,
                      search: createSearchParams({
                        ...queryConfig,
                        page: (page + 1).toString()
                      }).toString()
                    }}
                    className='mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SortRoom
