import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './Header.css'
import logoImage from '../assets/logo.png'

interface DropdownItem {
  label: string
  path: string
  icon: string
  description: string
  externalUrl?: string
}

const products: DropdownItem[] = [
  { 
    label: 'PulsaApp', 
    path: '/products/pulsaapp', 
    externalUrl: 'https://ppob.kancio.com/', 
    icon: '📱', 
    description: 'Digital payment & server PPOB 24 jam' 
  },
  { 
    label: 'ApotekApp', 
    path: '/products/apotekapp', 
    externalUrl: 'https://apotek.kancio.com/', 
    icon: '💊', 
    description: 'Pharmacy ERP & POS kasir FEFO' 
  },
]

const services: DropdownItem[] = [
  { label: 'Custom Solution', path: '/services/custom-solution', icon: '🚀', description: 'Tailored digital applications' },
  { label: 'AI Integration', path: '/services/ai-integration', icon: '🤖', description: 'Smart AI for your systems' },
  { label: 'Digital Consulting', path: '/services/consulting', icon: '💡', description: 'Strategic digital transformation' },
]

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'services' | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

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
    // Use passive listener for smooth 60fps mobile scrolling
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  // Lock body scroll when mobile navigation drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMobileMenuOpen])

  // Close drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const handleDropdownEnter = (menu: 'products' | 'services') => {
    if (isMobileMenuOpen) return
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(menu)
  }

  const handleDropdownLeave = () => {
    if (isMobileMenuOpen) return
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const toggleDropdown = (e: React.MouseEvent, menu: 'products' | 'services') => {
    e.preventDefault()
    e.stopPropagation()
    setActiveDropdown((prev) => (prev === menu ? null : menu))
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

          {/* Navigation Menu / Drawer */}
          <div 
            className={`nav__menu ${isMobileMenuOpen ? 'nav__menu--open' : ''}`}
            role={isMobileMenuOpen ? 'dialog' : undefined}
            aria-modal={isMobileMenuOpen ? 'true' : undefined}
            aria-label={isMobileMenuOpen ? 'Menu Navigasi Mobile' : undefined}
          >
            {/* Mobile-only Drawer Header */}
            <div className="nav__drawer-header">
              <div className="drawer__brand">
                <img src={logoImage} alt="Kancio" className="drawer__logo" />
                <div className="drawer__brand-meta">
                  <span className="drawer__brand-title">Kancio</span>
                  <span className="drawer__brand-tag">Navigasi Digital</span>
                </div>
              </div>
              <button
                type="button"
                className="drawer__close-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setActiveDropdown(null)
                }}
                aria-label="Tutup menu navigasi"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="nav__drawer-section-label">Navigasi Utama</div>

            <ul className="nav__list">
              <li className="nav__item">
                <Link 
                  to="/" 
                  className={`nav__link ${location.pathname === '/' ? 'nav__link--active' : ''}`} 
                  onClick={handleLinkClick}
                >
                  <span className="nav__link-icon-mobile">🏠</span>
                  <span>Home</span>
                </Link>
              </li>

              {/* Products Dropdown */}
              <li
                className={`nav__item nav__item--dropdown ${activeDropdown === 'products' ? 'nav__item--active' : ''}`}
                onMouseEnter={() => handleDropdownEnter('products')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`nav__link nav__dropdown-trigger ${location.pathname.startsWith('/products') ? 'nav__link--active' : ''}`}
                  aria-expanded={activeDropdown === 'products'}
                  onClick={(e) => toggleDropdown(e, 'products')}
                >
                  <span className="nav__link-icon-mobile">📦</span>
                  <span className="nav__link-text">Products</span>
                  <span className="nav__badge-mobile">2 Apps</span>
                  <svg className="nav__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="nav__dropdown">
                  <div className="dropdown__inner">
                    <p className="dropdown__label">Our Applications</p>
                    {products.map((item) => (
                      <div key={item.path} className="dropdown__product-group">
                        <Link
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
                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dropdown__portal-tag"
                            title={`Buka Web App Resmi ${item.label}`}
                            onClick={handleLinkClick}
                          >
                            <span>Buka Portal Resmi</span>
                            <span className="portal-arrow">↗</span>
                          </a>
                        )}
                      </div>
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
                <button
                  type="button"
                  className={`nav__link nav__dropdown-trigger ${location.pathname.startsWith('/services') ? 'nav__link--active' : ''}`}
                  aria-expanded={activeDropdown === 'services'}
                  onClick={(e) => toggleDropdown(e, 'services')}
                >
                  <span className="nav__link-icon-mobile">⚡</span>
                  <span className="nav__link-text">Services</span>
                  <span className="nav__badge-mobile">3 Layanan</span>
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
                    <Link
                      to="/services"
                      className="dropdown__item dropdown__item--all"
                      onClick={handleLinkClick}
                    >
                      <span className="dropdown__item-icon">✨</span>
                      <span className="dropdown__item-content">
                        <span className="dropdown__item-label">Semua Layanan (What We Offer)</span>
                        <span className="dropdown__item-desc">Estimator proyek &amp; alur pengerjaan</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </li>

              <li className="nav__item">
                <Link 
                  to="/blogs" 
                  className={`nav__link ${location.pathname.startsWith('/blogs') ? 'nav__link--active' : ''}`} 
                  onClick={handleLinkClick}
                >
                  <span className="nav__link-icon-mobile">📝</span>
                  <span>Blog</span>
                </Link>
              </li>
            </ul>

            {/* Mobile Drawer Theme Selector Box */}
            <div className="drawer__theme-box">
              <span className="drawer__theme-label">Mode Tampilan</span>
              <div className="drawer__theme-switch">
                <button
                  type="button"
                  className={`drawer__theme-btn ${theme === 'dark' ? 'drawer__theme-btn--active' : ''}`}
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  aria-pressed={theme === 'dark'}
                >
                  🌙 Gelap
                </button>
                <button
                  type="button"
                  className={`drawer__theme-btn ${theme === 'light' ? 'drawer__theme-btn--active' : ''}`}
                  onClick={() => theme !== 'light' && toggleTheme()}
                  aria-pressed={theme === 'light'}
                >
                  ☀️ Terang
                </button>
              </div>
            </div>

            {/* Navigation CTA Actions */}
            <div className="nav__cta">
              <button
                type="button"
                className="theme-toggle-header-btn theme-toggle-header-btn--desktop"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
                title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <a
                href="#contact"
                className="btn btn--primary btn--sm nav__quote-btn"
                onClick={(e) => handleNavClick(e, '.footer')}
              >
                <span>Get a Quote</span>
                <span className="btn-arrow-icon">→</span>
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
                <span className="admin-link-label">Admin</span>
              </Link>
            </div>

            {/* Mobile Drawer Bottom Meta */}
            <div className="drawer__footer-meta">
              <span>Kancio Development © 2026</span>
              <span className="drawer__footer-dot">•</span>
              <span>Digital &amp; AI Studio</span>
            </div>
          </div>

          {/* Mobile Header Actions (Visible in header on mobile screens) */}
          <div className="nav__actions-mobile">
            <button
              type="button"
              className="theme-toggle-header-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              type="button"
              className={`nav__toggle ${isMobileMenuOpen ? 'nav__toggle--open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* Mobile Menu Backdrop Overlay (placed in nav to share stacking context with nav__menu) */}
          {isMobileMenuOpen && (
            <div
              className="nav__mobile-backdrop"
              onClick={() => {
                setIsMobileMenuOpen(false)
                setActiveDropdown(null)
              }}
              aria-hidden="true"
            />
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
