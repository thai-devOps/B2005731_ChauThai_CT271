import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
import './adminlLayout.css'
import Navlink from '~/components/Navlink'
import classNames from 'classnames'
import Popover from '~/components/Popover'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from '~/apis/auth.api'
import { getRefreshTokenFromLocalStorage } from '~/utils/auth'
import { AppContext } from '~/context/app.context'
import { toast } from 'react-toastify'
// Define props interface used
interface IAdminLayoutProps {
  children: React.ReactNode
}
const AdminLayout: React.FC<IAdminLayoutProps> = ({ children }) => {
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const [showProfile, setShowProfile] = useState<boolean>(false)
  const { user, setAuthenticated, setIsLoading } = useContext(AppContext)
  const logoutAccountMutation = useMutation({
    mutationFn: ({ refresh_token }: { refresh_token: string }) => logoutAccount({ refresh_token })
  })
  const handleLogout = () =>
    logoutAccountMutation.mutate(
      { refresh_token: getRefreshTokenFromLocalStorage() },
      {
        onSuccess: () => {
          setAuthenticated(false)
        },
        onError: (err) => {
          toast.error(err as string)
          setAuthenticated(false)
        }
      }
    )
  useEffect(() => {
    setIsLoading(logoutAccountMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [logoutAccountMutation.isLoading, setIsLoading])
  return (
    <div className=''>
      <aside
        className={classNames('sidebar', {
          // eslint-disable-next-line prettier/prettier
          'close ': isClosed
        })}
      >
        <Link to={usePath.home} className='logo'>
          <i className='bx bx-building-house'></i>
          <div className='logo-name'>
            <span>Trọ</span>Alola
          </div>
        </Link>
        <ul className='side-menu'>
          <h5 className='title_sidebar p-3 text-gray-400'>{/* <span>THEO DÕI NHANH</span> */}</h5>
          <Navlink
            path={usePath.home}
            children={
              <div>
                <i className='bx bxs-home'></i>
                <span>Trang chủ</span>
              </div>
            }
          ></Navlink>
          <Navlink
            path={usePath.roomPlan}
            children={
              <div>
                <i className='bx bxs-customize'></i>
                <span>Sơ đồ phòng trọ</span>
              </div>
            }
          ></Navlink>
          {/* <Navlink
            path={usePath.rooms}
            children={
              <div>
                <i className='bx bxs-customize'></i>
                <span>Xem phòng</span>
              </div>
            }
          ></Navlink> */}
          <h5 className='title_sidebar p-3 text-gray-400'>{/* <span>QUẢN LÝ & VẬN HÀNH</span> */}</h5>
          <Navlink
            path={usePath.dataManagements.index}
            children={
              <div>
                <i className='bx bxs-data'></i>
                <span>Danh mục dữ liệu</span>
              </div>
            }
          ></Navlink>
          <Navlink
            path={usePath.users.index}
            children={
              <div>
                <i className='bx bx-group'></i>
                <span>Khách hàng</span>
              </div>
            }
          ></Navlink>
          <Navlink
            path={usePath.financial}
            children={
              <div>
                <i className='bx bx-dollar'></i>
                <span>Tài chính</span>
              </div>
            }
          ></Navlink>
          <Navlink
            path={usePath.notification}
            children={
              <div>
                <i className='bx bx-bell'></i>
                <span>Gửi thông báo</span>
              </div>
            }
          ></Navlink>
          <h5 className='title_sidebar p-3 text-gray-400'>{/* <span>BÁO CÁO</span> */}</h5>
          <Navlink
            path={usePath.repairs}
            children={
              <div>
                <i className='bx bxs-notepad'></i>
                <span>Sự cố/Công việc</span>
              </div>
            }
          ></Navlink>
          {/* <Navlink
            path={usePath.roomState}
            children={
              <div>
                <i className='bx bxs-carousel'></i>
                <span>Tình trạng phòng</span>
              </div>
            }
          ></Navlink> */}

          <h5 className='title_sidebar p-3 text-gray-400'>{/* <span>CÀI ĐẶT HỆ THỐNG</span> */}</h5>
          <Navlink
            path={usePath.settings}
            children={
              <div>
                <i className='bx bx-cog'></i>
                <span>Cài đặt chung</span>
              </div>
            }
          ></Navlink>
        </ul>
      </aside>
      <div className='content'>
        <nav>
          <i onClick={() => setIsClosed(!isClosed)} className='bx bx-menu' />
          <form action='#'>
            <div className='form-input'>
              <input type='search' placeholder='Tìm kiếm...' />
              <button className='search-btn' type='submit'>
                <i className='bx bx-search' />
              </button>
            </div>
          </form>
          <div className='rounded-3xl flex bg-gray-400 hover:bg-gray-400/50 p-1 cursor-pointer'>
            <i className='bx bxs-moon text-white'></i>
          </div>
          {/* <label htmlFor='theme-toggle' className='theme-toggle' /> */}
          {/* <a href='#' className='notif'>
              <i className='bx bx-bell' />
              <span className='count'>12</span>
            </a> */}
          <Popover
            children={
              <a href='#' className='notif'>
                <i className='bx bx-bell' />
                <span className='count'>12</span>
              </a>
            }
            renderPopover={
              <div className='px-5 py-2 max-w-[400px] w-[350px] min-h-[400px] bg-gray-100 border-b border-gray-200 rounded-lg dark:border-gray-600 dark:bg-gray-700'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg'>Thông báo</h2>
                  <Popover
                    children={<i className='cursor-pointer bx bx-dots-horizontal-rounded'></i>}
                    renderPopover={
                      <ul className='w-50 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        <li className='w-50 flex justify-between items-center cursor-pointer hover:bg-gray-200 px-4 py-2 border-b border-gray-200 dark:border-gray-600'>
                          <i className='bx bx-check'></i>
                          <span>Đánh dấu tất cả đã đọc</span>
                        </li>
                        <li className='w-50 flex justify-between items-center cursor-pointer hover:bg-gray-200 px-4 py-2 border-b border-gray-200 dark:border-gray-600'>
                          <i className='bx bx-trash'></i>
                          <span>Xóa tất cả thông báo</span>
                        </li>
                      </ul>
                    }
                  ></Popover>
                </div>
                <div className='w-[300px] mx-auto bg-white/80 rounded-lg h-[320px] mt-3'>
                  <p className='flex items-center content-center justify-center text-base font-light'>
                    Thông báo trống
                  </p>
                </div>
              </div>
            }
          ></Popover>
          <div className='grid place-items-end'>
            <div className='font-bold text-gray-900'>{user.name}</div>
            {user.role === 'admin' ? (
              <p className='text-gray-900 font-normal'>Chủ trọ</p>
            ) : (
              <p className='text-gray-600 font-light'>Khách hàng</p>
            )}
          </div>
          <button onClick={() => setShowProfile((prev) => !prev)} className='profile relative'>
            <img
              src={user.avatar === 'Chưa cập nhật' || user.avatar === '' ? '../../../public/img/user.png' : user.avatar}
              alt='anh dai dien'
              loading='lazy'
            />
            <div
              className={classNames({
                'profile-dropdown show': showProfile,
                'profile-dropdown hidden': !showProfile
              })}
            >
              <i className='bx absolute bxs-up-arrow text-white left-2' style={{ fontSize: '20px' }}></i>
              <div className='absolute w-[220px] -left-[180px] mt-4 bg-white border-teal-50 rounded-xl'>
                <NavLink
                  to={usePath.profile.viewProfile}
                  className='text-gray-600 border border-gray-50 rounded-xl hover:rounded-xl inline-flex items-center w-full px-4 py-2 text-sm font-medium  hover:bg-teal-600 hover:border-teal-400 hover:border hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                >
                  <i className='bx bxs-user mr-5'></i>
                  Thông tin tài khoản
                </NavLink>
                <NavLink
                  to={'/reset-password'}
                  className='text-gray-600 border border-gray-50 rounded-xl hover:rounded-xl inline-flex items-center w-full px-4 py-2 text-sm font-medium  hover:bg-teal-600 hover:border-teal-400 hover:border hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                >
                  <i className='bx bxs-lock mr-5'></i>
                  <span>Đổi mật khẩu</span>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className='text-gray-600 border border-gray-50 rounded-xl hover:rounded-xl inline-flex items-center w-full px-4 py-2 text-sm font-medium  hover:bg-teal-600 hover:border-teal-400 hover:border hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dar'
                >
                  <i className='bx bx-log-out mr-5'></i>
                  <span>Đăng xuất</span>
                </div>
              </div>
            </div>
          </button>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  )
}
export default AdminLayout
