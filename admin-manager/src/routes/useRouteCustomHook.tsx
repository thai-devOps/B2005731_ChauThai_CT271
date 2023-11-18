import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import { usePath } from '~/constants/usePath'
import AuthLayout from '~/layouts/AuthLayout'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import { AppContext } from '~/context/app.context'
import AdminLayout from '~/layouts/AdminLayout'
import Dashboard from '~/pages/Dashboard'
import Room from '~/pages/Room'
import Data from '~/pages/Data'
import User from '~/pages/User'
import Financial from '~/pages/Financial'
import Notifies from '~/pages/Notifies'
import Repair from '~/pages/Repair'
import Roomstate from '~/pages/Roomstate'
import Setting from '~/pages/Setting'
import Profile from '~/pages/Profile'
import ViewProfile from '~/pages/Profile/ViewProfile'
import UpdateProfile from '~/pages/Profile/UpdateProfile'
import NotFound from '~/pages/NotFound'
import RoomPlan from '~/pages/RoomPlan'
import Booking from '~/pages/User/Booking'
import ManageUserAccount from '~/pages/User/ManageUserAccount'
import ManageRoom from '~/pages/Data/MangeRoom'
import Utilities from '~/pages/Data/Utilities'
import RoomDetail from '~/pages/RoomPlan/RoomDetail'
import ResetPassword from '~/pages/ResetPassword'

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={usePath.login} />
}

// eslint-disable-next-line react-refresh/only-export-components
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={usePath.home} />
}

export const useRouteCustomHook = () => {
  const route = useRoutes([
    // { path: usePath.home, element: <Home /> },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: usePath.home,
          element: (
            <AdminLayout>
              <Dashboard></Dashboard>
            </AdminLayout>
          )
        },
        {
          path: usePath.resetPassword,
          element: (
            <AdminLayout>
              <ResetPassword></ResetPassword>
            </AdminLayout>
          )
        },
        {
          path: usePath.profile.viewProfile,
          children: [
            {
              path: '',
              element: (
                <AdminLayout>
                  <Profile children={<ViewProfile></ViewProfile>}></Profile>
                </AdminLayout>
              )
            },
            {
              path: usePath.profile.updateProfile,
              element: (
                <AdminLayout>
                  <Profile children={<UpdateProfile></UpdateProfile>}></Profile>
                </AdminLayout>
              )
            }
          ]
        },
        {
          path: usePath.rooms,
          element: (
            <AdminLayout>
              <Room></Room>
            </AdminLayout>
          )
        },
        {
          path: usePath.roomPlan,
          children: [
            {
              index: true,
              element: (
                <AdminLayout>
                  <RoomPlan></RoomPlan>
                </AdminLayout>
              )
            },
            {
              path: usePath.roomPlan + '/:id',
              element: (
                <AdminLayout>
                  <RoomDetail />
                </AdminLayout>
              )
            }
          ]
        },
        {
          path: usePath.dataManagements.index,
          children: [
            {
              index: true,
              element: (
                <AdminLayout>
                  <Data>
                    <ManageUserAccount />
                  </Data>
                </AdminLayout>
              )
            },
            {
              path: usePath.dataManagements.account,
              element: (
                <AdminLayout>
                  <Data>
                    <ManageUserAccount />
                  </Data>
                </AdminLayout>
              )
            },
            {
              path: usePath.dataManagements.room,
              element: (
                <AdminLayout>
                  <Data>
                    <ManageRoom />
                  </Data>
                </AdminLayout>
              )
            },
            {
              path: usePath.dataManagements.utilities,
              element: (
                <AdminLayout>
                  <Data>
                    <Utilities />
                  </Data>
                </AdminLayout>
              )
            }
          ]
        },
        {
          path: usePath.users.index,
          children: [
            {
              index: true,
              element: (
                <AdminLayout>
                  <User>
                    <ManageUserAccount />
                  </User>
                </AdminLayout>
              )
            },
            {
              path: usePath.users.manageUserAccount,
              element: (
                <AdminLayout>
                  <User>
                    <ManageUserAccount></ManageUserAccount>
                  </User>
                </AdminLayout>
              )
            },
            {
              element: (
                <AdminLayout>
                  <User>
                    <ManageUserAccount></ManageUserAccount>
                  </User>
                </AdminLayout>
              )
            },
            {
              path: usePath.users.booking,
              element: (
                <AdminLayout>
                  <User>
                    <Booking></Booking>
                  </User>
                </AdminLayout>
              )
            }
          ]
        },
        {
          path: usePath.financial,
          element: (
            <AdminLayout>
              <Financial></Financial>
            </AdminLayout>
          )
        },
        {
          path: usePath.notification,
          element: (
            <AdminLayout>
              <Notifies></Notifies>
            </AdminLayout>
          )
        },
        {
          path: usePath.repairs,
          element: (
            <AdminLayout>
              <Repair></Repair>
            </AdminLayout>
          )
        },
        {
          path: usePath.roomState,
          element: (
            <AdminLayout>
              <Roomstate></Roomstate>
            </AdminLayout>
          )
        },
        {
          path: usePath.settings,
          element: (
            <AdminLayout>
              <Setting></Setting>
            </AdminLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
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
