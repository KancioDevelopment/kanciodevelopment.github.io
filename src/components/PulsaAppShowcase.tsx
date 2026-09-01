import React from 'react'
import { Link } from 'react-router-dom'
import './PulsaAppShowcase.css'

const PulsaAppShowcase: React.FC = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Auto-Routing 1-5 Detik',
      description: 'Transaksi instan otomatis 24 jam nonstop dengan multi-cluster server langsung ke distributor resmi.'
    },
    {
      icon: '💰',
      title: 'Harga Agen & Bebas Admin',
      description: 'Dapatkan harga modal termurah untuk pulsa, paket data, dan token PLN tanpa potongan biaya admin terselubung.'
    },
    {
      icon: '🌐',
      title: 'eSIM Global 50+ Negara',
      description: 'Internet luar negeri instan scan QR tanpa perlu ganti kartu fisik untuk liburan, bisnis, hingga ibadah Umroh.'
    },
    {
      icon: '🛡️',
      title: '100% Saldo Aman & Auto-Refund',
      description: 'Sistem proteksi transaksi otomatis mengembalikan saldo jika terjadi gangguan pada provider pihak ketiga.'
    },
    {
      icon: '💳',
      title: 'QRIS & Multi-Virtual Account',
      description: 'Dukungan pembayaran lengkap via QRIS 24 jam serta Virtual Account BCA, Mandiri, BRI, BNI, dan Permata.'
    },
    {
      icon: '🖨️',
      title: 'Cetak Struk & Nota Digital',
      description: 'Fitur cetak nota digital via printer Bluetooth atau bagikan PDF langsung ke WhatsApp pelanggan konter Anda.'
    }
  ]

  const products = [
    { name: 'Pulsa & Kuota Data', icon: '📱', providers: 'Telkomsel, Indosat, XL, Tri, Smartfren' },
    { name: 'Token Listrik PLN', icon: '⚡', providers: 'Prabayar 24 Jam & Pascabayar' },
    { name: 'E-Money & Dompet Digital', icon: '💳', providers: 'DANA, GoPay, OVO, ShopeePay, E-Toll' },
    { name: 'Top-up Voucher Game', icon: '🎮', providers: 'MLBB, Free Fire, PUBG, Genshin, Valorant' },
    { name: 'eSIM Roaming Global', icon: '🌐', providers: '50+ Negara: Asia, Eropa, Amerika, Arab' },
    { name: 'PPOB & Tagihan Bulanan', icon: '📄', providers: 'PDAM, BPJS, Telkom/IndiHome, PGN, Samsat' }
  ]

  return (
    <section className="pulsaapp-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">FinTech & PPOB Platform</div>
          <h2 className="showcase__title">
            PulsaApp &amp; Kancio PPOB
            <span className="showcase__title-highlight"> — Solusi Transaksi Digital 24 Jam</span>
          </h2>
          <p className="showcase__subtitle">
            Platform pengisian pulsa termurah, kuota data, token listrik, voucher game, eSIM roaming global,
            dan pembayaran tagihan PPOB terlengkap di Indonesia dengan pemrosesan instan 1-5 detik.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="showcase__hero-text">
              <h3>Kenapa Memilih PulsaApp &amp; Kancio PPOB?</h3>
              <p>
                Dirancang untuk kebutuhan pribadi hemat biaya maupun pengusaha konter pulsa / agen pembayaran digital.
                Didukung arsitektur cloud berkecepatan tinggi dengan jaminan keamanan transaksi 100%.
              </p>
              <div className="showcase__actions">
                <a 
                  href="https://ppob.kancio.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="learn-more-btn"
                  style={{ background: 'linear-gradient(135deg, #e6007e, #be185d)' }}
                >
                  <span>Buka Web App PPOB</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <Link to="/products/pulsaapp" className="btn-pulsa-outline">
                  <span>Detail Fitur Lengkap</span>
                  <span>→</span>
                </Link>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn download-btn--playstore"
                >
                  <div className="download-btn__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="download-btn__text">
                    <span className="download-btn__label">Download on</span>
                    <span className="download-btn__store">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="showcase__hero-visual">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="app-preview">
                    <div className="app-header">
                      <div className="app-logo">Kancio PPOB</div>
                      <div className="app-balance">Rp 250.000</div>
                    </div>
                    <div className="app-menu">
                      <div className="menu-item">📱 Pulsa &amp; Data</div>
                      <div className="menu-item">⚡ Token PLN</div>
                      <div className="menu-item">🎮 Top-Up Game</div>
                      <div className="menu-item">💳 E-Money</div>
                      <div className="menu-item">🌐 eSIM Global</div>
                      <div className="menu-item">📄 BPJS &amp; PDAM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__products">
            <h3>Kategori Produk Lengkap</h3>
            <div className="products-grid">
              {products.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-card__icon">{product.icon}</div>
                  <h4 className="product-card__name">{product.name}</h4>
                  <p className="product-card__providers">{product.providers}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__features">
            <h3>Keunggulan &amp; Standar Layanan</h3>
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
        </div>
      </div>
    </section>
  )
}

export default PulsaAppShowcase