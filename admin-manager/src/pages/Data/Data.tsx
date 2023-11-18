import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { MdDashboard } from 'react-icons/md'
import { usePath } from '~/constants/usePath'
import { RiHotelLine } from 'react-icons/ri'
import { MdManageAccounts } from 'react-icons/md'

interface IDataProps {
  children?: React.ReactNode
}
const Data: React.FC<IDataProps> = ({ children }) => {
  const location = useLocation()
  const isIndexActive = location.pathname === '/data'
  return (
    <>
      <div className='header bg-white p-5 rounded-md'>
        <div className='left'>
          <h1>Danh mục dữ liệu</h1>
        </div>
      </div>
      <div className='bg-white p-5 mt-5 rounded-md flex justify-between'>
        <NavLink
          to={usePath.dataManagements.account + '?page=1&limit=5'}
          className={({ isActive }) =>
            classNames('', {
              'py-2.5 px-5 mr-2 mb-2 text-lg gap-6 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[100%] flex justify-center items-center ':
                !isActive && !isIndexActive,
              'py-2.5 px-5 mr-2 mb-2 text-lg gap-6 font-medium  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[100%] flex justify-center items-center':
                isActive || isIndexActive
            })
          }
        >
          <MdManageAccounts />
          <span>Tài khoản</span>
        </NavLink>
        <NavLink
          to={usePath.dataManagements.room + '?page=1&limit=5'}
          type='button'
          className={({ isActive }) =>
            classNames('', {
              'py-2.5 px-5 mr-2 mb-2 text-lg gap-6 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[100%] flex justify-center items-center ':
                !isActive,
              'py-2.5 px-5 mr-2 mb-2 text-lg gap-6 font-medium  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[100%] flex justify-center items-center':
                isActive
            })
          }
        >
          <RiHotelLine />
          <span>Phòng</span>
        </NavLink>
        <NavLink
          to={usePath.dataManagements.utilities + '?page=1&limit=5'}
          className={({ isActive }) =>
            classNames('', {
              'py-2.5 px-5 mr-2 mb-2 text-lg gap-6 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[100%] flex justify-center items-center ':
                !isActive,
              'py-2.5 px-5 mr-2 mb-2 text-lg gap-6 font-medium  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-[100%] flex justify-center items-center':
                isActive
            })
          }
        >
          <MdDashboard />
          <span>Tiện ích</span>
        </NavLink>
      </div>
      {children}
      {/* {showForm && (
        <div className='animate__animated '>
          <form noValidate onSubmit={handleSubmit(handleCreateRoom)} className='md:px-20 md:py-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 '>
              <Input
                labelName='Ảnh'
                requireLable={true}
                name='images'
                placeholder='Nhập ảnh...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.images?.message}
                error_type={errors.images}
              />
              <Input
                labelName='Tên phòng'
                requireLable={true}
                name='name'
                placeholder='Nhập tên phòng...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.name?.message}
                error_type={errors.name}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 '>
              <Input
                labelName='Địa chỉ'
                requireLable={true}
                name='address'
                placeholder='Nhập địa chỉ...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.address?.message}
                error_type={errors.address}
              />
              <Input
                labelName='Giá phòng'
                requireLable={true}
                name='price'
                placeholder='Nhập giá phòng...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.price?.message}
                error_type={errors.price}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
              <Input
                labelName='Số người'
                name='max_guest'
                requireLable={true}
                placeholder='Nhập số người...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.max_guest?.message}
                error_type={errors.max_guest}
              />
              <Input
                labelName='Diện tích'
                name='area'
                requireLable={true}
                placeholder='Nhập diện tích...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.area?.message}
                error_type={errors.area}
              />

              <Input
                labelName='Trạng thái'
                name='status'
                requireLable={true}
                placeholder='Nhập trạng thái...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.status?.message}
                error_type={errors.status}
              />
            </div>
            <Input
              labelName='Tiện ích'
              name='utilities'
              requireLable={true}
              placeholder='Nhập các tiện ích...'
              registerFC={register}
              auto_complete='on'
              types='text'
              error_message={errors.utilities?.message}
              error_type={errors.utilities}
            ></Input>
            <TextArea
              labelName='Mô tả'
              name='description'
              requireLable={true}
              placeholder='Nhập mô tả...'
              registerFC={register}
              auto_complete='on'
              row={4}
              error_message={errors.description?.message}
              error_type={errors.description}
            />
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
              <Input
                labelName='Tiền điện/kW'
                name='electric'
                requireLable={true}
                placeholder='Nhập tiền điện vnđ...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.electric?.message}
                error_type={errors.electric}
              />
              <Input
                labelName='Tiền nước/m3'
                name='water'
                requireLable={true}
                placeholder='Nhập tiền nước vnđ...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.water?.message}
                error_type={errors.water}
              />
              <Input
                labelName='Tiền đặt cọc'
                name='deposit'
                requireLable={true}
                placeholder='Nhập tiền đặt cọc vnđ...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.deposit?.message}
                error_type={errors.deposit}
              />
            </div>

            <div className='grid place-items-center'>
              <button
                type='submit'
                className='text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2'
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      )} */}

      {/* {!isLoading && (

      )} */}
    </>
  )
}
export default Data
