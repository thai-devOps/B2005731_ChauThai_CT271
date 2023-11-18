import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // This triggers smooth scrolling
      })
    }

    // Scroll to the top when the route changes
    scrollToTop()
  }, [pathname, search])

  return null // This component doesn't render anything
}

export default ScrollToTop
