import { NavLink, useNavigate } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
import { RoomStatus, RoomType } from '~/types/room.type'
import { formatCurrency } from '~/utils/utils'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
interface RoomItemProps {
  room: RoomType
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  let roomStatus = room.status as string
  if (roomStatus === RoomStatus.available) {
    roomStatus = 'Còn trống'
  }
  if (roomStatus === RoomStatus.rented) {
    roomStatus = 'Đã thuê'
  }
  if (roomStatus === RoomStatus.pending) {
    roomStatus = 'Đang chờ'
  }
  if (roomStatus === RoomStatus.unavailable) {
    roomStatus = 'Không có sẵn'
  }
  if (roomStatus === RoomStatus.repairing) {
    roomStatus = 'Đang sửa chữa'
  }
  return (
    <>
      <NavLink
        to={usePath.rooms + '/' + room._id}
        className='flex flex-col items-center overflow-hidden rounded-lg border'
      >
        {/* <div className='group relative block h-52 w-full shrink-0 self-start overflow-hidden bg-gray-100 '>
          <img
            src={room.images.toString().split(',')[0]}
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
              {roomStatus}
            </span>
          </div>
        </div> */}
        <div className='w-full h-56'>
          <img
            src={room.images.toString().split(',')[0]}
            loading='lazy'
            alt={room.name}
            className='h-full w-full bg-white object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 p-4 lg:p-6 w-full bg-white'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>{room.name}</h2>
            <div>
              <span className='text-red-500 text-lg font-bold'>{formatCurrency(room.price)}</span>
              <span className='text-xs'>/tháng</span>
            </div>
          </div>
          <span className='text-start text-gray-500 truncate'>{room.description}</span>
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
          </ul>
          <span className='text-gray-500 truncate'>Địa chỉ: {room.address}</span>
          {/* <div className='flex flex-col justify-start items-start mt-3 gap-5'>
            <button
              type='button'
              onClick={() => handleBookingRoom()}
              className={classNames(
                'text-white bg-gradient-to-br self-end from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-2.5 text-center'
              )}
            >
              ĐẶT PHÒNG
            </button>
          </div> */}
        </div>
      </NavLink>
      <Modal show={openModal} className='overflow-y-hidden' size='md' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-green-600 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Bạn cần đăng nhập để tiếp tục ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='blue'
                onClick={() => {
                  setOpenModal(false)
                  navigate('/login')
                  window.scrollTo(0, 0)
                }}
              >
                Xác nhận
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default RoomItem
