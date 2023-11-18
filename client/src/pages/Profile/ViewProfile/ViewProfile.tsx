import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getUserProfile } from '~/apis/auth.api'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'
import { User } from '~/types/user.type'
import { convertUTCtoCustomFormat } from '~/utils/utils'
// Define props interface used
interface IViewProfileProps {}
const ViewProfile: React.FC<IViewProfileProps> = (_props: IViewProfileProps) => {
  const { user, setUser } = useContext(AppContext)
  const new_dob = convertUTCtoCustomFormat(user.date_of_birth as string)
  const { data: profileData } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile()
  })
  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setUser(profile as User)
    }
  }, [profile, setUser])
  return (
    <div className='mt-24 mb-6 max-w-screen-md mx-auto bg-white'>
      <div className='flex justify-between items-center'>
        <div className='px-10 text-3xl font-medium py-5'>Thông tin người dùng</div>
        <NavLink to={usePath.profile.updateProfile} className='text-yellow-300 mr-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
          </svg>
        </NavLink>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5'>
        <div className='mb-10 p-5 sm:col-span-2 flex flex-col place-content-center place-items-center'>
          <img
            src={user.avatar === 'Chưa cập nhật' || user.avatar === '' ? 'img/user.png' : user.avatar}
            className='w-52 h-52 object-cover rounded-lg'
            alt=''
          />
        </div>
        <div className='col-span-2 sm:col-span-3 p-5'>
          <div className='grid py-2 grid-cols-2'>
            <h3>Họ tên</h3>
            <h3>{user.name}</h3>
          </div>
          <div className='grid py-2 grid-cols-2'>
            <h3>Số điện thoại</h3>
            <h3>{user.phone_number}</h3>
          </div>
          <div className='grid py-2 grid-cols-2'>
            <h3>Địa chỉ email</h3>
            <h3 className='truncate'>{user?.email}</h3>
          </div>
          <div className='grid py-2 grid-cols-2'>
            <h3>Giới tính</h3>
            {user.gender === 'Chưa cập nhật' ? (
              <div className='flex items-center justify-between'>
                <span className='text-orange-500'>{user.gender}</span>
                <i className='bx bx-info-square text-orange-500'></i>
              </div>
            ) : (
              <span>{user?.gender}</span>
            )}
          </div>
          <div className='grid py-2 grid-cols-2'>
            <h3>Ngày sinh</h3>
            {user?.date_of_birth === 'Chưa cập nhật' ? (
              <div className='flex items-center justify-between'>
                <span className='text-orange-500'>{user.date_of_birth}</span>
                <i className='bx bx-info-square text-orange-500'></i>
              </div>
            ) : (
              <span>{new_dob}</span>
            )}
          </div>
          <div className='grid py-2 grid-cols-2'>
            <h3>Địa chỉ</h3>
            {user.address === 'Chưa cập nhật' ? (
              <div className='flex items-center justify-between'>
                <span className='text-orange-500'>{user.address}</span>
                <i className='bx bx-info-square text-orange-500'></i>
              </div>
            ) : (
              <span>{user.address}</span>
            )}
          </div>
          <div className='grid py-2 grid-cols-2'>
            <h3>CMNN/CCCD</h3>
            {user?.cccd === 'Chưa cập nhật' ? (
              <div className='flex items-center justify-between'>
                <span className='text-orange-500'>{user.cccd}</span>
                <i className='bx bx-info-square text-orange-500'></i>
              </div>
            ) : (
              <span>{user?.cccd}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewProfile
