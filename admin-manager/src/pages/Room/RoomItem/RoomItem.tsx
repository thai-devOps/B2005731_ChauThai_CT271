import { Link } from 'react-router-dom'
import { RoomStatus, RoomType } from '~/types/room.type'
import { formatCurrency } from '~/utils/utils'

interface RoomItemProps {
  room: RoomType
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  let roomStatus: React.ReactNode = null
  if (room.status === RoomStatus.avalible) {
    roomStatus = (
      <div className='flex justify-between items-center relative'>
        <span className='text-custom-success '>Phòng trống</span>
        <span className='w-5 h-5 absolute right-0 bg-custom-success rounded-full'></span>
      </div>
    )
  }
  if (room.status === RoomStatus.rented) {
    roomStatus = (
      <div className='flex justify-between items-center'>
        <span className='w-5 h-5 bg-custom-success rounded-full'></span>
        Phòng đã thuê
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center overflow-hidden rounded-lg border'>
      <div className='group relative block h-52 w-full shrink-0 self-start overflow-hidden bg-gray-100 '>
        <img
          src={room.images}
          loading='lazy'
          alt={room.name}
          className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
        />
      </div>
      <div className='flex flex-col gap-2 p-4 lg:p-6 w-full'>
        {roomStatus}
        <h2 className='text-xl font-bold text-gray-800'>{room.name}</h2>
        <div className='flex items-center justify-start md:justify-between'>
          <span className='text-gray-500'>Giá phòng: </span>
          <span className='text-red-500 text-lg font-bold'>{formatCurrency(room.price)}</span>
        </div>
        <ul className='space-y-4 text-left text-gray-500 dark:text-gray-400'>
          {/* <li className='flex items-center space-x-3'>
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
            <span>{room.description}</span>
          </li> */}
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
            <span>Diện tích: {room.area} m2</span>
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
              <span className='font-semibold text-gray-900 dark:text-white'>{room.max_guest} người</span>
            </span>
          </li>
          {/* <li className='flex items-center space-x-3'>
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
              <span className='font-semibold text-gray-900 dark:text-white'> {formatCurrency(room.electric)}/kW</span>
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
              <span className='font-semibold text-gray-900 dark:text-white'> {formatCurrency(room.water)}/m3</span>
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
              <span className='font-semibold text-gray-900 dark:text-white'>{room.utilities?.join(', ')}</span>
            </span>
          </li> */}
          {/* <li className='flex items-center space-x-3'>
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
          </li> */}
        </ul>
        <span className='text-gray-500'>Địa chỉ: {room.address}</span>
        <div className='flex items-center justify-between'>
          <Link
            to={`/room/details?id=${room._id as string}`}
            className='relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
          >
            <span className='relative px-5 flex items-center text-[10px] py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
              <span>Xem chi tiết </span>
            </span>
          </Link>

          <button
            type='button'
            className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-2.5 text-center'
          >
            THUÊ PHÒNG
          </button>
        </div>
      </div>
    </div>
  )
}
export default RoomItem
