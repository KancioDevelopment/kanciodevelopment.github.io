import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import logoImage from '../assets/logo.png'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    // If it's a hash link (section navigation), handle scrolling
    if (href.startsWith('#') || href.startsWith('.')) {
      // First navigate to home if not already there
      if (window.location.pathname !== '/') {
        navigate('/')
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="nav__brand">
            <Link to="/" className="logo">
              <img src={logoImage} alt="Kancio Development" className="logo__image" />
              <span className="logo__text">Kancio</span>
            </Link>
          </div>
          
          <div className={`nav__menu ${isMobileMenuOpen ? 'nav__menu--open' : ''}`}>
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link" onClick={(e) => handleNavClick(e, '#home')}>
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link" onClick={(e) => handleNavClick(e, '#about')}>
                  About
                </a>
              </li>
              <li className="nav__item">
                <a href="#services" className="nav__link" onClick={(e) => handleNavClick(e, '#services')}>
                  Services
                </a>
              </li>
              <li className="nav__item">
                <Link to="/blogs" className="nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                  Blog
                </Link>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link" onClick={(e) => handleNavClick(e, '.footer')}>
                  Contact
                </a>
              </li>
            </ul>
            <div className="nav__cta">
              <a href="#contact" className="btn btn--primary" onClick={(e) => handleNavClick(e, '.footer')}>Get Started</a>
            </div>
          </div>

          <button 
            className={`nav__toggle ${isMobileMenuOpen ? 'nav__toggle--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header