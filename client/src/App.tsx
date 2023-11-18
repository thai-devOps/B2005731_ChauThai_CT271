import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { useRouteCustomHook } from './routes/useRouteCustomHook'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import './App.css'
import { AppContext } from './context/app.context'
import Loading from './components/Loading'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// Define props interface used

interface IAppProps {}
const App: React.FC<IAppProps> = (_props: IAppProps) => {
  const initialOptions = {
    clientId: 'AdCHi7mZoynuuEHDbKJ5C7ftYCJ9qkUp7lhHjsmmY_hb4FYgLLu3Uhjh4J9wgKdMOytjXpoqxRWwrRtZ',
    currency: 'USD',
    intent: 'capture'
  }
  const { isLoading } = useContext(AppContext)
  const app_router = useRouteCustomHook()
  return (
    <PayPalScriptProvider options={initialOptions}>
      <ToastContainer autoClose={1500}></ToastContainer>
      {app_router}
      <Loading isLoading={isLoading}></Loading>
    </PayPalScriptProvider>
  )
}
export default App
