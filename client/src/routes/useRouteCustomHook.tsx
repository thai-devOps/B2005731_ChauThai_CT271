import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'

import Room from '~/pages/Room'

import NotFound from '~/pages/NotFound'
import Home from '~/pages/Home'
import CommonLayout from '~/layouts/CommonLayout'
import RoomDetails from '~/pages/Room/RoomDetails'
import AuthLayout from '~/layouts/AuthLayout'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Booking from '~/pages/Room/Booking'
import BookingHistory from '~/pages/BookingHistory'
import Contact from '~/pages/Contact'
import ViewProfile from '~/pages/Profile/ViewProfile'
import UpdateProfile from '~/pages/Profile/UpdateProfile'
import ResetPassword from '~/pages/ResetPassword'

// eslint-disable-next-line react-refresh/only-export-components
export function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={usePath.home} />
}

// eslint-disable-next-line react-refresh/only-export-components
export const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={usePath.home} />
}

const PublicRoute = () => {
  // const { isAuthenticated } = useContext(AppContext)
  return <Outlet />
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRouteCustomHook = () => {
  const route = useRoutes([
    {
      path: '/',
      children: [
        {
          path: usePath.home,
          element: (
            <CommonLayout>
              <Home />
            </CommonLayout>
          )
        },
        {
          path: usePath.contact,
          element: (
            <CommonLayout>
              <Contact />
            </CommonLayout>
          )
        },
        {
          path: usePath.login,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: usePath.register,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        },
        {
          path: usePath.rooms,
          children: [
            {
              index: true,
              element: (
                <CommonLayout>
                  <Room></Room>
                </CommonLayout>
              )
            },
            {
              path: ':id',
              element: (
                <CommonLayout>
                  <RoomDetails></RoomDetails>
                </CommonLayout>
              )
            },
            {
              path: usePath.booking,
              element: <ProtectedRoute />,
              children: [
                {
                  index: true,
                  element: (
                    <CommonLayout>
                      <Booking></Booking>
                    </CommonLayout>
                  )
                }
              ]
            }
          ]
        },
        {
          path: usePath.bookingHistory,
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: (
                <CommonLayout>
                  <BookingHistory></BookingHistory>
                </CommonLayout>
              )
            }
          ]
        },
        {
          path: usePath.profile.viewProfile,
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: (
                <CommonLayout>
                  <ViewProfile></ViewProfile>
                </CommonLayout>
              )
            },
            {
              path: usePath.profile.updateProfile,
              element: (
                <CommonLayout>
                  <UpdateProfile></UpdateProfile>
                </CommonLayout>
              )
            }
          ]
        },
        {
          path: usePath.resetPassword,
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: (
                <CommonLayout>
                  <ResetPassword></ResetPassword>
                </CommonLayout>
              )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <NotFound></NotFound>
    }
  ])
  return route
}
