import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { useRouteCustomHook } from './routes/useRouteCustomHook'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import './App.css'
import { AppContext } from './context/app.context'
import Loading from './components/Loading'
// Define props interface used

interface IAppProps {}
const App: React.FC<IAppProps> = (_props: IAppProps) => {
  const { isLoading } = useContext(AppContext)
  const app_router = useRouteCustomHook()
  return (
    <>
      <ToastContainer autoClose={1500}></ToastContainer>
      {app_router}
      <Loading isLoading={isLoading}></Loading>
    </>
  )
}
export default App
