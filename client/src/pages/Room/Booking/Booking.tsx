import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { createBooking, getRoomDetails } from '~/apis/auth.api'
import { AppContext } from '~/context/app.context'
import useQueryParams from '~/hooks/useQueryParams'
import { RoomType } from '~/types/room.type'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { convertVNDtoUSD, formatCurrency } from '~/utils/utils'
import { Card } from 'flowbite-react'
import { BookingBody, BookingStatus } from '~/types/booking.type'
import { useNavigate } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CreateOrderData, OnApproveData } from '@paypal/paypal-js'
const Booking: React.FC = () => {
  const { user } = useContext(AppContext)
  const [showToast, setShowToast] = React.useState(false)
  const { setIsLoading } = useContext(AppContext)
  const checkIn = new Date().toISOString()
  const [payment, setPaypal] = React.useState(0)
  const baseUrl = 'http://localhost:4040'
  // convert iso string to date string format
  const checkInDateView = new Date(checkIn)
  const checkInFormat = `${checkInDateView.getDate()}/${
    checkInDateView.getMonth() + 1
  }/${checkInDateView.getFullYear()}`
  const queryParams = useQueryParams()
  const roomId = queryParams.roomId
  const { data, isLoading: isLoadingRoom } = useQuery({
    queryKey: ['booking/id', roomId],
    queryFn: () => {
      return getRoomDetails(roomId)
    },
    enabled: !!roomId
  })
  const bookingMutation = useMutation({
    mutationFn: (data: BookingBody) => {
      return createBooking(data)
    }
  })
  useEffect(() => {
    setIsLoading(bookingMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [bookingMutation.isLoading, setIsLoading])
  const navigate = useNavigate()
  const handleBooking = () => {
    const bookingData: BookingBody = {
      room_id: roomId,
      user_id: user._id as string,
      check_in: checkIn,
      payment_method: payment,
      status: BookingStatus.PENDING
    }
    bookingMutation.mutate(bookingData, {
      onSuccess: () => {
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 1000)
        setTimeout(() => {
          navigate(usePath.bookingHistory)
        }, 1001)
      }
    })
  }
  const roomData = data?.data as ResponseSuccessAPI<RoomType>
  const room = roomData?.data
  // Create order
  const createOrder = async (data: CreateOrderData) => {
    // Order is created on the server and the order id is returned
    const response = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        room: {
          deposit: convertVNDtoUSD(room.deposit)
        }
      })
    })
    const order = await response.json()
    return order.id as string
  }
  // Handle approve
  const onApprove = (data: OnApproveData) => {
    // Order is captured on the server
    return fetch(`${baseUrl}/api/orders/${data.orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((details) => {
        console.log('Payment', details)
        handleBooking()
      })
  }
  return (
    <div className='max-w-screen-lg mx-auto mb-5'>
      <div className='mt-24'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='bg-white py-6 px-5'>
            <div className='text-lg font-bold text-gray-600 underline'>THÔNG TIN THANH TOÁN</div>
            <div className='mt-5'>
              <div className='text-gray-600'>
                Họ và tên <span className='text-red-500'>*</span>
              </div>
              <div className='mt-2'>
                <input
                  type='text'
                  value={user.name}
                  disabled
                  className='border text-gray-700 border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                />
              </div>
            </div>
            <div className='mt-5'>
              <div className='text-gray-600'>
                Email <span className='text-red-500'>*</span>
              </div>
              <div className='mt-2'>
                <input
                  type='text'
                  value={user.email}
                  disabled
                  className='border text-gray-700 border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                />
              </div>
            </div>
            <div className='mt-5'>
              <div className='text-gray-600'>
                Số điện thoại <span className='text-red-500'>*</span>
              </div>
              <div className='mt-2'>
                <input
                  type='text'
                  value={user.phone_number}
                  disabled
                  className='border text-gray-700 border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                />
              </div>
            </div>
            <div className='mt-5'>
              <div className='text-gray-600'>
                Địa chỉ <span className='text-red-500'>*</span>
              </div>
              <div className='mt-2'>
                <input
                  type='text'
                  value={user.address}
                  disabled
                  className='border text-gray-700 border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                />
              </div>
            </div>
          </div>
          <div className='bg-white px-5 py-6'>
            <div className='text-lg font-bold text-gray-600 underline'>THÔNG TIN PHÒNG THUÊ</div>
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
                      d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
                    />
                  </svg>

                  <span>Diện tích: {room?.area} m2</span>
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
                    <span className='font-semibold text-gray-900 dark:text-white'>{room?.capacity} người</span>
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
                        <li key={item._id} className='px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-lg'>
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
                  Tiền đặt cọc:{' '}
                  <span className='text-red-500 text-lg font-bold'>{formatCurrency(room?.deposit || 0)}</span>{' '}
                </h2>
                <p className='italic text-gray-900'>
                  <span className='font-bold'>Lưu ý</span>: Hoàn tiền đặt cọc khi khách hàng nhận phòng. Sau khi đặt
                  phòng khách hàng vui lòng đến địa điểm nhận phòng để hoàn tất thủ tục.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Card className='max-w-full mt-5'>
          <h5 className='mb-3 text-base font-semibold text-gray-900 dark:text-white lg:text-xl'>THANH TOÁN</h5>
          <div className='grid grid-cols-12 md:gap-10'>
            <div className='col-span-7 space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='text-gray-700'>Mã phòng</div>
                <div className='text-gray-500 font-semibold'>{room?.name}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-700'>Tiền cọc</div>
                <div className='text-gray-500 font-semibold'>{formatCurrency(room?.deposit || 0)}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-700'>Ngày đặt phòng</div>
                <div className='text-gray-500 font-semibold'>{checkInFormat}</div>
              </div>
              <hr className='my-3' />
              <div className='flex items-center justify-between'>
                <div className='text-gray-700'>Số tiền thanh toán</div>
                <div className='text-red-500 font-semibold'>{formatCurrency(room?.deposit || 0)}</div>
              </div>
            </div>
            <div className='col-span-5'>
              <div className='grid'>
                {/* payment selection */}
                <div className='mb-5'>
                  <div className='text-gray-700 mb-2 font-medium'>Phương thức thanh toán</div>
                  <div className='space-y-3'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        value={0}
                        checked={payment === 0}
                        onChange={(e) => {
                          setPaypal(parseInt(e.target.value))
                        }}
                        name='payment'
                        id='0'
                      />
                      <label htmlFor='0' className='ml-2 text-gray-500'>
                        Thanh toán trực tiếp
                      </label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        checked={payment === 1}
                        value={1}
                        onChange={(e) => {
                          setPaypal(parseInt(e.target.value))
                        }}
                        name='payment'
                        id='1'
                      />
                      <label htmlFor='1' className='ml-2 text-gray-500'>
                        Thanh toán Paypal
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='my-3' />
              {!isLoadingRoom && (
                <div className='flex justify-center items-center'>
                  {payment === 0 && (
                    <button
                      type='button'
                      onClick={handleBooking}
                      className='text-white col-span-5 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-2.5 text-center'
                    >
                      Xác nhận
                    </button>
                  )}
                  {payment === 1 && (
                    <PayPalButtons
                      createOrder={(data, actions) => createOrder(data)}
                      onApprove={(data, actions) => onApprove(data)}
                    ></PayPalButtons>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      {showToast && (
        <div
          id='toast-top-right'
          className='fixed flex animate__animated animate__bounceIn items-center z-[100000000] w-full max-w-xs space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800'
          role='alert'
        >
          <div
            id='toast-default'
            className='flex items-center w-full p-4 max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
            role='alert'
          >
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200'>
              <img src='../../../../public/img/check.png' alt='' />
            </div>
            <div className='ms-3 text-sm font-normal'>Đặt phòng thành công.</div>
            <button
              type='button'
              onClick={() => setShowToast(false)}
              className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
              data-dismiss-target='#toast-default'
              aria-label='Close'
            >
              <span className='sr-only'>Close</span>
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Booking
