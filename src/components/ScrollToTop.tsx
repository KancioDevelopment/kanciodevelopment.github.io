import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop ensures that navigating between routes in SPA resets the scroll position
 * to the top, which is vital for mobile usability where users tap links from footer or cards.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    })
  }, [pathname])

  return null
}

export default ScrollToTop
