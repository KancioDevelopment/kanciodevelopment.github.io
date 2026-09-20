import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const apps = [
  {
    id: 'apotekapp',
    name: 'ApotekApp ERP',
    tagline: 'Sistem Informasi & POS Apotek Terpadu #1',
    shortDesc: 'Otomasi alokasi stok FEFO terdekat, rekonsiliasi resep BPJS Kapitasi & PRB kronis, deteksi markup HPP AI, dan reservasi obat online Click & Collect.',
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1)',
    category: 'Healthcare ERP',
    path: '/products/apotekapp',
    liveUrl: 'https://apotek.kancio.com/',
    badge: 'Farmasi & Faskes',
    stat: '99.9% Akurasi FEFO',
    simTitle: 'Kasir POS & Alokasi FEFO',
    simMetric: 'Markup HPP Ditahan: Rp 450rb',
    simSub: 'Batch Expired Terdekat Dialokasikan Otomatis',
  },
  {
    id: 'pulsaapp',
    name: 'PulsaApp SaaS',
    tagline: 'Distributor Pulsa Murah & Server PPOB 24 Jam',
    shortDesc: 'Platform transaksi digital kilat 1-5 detik: pulsa semua operator, token PLN nonstop, top up e-money, voucher game, dan eSIM global 50+ negara.',
    gradient: 'linear-gradient(135deg, #0284c7, #e6007e)',
    category: 'FinTech & PPOB',
    path: '/products/pulsaapp',
    liveUrl: 'https://ppob.kancio.com/',
    badge: 'Server 24 Jam',
    stat: '1-5s Kecepatan',
    simTitle: 'Auto-Routing Multi-Provider',
    simMetric: 'QRIS 24 Jam & 1.000+ Produk',
    simSub: 'Transaksi Otomatis Tanpa Antre',
  },
]

const stats = [
  { number: '1.000+', label: 'Produk Digital' },
  { number: '99.9%', label: 'Akurasi Stok FEFO' },
  { number: '1-5 Dtk', label: 'Kecepatan Server' },
  { number: '24/7', label: 'Cloud Uptime' },
]

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeApp, setActiveApp] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const current = apps[activeApp]

  return (
    <section id="home" className="hero home-cyber-hero">
      {/* Cyber Ambient Background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-gradient" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container">
        <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
          {/* LEFT: Text & Ecosystem Highlights */}
          <div className="hero__text">
            <div className="hero-eyebrow-pill">
              <span className="live-pulse-dot" />
              <span>EKOSISTEM DIGITAL TERPADU KANCIO</span>
            </div>

            <h1 className="hero__title">
              Bangun Bisnis Lebih Cepat <br />
              <span className="hero__title-highlight">Dengan SaaS &amp; AI Modern</span>
            </h1>

            <p className="hero__subtitle">
              Kancio menghadirkan ekosistem perangkat lunak terpadu untuk percepatan bisnis: ERP Farmasi Apotek &amp; BPJS, Server Pulsa Murah 24 Jam, hingga Solusi Aplikasi Bisnis Kustom.
            </p>

            {/* Stats row */}
            <div className="hero__stats glass-card">
              {stats.map((stat, i) => (
                <div key={i} className="hero__stat">
                  <div className="hero__stat-number">{stat.number}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="hero__cta">
              {current.liveUrl ? (
                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large hero-btn-glow"
                  title={`Pelajari Lebih Lanjut & Kunjungi Portal Resmi ${current.name}`}
                >
                  Pelajari Lebih Lanjut {current.name} <span className="btn__icon">↗</span>
                </a>
              ) : (
                <Link to={current.path} className="btn btn--primary btn--large hero-btn-glow">
                  Buka {current.name} <span className="btn__icon">→</span>
                </Link>
              )}
              <Link to={current.path} className="btn btn--secondary btn--large">
                Panduan &amp; Spesifikasi
              </Link>
            </div>
          </div>

          {/* RIGHT: Interactive Ecosystem Switcher Showcase */}
          <div className="hero__showcase">
            {/* Multi-Product Switcher Tabs */}
            <div className="hero-app-switcher-tabs" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {apps.map((app, i) => (
                <button
                  key={app.id}
                  className={`app-switch-btn ${i === activeApp ? 'app-switch-btn--active' : ''}`}
                  onClick={() => setActiveApp(i)}
                >
                  <span className="btn-label">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Featured Interactive App Card */}
            <div className="hero__app-card glass-panel animate-fade-in" key={current.id}>
              <div className="hero__app-header">
                <div className="hero__app-icon" style={{ background: current.gradient }}>
                  {current.id === 'apotekapp' ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  )}
                </div>
                <div className="hero__app-meta">
                  <div className="hero__app-name">{current.name}</div>
                  <div className="hero__app-tagline">{current.tagline}</div>
                </div>
                <div className="hero__app-stat">{current.stat}</div>
              </div>

              <p className="hero__app-desc">{current.shortDesc}</p>

              {/* Simulated Live Action Window */}
              <div className="hero-sim-window">
                <div className="sim-window-header">
                  <span className="sim-status-live">● Live Simulation</span>
                  <span className="sim-title-text">{current.simTitle}</span>
                </div>
                <div className="sim-window-content">
                  <strong className="sim-metric-val">{current.simMetric}</strong>
                  <span className="sim-sub-text">{current.simSub}</span>
                </div>
              </div>

              <div className="hero-card-actions">
                {current.liveUrl && (
                  <a
                    href={current.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-live-badge"
                    title={`Pelajari Lebih Lanjut di Web App ${current.name}`}
                  >
                    Buka Portal Web {current.id === 'apotekapp' ? 'apotek.kancio.com' : 'ppob.kancio.com'} ↗
                  </a>
                )}
                <Link to={current.path} className="hero-explore-link">
                  Detail Panduan Fitur <span>→</span>
                </Link>
              </div>
            </div>

            {/* Quick Service Links */}
            <div className="hero__services-mini">
              <Link to="/services/custom-solution" className="hero__service-mini glass-panel">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>Custom Solution</span>
              </Link>
              <Link to="/services/ai-integration" className="hero__service-mini glass-panel">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                </svg>
                <span>AI Integration</span>
              </Link>
              <Link to="/services/consulting" className="hero__service-mini glass-panel">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                <span>Consulting</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero