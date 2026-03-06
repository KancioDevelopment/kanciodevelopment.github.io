import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'
import './ApotekAppPage.css'

const modules = [
  {
    icon: '🧠',
    title: 'AI-Powered HPP Intelligence',
    badge: 'Keunggulan Utama',
    badgeColor: 'indigo',
    description:
      'Satu-satunya sistem ERP Apotek yang secara otomatis mendeteksi anomali Harga Pokok Pembelian (HPP). Lindungi apotek Anda dari markup supplier yang berlebih sebelum terlambat.',
    features: [
      'Deteksi markup berlebih secara real-time',
      'Audit harga supplier otomatis',
      'Manager Intelligence Dashboard',
      'Hemat rata-rata Rp 12,4jt+ per periode',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    icon: '🛒',
    title: 'Kasir (Point of Sale)',
    badge: 'Inti Operasional',
    badgeColor: 'green',
    description:
      'POS responsif yang dirancang khusus untuk alur kerja apotek. Dari transaksi biasa hingga resep dokter — semua tertangani dengan cepat dan tepat.',
    features: [
      'Pencarian obat super cepat',
      'Otomasi FEFO/FIFO stok',
      'Mode Resep & Racikan khusus',
      'Fungsi Hold & Recall transaksi',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
  {
    icon: '🔄',
    title: 'Transfer Obat Antar Apotek',
    badge: 'Multi-Cabang',
    badgeColor: 'blue',
    description:
      'Kelola peminjaman dan transfer stok obat antar cabang dengan sistem pelacakan hutang otomatis. Tidak ada lagi stok menumpuk di satu cabang sementara cabang lain kehabisan.',
    features: [
      'Transfer & pinjam stok antar cabang',
      'Pelacakan hutang stok otomatis',
      'Mekanisme retur fleksibel',
      'Riwayat transfer lengkap',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
  {
    icon: '💳',
    title: 'Manajemen Metode Pembayaran',
    badge: 'Multi-Payment',
    badgeColor: 'yellow',
    description:
      'Terima pembayaran dengan berbagai metode dalam satu sistem. Lacak biaya admin, saldo, dan buat audit trail yang bersih untuk laporan keuangan Anda.',
    features: [
      'Tunai, QRIS, Transfer, Tempo',
      'Pelacakan biaya admin & saldo',
      'Audit trail lengkap per transaksi',
      'Rekonsiliasi pembayaran otomatis',
    ],
    gradient: 'linear-gradient(135deg, #eab308, #f97316)',
  },
  {
    icon: '👥',
    title: 'Manajemen Staff & KPI',
    badge: 'SDM Apotek',
    badgeColor: 'pink',
    description:
      'Monitor produktivitas seluruh staf dengan sistem target dan bonus yang transparan. Leaderboard real-time membuat tim termotivasi untuk mencapai target bulanan.',
    features: [
      'Monitor produktivitas individual',
      'Target penjualan bulanan',
      'Bonus tiering otomatis (Bronze → Diamond)',
      'Leaderboard tim real-time',
    ],
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
  },
  {
    icon: '🏥',
    title: 'BPJS Kapitasi',
    badge: 'Layanan Khusus',
    badgeColor: 'teal',
    description:
      'Modul terintegrasi khusus untuk melayani transaksi BPJS dengan akurasi tinggi. Settlement bulanan, upload PDF resep, dan pelacakan komisi negatif — semua otomatis.',
    features: [
      'Transaksi BPJS terintegrasi',
      'Upload & kelola PDF resep',
      'Pelacakan komisi negatif',
      'Settlement bulanan otomatis',
    ],
    gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
  },
]

const stats = [
  { number: '50%+', label: 'Efisiensi Admin', icon: '⚡' },
  { number: '99.9%', label: 'Akurasi Stok', icon: '🎯' },
  { number: 'Rp 12,4jt+', label: 'Profit Terlindungi', icon: '💰' },
  { number: 'Multi', label: 'Cabang Apotek', icon: '🏪' },
]

const testimonials = [
  {
    name: 'Apotek Mitra Syifa',
    quote:
      'HPP Intelligence menyelamatkan kami dari markup supplier. Dalam sebulan pertama saja kami sudah terhindar dari kerugian jutaan rupiah.',
    role: 'Apotek Mitra',
  },
  {
    name: 'Apotek E Tiga 2',
    quote:
      'Transfer stok antar cabang jadi sangat mudah. Tidak ada lagi cabang yang kekurangan obat sementara cabang lain overstock.',
    role: 'Apotek Mitra',
  },
]

const whyChoose = [
  {
    icon: '🔐',
    title: 'Satu-satunya HPP Intelligence',
    desc: 'Tidak ada ERP apotek lain yang mampu mendeteksi anomali harga supplier secara otomatis seperti ApotekApp.',
  },
  {
    icon: '🚀',
    title: 'Siap Pakai Hari Ini',
    desc: 'Demo gratis tersedia. Tim onboarding kami siap membantu migrasi data dan pelatihan staf Anda.',
  },
  {
    icon: '🏢',
    title: 'Skalabel Multi-Cabang',
    desc: 'Dari apotek tunggal hingga jaringan multi-cabang — sistem kami tumbuh bersama bisnis Anda.',
  },
  {
    icon: '📊',
    title: 'Laporan Mendalam',
    desc: 'Laporan Laba/Rugi, analitik stok, KPI staf, dan dashboard manajerial dalam satu platform.',
  },
]

const ApotekAppPage: React.FC = () => {
  const { userConsent } = useAds()
  const [activeModule, setActiveModule] = useState(0)
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

  return (
    <div className="product-page apotek-page">
      <Header />

      {/* ===== HERO ===== */}
      <section className="apotek-hero">
        <div className="apotek-hero__bg" />
        <div className="container">
          <div className="apotek-hero__content">
            <div className="apotek-hero__eyebrow">
              <span className="badge">💊 ApotekApp</span>
              <span className="apotek-hero__tag">ERP Apotek Generasi Terbaru</span>
            </div>
            <h1 className="apotek-hero__title">
              Tingkatkan Profit <br />
              <span className="text-gradient">Apotek Anda</span>
            </h1>
            <p className="apotek-hero__desc">
              Platform manajemen apotek terpadu yang menggabungkan kecerdasan inventori,
              otomasi pengadaan, dan analitik mendalam dalam satu dashboard premium.
              Satu-satunya ERP apotek dengan AI HPP Intelligence.
            </p>
            <div className="apotek-hero__stats">
              {stats.map((s, i) => (
                <div key={i} className="apotek-hero__stat">
                  <span className="apotek-hero__stat-icon">{s.icon}</span>
                  <strong>{s.number}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="apotek-hero__cta">
              <a
                href="https://apotek.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--large"
              >
                Coba Demo Gratis <span className="btn__icon">→</span>
              </a>
              <a
                href="https://apotek.kancio.com/#solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--large"
              >
                Lihat Fitur Lengkap
              </a>
            </div>
          </div>
          <div className="apotek-hero__visual">
            <div className="apotek-hero__card-stack">
              <div className="apotek-stat-card apotek-stat-card--top">
                <span className="apotek-stat-card__icon">🧠</span>
                <div>
                  <div className="apotek-stat-card__label">HPP Intelligence</div>
                  <div className="apotek-stat-card__value">Anomali Terdeteksi</div>
                </div>
                <span className="apotek-stat-card__badge">AI</span>
              </div>
              <div className="apotek-hero__dashboard">
                <div className="apotek-dashboard__row">
                  <span>💰 Profit Hari Ini</span>
                  <strong className="text-green">+Rp 4,2jt</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>📦 Stok Akurasi</span>
                  <strong>99.9%</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>⚡ Admin Efisiensi</span>
                  <strong className="text-gradient">50%+</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>🛒 Transaksi Hari Ini</span>
                  <strong>247</strong>
                </div>
              </div>
              <div className="apotek-stat-card apotek-stat-card--bottom">
                <span className="apotek-stat-card__icon">✅</span>
                <div>
                  <div className="apotek-stat-card__label">BPJS Settlement</div>
                  <div className="apotek-stat-card__value">Bulan ini selesai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AD ===== */}
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

      {/* ===== 6 MODULES ===== */}
      <section
        ref={sectionRef}
        className={`section apotek-modules ${visible ? 'apotek-modules--visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <div className="badge">6 Modul Terintegrasi</div>
            <h2>
              Semua yang Dibutuhkan Apotek,{' '}
              <span className="text-gradient">Dalam Satu Platform</span>
            </h2>
            <p>
              Dari kasir harian hingga analitik manajerial — ApotekApp mengelola
              seluruh operasional apotek Anda tanpa kompleksitas sistem terpisah.
            </p>
          </div>

          {/* Module Tabs */}
          <div className="apotek-modules__tabs">
            {modules.map((m, i) => (
              <button
                key={i}
                className={`apotek-module-tab ${activeModule === i ? 'apotek-module-tab--active' : ''}`}
                onClick={() => setActiveModule(i)}
                style={activeModule === i ? { background: modules[i].gradient } : {}}
              >
                <span>{m.icon}</span>
                <span className="apotek-module-tab__name">{m.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Module Detail */}
          <div className="apotek-module-detail card">
            <div className="apotek-module-detail__left">
              <div className="apotek-module-detail__header">
                <div
                  className="apotek-module-detail__icon"
                  style={{ background: modules[activeModule].gradient }}
                >
                  {modules[activeModule].icon}
                </div>
                <span className={`apotek-badge apotek-badge--${modules[activeModule].badgeColor}`}>
                  {modules[activeModule].badge}
                </span>
              </div>
              <h3 className="apotek-module-detail__title">{modules[activeModule].title}</h3>
              <p className="apotek-module-detail__desc">{modules[activeModule].description}</p>
              <ul className="apotek-module-detail__features">
                {modules[activeModule].features.map((f, i) => (
                  <li key={i}>
                    <span className="apotek-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="apotek-module-detail__right">
              <div className="apotek-module-preview" style={{ borderColor: `rgba(99,102,241,0.2)` }}>
                <div
                  className="apotek-module-preview__header"
                  style={{ background: modules[activeModule].gradient }}
                >
                  <span>ApotekApp — {modules[activeModule].title}</span>
                </div>
                <div className="apotek-module-preview__body">
                  {modules[activeModule].features.map((f, i) => (
                    <div key={i} className="apotek-preview-row">
                      <span className="apotek-preview-row__icon">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Module Cards Grid (all 6) */}
          <div className="apotek-modules-grid">
            {modules.map((mod, i) => (
              <div
                key={i}
                className={`apotek-mod-card card ${activeModule === i ? 'apotek-mod-card--active' : ''}`}
                onClick={() => setActiveModule(i)}
                style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
              >
                <div className="apotek-mod-card__top">
                  <div className="apotek-mod-card__icon" style={{ background: mod.gradient }}>
                    {mod.icon}
                  </div>
                  <span className={`apotek-badge apotek-badge--${mod.badgeColor}`}>{mod.badge}</span>
                </div>
                <h4 className="apotek-mod-card__name">{mod.title}</h4>
                <p className="apotek-mod-card__desc">{mod.description.split('.')[0]}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="section" style={{ background: 'rgba(99,102,241,0.03)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge badge--accent">Mengapa ApotekApp?</div>
            <h2>
              Keunggulan yang <span className="text-gradient">Tidak Ada Duanya</span>
            </h2>
          </div>
          <div className="apotek-why-grid">
            {whyChoose.map((w, i) => (
              <div key={i} className="apotek-why-card card">
                <div className="apotek-why-card__icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Apotek Mitra</div>
            <h2>
              Dipercaya Apotek-Apotek <span className="text-gradient">Terkemuka</span>
            </h2>
          </div>
          <div className="apotek-testimonials">
            {testimonials.map((t, i) => (
              <div key={i} className="apotek-testimonial card">
                <div className="apotek-testimonial__quote">"{t.quote}"</div>
                <div className="apotek-testimonial__author">
                  <div className="apotek-testimonial__avatar">💊</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AD ===== */}
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

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="container">
          <div className="apotek-cta-banner">
            <div className="apotek-cta-banner__bg" />
            <div className="apotek-cta-banner__content">
              <div className="badge badge--accent">Mulai Sekarang</div>
              <h2>Jadwalkan Demo Gratis Hari Ini</h2>
              <p>
                Lihat sendiri bagaimana ApotekApp mengubah cara Anda mengelola apotek.
                Demo gratis, tanpa komitmen, dipandu tim ahli kami.
              </p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://apotek.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  Coba Demo Gratis <span className="btn__icon">→</span>
                </a>
                <Link to="/services/consulting" className="btn btn--secondary btn--large">
                  Konsultasi Dulu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ApotekAppPage