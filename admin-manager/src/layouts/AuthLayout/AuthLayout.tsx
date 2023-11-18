import React from 'react'
import AuthHeader from '~/components/AuthHeader'
import Footer from '~/components/Footer'
// Define props interface used
interface IAuthLayoutProps {
  children?: React.ReactNode
}
const AuthLayout: React.FC<IAuthLayoutProps> = (props: IAuthLayoutProps) => {
  return (
    <div>
      <AuthHeader />
      {props.children}
      <Footer />
    </div>
  )
}
export default AuthLayout
