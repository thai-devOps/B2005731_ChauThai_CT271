import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { getUserProfile } from '~/apis/auth.api'
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
    <>
      <div className='grid grid-cols-1 md:grid-cols-5 md:py-10'>
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
    </>
  )
}
export default ViewProfile
