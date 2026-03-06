import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import logoImage from '../assets/logo.png'

interface DropdownItem {
  label: string
  path: string
  icon: string
  description: string
}

const products: DropdownItem[] = [
  { label: 'PulsaApp', path: '/products/pulsaapp', icon: '📱', description: 'Digital payment & top-up' },
  { label: 'QuranMind', path: '/products/quranmind', icon: '📖', description: 'AI-powered Quran learning' },
  { label: 'ApotekApp', path: '/products/apotekapp', icon: '💊', description: 'Pharmacy management system' },
  { label: 'Catet Uang', path: '/products/catetUang', icon: '💰', description: 'Personal finance manager' },
]

const services: DropdownItem[] = [
  { label: 'Custom Solution', path: '/services/custom-solution', icon: '🚀', description: 'Tailored digital applications' },
  { label: 'AI Integration', path: '/services/ai-integration', icon: '🤖', description: 'Smart AI for your systems' },
  { label: 'Digital Consulting', path: '/services/consulting', icon: '💡', description: 'Strategic digital transformation' },
]

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'services' | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        navigate('/admin')
      }
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  const handleDropdownEnter = (menu: 'products' | 'services') => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(menu)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    if (href.startsWith('#') || href.startsWith('.')) {
      if (window.location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(href)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      } else {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          {/* Brand */}
          <div className="nav__brand">
            <Link to="/" className="logo" onClick={handleLinkClick}>
              <img src={logoImage} alt="Kancio Development" className="logo__image" />
              <span className="logo__text">Kancio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`nav__menu ${isMobileMenuOpen ? 'nav__menu--open' : ''}`}>
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>

              {/* Products Dropdown */}
              <li
                className={`nav__item nav__item--dropdown ${activeDropdown === 'products' ? 'nav__item--active' : ''}`}
                onMouseEnter={() => handleDropdownEnter('products')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="nav__link nav__dropdown-trigger" aria-expanded={activeDropdown === 'products'}>
                  Products
                  <svg className="nav__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="nav__dropdown">
                  <div className="dropdown__inner">
                    <p className="dropdown__label">Our Applications</p>
                    {products.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="dropdown__item"
                        onClick={handleLinkClick}
                      >
                        <span className="dropdown__item-icon">{item.icon}</span>
                        <span className="dropdown__item-content">
                          <span className="dropdown__item-label">{item.label}</span>
                          <span className="dropdown__item-desc">{item.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Services Dropdown */}
              <li
                className={`nav__item nav__item--dropdown ${activeDropdown === 'services' ? 'nav__item--active' : ''}`}
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="nav__link nav__dropdown-trigger" aria-expanded={activeDropdown === 'services'}>
                  Services
                  <svg className="nav__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="nav__dropdown">
                  <div className="dropdown__inner">
                    <p className="dropdown__label">What We Offer</p>
                    {services.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="dropdown__item"
                        onClick={handleLinkClick}
                      >
                        <span className="dropdown__item-icon">{item.icon}</span>
                        <span className="dropdown__item-content">
                          <span className="dropdown__item-label">{item.label}</span>
                          <span className="dropdown__item-desc">{item.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li className="nav__item">
                <Link to="/blogs" className="nav__link" onClick={handleLinkClick}>
                  Blog
                </Link>
              </li>
            </ul>

            <div className="nav__cta">
              <a
                href="#contact"
                className="btn btn--primary btn--sm"
                onClick={(e) => handleNavClick(e, '.footer')}
              >
                Get a Quote
              </a>
              <Link
                to="/admin"
                className="admin-link"
                onClick={handleLinkClick}
                title="Admin Panel (Ctrl+Shift+A)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`nav__toggle ${isMobileMenuOpen ? 'nav__toggle--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header