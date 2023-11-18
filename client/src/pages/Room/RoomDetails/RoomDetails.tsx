import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { getAllRoomsSamePrice, getRoomDetails } from '~/apis/auth.api'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'
import { ResponseRoomDetails, RoomStatus, RoomType } from '~/types/room.type'
import { formatCurrency } from '~/utils/utils'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import CarouselControlsOutside from '~/components/CarouselControlsOutside'
import { ResponseSuccessAPI } from '~/types/utils.type'
const RoomDetails: React.FC = () => {
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['room/id', id],
    queryFn: () => getRoomDetails(id as string),
    refetchOnWindowFocus: false,
    enabled: !!id,
    keepPreviousData: true
  })
  const { isAuthenticated, setIsLoading } = useContext(AppContext)
  const [agree_term, setAgreeTerm] = useState(false)
  const _data = data?.data as ResponseRoomDetails
  const room = _data?.data
  const { data: dataRoomsSamePrice } = useQuery({
    queryKey: ['rooms-same-price', room?.price, room?._id],
    queryFn: () => getAllRoomsSamePrice(room?.price, room?._id),
    refetchOnWindowFocus: false,
    enabled: !!room?.price && !!room?._id,
    keepPreviousData: true
  })
  const rooms_same_price = (dataRoomsSamePrice?.data as ResponseSuccessAPI<RoomType[]>)?.data || []
  const [openModal, setOpenModal] = useState(false)
  const [openModalTerm, setOpenModalTerm] = useState(false)
  const navigate = useNavigate()
  const handleBookingRoom = () => {
    if (isAuthenticated) {
      if (agree_term) {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          navigate(usePath.booking + '?roomId=' + room._id)
        }, 2000)
      } else {
        alert('Bạn cần đồng ý với điều khoản và điều kiện đặt phòng')
      }
    } else {
      setOpenModal(true)
    }
  }
  // Lấy danh sách các phòng có cùng giá tiền
  return (
    <>
      <div className='max-w-screen-xl mx-auto'>
        <div className='p-5 mt-20 border bg-white mb-3'>
          <div className='left'>
            <h1 className='font-medium text-gray-700 text-2xl'>Chi tiết phòng trọ</h1>
            <div className=' mt-3' aria-label='Breadcrumb'>
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
                    Đặt phòng
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
        <div className='grid gap-4 p-10 border mb-3 bg-white/90 sm:grid-cols-1 md:gap-6 lg:grid-cols-1 xl:grid-cols-1 xl:gap-8'>
          {!isLoading && (
            <div className='flex flex-col  items-center overflow-hidden rounded-lg border md:flex-row'>
              <div className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-white md:h-full md:w-1/2 lg:w-1/2 '>
                <img
                  src={room?.images.toString().split(',')[0]}
                  loading='lazy'
                  alt={room?.name}
                  className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
                />
              </div>
              <div className='flex flex-col bg-white gap-2 p-4 lg:p-6 w-full'>
                <h2 className='text-xl font-bold text-gray-800'>{room?.name}</h2>
                <p className='text-sm italic font-normal text-gray-900'>{room?.description}</p>
                <div className='flex items-center justify-start md:justify-between'>
                  <div className='flex flex-wrap items-center space-x-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='flex-shrink-0 w-5 h-5 text-yellow-500 dark:text-green-400'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-gray-500'>Giá phòng: </span>
                    <span className='text-red-500 text-lg font-bold'>{formatCurrency(room?.price || 0)}</span>
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
                        d='M12 21l-3-3m3 3l3-3m-3 3V10m0 11V10m0 11H6a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2z'
                      />
                    </svg>
                    <span>
                      Trạng thái:{' '}
                      <span
                        className={classNames('font-semibold text-gray-900 dark:text-white', {
                          'text-green-500': room.status === RoomStatus.available,
                          'text-red-500': room.status === RoomStatus.rented
                        })}
                      >
                        Đang trống
                      </span>
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
                        d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                      />
                    </svg>
                    <span>Tiện ích:</span>
                    {
                      <ul className='flex flex-wrap gap-2'>
                        {room?.utilities?.map((item) => (
                          <li
                            key={item._id}
                            className='px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-lg'
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    }
                  </li>
                </ul>
                <span className='text-gray-500'>
                  Địa chỉ: <span className='font-medium text-gray-900'>{room?.address}</span>
                </span>
                <div className='border-[2px] rounded-md px-3 py-2.5 border-teal-500'>
                  <h2 className='text-gray-700'>
                    Tiền đặt cọc: <span className='text-red-500 text-lg font-bold'>{formatCurrency(room.deposit)}</span>{' '}
                  </h2>
                  <p className='italic text-gray-900'>
                    <span className='font-bold'>Lưu ý</span>: Hoàn tiền đặt cọc khi khách hàng nhận phòng. Sau khi đặt
                    phòng khách hàng vui lòng đến địa điểm nhận phòng để hoàn tất thủ tục.
                  </p>
                </div>
                <div className='grid grid-cols-12 items-center gap-3 my-3'>
                  <div className='flex items-center me-4 col-span-7'>
                    <input
                      id='teal-checkbox'
                      type='checkbox'
                      checked={agree_term}
                      onChange={() => setAgreeTerm(!agree_term)}
                      className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='teal-checkbox'
                      className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      <span>
                        <button className='text-blue-600 underline' onClick={() => setOpenModalTerm(true)}>
                          Điều khoản và điều kiện
                        </button>{' '}
                        đặt phòng
                      </span>
                    </label>
                  </div>
                  <button
                    type='button'
                    onClick={handleBookingRoom}
                    className='text-white col-span-5 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-1 py-2.5 text-center'
                  >
                    ĐẶT PHÒNG
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
        <div className='mt-5 p-10 bg-white mb-5'>
          <h1 className='font-medium text-gray-700 text-2xl mb-5'>Các phòng có giá tương tự</h1>
          {rooms_same_price.length > 0 ? (
            <CarouselControlsOutside rooms={rooms_same_price} />
          ) : (
            <div className='flex items-center justify-center h-96'>
              <h1 className='text-xl font-medium text-gray-700'>Không có phòng nào</h1>
            </div>
          )}
        </div>
      </div>
      <Modal show={openModal} className='overflow-hidden' size='md' onClose={() => setOpenModal(false)} popup>
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
      <Modal show={openModalTerm} className='overflow-hidden' size='2xl' onClose={() => setOpenModalTerm(false)}>
        <Modal.Header>Điều Khoản Đặt Phòng</Modal.Header>
        <Modal.Body className='max-h-[400px] overflow-y-scroll'>
          <div className='max-w-xl mx-auto my-8 p-8 bg-white shadow-lg rounded'>
            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Mục Đích Đặt Cọc:</h3>
              <p>a. Để đảm bảo và giữ chỗ cho phòng trong thời gian đặt cọc.</p>
              <p>b. Để bảo đảm người đặt cọc cam kết với quy định và thời gian ở lại.</p>
            </section>

            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Số Tiền Đặt Cọc:</h3>
              <p>a. Số tiền cọc là [X] đồng (VNĐ) và phải được thanh toán trước ngày [Y].</p>
              <p>b. Số tiền này sẽ được hoàn trả hoặc trừ vào tổng chi phí khi nhận phòng.</p>
            </section>

            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Phương Thức Thanh Toán:</h3>
              <p>a. Chấp nhận thanh toán bằng tiền mặt hoặc chuyển khoản ngân hàng.</p>
              <p>b. Thông tin tài khoản sẽ được cung cấp sau khi đặt cọc.</p>
            </section>

            {/* Các phần còn lại tương tự */}

            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Chấp Nhận Điều Kiện:</h3>
              <p>a. Việc thanh toán cọc đồng nghĩa với việc chấp nhận tất cả điều khoản và điều kiện trên.</p>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex items-center justify-end'>
          <Button
            color='success'
            onClick={() => {
              setOpenModalTerm(false)
              setAgreeTerm(true)
            }}
          >
            Đồng ý
          </Button>
          <Button
            color='gray'
            onClick={() => {
              setOpenModalTerm(false)
              setAgreeTerm(false)
            }}
          >
            Không đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RoomDetails
