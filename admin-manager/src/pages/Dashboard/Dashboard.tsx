import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllBookings, getAllRooms, getAllUsers, getAllUtilitiesNopaginate } from '~/apis/auth.api'
import BookingItemRecent from '../User/Booking/BookingItemRencent'
// Define props interface used
interface IDashboardProps {}
const Dashboard: React.FC<IDashboardProps> = (_props: IDashboardProps) => {
  const { data: bookingsData } = useQuery({
    queryKey: ['dashboard-booking'],
    queryFn: () => getAllBookings({ page: '1', limit: '1000' }).then((res) => res.data),
    refetchOnWindowFocus: true
  })
  const { data: roomsData } = useQuery({
    queryKey: ['dashboard-rooms'],
    queryFn: () => getAllRooms(),
    keepPreviousData: true,
    refetchOnWindowFocus: true
  })
  const { data: usersData } = useQuery({
    queryKey: ['dashboard-users'],
    queryFn: () => getAllUsers(),
    keepPreviousData: true,
    refetchOnWindowFocus: true
  })
  const { data: utilitiesData } = useQuery({
    queryKey: ['dashboard-utilities'],
    queryFn: () => getAllUtilitiesNopaginate(),
    keepPreviousData: true,
    refetchOnWindowFocus: true
  })
  // console.log(usersData?.data)
  const bookings = bookingsData?.data?.bookings || []
  const rooms = roomsData?.data?.data || []
  const users = usersData?.data?.data || []
  const utilities = utilitiesData?.data?.data || []
  const bookingRecent = bookings.slice(0, 3)
  return (
    <div>
      <div className='header'>
        <div className='left'>
          <h1>Trang chủ</h1>
        </div>
      </div>
      <ul className='insights'>
        <li>
          <i className='bx bx-clipboard'></i>
          <span className='info'>
            <h3>{bookings.length}</h3>
            <p>Đơn phòng</p>
          </span>
        </li>
        <li>
          <i className='bx bx-table'></i>
          <span className='info'>
            <h3>{rooms.length}</h3>
            <p>Phòng</p>
          </span>
        </li>
        <li>
          <i className='bx bx-show-alt' />
          <span className='info'>
            <h3>{users.length}</h3>
            <p>Khách</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-add-to-queue'></i>
          <span className='info'>
            <h3>{utilities.length}</h3>
            <p>Tiện tích</p>
          </span>
        </li>
      </ul>
      {/* End of Insights */}
      <div className='bottom-data'>
        <div className='orders'>
          <div className='header'>
            <i className='bx bx-receipt' />
            <h3>Đặt cọc gần đây</h3>
            <i className='bx bx-filter' />
            <i className='bx bx-search' />
          </div>
          <table>
            <thead>
              <tr>
                <th>Khách</th>
                <th>Ngày đặt cọc</th>
                <th>Phương thức tanh toán</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bookingRecent.map((booking) => (
                <BookingItemRecent booking={booking} key={booking._id} />
              ))}
            </tbody>
          </table>
        </div>
        {/* Reminders */}
        <div className='reminders'>
          <div className='header'>
            <i className='bx bx-note' />
            <h3>Lời nhắc nhở</h3>
            <i className='bx bx-filter' />
            <i className='bx bx-plus' />
          </div>
          <ul className='task-list'>
            <li className='completed'>
              <div className='task-title'>
                <i className='bx bx-check-circle' />
                <p>Hoàn tiền khách hàng</p>
              </div>
              <i className='bx bx-dots-vertical-rounded' />
            </li>
            <li className='completed'>
              <div className='task-title'>
                <i className='bx bx-check-circle' />
                <p>Sửa chữa Phòng A-5</p>
              </div>
              <i className='bx bx-dots-vertical-rounded' />
            </li>
            <li className='not-completed'>
              <div className='task-title'>
                <i className='bx bx-x-circle' />
                <p>Cập nhật điều kiện thuê phòng</p>
              </div>
              <i className='bx bx-dots-vertical-rounded' />
            </li>
          </ul>
        </div>
        {/* End of Reminders*/}
      </div>
    </div>
  )
}
export default Dashboard
