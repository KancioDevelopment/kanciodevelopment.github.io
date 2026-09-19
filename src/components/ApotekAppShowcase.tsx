import React from 'react'
import { Link } from 'react-router-dom'
import './ApotekAppShowcase.css'

const ApotekAppShowcase: React.FC = () => {
  const features = [
    {
      icon: '🧠',
      title: 'AI HPP Intelligence',
      description: 'Deteksi dini anomali lonjakan harga supplier & markup tidak wajar secara otomatis untuk melindungi profit apotek.'
    },
    {
      icon: '🛒',
      title: 'Kasir POS FEFO / FIFO',
      description: 'Point of Sale cepat dengan alokasi otomatis batch obat berdasarkan tanggal kedaluwarsa terdekat (FEFO).'
    },
    {
      icon: '🏥',
      title: 'BPJS Kapitasi & PRB',
      description: 'Modul rekonsiliasi klaim BPJS Kesehatan FKTP dan Program Rujuk Balik kronis dengan spelling-tolerant matching.'
    },
    {
      icon: '📋',
      title: 'Resep Racikan & Komisi Dokter',
      description: 'Kalkulasi otomatis tuslah/embalase sediaan racikan serta buku besar transparan untuk komisi dokter mitra.'
    },
    {
      icon: '📦',
      title: 'Defecta & Surat Pesanan PBF',
      description: 'Buku defecta otomatis dengan Reorder Point (ROP) dan multi-split Surat Pesanan resmi ke berbagai distributor PBF.'
    },
    {
      icon: '🌐',
      title: 'Click & Collect Online',
      description: 'Katalog obat publik & reservasi online tanpa antre bagi pasien apotek mitra resmi.'
    }
  ]

  const benefits = [
    {
      title: 'Otomasi 24/7 di Background',
      description: '18+ proses operasional (defecta, debt netting, absensi, payroll) berjalan otomatis tanpa intervensi manual.',
      icon: '⚡'
    },
    {
      title: 'Akurasi Stok 99.9% FEFO',
      description: 'Cegah kerugian obat kedaluwarsa di rak dan lacak selisih fisik via stock opname cepat.',
      icon: '🎯'
    },
    {
      title: 'Laporan Keuangan Terpadu',
      description: 'Laba/Rugi, Neraca, Arus Kas, dan Moving Average HPP terhitung otomatis per detik.',
      icon: '💰'
    },
    {
      title: 'Standar Regulasi BPOM & BPJS',
      description: 'Pemisahan SP Prekursor/OOT resmi dan format laporan sesuai standar kefarmasian Indonesia.',
      icon: '✅'
    }
  ]

  const clientTestimonials = [
    {
      name: 'Apotek Mitra Syifa',
      location: 'Srengat, Kab. Blitar',
      feedback: 'ApotekApp merevolusi manajemen farmasi kami. Deteksi HPP Intelligence dan modul BPJS PRB menghemat jutaan rupiah setiap bulan!',
      rating: 5
    },
    {
      name: 'Apotek E 32',
      location: 'Garum, Kab. Blitar',
      feedback: 'Fitur alokasi stok FEFO dan reservasi online Click & Collect membuat pelayanan kami jauh lebih cepat dan disukai pasien.',
      rating: 5
    }
  ]

  return (
    <section className="apotekapp-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">Pharmacy ERP &amp; Healthcare Platform</div>
          <h2 className="showcase__title">
            ApotekApp
            <span className="showcase__title-highlight"> — Sistem ERP Farmasi Terpadu #1</span>
          </h2>
          <p className="showcase__subtitle">
            Solusi terlengkap manajemen apotek modern: Kasir POS FEFO/FIFO, Rekonsiliasi BPJS Kapitasi &amp; PRB,
            Terminal Resep Dokter, Defecta Multi-PBF, serta Reservasi Obat Online Click &amp; Collect.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="showcase__hero-text">
              <h3>Transformasi Digital Apotek &amp; Faskes Anda</h3>
              <p>
                ApotekApp dirancang khusus untuk pemilik apotek, apoteker pengelola (APA), dan staf kasir.
                Menggabungkan kecerdasan inventori, pengadaan otomatis ke PBF, dan kemudahan belanja obat online bagi pasien.
              </p>
              <div className="showcase__highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🧠</span>
                  <span>AI HPP Intelligence</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🛒</span>
                  <span>Kasir POS FEFO</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏥</span>
                  <span>BPJS Kapitasi &amp; PRB</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌐</span>
                  <span>Click &amp; Collect Pasien</span>
                </div>
              </div>
              <div className="showcase__actions">
                <a
                  href="https://apotek.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn download-btn--apotekapp"
                >
                  <div className="download-btn__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div className="download-btn__text">
                    <span className="download-btn__label">Live Demo</span>
                    <span className="download-btn__store">Buka ApotekApp Web</span>
                  </div>
                </a>
                <Link to="/products/apotekapp" className="btn-pulsa-outline">
                  <span>Detail Modul ERP</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
            <div className="showcase__hero-visual">
              <div className="phone-mockup phone-mockup--pharmacy">
                <div className="phone-screen">
                  <div className="pharmacy-app-preview">
                    <div className="app-header">
                      <div className="app-title">
                        <span className="app-icon">💊</span>
                        <span className="app-name">ApotekApp ERP</span>
                      </div>
                      <div className="app-user">
                        <span className="user-name">Apoteker PJ</span>
                        <span className="notification-badge">3</span>
                      </div>
                    </div>
                    <div className="dashboard-summary">
                      <div className="summary-card">
                        <div className="card-icon">💰</div>
                        <div className="card-info">
                          <div className="card-value">Rp 4.250.000</div>
                          <div className="card-label">Omzet Hari Ini</div>
                        </div>
                      </div>
                      <div className="summary-card">
                        <div className="card-icon">📦</div>
                        <div className="card-info">
                          <div className="card-value">99.9% FEFO</div>
                          <div className="card-label">Akurasi Stok</div>
                        </div>
                      </div>
                    </div>
                    <div className="quick-actions">
                      <div className="action-grid">
                        <div className="action-btn">
                          <span className="action-icon">🛒</span>
                          <span className="action-text">Kasir POS</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">🏥</span>
                          <span className="action-text">BPJS PRB</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">📋</span>
                          <span className="action-text">Defecta PBF</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">🌐</span>
                          <span className="action-text">Click &amp; Collect</span>
                        </div>
                      </div>
                    </div>
                    <div className="recent-transactions">
                      <div className="section-title">Status Pesanan Terkini</div>
                      <div className="transaction-item">
                        <span className="drug-name">Paracetamol 500mg (FEFO)</span>
                        <span className="transaction-amount">Selesai</span>
                      </div>
                      <div className="transaction-item">
                        <span className="drug-name">Amoxicillin (Resep BPJS)</span>
                        <span className="transaction-amount">Tervalidasi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__features">
            <h3>Modul &amp; Fitur Unggulan Farmasi</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-card__icon">{feature.icon}</div>
                  <h4 className="feature-card__title">{feature.title}</h4>
                  <p className="feature-card__description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__benefits">
            <div className="benefits-header">
              <h3>Kenapa Memilih ApotekApp untuk Apotek Anda?</h3>
              <p>Mendukung pengelolaan apotek tunggal hingga jaringan multi-cabang dengan standar farmasi modern</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-card__icon">{benefit.icon}</div>
                  <div className="benefit-card__content">
                    <h4 className="benefit-card__title">{benefit.title}</h4>
                    <p className="benefit-card__description">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__testimonials">
            <h3>Testimoni Apotek Mitra</h3>
            <div className="testimonials-grid">
              {clientTestimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.feedback}"</p>
                    <div className="testimonial-author">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-location">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__cta">
            <div className="cta-content">
              <h3>Siap Meningkatkan Profit &amp; Efisiensi Apotek Anda?</h3>
              <p>Coba langsung live demo ApotekApp atau jadwalkan sesi konsultasi dan migrasi data bersama tim kami</p>
              <div className="cta-stats">
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Modul Siap Pakai</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Otomasi Server</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Aman &amp; Terintegrasi</span>
                </div>
              </div>
              <a
                href="https://apotek.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Pelajari Lebih Lanjut di Web App ApotekApp
                <span className="cta-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApotekAppShowcase