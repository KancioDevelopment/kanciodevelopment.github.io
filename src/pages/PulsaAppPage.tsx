import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'
// Reuse some styles if possible or define inline/dedicated
import './ApotekAppPage.css'

const PulsaAppPage: React.FC = () => {
  const { userConsent } = useAds()
  const [activeFeature, setActiveFeature] = useState(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: '💰',
      title: 'Harga Kompetitif',
      badge: 'Hemat Biaya',
      badgeColor: 'green',
      description: 'Dapatkan harga pulsa, paket data, dan voucher game yang lebih murah dibandingkan outlet fisik atau aplikasi lainnya.',
      details: [
        'Harga distributor langsung',
        'Tanpa biaya admin tersembunyi',
        'Promo cashback PulsaPay berkala',
        'Hemat untuk pemakaian pribadi atau bisnis'
      ],
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: '⚡',
      title: 'Transaksi Otomatis',
      badge: 'Super Cepat',
      badgeColor: 'blue',
      description: 'Sistem online 24 jam yang memproses transaksi Anda secara instan. Produk digital langsung masuk ke nomor tujuan.',
      details: [
        'Proses real-time 24/7',
        'Status transaksi transparan',
        'Notifikasi instan via aplikasi',
        'Sistem otomatis tanpa campur tangan manual'
      ],
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    },
    {
      icon: '🎯',
      title: 'Produk Terlengkap',
      badge: 'Semua Ada',
      badgeColor: 'indigo',
      description: 'Satu aplikasi untuk semua kebutuhan digital Anda. Dari semua operator seluler hingga berbagai macam voucher game.',
      details: [
        'Semua operator (Telkomsel, XL, dll)',
        'Voucher Game (ML, PUBG, FF, dll)',
        'Top-up E-Money (GoPay, OVO, DANA)',
        'Token Listrik & Pembayaran PPOB'
      ],
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
      icon: '🛡️',
      title: 'Keamanan Terjamin',
      badge: 'Audit Aman',
      badgeColor: 'teal',
      description: 'Keamanan data dan transaksi adalah prioritas kami. Menggunakan enkripsi SSL terbaru dan metode verifikasi aman.',
      details: [
        'Enkripsi data tingkat tinggi',
        'Verifikasi OTP untuk keamanan ganda',
        'Audit transaksi yang dapat dilacak',
        'Proteksi saldo PulsaPay'
      ],
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)'
    },
    {
      icon: '💳',
      title: 'PulsaPay Wallet',
      badge: 'E-Wallet',
      badgeColor: 'yellow',
      description: 'Dompet digital terintegrasi untuk memudahkan transaksi Anda tanpa perlu berulang kali melakukan transfer bank.',
      details: [
        'Top-up saldo mudah (Bank Transfer/QRIS)',
        'Pembayaran satu klik belanja cepat',
        'History saldo yang sangat rinci',
        'Transfer saldo antar pengguna PulsaApp'
      ],
      gradient: 'linear-gradient(135deg, #eab308, #d97706)'
    },
    {
      icon: '🎧',
      title: 'Dukungan Responsif',
      badge: 'Siap Bantu',
      badgeColor: 'pink',
      description: 'Tim customer support kami siap membantu kendala transaksi Anda melalui berbagai kanal komunikasi.',
      details: [
        'Support via WhatsApp & Live Chat',
        'Respon cepat terhadap kelalaian input',
        'Bantuan teknis 7 hari seminggu',
        'Solusi refund atau re-send otomatis'
      ],
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
    }
  ]

  const productStats = [
    { number: '5.000+', label: 'Unduhan Play Store', icon: '📥' },
    { number: '24/7', label: 'Layanan Otomatis', icon: '⚡' },
    { number: '50+', label: 'Varian Produk', icon: '📱' },
    { number: 'Secure', label: 'Keamanan Berlapis', icon: '🛡️' }
  ]

  const technicalSpecs = [
    { label: 'Versi Aplikasi', value: '2.4.6' },
    { label: 'Ukuran Download', value: '50 MB' },
    { label: 'OS Minimum', value: 'Android 7.0 (Nougat) atau lebih tinggi' },
    { label: 'Kategori', value: 'Shopping / Belanja (PPOB)' },
    { label: 'Developer', value: 'Kancio.com' },
    { label: 'Bahasa', value: 'Indonesia' }
  ]

  return (
    <div className="product-page apotek-page pulsaapp-page">
      <Header />

      {/* Hero Section */}
      <section className="apotek-hero pulsaapp-hero">
        <div className="apotek-hero__bg" style={{ background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, rgba(255, 255, 255, 0) 100%)' }} />
        <div className="container">
          <div className="apotek-hero__content">
            <div className="apotek-hero__eyebrow">
              <span className="badge">📱 PulsaApp</span>
              <span className="apotek-hero__tag">Top-up & PPOB Terpercaya</span>
            </div>
            <h1 className="apotek-hero__title">
              Transaksi Digital <br />
              <span className="text-gradient">Murah & Instan</span>
            </h1>
            <p className="apotek-hero__desc">
              Solusi cerdas pengisian pulsa, paket data, voucher game, dan pembayaran tagihan
              dalam satu genggaman. Nikmati harga agen dan kecepatan transaksi otomatis 24 jam.
            </p>
            <div className="apotek-hero__stats">
              {productStats.map((s, i) => (
                <div key={i} className="apotek-hero__stat">
                  <span className="apotek-hero__stat-icon">{s.icon}</span>
                  <strong>{s.number}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="apotek-hero__cta">
              <a
                href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--large"
              >
                Download di Play Store <span className="btn__icon">→</span>
              </a>
              <a href="#features" className="btn btn--secondary btn--large">
                Lihat Keunggulan
              </a>
            </div>
          </div>
          <div className="apotek-hero__visual">
            <div className="apotek-hero__card-stack">
              <div className="apotek-stat-card apotek-stat-card--top">
                <span className="apotek-stat-card__icon">💰</span>
                <div>
                  <div className="apotek-stat-card__label">Hemat Transaksi</div>
                  <div className="apotek-stat-card__value">Harga Agen</div>
                </div>
                <span className="apotek-stat-card__badge" style={{ background: '#10b981' }}>Best</span>
              </div>
              <div className="apotek-hero__dashboard pulsaapp-preview-card">
                <div className="apotek-dashboard__row">
                  <span>📱 Pulsa Telkomsel</span>
                  <strong className="text-green">Berhasil</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>🎮 Voucher MLBB</span>
                  <strong>Instan</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>💳 Saldo PulsaPay</span>
                  <strong className="text-gradient">Aktif</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>⚡ Token PLN</span>
                  <strong>24 Jam</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="content-break-ad">
        <GoogleAdSense
          userConsent={userConsent}
          adFormat="horizontal"
          variant="minimal"
          adLabel="Advertisement"
          showLoadingAnimation={true}
          className="product-page-ad"
        />
      </div>

      {/* Features Section */}
      <section
        id="features"
        ref={sectionRef}
        className={`section apotek-modules ${visible ? 'apotek-modules--visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <div className="badge">Keunggulan PulsaApp</div>
            <h2>
              Solusi Transaksi Digital{' '}
              <span className="text-gradient">Tanpa Hambatan</span>
            </h2>
            <p>
              Dirancang untuk memberikan pengalaman bertransaksi yang paling efisien,
              aman, dan menguntungkan bagi setiap pengguna.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="apotek-modules__tabs">
            {features.map((f, i) => (
              <button
                key={i}
                className={`apotek-module-tab ${activeFeature === i ? 'apotek-module-tab--active' : ''}`}
                onClick={() => setActiveFeature(i)}
                style={activeFeature === i ? { background: features[i].gradient } : {}}
              >
                <span>{f.icon}</span>
                <span className="apotek-module-tab__name">{f.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Feature Detail */}
          <div className="apotek-module-detail card">
            <div className="apotek-module-detail__left">
              <div className="apotek-module-detail__header">
                <div
                  className="apotek-module-detail__icon"
                  style={{ background: features[activeFeature].gradient }}
                >
                  {features[activeFeature].icon}
                </div>
                <span className={`apotek-badge apotek-badge--${features[activeFeature].badgeColor}`}>
                  {features[activeFeature].badge}
                </span>
              </div>
              <h3 className="apotek-module-detail__title">{features[activeFeature].title}</h3>
              <p className="apotek-module-detail__desc">{features[activeFeature].description}</p>
              <ul className="apotek-module-detail__features">
                {features[activeFeature].details.map((d, i) => (
                  <li key={i}>
                    <span className="apotek-check">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="apotek-module-detail__right">
              <div className="apotek-module-preview" style={{ borderColor: `rgba(99,102,241,0.2)` }}>
                <div
                  className="apotek-module-preview__header"
                  style={{ background: features[activeFeature].gradient }}
                >
                  <span>PulsaApp — {features[activeFeature].title}</span>
                </div>
                <div className="apotek-module-preview__body">
                  {features[activeFeature].details.map((d, i) => (
                    <div key={i} className="apotek-preview-row">
                      <span className="apotek-preview-row__icon">✓</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="content-break-ad">
        <GoogleAdSense
          userConsent={userConsent}
          adFormat="rectangle"
          variant="premium"
          adLabel="Sponsored"
          showLoadingAnimation={true}
          className="product-page-ad-footer"
        />
      </div>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="apotek-cta-banner">
            <div className="apotek-cta-banner__bg" style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)' }} />
            <div className="apotek-cta-banner__content">
              <div className="badge badge--accent">Mulai Pakai</div>
              <h2>Siap Transaksi Lebih Hemat?</h2>
              <p>
                Bergabunglah dengan ribuan pengguna yang telah mempercayakan PulsaApp
                untuk kebutuhan digital harian mereka. Mudah, murah, dan aman.
              </p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  Download Gratis Sekarang <span className="btn__icon">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PulsaAppPageBergabunglah dengan ribuan pengguna yang telah mempercayakan PulsaApp
                untuk kebutuhan digital harian mereka. Mudah, murah, dan aman.
              </p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  Download Gratis Sekarang <span className="btn__icon">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PulsaAppPage