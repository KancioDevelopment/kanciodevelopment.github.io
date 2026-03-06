import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeApp, setActiveApp] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setActiveApp((prev) => (prev + 1) % apps.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [reducedMotion])

  const apps = [
    {
      name: 'PulsaApp',
      shortDesc: 'Digital payment & top-up',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      category: 'FinTech',
      path: '/products/pulsaapp',
      stat: '1M+ Downloads',
    },
    {
      name: 'QuranMind',
      shortDesc: 'AI-powered Quran learning',
      icon: '📖',
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
      category: 'Education',
      path: '/products/quranmind',
      stat: 'AI-Powered',
    },
    {
      name: 'ApotekApp',
      shortDesc: 'Pharmacy management system',
      icon: '💊',
      gradient: 'linear-gradient(135deg, #ef4444, #ec4899)',
      category: 'Healthcare',
      path: '/products/apotekapp',
      stat: '10+ Clients',
    },
    {
      name: 'Catet Uang',
      shortDesc: 'Personal finance manager',
      icon: '💰',
      gradient: 'linear-gradient(135deg, #eab308, #ea580c)',
      category: 'Finance',
      path: '/products/catetUang',
      stat: 'Smart Budgeting',
    },
  ]

  const stats = [
    { number: '4', label: 'Live Products', icon: '📱' },
    { number: '5K+', label: 'Active Users', icon: '👥' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '10+', label: 'B2B Clients', icon: '🏢' },
  ]

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-gradient" />
        {!reducedMotion && (
          <>
            <div className="hero__orb hero__orb--1" />
            <div className="hero__orb hero__orb--2" />
            <div className="hero__orb hero__orb--3" />
          </>
        )}
      </div>

      <div className="container">
        <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
          {/* LEFT: Text */}
          <div className="hero__text">
            <div className="badge">
              <span>🚀</span> Digital Solution Partner
            </div>

            <h1 className="hero__title">
              Build Smarter,{' '}
              <span className="hero__title-highlight">Grow Faster</span>
              <br />
              with Kancio
            </h1>

            <p className="hero__subtitle">
              We craft premium digital applications and integrate AI into your systems —
              driving real growth for businesses across Indonesia.
            </p>

            {/* Stats row */}
            <div className="hero__stats">
              {stats.map((stat, i) => (
                <div key={i} className="hero__stat">
                  <span className="hero__stat-icon">{stat.icon}</span>
                  <div>
                    <div className="hero__stat-number">{stat.number}</div>
                    <div className="hero__stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero__cta">
              <Link to="/products/pulsaapp" className="btn btn--primary btn--large">
                Explore Products
                <span className="btn__icon">→</span>
              </Link>
              <a
                href="#about"
                className="btn btn--secondary btn--large"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                About Us
              </a>
            </div>
          </div>

          {/* RIGHT: App Showcase Card */}
          <div className="hero__showcase">
            {/* Featured App */}
            <div className="hero__app-card glass-panel">
              <div className="hero__app-header">
                <div className="hero__app-icon" style={{ background: apps[activeApp].gradient }}>
                  {apps[activeApp].icon}
                </div>
                <div>
                  <div className="hero__app-name">{apps[activeApp].name}</div>
                  <div className="hero__app-category">{apps[activeApp].category}</div>
                </div>
                <div className="hero__app-stat">{apps[activeApp].stat}</div>
              </div>
              <p className="hero__app-desc">{apps[activeApp].shortDesc}</p>
              <Link to={apps[activeApp].path} className="hero__app-link">
                View Details <span>→</span>
              </Link>
            </div>

            {/* App Selector Tabs */}
            <div className="hero__app-tabs">
              {apps.map((app, i) => (
                <button
                  key={i}
                  className={`hero__app-tab ${i === activeApp ? 'hero__app-tab--active' : ''}`}
                  onClick={() => setActiveApp(i)}
                  aria-label={`View ${app.name}`}
                >
                  <span className="hero__app-tab-icon">{app.icon}</span>
                  <span className="hero__app-tab-name">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Mini service cards */}
            <div className="hero__services-mini">
              <Link to="/services/custom-solution" className="hero__service-mini glass-panel">
                <span>🚀</span>
                <span>Custom Solution</span>
              </Link>
              <Link to="/services/ai-integration" className="hero__service-mini glass-panel">
                <span>🤖</span>
                <span>AI Integration</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero