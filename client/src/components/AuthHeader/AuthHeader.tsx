import classNames from 'classnames'
import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
import './AuthHeader.css'

// Define props interface used
interface IAuthHeaderProps {}
const AuthHeader: React.FC<IAuthHeaderProps> = (_props: IAuthHeaderProps) => {
  const is_login_url = Boolean(useMatch(usePath.login))
  return (
    <header>
      <nav className='bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <NavLink to={usePath.home} className='flex flex-wrap gap-5 text-4xl items-center'>
            <i className='bx bx-building-house text-blue-500'></i>
            <div className='font-bold'>
              <span>Trọ</span>
              <span className='text-blue-500'>Alola</span>
            </div>
          </NavLink>
          <div className='flex md:order-2 gap-3'>
            <NavLink style={is_login_url ? { pointerEvents: 'none' } : {}} to={usePath.login}>
              <button
                className={classNames(
                  'group-hover:from-green-400 relative text-sm inline-flex items-center justify-center p-0.5 overflow-hidden group-hover:to-blue-600 hover:text-white dark:text-white bg-gradient-to-br from-green-400 to-blue-600 group focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green- font-medium rounded-lg',
                  {
                    ' text-white hover:bg-gradient-to-bl pointer-events-none text-center': is_login_url,
                    '  text-gray-900 ': !is_login_url
                  }
                )}
              >
                <span
                  className={classNames(
                    'relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                    {
                      'bg-white': !is_login_url
                    }
                  )}
                >
                  Đăng nhập
                </span>
              </button>
            </NavLink>
            <NavLink style={!is_login_url ? { pointerEvents: 'none' } : {}} to={usePath.register}>
              <button
                className={classNames(
                  'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400',
                  {
                    'hover:bg-gradient-to-bl cursor-not-allowed text-center ': !is_login_url
                  }
                )}
              >
                <span
                  className={classNames(
                    'relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0',
                    {
                      'bg-white': is_login_url
                    }
                  )}
                >
                  Đăng ký
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default AuthHeader
