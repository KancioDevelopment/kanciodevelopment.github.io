import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const apps = [
  {
    id: 'apotekapp',
    name: 'ApotekApp ERP',
    tagline: 'Sistem Informasi & POS Apotek Terpadu #1',
    shortDesc: 'Otomasi alokasi stok FEFO terdekat, rekonsiliasi resep BPJS Kapitasi & PRB kronis, deteksi markup HPP AI, dan reservasi obat online Click & Collect.',
    icon: '💊',
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
    icon: '⚡',
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
  { number: '1.000+', label: 'Produk Digital', icon: '⚡' },
  { number: '99.9%', label: 'Akurasi Stok FEFO', icon: '🎯' },
  { number: '1-5 Dtk', label: 'Kecepatan Server', icon: '🚀' },
  { number: '24/7', label: 'Cloud Uptime', icon: '🛡️' },
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
                  <span className="hero__stat-icon">{stat.icon}</span>
                  <div>
                    <div className="hero__stat-number">{stat.number}</div>
                    <div className="hero__stat-label">{stat.label}</div>
                  </div>
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
                  <span className="btn-icon">{app.icon}</span>
                  <span className="btn-label">{app.name}</span>
                </button>
              ))}
            </div>

            {/* Featured Interactive App Card */}
            <div className="hero__app-card glass-panel animate-fade-in" key={current.id}>
              <div className="hero__app-header">
                <div className="hero__app-icon" style={{ background: current.gradient }}>
                  {current.icon}
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
                    🚀 Pelajari di {current.id === 'apotekapp' ? 'apotek.kancio.com' : 'ppob.kancio.com'} ↗
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
                <span>🚀</span>
                <span>Custom Solution</span>
              </Link>
              <Link to="/services/ai-integration" className="hero__service-mini glass-panel">
                <span>🤖</span>
                <span>AI Integration</span>
              </Link>
              <Link to="/services/consulting" className="hero__service-mini glass-panel">
                <span>💬</span>
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