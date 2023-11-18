import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
// Define props interface used
interface IProfileProps {
  children: React.ReactNode
}
const Profile: React.FC<IProfileProps> = ({ children }) => {
  const isUpdate = Boolean(useMatch(usePath.profile.updateProfile))
  return (
    <div className='bg-white py-3 px-3'>
      <header className='header flex justify-between items-center'>
        <div className='left'>
          {' '}
          <h1>Thông tin cá nhân</h1>
        </div>
        {/* <NavLink
          to={isUpdate ? usePath.profile.viewProfile : usePath.profile.updateProfile}
          className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            {isUpdate ? 'Hủy bỏ' : 'Cập nhật'}
          </span>
        </NavLink> */}
        <NavLink
          to={isUpdate ? usePath.profile.viewProfile : usePath.profile.updateProfile}
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          {isUpdate ? 'Hủy bỏ' : 'Cập nhật'}
        </NavLink>
      </header>
      <hr />
      {children}
      <hr className='mb-14' />
    </div>
  )
}
export default Profile
