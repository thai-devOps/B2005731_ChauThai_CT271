import React, { useContext } from 'react'

// import { NavLink } from 'react-router-dom'
// import { usePath } from '~/constants/usePath'
// import classNames from 'classnames'
// import Popover from '~/components/Popover'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from '~/apis/auth.api'
import { AppContext } from '~/context/app.context'
import { getRefreshTokenFromLocalStorage } from '~/utils/auth'
import { toast } from 'react-toastify'
import './mainLayout.css'
import { NavLink } from 'react-router-dom'
interface IMainLayoutProps {
  children?: React.ReactNode
}
const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const { setAuthenticated } = useContext(AppContext)
  const logoutAccountMutation = useMutation({
    mutationFn: ({ refresh_token }: { refresh_token: string }) => logoutAccount({ refresh_token })
  })
  const handleLogout = () => {
    logoutAccountMutation.mutate(
      { refresh_token: getRefreshTokenFromLocalStorage() },
      {
        onSuccess: () => setAuthenticated(false),
        onError: (err) => {
          toast.error(err as string)
          setAuthenticated(false)
        }
      }
    )
  }
  //
  return (
    <div>
      {/* <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex flex-wrap sm:flex-nowrap items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                data-drawer-target='logo-sidebar'
                data-drawer-toggle='logo-sidebar'
                aria-controls='logo-sidebar'
                type='button'
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  />
                </svg>
              </button>
              <a href='https://flowbite.com' className='flex ml-2 md:mr-24'>
                <img src='https://flowbite.com/docs/images/logo.svg' className='h-8 mr-3' alt='FlowBite Logo' />
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                  BoardingHouse
                </span>
              </a>
            </div>
            <div className='flex items-center justify-end w-full'>
              <Popover
                className='flex items-center hover:cursor-pointer gap-2 ml-8'
                renderPopover={
                  <div className='w-[300px] h-[300px] mt-[1px] rounded-lg bg-gray-100/90 shadow-md'>
                    <div className='grid px-5 py-5'>
                      <div className='flex justify-between items-center'>
                        <h5 className='text-xl font-medium'>Thông báo</h5>
                        <svg
                          className='w-6 h-6 text-gray-800 dark:text-white'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 16 3'
                        >
                          <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                        </svg>
                      </div>
                      <div className='grid mt-3 overflow-y-auto h-[210px] bg-white rounded-2xl align-middle place-items-center'>
                        <div className='font-normal'>Thông báo trống</div>
                      </div>
                    </div>
                  </div>
                }
              >
                <button
                  type='button'
                  className='flex items-center gap-1 text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5'
                    />
                  </svg>
                  <span className='text-gray-900 font-bold hidden md:block'>Thông báo</span>
                </button>
              </Popover>
              <div className='flex items-center hover:cursor-pointer gap-2 ml-8'>
                <button
                  type='button'
                  className='flex items-center gap-1 text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
                    />
                  </svg>
                  <span className='text-gray-900 font-bold hidden md:block'>Hỗ trợ</span>
                </button>
              </div>
              <Popover
                className='flex items-center hover:cursor-pointer gap-2 ml-8'
                renderPopover={
                  <div className='w-[150px] grid gap-3 place-items-center h-[130px] mt-[1px] px-2 py-5 rounded-lg bg-gray-100/90 shadow-md'>
                    <div className='font-medium text-teal-900 bg-white w-full text-center rounded-md py-2'>
                      Tiếng Việt
                    </div>
                    <div className='font-normal text-gray-900 hover:bg-white hover:text-teal-900 hover:font-medium w-full text-center rounded-md py-2'>
                      English
                    </div>
                  </div>
                }
              >
                <button
                  type='button'
                  className='flex items-center gap-1 text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                    />
                  </svg>
                  <span className='text-gray-900 font-bold hidden md:block'>Tiếng Việt</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-3 h-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
                </button>
              </Popover>
              <Popover
                className='flex items-center hover:cursor-pointer ml-8'
                renderPopover={
                  <div className=' text-base bg-gray-100/90 mt-[1px] rounded-lg shadow-md list-none bg-gray divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600'>
                    <div className='px-4 py-3' role='none'>
                      <p className='text-sm text-gray-900 dark:text-white' role='none'>
                        Chau Thai
                      </p>
                      <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300' role='none'>
                        thaib2005731@student.ctu.edu.vn
                      </p>
                    </div>
                    <div className='grid place-items-start gap-5 px-4 py-3 content-center'>
                      <button className='flex items-center transition delay-75 gap-2 border bg-gray-100/90 hover:bg-white hover:border-teal-400 w-full py-2 px-2 rounded-lg'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-5 h-5'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                          />
                        </svg>

                        <span>Tài khoản của tôi</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className='flex items-center transition delay-75 gap-2 border bg-gray-100/90 hover:bg-white hover:border-teal-400 w-full py-2 px-2 rounded-lg'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-5 h-5'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                          />
                        </svg>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                }
              >
                <img
                  className='w-8 h-8 rounded-full'
                  src='https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/327270266_573280101334243_8803710512252421785_n.jpg?_nc_cat=106&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LWGJGvgEmsIAX-X7YFn&_nc_oc=AQlu-Of7rUaeA3_HZqtSRWkfQifuVazbhgN-iV9IVb5TXuapVcmGTqRuJ6H46xEtgT0&_nc_ht=scontent.fvca1-1.fna&oh=00_AfAtCdvcpbvW2H0kA0Zw4qZjciVoqnUYp2tBz9lXBnFyZg&oe=64C7DC8D'
                  alt=''
                />
              </Popover>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id='logo-sidebar'
        className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
          <ul className='space-y-2 font-medium flex flex-col'>
            <li>
              <NavLink
                to={usePath.home}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                    </svg>
                    <span className='ml-3'>Trang chủ</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={usePath.products}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 group-hover:text-white hover:text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 18'
                    >
                      <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z' />
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Xem phòng trọ</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={usePath.notification}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z' />
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Thông báo</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={usePath.users}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 18'
                    >
                      <path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Khách hàng</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={usePath.orders}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 21'
                    >
                      <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Đặt phòng</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={usePath.statistics}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 22 21'
                    >
                      <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                      <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                    </svg>
                    <span className='ml-3'>Thống kê</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <button
                type='button'
                className='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                aria-controls='dropdown-example'
                data-collapse-toggle='dropdown-example'
              >
                <svg
                  className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 18'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11 14h6m-3 3v-6M1.857 1h4.286c.473 0 .857.384.857.857v4.286A.857.857 0 0 1 6.143 7H1.857A.857.857 0 0 1 1 6.143V1.857C1 1.384 1.384 1 1.857 1Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 11 6.143V1.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H1.857A.857.857 0 0 1 1 16.143v-4.286c0-.473.384-.857.857-.857Z'
                  />
                </svg>
                <span className='flex-1 ml-3 text-left whitespace-nowrap'>Tiện ích</span>
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>
              <ul id='dropdown-example' className='hidden py-2 space-y-2'>
                <li>
                  <NavLink
                    to={usePath.payment}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center pl-8 text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                        : 'flex items-center p-2 pl-8 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          className={classNames({
                            'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                              isActive,
                            'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                              !isActive
                          })}
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 20 14'
                        >
                          <path d='M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z' />
                          <path d='M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z' />
                        </svg>
                        <span className='ml-3'>Thanh toán hóa đơn</span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={usePath.repairs}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center pl-8 text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                        : 'flex items-center p-2 pl-8 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          className={classNames({
                            'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                              isActive,
                            'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                              !isActive
                          })}
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z' />
                          <path d='M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z' />
                          <path d='M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z' />
                        </svg>
                        <span className='ml-3'>Đăng ký sửa chữa</span>
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to={usePath.notification}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center text-white p-2 rounded-lg dark:text-white bg-blue-cornFlower dark:hover:bg-gray-700 group'
                    : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-cornFlower hover:text-white dark:hover:bg-gray-700 group'
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={classNames({
                        'w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white':
                          isActive,
                        'w-5 h-5 text-gray-500 hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white ':
                          !isActive
                      })}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 22 21'
                    >
                      <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                      <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                    </svg>
                    <span className='ml-3'>Thống kê</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <div className='sm:ml-64'>
        <div className='mt-14'>{children}</div>
      </div> */}
      <div>
        {/* Sidebar */}
        <div className='sidebar fixed top-0 left-0 bg-custom-light w-[230px] h-full z-[2000] overflow-x-hidden scoll-'>
          <a href='#' className='logo'>
            <i className='bx bx-code-alt' />
            <div className='logo-name'>
              <span>Nhà trọ </span>24h
            </div>
          </a>
          <ul className='side-menu'>
            <li>
              <a href='#'>
                <i className='bx bxs-dashboard' />
                Dashboard
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='bx bx-store-alt' />
                Shop
              </a>
            </li>
            <li className='active'>
              <a href='#'>
                <i className='bx bx-analyse' />
                Analytics
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='bx bx-message-square-dots' />
                Tickets
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='bx bx-group' />
                Users
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='bx bx-cog' />
                Settings
              </a>
            </li>
          </ul>
          <ul className='side-menu'>
            <li>
              <button onClick={handleLogout} className='logout'>
                <i className='bx bx-log-out-circle' />
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* End of Sidebar */}
        {/* Main Content */}
        <div className='content'>
          {/* Navbar */}
          <nav>
            <i className='bx bx-menu' />
            <form action='#'>
              <div className='form-input'>
                <input type='search' placeholder='Search...' />
                <button className='search-btn' type='submit'>
                  <i className='bx bx-search' />
                </button>
              </div>
            </form>
            <input type='checkbox' id='theme-toggle' hidden />
            <label htmlFor='theme-toggle' className='theme-toggle' />
            <a href='#' className='notif'>
              <i className='bx bx-bell' />
              <span className='count'>12</span>
            </a>
            <a href='#' className='profile'>
              <img src='images/logo.png' />
            </a>
          </nav>
          {/* End of Navbar */}
          <main>
            <div className='header'>
              <div className='left'>
                <h1>Dashboard</h1>
                <ul className='breadcrumb'>
                  <li>
                    <a href='#'>Analytics</a>
                  </li>
                  /
                  <li>
                    <a href='#' className='active'>
                      Shop
                    </a>
                  </li>
                </ul>
              </div>
              <a href='#' className='report'>
                <i className='bx bx-cloud-download' />
                <span>Download CSV</span>
              </a>
            </div>
            {/* Insights */}
            <ul className='insights'>
              <li>
                <i className='bx bx-calendar-check' />
                <span className='info'>
                  <h3>1,074</h3>
                  <p>Paid Order</p>
                </span>
              </li>
              <li>
                <i className='bx bx-show-alt' />
                <span className='info'>
                  <h3>3,944</h3>
                  <p>Site Visit</p>
                </span>
              </li>
              <li>
                <i className='bx bx-line-chart' />
                <span className='info'>
                  <h3>14,721</h3>
                  <p>Searches</p>
                </span>
              </li>
              <li>
                <i className='bx bx-dollar-circle' />
                <span className='info'>
                  <h3>$6,742</h3>
                  <p>Total Sales</p>
                </span>
              </li>
            </ul>
            {/* End of Insights */}
            <div className='bottom-data'>
              <div className='orders'>
                <div className='header'>
                  <i className='bx bx-receipt' />
                  <h3>Recent Orders</h3>
                  <i className='bx bx-filter' />
                  <i className='bx bx-search' />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Order Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src='images/profile-1.jpg' />
                        <p>John Doe</p>
                      </td>
                      <td>14-08-2023</td>
                      <td>
                        <span className='status completed'>Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src='images/profile-1.jpg' />
                        <p>John Doe</p>
                      </td>
                      <td>14-08-2023</td>
                      <td>
                        <span className='status pending'>Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src='images/profile-1.jpg' />
                        <p>John Doe</p>
                      </td>
                      <td>14-08-2023</td>
                      <td>
                        <span className='status process'>Processing</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Reminders */}
              <div className='reminders'>
                <div className='header'>
                  <i className='bx bx-note' />
                  <h3>Remiders</h3>
                  <i className='bx bx-filter' />
                  <i className='bx bx-plus' />
                </div>
                <ul className='task-list'>
                  <li className='completed'>
                    <div className='task-title'>
                      <i className='bx bx-check-circle' />
                      <p>Start Our Meeting</p>
                    </div>
                    <i className='bx bx-dots-vertical-rounded' />
                  </li>
                  <li className='completed'>
                    <div className='task-title'>
                      <i className='bx bx-check-circle' />
                      <p>Analyse Our Site</p>
                    </div>
                    <i className='bx bx-dots-vertical-rounded' />
                  </li>
                  <li className='not-completed'>
                    <div className='task-title'>
                      <i className='bx bx-x-circle' />
                      <p>Play Footbal</p>
                    </div>
                    <i className='bx bx-dots-vertical-rounded' />
                  </li>
                </ul>
              </div>
              {/* End of Reminders*/}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
export default MainLayout
