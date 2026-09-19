import React, { useState, useEffect } from 'react'

import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import { useTheme } from '../contexts/ThemeContext'
import './ProductPage.css'
import './PulsaAppPage.css'

interface ProductBrand {
  name: string
  icon: string
  color: string
  sub: string
}

interface ProductCategory {
  id: string
  name: string
  icon: string
  tag: string
  badgeColor: string
  description: string
  brands: ProductBrand[]
  features: string[]
}

const categories: ProductCategory[] = [
  {
    id: 'pulsa',
    name: 'Pulsa & Paket Data',
    icon: '📱',
    tag: 'Semua Operator',
    badgeColor: '#0284c7',
    description:
      'Isi ulang pulsa reguler, paket kuota data internet cepat, paket nelpon & SMS, perpanjangan masa aktif, serta pulsa transfer.',
    brands: [
      { name: 'Telkomsel', icon: '🔴', color: '#e11d48', sub: 'SimPATI, By.U, Halo' },
      { name: 'Indosat Ooredoo', icon: '🟡', color: '#eab308', sub: 'IM3, Freedom Data' },
      { name: 'XL Axiata', icon: '🔵', color: '#2563eb', sub: 'Xtra Combo, Akrab' },
      { name: 'Axis', icon: '🟣', color: '#9333ea', sub: 'Bronet, Warnet' },
      { name: 'Tri (3)', icon: '🟠', color: '#ea580c', sub: 'AlwaysOn, Happy' },
      { name: 'Smartfren', icon: '🔴', color: '#dc2626', sub: 'Kuota Nonstop, Unlimited' },
    ],
    features: [
      'Harga grosir langsung distributor server 1',
      'Auto-detect provider dari 4 digit nomor HP',
      'Tersedia denom mikro Rp 1.000 hingga Rp 1.000.000',
      'Kecepatan kirim 1-5 detik ke penerima',
    ],
  },
  {
    id: 'pln',
    name: 'Token Listrik & PLN',
    icon: '⚡',
    tag: '24 Jam Nonstop',
    badgeColor: '#eab308',
    description:
      'Beli token listrik prabayar instan tengah malam, bayar tagihan listrik bulanan, dan proses pembayaran PLN Non-Taglis.',
    brands: [
      { name: 'PLN Prabayar', icon: '⚡', color: '#eab308', sub: 'Token Listrik 24 Jam' },
      { name: 'PLN Pascabayar', icon: '📄', color: '#3b82f6', sub: 'Cek & Bayar Tagihan Bulanan' },
      { name: 'PLN Non-Taglis', icon: '🔌', color: '#10b981', sub: 'Pasang Baru & Tambah Daya' },
    ],
    features: [
      'Nomor token 20 digit muncul instan di layar',
      'Tersedia tombol copy token & struk PDF',
      'Biaya admin termurah se-Indonesia',
      'Transaksi tetap lancar di jam malam',
    ],
  },
  {
    id: 'emoney',
    name: 'E-Money & Dompet Digital',
    icon: '💳',
    tag: 'Top Up Instan',
    badgeColor: '#10b981',
    description:
      'Top-up saldo dompet digital konsumen dan mitra driver transportasi online terlengkap tanpa biaya admin memberatkan.',
    brands: [
      { name: 'DANA', icon: '🔷', color: '#0284c7', sub: 'Dompet Digital DANA' },
      { name: 'GoPay & Driver', icon: '🟢', color: '#10b981', sub: 'Saldo Customer & Mitra' },
      { name: 'OVO Cash', icon: '🟣', color: '#7c3aed', sub: 'OVO Premier' },
      { name: 'ShopeePay', icon: '🟠', color: '#ea580c', sub: 'ShopeePay Instant' },
      { name: 'E-Toll & TapCash', icon: '💳', color: '#0284c7', sub: 'Mandiri, BRI Brizzi, BNI' },
    ],
    features: [
      'Verifikasi nama akun tujuan otomatis sebelum bayar',
      'Saldo masuk 1-3 detik setelah diverifikasi',
      'Support top up nominal bebas (custom denom)',
      'Cocok untuk layanan loket top-up warung',
    ],
  },
  {
    id: 'game',
    name: 'Voucher & Top-up Game',
    icon: '🎮',
    tag: 'Gamer Choice',
    badgeColor: '#ec4899',
    description:
      'Top up diamond, UC, token, dan voucher game favorit dengan harga grosir langsung masuk ke User ID pemain.',
    brands: [
      { name: 'Mobile Legends', icon: '⚔️', color: '#2563eb', sub: 'Diamonds & Twilight Pass' },
      { name: 'Free Fire', icon: '🔥', color: '#ea580c', sub: 'Diamonds FF & Membership' },
      { name: 'PUBG Mobile', icon: '🪖', color: '#eab308', sub: 'UC Global & Indo' },
      { name: 'Roblox & Steam', icon: '🕹️', color: '#475569', sub: 'Voucher Digital IDR' },
    ],
    features: [
      'Auto-validasi User ID + Zone ID game',
      'Tersedia paket mingguan & membership pass',
      '100% Legal & aman langsung dari publisher',
      'Server proses 24 jam nonstop',
    ],
  },
]



const faqs = [
  {
    question: 'Berapa lama waktu yang dibutuhkan untuk transaksi pulsa atau token?',
    answer:
      'Transaksi diproses secara otomatis oleh server super cepat kami dalam 1 hingga 5 detik setelah pembayaran terverifikasi.',
  },
  {
    question: 'Metode pembayaran apa saja yang didukung untuk deposit saldo?',
    answer:
      'Mendukung QRIS 24 Jam (GoPay, OVO, DANA, ShopeePay, LinkAja, BCA, Mandiri), Saldo Dompet Kancio bebas biaya admin, serta Virtual Account Bank Nasional (BCA, Mandiri, BRI, BNI, Permata).',
  },
  {
    question: 'Apakah saya bisa mencetak struk transaksi dengan printer Bluetooth kasir?',
    answer:
      'Ya! PulsaApp mendukung cetak struk via Thermal Printer Bluetooth 58mm & 80mm, serta ekspor file struk digital format PDF dan kirim langsung ke WhatsApp pelanggan.',
  },
  {
    question: 'Bagaimana jika transaksi mengalami gangguan dari pihak provider?',
    answer:
      'Sistem dilengkapi fitur Auto-Fallback dan Auto-Refund instan. Jika provider induk sedang gangguan, saldo akun Anda akan dikembalikan secara otomatis 100% tanpa potongan.',
  },
]

const PulsaAppPage: React.FC = () => {
  const { userConsent } = useAds()
  const { isDarkMode, toggleTheme } = useTheme()
  const [isAnnual, setIsAnnual] = useState(true)
  const [activeCategory, setActiveCategory] = useState('pulsa')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Interactive Margin Calculator State
  const [simProduct, setSimProduct] = useState('Pulsa Telkomsel 50.000')
  const [basePrice, setBasePrice] = useState(49650)
  const [sellPrice, setSellPrice] = useState(52000)
  const [dailyTrx, setDailyTrx] = useState(35)
  const [simCheckoutDone, setSimCheckoutDone] = useState(false)

  // Lead / Partnership Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    businessType: 'Konter Pulsa / Toko',
    serviceInterest: 'Pulsa & Paket Data',
    notes: '',
  })
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  // Calculations
  const profitPerTrx = Math.max(0, sellPrice - basePrice)
  const monthlyEstimatedProfit = profitPerTrx * dailyTrx * 30

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSimProduct(val)
    if (val.includes('Pulsa Telkomsel 50.000')) {
      setBasePrice(49650)
      setSellPrice(52000)
    } else if (val.includes('Token PLN 100.000')) {
      setBasePrice(100200)
      setSellPrice(103000)
    } else if (val.includes('Topup DANA 50.000')) {
      setBasePrice(50100)
      setSellPrice(52000)
    } else if (val.includes('Mobile Legends 86 Diamonds')) {
      setBasePrice(19800)
      setSellPrice(23000)
    }
  }

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name) return

    const waMsg = encodeURIComponent(
      `Halo Tim PulsaApp Kancio,\n\nSaya ingin mendaftar kemitraan agen / integrasi PPOB:\n- Nama: ${leadForm.name}\n- Bisnis: ${leadForm.businessType}\n- Layanan Diminati: ${leadForm.serviceInterest}\n- Catatan: ${leadForm.notes || 'Mohon info aktivasi saldo & harga modal.'}`
    )
    window.open(`https://wa.me/6282325600996?text=${waMsg}`, '_blank')
    setLeadSubmitted(true)
  }

  useSEO({
    title: 'PulsaApp SaaS - Distributor Agen Pulsa Murah 24 Jam & PPOB Terlengkap',
    description:
      'Platform distributor agen pulsa termurah dan server PPOB 24 jam nonstop: token PLN, paket data kuota, e-money, voucher game, dan eSIM global dengan kecepatan transaksi 1-5 detik.',
    keywords:
      'pulsa murah, agen pulsa murah, server pulsa termurah, token listrik 24 jam, aplikasi ppob terbaik, distributor pulsa h2h, pulsaapp, kancio ppob',
    canonicalUrl: 'https://kancio.com/products/pulsaapp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'PulsaApp',
          operatingSystem: 'Android, Web Browser, iOS',
          applicationCategory: 'FinanceApplication',
          url: 'https://ppob.kancio.com',
          description: 'Aplikasi Agen Pulsa Termurah & Server PPOB Terlengkap 24 Jam',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'IDR',
            lowPrice: '0',
            highPrice: '399000',
            offerCount: '3',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Kancio Development',
            url: 'https://kancio.com',
          },
        },
      ],
    },
  })

  return (
    <div className={`product-page pulsa-page ${isDarkMode ? 'pulsa-theme-dark' : 'pulsa-theme-light'}`}>
      {/* ===== HERO SECTION ===== */}
      <section className="pulsa-hero">
        <div className="pulsa-bg-glow" />
        <div className="pulsa-grid-pattern" />

        <div className="container">
          <div className="pulsa-hero__content">
            <div className="pulsa-eyebrow">
              <span className="pulsa-badge-pulse">
                <span className="pulse-cyan" /> 24/7 TRANSACTION ENGINE
              </span>
              <span className="pulsa-tag-pill">⚡ Server Pulsa &amp; PPOB Terlengkap</span>

              {/* Adaptive Light/Dark Theme Switch */}
              <button
                className="pulsa-theme-btn"
                onClick={toggleTheme}
                title={`Ganti ke ${isDarkMode ? 'Mode Terang' : 'Mode Gelap'}`}
              >
                {isDarkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
              </button>
            </div>

            <h1 className="pulsa-hero__title">
              Pusat Pulsa Murah &amp; PPOB <br />
              <span className="text-gradient-cyan">Kecepatan Transaksi 1-5 Detik</span>
            </h1>

            <p className="pulsa-hero__desc">
              Solusi bisnis pembayaran digital terlengkap untuk konter pulsa, warung, loket PPOB, hingga integrasi API H2H developer. Dapatkan harga modal distributor langsung dengan jaminan uptime 99.9%.
            </p>

            <div className="pulsa-hero__stats glass-card">
              <div className="stat-item">
                <span className="stat-icon">⚡</span>
                <strong>1-5 Detik</strong>
                <span>Auto Transaksi Kilat</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📦</span>
                <strong>1.000+</strong>
                <span>Produk Digital Aktif</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💳</span>
                <strong>Auto QRIS</strong>
                <span>Deposit Instan 24 Jam</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🖨️</span>
                <strong>Struk Custom</strong>
                <span>Support Bluetooth Print</span>
              </div>
            </div>

            <div className="pulsa-hero__cta">
              <a
                href="https://ppob.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary pulsa-btn-primary"
              >
                🚀 Pelajari Lebih Lanjut di Web App PulsaApp <span className="btn__icon">↗</span>
              </a>
              <a href="#simulator" className="btn btn--secondary pulsa-btn-secondary">
                💰 Simulasi Keuntungan Agen
              </a>
              <a href="#lead-form" className="btn btn--outline pulsa-btn-outline">
                🤝 Daftar Kemitraan
              </a>
            </div>
          </div>

          {/* Hero Visual Live Transaction Frame */}
          <div className="pulsa-hero__visual">
            <div className="pulsa-mockup-frame glass-card">
              <div className="mockup-top-bar">
                <div className="window-dots">
                  <span className="w-dot dot-red" />
                  <span className="w-dot dot-yellow" />
                  <span className="w-dot dot-green" />
                </div>
                <a
                  href="https://ppob.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-title-text"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  title="Pelajari lebih lanjut & buka portal https://ppob.kancio.com/"
                >
                  PulsaApp Engine — ppob.kancio.com ↗
                </a>
                <span className="live-status-tag">● 24 Jam Aktif</span>
              </div>

              <div className="mockup-body-pulsa">
                <div className="live-trx-stream-card">
                  <div className="stream-header-pulsa">
                    <span>🔴 Live Transaction Stream</span>
                    <span className="speed-badge">⚡ Avg 1.8s</span>
                  </div>

                  <div className="trx-stream-item">
                    <span className="trx-prov-badge prov-tsel">TSEL</span>
                    <div className="trx-stream-info">
                      <strong>Pulsa Reguler 25.000</strong>
                      <span>0812-4912-XXXX • Selesai 1.2s</span>
                    </div>
                    <span className="trx-status-ok">✓ Sukses</span>
                  </div>

                  <div className="trx-stream-item">
                    <span className="trx-prov-badge prov-pln">PLN</span>
                    <div className="trx-stream-info">
                      <strong>Token Listrik Rp 100.000</strong>
                      <span>IDPEL: 53120984XXXX • Token Generated</span>
                    </div>
                    <span className="trx-status-ok">✓ Sukses</span>
                  </div>

                  <div className="trx-stream-item">
                    <span className="trx-prov-badge prov-dana">DANA</span>
                    <div className="trx-stream-info">
                      <strong>Top Up DANA Rp 50.000</strong>
                      <span>0857-9021-XXXX • Auto Validated</span>
                    </div>
                    <span className="trx-status-ok">✓ Sukses</span>
                  </div>
                </div>

                <div className="qris-instant-box">
                  <div className="qris-icon">📱</div>
                  <div className="qris-text">
                    <strong>QRIS Dynamic &amp; VA Otomatis</strong>
                    <span>Deposit saldo langsung masuk tanpa perlu konfirmasi manual admin.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADVERTISEMENT ===== */}
      <div className="content-break-ad">
        <GoogleAdSense
          userConsent={userConsent}
          unitType="display"
          variant="minimal"
          adLabel="Advertisement"
          showLoadingAnimation={true}
          className="product-page-ad"
        />
      </div>

      {/* ===== INTERACTIVE PROFIT MARGIN CALCULATOR SIMULATOR ===== */}
      <section className="section pulsa-simulator-section" id="simulator">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Live Profit Simulator</div>
            <h2>
              Hitung Potensi Keuntungan <br />
              <span className="text-gradient-cyan">Bisnis Konter &amp; Agen PPOB Anda</span>
            </h2>
            <p>
              Sesuaikan harga jual dan estimasi volume transaksi harian untuk melihat proyeksi keuntungan bulanan Anda bersama PulsaApp.
            </p>
          </div>

          <div className="simulator-box-pulsa glass-card">
            <div className="sim-pulsa-grid">
              {/* Left Column: Product Selection & Controls */}
              <div className="sim-pulsa-controls">
                <h3 className="sim-title">⚙️ Parameter Simulasi Margin</h3>

                <div className="form-group">
                  <label>Pilih Produk Contoh</label>
                  <select value={simProduct} onChange={handleProductChange}>
                    <option value="Pulsa Telkomsel 50.000">📱 Pulsa Telkomsel 50.000</option>
                    <option value="Token PLN 100.000">⚡ Token PLN 100.000</option>
                    <option value="Topup DANA 50.000">💳 Top Up DANA 50.000</option>
                    <option value="Mobile Legends 86 Diamonds">🎮 Mobile Legends 86 Diamonds</option>
                  </select>
                </div>

                <div className="price-inputs-row">
                  <div className="form-group">
                    <label>Harga Modal Distributor (Rp)</label>
                    <input type="number" readOnly value={basePrice} className="readonly-input" />
                  </div>

                  <div className="form-group">
                    <label>Harga Jual ke Konsumen (Rp)</label>
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Estimasi Transaksi Harian: <strong>{dailyTrx} Transaksi / Hari</strong>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={150}
                    step={5}
                    value={dailyTrx}
                    onChange={(e) => setDailyTrx(Number(e.target.value))}
                    className="slider-input"
                  />
                  <div className="slider-labels">
                    <span>5 Trx</span>
                    <span>50 Trx</span>
                    <span>100 Trx</span>
                    <span>150 Trx</span>
                  </div>
                </div>

                <button
                  className="btn btn--primary pulsa-btn-primary btn-block"
                  onClick={() => setSimCheckoutDone(!simCheckoutDone)}
                >
                  {simCheckoutDone ? '🔄 Reset Simulasi Transaksi' : '⚡ Uji Simulasi Transaksi 1-Detik'}
                </button>

                {simCheckoutDone && (
                  <div className="mock-receipt-card animate-fade-in">
                    <div className="receipt-header">
                      <span>✓ Transaksi Sukses #TRX-88219</span>
                      <span className="text-cyan">1.4 detik</span>
                    </div>
                    <div className="receipt-details">
                      <span>Produk: <strong>{simProduct}</strong></span>
                      <span>Harga Modal: Rp {basePrice.toLocaleString('id-ID')}</span>
                      <span>Harga Jual: Rp {sellPrice.toLocaleString('id-ID')}</span>
                      <span className="text-emerald">Laba Bersih Transaksi: <strong>+Rp {profitPerTrx.toLocaleString('id-ID')}</strong></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Profit Overview Display */}
              <div className="sim-pulsa-results">
                <div className="profit-spotlight-card">
                  <span className="profit-title">Proyeksi Keuntungan Bersih Bulanan</span>
                  <div className="profit-big-number">
                    Rp {monthlyEstimatedProfit.toLocaleString('id-ID')}
                    <span className="per-month">/ bulan</span>
                  </div>
                  <p className="profit-note">
                    Dihitung dari {dailyTrx} transaksi/hari x 30 hari dengan rata-rata laba Rp {profitPerTrx.toLocaleString('id-ID')} per transaksi.
                  </p>
                </div>

                <div className="profit-breakdown-grid">
                  <div className="break-card">
                    <span className="b-lbl">Margin Keuntungan Per Transaksi</span>
                    <strong className="text-emerald">Rp {profitPerTrx.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="break-card">
                    <span className="b-lbl">Estimasi Transaksi Per Bulan</span>
                    <strong className="text-cyan">{(dailyTrx * 30).toLocaleString('id-ID')} Trx</strong>
                  </div>
                  <div className="break-card">
                    <span className="b-lbl">Potensi Tambahan Bonus Pasif</span>
                    <strong className="text-amber">+ Rp {(dailyTrx * 30 * 50).toLocaleString('id-ID')}</strong>
                  </div>
                </div>

                <div className="sim-callout-box">
                  💡 <em>Semakin banyak variasi produk yang Anda jual (Token PLN, Pulsa, E-Money, Game), semakin tinggi perputaran laba harian Anda.</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES SHOWCASE ===== */}
      <section className="section pulsa-categories-section" id="kategori">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">1.000+ Produk Digital</div>
            <h2>
              Semua Kategori Produk,{' '}
              <span className="text-gradient-cyan">Harga Grosir Paling Bersaing</span>
            </h2>
            <p>Pilih kategori produk digital untuk melihat daftar provider dan fitur unggulannya.</p>
          </div>

          {/* Category Tabs */}
          <div className="pulsa-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-tab-btn ${activeCategory === cat.id ? 'cat-tab-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Active Category Details */}
          {categories
            .filter((cat) => cat.id === activeCategory)
            .map((cat) => (
              <div key={cat.id} className="category-detail-card glass-card animate-fade-in">
                <div className="cat-detail-header">
                  <div className="cat-title-wrap">
                    <span className="cat-big-icon">{cat.icon}</span>
                    <div>
                      <h3>{cat.name}</h3>
                      <p>{cat.description}</p>
                    </div>
                  </div>
                  <span className="cat-tag-badge">{cat.tag}</span>
                </div>

                <div className="cat-brands-grid">
                  {cat.brands.map((brand, idx) => (
                    <div key={idx} className="brand-chip">
                      <span className="brand-icon">{brand.icon}</span>
                      <div className="brand-info">
                        <strong>{brand.name}</strong>
                        <span>{brand.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cat-features-list">
                  <span className="feat-title">Keunggulan Transaksi:</span>
                  <div className="feat-chips-wrap">
                    {cat.features.map((feat, idx) => (
                      <span key={idx} className="feat-chip-item">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>



      {/* ===== LEAD CAPTURE & PARTNERSHIP FORM ===== */}
      <section className="section pulsa-lead-section" id="lead-form">
        <div className="container">
          <div className="lead-card glass-card">
            <div className="lead-grid">
              <div className="lead-intro">
                <div className="pulsa-badge-pulse">🤝 Kemitraan Resmi</div>
                <h2>Daftar Jadi Agen &amp; Mitra PulsaApp</h2>
                <p>
                  Dapatkan bimbingan setup, aktivasi deposit kilat, dan harga modal terendah langsung dari distributor server 1 Kancio.
                </p>

                <div className="lead-benefits">
                  <div className="benefit-row">
                    <span className="b-icon">⚡</span>
                    <div>
                      <strong>Aktivasi Akun Instan</strong>
                      <span>Langsung bisa transaksi dalam 5 menit setelah registrasi.</span>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <span className="b-icon">💰</span>
                    <div>
                      <strong>Bebas Biaya Pendaftaran</strong>
                      <span>Tidak ada biaya keanggotaan tersembunyi untuk paket Basic.</span>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <span className="b-icon">💬</span>
                    <div>
                      <strong>Customer Support WhatsApp 24 Jam</strong>
                      <span>Bantuan kendala transaksi &amp; deposit dipandu ramah.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lead-form-wrap">
                {leadSubmitted ? (
                  <div className="lead-success-card animate-fade-in">
                    <div className="success-emoji">🎉</div>
                    <h3>Pendaftaran Diterima!</h3>
                    <p>
                      Terima kasih! Kami telah mengarahkan Anda ke WhatsApp Customer Support PulsaApp. Tim kami siap mengaktifkan akun dan memandu pengisian saldo awal Anda.
                    </p>
                    <button
                      className="btn btn--secondary pulsa-btn-secondary"
                      onClick={() => setLeadSubmitted(false)}
                    >
                      Kirim Data Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="lead-form-inner">
                    <h3 className="form-head">Formulir Kemitraan Agen</h3>

                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Hendra Wijaya"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Tipe Usaha</label>
                        <select
                          value={leadForm.businessType}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, businessType: e.target.value })
                          }
                        >
                          <option value="Konter Pulsa / Toko HP">Konter Pulsa / Toko HP</option>
                          <option value="Warung / Toko Kelontong">Warung / Toko Kelontong</option>
                          <option value="Loket PPOB / Agen Tagihan">Loket PPOB / Tagihan</option>
                          <option value="Pengguna Pribadi">Pengguna Pribadi</option>
                          <option value="Developer / Platform H2H">Developer / Platform H2H</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Layanan Diminati</label>
                        <select
                          value={leadForm.serviceInterest}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, serviceInterest: e.target.value })
                          }
                        >
                          <option value="Pulsa & Paket Data">Pulsa &amp; Paket Data</option>
                          <option value="Token Listrik PLN">Token Listrik PLN</option>
                          <option value="Top Up E-Money & Games">Top Up E-Money &amp; Games</option>
                          <option value="Integrasi API H2H">Integrasi API H2H</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Catatan Tambahan (Opsional)</label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Ingin integrasi API H2H untuk website saya..."
                        value={leadForm.notes}
                        onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary pulsa-btn-primary btn-block"
                    >
                      ⚡ Hubungkan ke WhatsApp &amp; Mulai Jualan
                    </button>
                    <span className="privacy-text">🔒 Data Anda aman dan terenkripsi.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section pulsa-faq-section">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Tanya Jawab</div>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <p>Pelajari lebih lanjut tentang kecepatan, deposit, dan transaksi di PulsaApp.</p>
          </div>

          <div className="faq-accordion-box">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i
              return (
                <div
                  key={i}
                  className={`faq-item-card glass-card ${isOpen ? 'faq-item-card--open' : ''}`}
                >
                  <button
                    className="faq-q-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className="chevron-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="faq-a-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA BANNER ===== */}
      <section className="section">
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: '44px 32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(16, 185, 129, 0.12))',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="pulsa-badge-pulse" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
              🚀 Mulai Sekarang
            </div>
            <h2 style={{ fontSize: '2.1rem', marginBottom: '16px' }}>
              Akses Web App PulsaApp &amp; Transaksi Kilat 24 Jam
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto 28px', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Buka platform web PulsaApp sekarang untuk menikmati harga pulsa murah, token PLN instan tengah malam, top up e-money terlengkap, dan voucher game grosir.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="https://ppob.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary pulsa-btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Pelajari Lebih Lanjut di Web App PulsaApp</span>
                <span style={{ fontSize: '1.1em' }}>↗</span>
              </a>
              <a
                href="#lead-form"
                className="btn btn--secondary pulsa-btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none' }}
              >
                Daftar Kemitraan Agen
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PulsaAppPage