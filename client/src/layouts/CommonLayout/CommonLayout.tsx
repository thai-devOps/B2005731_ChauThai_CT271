import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logoutAccount } from '~/apis/auth.api'
import Footer from '~/components/Footer'
import Popover from '~/components/Popover'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'

interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  const { user } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: ({ refresh_token }: { refresh_token: string }) => {
      return logoutAccount({ refresh_token })
    }
  })
  const { isAuthenticated, setAuthenticated } = useContext(AppContext)
  const handleLogout = () => {
    logoutMutation.mutate(
      { refresh_token: localStorage.getItem('refresh_token') as string },
      {
        onSuccess: () => {
          localStorage.clear()
          setAuthenticated(false)
        }
      }
    )
  }
  return (
    <div>
      <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to={usePath.home} className='flex flex-wrap gap-5 text-4xl items-center'>
            <i className='bx bx-building-house text-blue-500'></i>
            <div className='font-bold'>
              <span>Trọ</span>
              <span className='text-blue-500'>Alola</span>
            </div>
          </Link>
          {isAuthenticated ? (
            <div className='flex md:order-2'>
              <Popover
                children={
                  <div className='flex justify-center gap-3 items-center'>
                    <button
                      type='button'
                      className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                    >
                      <img className='w-8 h-8 rounded-full' src={user.avatar} alt='user photo' />
                    </button>
                    <span className='font-bold'>{user.name}</span>
                  </div>
                }
                renderPopover={
                  <div className='w-56 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
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
                      className='text-gray-600 cursor-pointer border border-gray-50 rounded-xl hover:rounded-xl inline-flex items-center w-full px-4 py-2 text-sm font-medium  hover:bg-teal-600 hover:border-teal-400 hover:border hover:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dar'
                    >
                      <i className='bx bx-log-out mr-5'></i>
                      <span>Đăng xuất</span>
                    </div>
                  </div>
                }
              />
              <button
                data-collapse-toggle='navbar-sticky'
                type='button'
                className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                aria-controls='navbar-sticky'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 17 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M1 1h15M1 7h15M1 13h15'
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className='flex md:order-2 gap-3'>
              <NavLink to={usePath.login}>
                <button
                  className={classNames(
                    'group-hover:from-green-400 relative text-sm inline-flex items-center justify-center p-0.5 overflow-hidden group-hover:to-blue-600 hover:text-white dark:text-white bg-gradient-to-br from-green-400 to-blue-600 group focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green- font-medium rounded-lg',
                    {
                      ' text-white hover:bg-gradient-to-bl pointer-events-none text-center': isAuthenticated,
                      '  text-gray-900 ': !isAuthenticated
                    }
                  )}
                >
                  <span
                    className={classNames(
                      'relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                      {
                        'bg-white': !isAuthenticated
                      }
                    )}
                  >
                    Đăng nhập
                  </span>
                </button>
              </NavLink>
              <NavLink to={usePath.register}>
                <button
                  className={classNames(
                    'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400',
                    {
                      'hover:bg-gradient-to-bl cursor-not-allowed text-center ': isAuthenticated
                    }
                  )}
                >
                  <span
                    className={classNames(
                      'relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                      {
                        'bg-white': isAuthenticated
                      }
                    )}
                  >
                    Đăng ký
                  </span>
                </button>
              </NavLink>
            </div>
          )}
          <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink
                  to={usePath.home}
                  className={({ isActive }) =>
                    classNames({
                      'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500':
                        isActive,
                      'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700':
                        !isActive
                    })
                  }
                  aria-current='page'
                >
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={usePath.rooms + '?page=1&limit=6'}
                  className={({ isActive }) =>
                    classNames({
                      'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500':
                        isActive,
                      'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700':
                        !isActive
                    })
                  }
                  aria-current='page'
                >
                  Đặt phòng
                </NavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <NavLink
                    to={usePath.bookingHistory}
                    className={({ isActive }) =>
                      classNames({
                        'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500':
                          isActive,
                        'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700':
                          !isActive
                      })
                    }
                    aria-current='page'
                  >
                    Lịch sử đặt phòng
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to={usePath.contact}
                  className={({ isActive }) =>
                    classNames({
                      'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500':
                        isActive,
                      'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700':
                        !isActive
                    })
                  }
                  aria-current='page'
                >
                  Liên hệ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
      <Footer></Footer>
    </div>
  )
}
export default CommonLayout
