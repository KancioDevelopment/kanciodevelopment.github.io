import React, { useState, useEffect, useCallback } from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeApp, setActiveApp] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for reduced motion preference for better accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const heroElement = document.getElementById('home')
    if (heroElement) {
      observer.observe(heroElement)
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement)
      }
    }
  }, [])

  // Auto-cycling through featured apps for better engagement
  useEffect(() => {
    if (reducedMotion) return
    
    const interval = setInterval(() => {
      setActiveApp((prev) => (prev + 1) % apps.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [reducedMotion])

  // Smooth scroll handler
  const handleScrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const apps = [
    {
      name: 'PulsaApp',
      description: 'Complete digital payment solution for credit, data packages, game vouchers & e-money',
      shortDesc: 'Digital payment solution',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      features: ['Cheaper Prices', 'Fast Transactions', 'Secure Payment', 'Complete Products'],
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.kancio.indonesia',
      category: 'FinTech'
    },
    {
      name: 'QuranMind',
      description: 'AI-powered digital Quran app combining modern technology with traditional understanding',
      shortDesc: 'AI-powered Quran learning',
      icon: '📖',
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
      features: ['AI Analysis', 'Audio Murottal', 'Deep Understanding', 'Indonesian Translation'],
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.kancio.quranapp',
      category: 'Education'
    },
    {
      name: 'ApotekApp',
      description: 'Complete pharmacy management system for drug stock, sales records, and financial tracking',
      shortDesc: 'Pharmacy management system',
      icon: '💊',
      gradient: 'linear-gradient(135deg, #ef4444, #ec4899)',
      features: ['Stock Management', 'Sales Recording', 'Financial Reports', 'Intuitive Interface'],
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.kancio.apotikapp',
      category: 'Healthcare'
    },
    {
      name: 'Catet Uang',
      description: 'Personal finance management app for tracking income, expenses, and building healthy financial habits',
      shortDesc: 'Personal finance manager',
      icon: '💰',
      gradient: 'linear-gradient(135deg, #eab308, #ea580c)',
      features: ['Income & Expense Tracking', 'Financial Analytics', 'Budget Management', 'Financial Planning'],
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.kancio.cashflow',
      category: 'Finance'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Users', icon: '👥' },
    { number: '4', label: 'Live Apps', icon: '📱' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '10+', label: 'Business Clients', icon: '🏢' }
  ]

  return (
    <section id="home" className="hero">
      {/* Optimized background with CSS-only animations for better performance */}
      <div className="hero__background" aria-hidden="true">
        <div className="hero__gradient"></div>
        {!reducedMotion && (
          <div className="hero__particles">
            <div className="particle particle--1"></div>
            <div className="particle particle--2"></div>
            <div className="particle particle--3"></div>
            <div className="particle particle--4"></div>
          </div>
        )}
      </div>
      
      <div className="container">
        <div className="hero__content">
          {/* Enhanced hero text section */}
          <div className={`hero__text ${isVisible ? 'hero__text--visible' : ''}`}>
            <div className="hero__badge">
              <span className="hero__badge-icon">🚀</span>
              <span>Building the Future</span>
            </div>
            
            <h1 className="hero__title">
              <span className="hero__title-line">
                <span className="hero__title-word">Innovative</span>
                <span className="hero__title-highlight">Digital</span>
              </span>
              <span className="hero__title-line">
                <span className="hero__title-word">Solutions</span>
                <span className="hero__title-accent">for Growth</span>
              </span>
            </h1>
            
            <p className="hero__subtitle">
              Transforming businesses with cutting-edge mobile applications and web platforms. 
              We create digital experiences that drive success and simplify complex processes.
            </p>

            {/* Stats section */}
            <div className="hero__stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero__stat">
                  <span className="hero__stat-icon">{stat.icon}</span>
                  <div className="hero__stat-content">
                    <span className="hero__stat-number">{stat.number}</span>
                    <span className="hero__stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero__cta">
              <a 
                href="#services" 
                className="btn btn--primary btn--large"
                onClick={(e) => handleScrollToSection(e, '#services')}
              >
                <span>Explore Our Work</span>
                <span className="btn__icon">→</span>
              </a>
              <a 
                href="#about" 
                className="btn btn--secondary btn--large"
                onClick={(e) => handleScrollToSection(e, '#about')}
              >
                <span>Learn More</span>
              </a>
            </div>
          </div>
          
          {/* Enhanced apps showcase */}
          <div className={`hero__showcase ${isVisible ? 'hero__showcase--visible' : ''}`}>
            <div className="hero__showcase-header">
              <h3>Featured Applications</h3>
              <p>Trusted by thousands of users worldwide</p>
            </div>
            
            {/* Featured app display */}
            <div className="hero__featured-app">
              <div className="featured-app">
                <div className="featured-app__visual">
                  <div className="featured-app__icon" style={{ background: apps[activeApp].gradient }}>
                    {apps[activeApp].icon}
                  </div>
                  <div className="featured-app__category">{apps[activeApp].category}</div>
                </div>
                
                <div className="featured-app__content">
                  <h4 className="featured-app__title">{apps[activeApp].name}</h4>
                  <p className="featured-app__description">{apps[activeApp].shortDesc}</p>
                  
                  <div className="featured-app__features">
                    {apps[activeApp].features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="featured-app__feature">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={apps[activeApp].playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-app__cta"
                  >
                    <span>Download Now</span>
                    <span className="featured-app__cta-icon">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* App navigation dots */}
            <div className="hero__app-nav">
              {apps.map((app, index) => (
                <button
                  key={index}
                  className={`app-nav-dot ${index === activeApp ? 'app-nav-dot--active' : ''}`}
                  onClick={() => setActiveApp(index)}
                  aria-label={`View ${app.name}`}
                >
                  <span className="app-nav-dot__icon">{app.icon}</span>
                  <span className="app-nav-dot__name">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Quick access grid */}
            <div className="hero__quick-access">
              <h4>All Applications</h4>
              <div className="quick-access-grid">
                {apps.map((app, index) => (
                  <a
                    key={index}
                    href={app.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-access-item"
                  >
                    <div className="quick-access-item__icon" style={{ background: app.gradient }}>
                      {app.icon}
                    </div>
                    <span className="quick-access-item__name">{app.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero