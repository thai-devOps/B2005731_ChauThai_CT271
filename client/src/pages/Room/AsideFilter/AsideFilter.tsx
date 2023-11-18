import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { NavLink, createSearchParams, useNavigate } from 'react-router-dom'
import { getAllUtilitiesNopaginate } from '~/apis/auth.api'
import { usePath } from '~/constants/usePath'
import useQueryParams from '~/hooks/useQueryParams'
import { UtilityType } from '~/types/room.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { formatCurrency } from '~/utils/utils'
const AsideFilter: React.FC = () => {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['utilities'],
    queryFn: () => {
      return getAllUtilitiesNopaginate()
    }
  })
  const setActiveAddress = (value: string): boolean => {
    if (!queryParams.address) return false
    return queryParams.address === value
  }

  const setActiveArea = (value: string): boolean => {
    if (!queryParams.area) return false
    return queryParams.area === value
  }
  const activeCapacity = (value: string): boolean => {
    if (!queryParams.capacity) return false
    return queryParams.capacity === value
  }
  const navigate = useNavigate()
  const [price, setPrice] = useState<number>(0)
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([])
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, utilityId: string) => {
    if (event.target.checked) {
      setSelectedUtilities([...selectedUtilities, utilityId])
      // navigate({
      //   pathname: usePath.rooms,
      //   search: createSearchParams({
      //     ...queryParams,
      //     page: '1',
      //     limit: '6',
      //     utilities: [...selectedUtilities, utilityId]
      //   }).toString()
      // })
    } else {
      setSelectedUtilities(selectedUtilities.filter((id) => id !== utilityId))
      // navigate({
      //   pathname: usePath.rooms,
      //   search: createSearchParams({
      //     ...queryParams,
      //     utilities: selectedUtilities.filter((id) => id !== utilityId)
      //   }).toString()
      // })
    }
  }
  const handleSearchUtilities = () => {
    if (selectedUtilities.length <= 0) {
      alert('Vui lòng chọn ít nhất 1 tiện ích')
    } else {
      navigate({
        pathname: usePath.rooms,
        search: createSearchParams({
          ...queryParams,
          page: '1',
          limit: '6',
          utilities: selectedUtilities.toString().split(',')
        }).toString()
      })
    }
  }
  useEffect(() => {
    if (queryParams.price === '0') {
      const new_query = omit(queryParams, 'price')
      navigate({
        pathname: usePath.rooms,
        search: createSearchParams({
          ...new_query
        }).toString()
      })
    }
  }, [navigate, queryParams])

  const onClickDeleteFilter = () => {
    setSelectedUtilities([])
    window.scrollTo(0, 0)
    navigate({
      pathname: usePath.rooms,
      search: createSearchParams({
        page: '1',
        limit: '6'
      }).toString()
    })
  }
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value))
    navigate({
      pathname: usePath.rooms,
      search: createSearchParams({
        ...queryParams,
        page: '1',
        limit: '6',
        price: event.target.value
      }).toString()
    })
  }
  const utilities = (data?.data as ResponseSuccessAPI<UtilityType[]>)?.data || []
  return (
    <aside className='hidden md:block md:col-span-3'>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <div className='text-2xl py-4 capitalize flex items-center justify-start gap-5'>
          <img className='w-8 h-8 object-cover' src='img/filter.png' alt='' />
          <span>Bộ lọc tìm kiếm</span>
        </div>
        <div className='mb-4'>
          <h5 className='text-lg font-semibold'>Địa điểm Cần thơ</h5>
          <div className='mt-2 space-y-2 px-2'>
            <div>
              <NavLink
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    address: 'Xuân Khánh'
                  }).toString()
                }}
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': setActiveAddress('Xuân Khánh') === false,
                  'inline-flex items-center text-xl text-blue-600': setActiveAddress('Xuân Khánh') === true
                })}
                // className='inline-flex items-center hover:text-blue-600'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>

                <span className='ml-2'>Xuân Khánh</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    address: 'An Hòa'
                  }).toString()
                }}
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': setActiveAddress('An Hòa') === false,
                  'inline-flex items-center text-xl text-blue-600': setActiveAddress('An Hòa') === true
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
                <span className='ml-2'>An Hòa</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    address: 'Hưng Lợi'
                  }).toString()
                }}
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': setActiveAddress('Hưng Lợi') === false,
                  'inline-flex items-center text-xl text-blue-600': setActiveAddress('Hưng Lợi') === true
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
                <span className='ml-2'>Hưng Lợi</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-400 mb-4'></div>
        <div className='mb-4'>
          <h5 className='text-lg font-semibold'>Giá</h5>
          <div className='mt-2 space-y-2'>
            <div>
              <label htmlFor='large-range' className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
                Giá phòng: {formatCurrency(price)}
              </label>
              <input
                id='large-range'
                type='range'
                min={0}
                max={5000000}
                step={500000}
                value={price}
                onChange={(e) => handleChangePrice(e)}
                className='w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700'
              />
            </div>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-400 mb-4'></div>
        <div className='mb-4'>
          <h5 className='text-lg font-semibold'>Diện tích</h5>
          <div className='mt-2 space-y-3 px-2'>
            <div>
              <NavLink
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': setActiveArea('lte10') === false,
                  'inline-flex items-center text-xl text-blue-600': setActiveArea('lte10') === true
                })}
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    area: 'lte10'
                  }).toString()
                }}
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
                    d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
                  />
                </svg>
                <span className='ml-2'>Dưới 10m2</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': setActiveArea('gte10-lte20') === false,
                  'inline-flex items-center text-xl text-blue-600': setActiveArea('gte10-lte20') === true
                })}
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    area: 'gte10-lte20'
                  }).toString()
                }}
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
                    d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
                  />
                </svg>
                <span className='ml-2'>10m2 - 20m2</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-400 mb-4'></div>
        <div className='mb-4'>
          <h5 className='text-lg font-semibold'>Số người ở</h5>
          <div className='mt-2 space-y-3 px-2'>
            <div>
              <NavLink
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': activeCapacity('lte2') === false,
                  'inline-flex items-center text-xl text-blue-600': activeCapacity('lte2') === true
                })}
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    capacity: 'lte2'
                  }).toString()
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
                </svg>
                <span className='ml-2'>1 - 2 người</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': activeCapacity('lte3') === false,
                  'inline-flex items-center text-xl text-blue-600': activeCapacity('lte3') === true
                })}
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    capacity: 'lte3'
                  }).toString()
                }}
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
                    d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                  />
                </svg>
                <span className='ml-2'>2 - 3 người</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                className={classNames({
                  'inline-flex items-center hover:text-blue-600': activeCapacity('lte4') === false,
                  'inline-flex items-center text-xl text-blue-600': activeCapacity('lte4') === true
                })}
                to={{
                  pathname: usePath.rooms,
                  search: createSearchParams({
                    ...queryParams,
                    page: '1',
                    limit: '6',
                    capacity: 'lte4'
                  }).toString()
                }}
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
                    d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                  />
                </svg>
                <span className='ml-2'>3 - 4 người</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-400 mb-4'></div>
        <div className='mb-4'>
          <div className='text-lg font-semibold flex justify-between items-center'>
            <h1>Tiện ích</h1>
            <button
              type='button'
              onClick={handleSearchUtilities}
              className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
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
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </div>
          <div className='mt-2 space-y-2'>
            {utilities?.map((utility) => (
              <div key={utility._id} className='flex items-center mr-4'>
                <input
                  id={utility._id}
                  type='checkbox'
                  value={utility._id}
                  checked={selectedUtilities.includes(utility._id)}
                  onChange={(e) => handleCheckboxChange(e, utility._id)}
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                {utility.name === 'Điện' && <img src='/img/energy.png' className='w-6 h-6 ms-3 object-cover' alt='' />}
                {utility.name === 'Nước' && <img src='/img/drop.png' className='w-6 h-6 ms-3 object-cover' alt='' />}
                {utility.name === 'TV' && (
                  <img src='/img/vintage-tv.png' className='w-6 h-6 ms-3 object-cover' alt='' />
                )}
                {utility.name === 'Điều hòa' && (
                  <img src='/img/air-condition.png' className='w-6 h-6 ms-3 object-cover' alt='' />
                )}
                {utility.name === 'Tủ lạnh' && (
                  <img src='/img/fridge.png' className='w-6 h-6 ms-3 object-cover' alt='' />
                )}
                {utility.name === 'Wi Fi' && <img src='/img/wifi.png' className='w-6 h-6 ms-3 object-cover' alt='' />}

                <label htmlFor={utility._id} className='ml-3 text-base font-normal text-gray-900 dark:text-gray-300'>
                  {utility.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-400 mb-4'></div>
        <div className='flex justify-center items-center'>
          <button
            onClick={onClickDeleteFilter}
            type='button'
            className='text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 mr-2 -ml-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
            Xóa tất cả
          </button>
        </div>
      </div>
    </aside>
  )
}
export default AsideFilter
