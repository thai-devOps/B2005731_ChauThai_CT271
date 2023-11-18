import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logoutAccount } from '~/apis/auth.api'
import Footer from '~/components/Footer'
import Popover from '~/components/Popover'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const logoutMutation = useMutation({
    mutationFn: ({ refresh_token }: { refresh_token: string }) => {
      return logoutAccount({ refresh_token })
    }
  })
  const { setAuthenticated, setIsLoading } = useContext(AppContext)
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
  useEffect(() => {
    setIsLoading(logoutMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [logoutMutation.isLoading, setIsLoading])
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
          <div className='flex md:order-2'>
            <Popover
              children={
                <button
                  type='button'
                  className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                >
                  <img
                    className='w-8 h-8 rounded-full'
                    src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
                    alt='user photo'
                  />
                </button>
              }
              renderPopover={
                <div className='w-48 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                  <button
                    type='button'
                    className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                  >
                    <svg
                      className='w-3 h-3 mr-2.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                    </svg>
                    Thông tin tài khoản
                  </button>
                  <button
                    type='button'
                    className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-teal-200 hover:bg-teal-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                  >
                    <svg
                      className='w-3 h-3 mr-2.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25'
                      />
                    </svg>
                    Đổi mật khẩu
                  </button>
                  <button
                    type='button'
                    onClick={() => handleLogout()}
                    className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-3 h-3 mr-2.5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                      />
                    </svg>
                    Đăng xuất
                  </button>
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
              <li>
                <NavLink
                  to={'/booking'}
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
export default AdminLayout
