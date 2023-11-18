// import { useMutation } from '@tanstack/react-query'
import React from 'react'
// import { logoutAccount } from '~/apis/auth.api'
import './home.css'
// import { AppContext } from '~/context/app.context'
import Footer from '~/components/Footer'
import HeroSection from './HeroSection'
import FeatureList from './FeatureList'
import CTASection from './CTASection'
import SlideSection from './SlideSection'
// Define props interface used
const Home: React.FunctionComponent = () => {
  // const { setAuthenticated } = useContext(AppContext)
  // const logoutAccountMutation = useMutation({
  //   mutationFn: () => logoutAccount(),
  //   onSuccess: () => setAuthenticated(false)
  // })
  // const handleLogout = () => {
  //   logoutAccountMutation.mutate()
  // }

  return (
    <>
      <HeroSection />
      <FeatureList />
      <CTASection />
    </>
  )
}
export default Home
