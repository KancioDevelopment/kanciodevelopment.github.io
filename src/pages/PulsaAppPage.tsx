import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
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

const PulsaAppPage: React.FC = () => {
  const { userConsent } = useAds()

  useSEO({
    title: 'Pulsa Murah 24 Jam & Agen PPOB Terlengkap | PulsaApp Kancio',
    description: 'Beli pulsa murah semua operator (Telkomsel, Indosat, XL, Tri, Axis, Smartfren), token listrik PLN 24 jam, paket kuota data, voucher game, eSIM roaming global, & tagihan PPOB instan 1-5 detik via QRIS & VA di PulsaApp & ppob.kancio.com.',
    keywords: 'pulsa murah, agen pulsa murah, beli pulsa murah, token listrik murah, aplikasi pulsa murah, ppob terlengkap, pulsa telkomsel murah, deposit pulsa otomatis, esim indonesia, kancio ppob, pulsaapp',
    canonicalUrl: 'https://kancio.com/products/pulsaapp',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "PulsaApp",
          "operatingSystem": "Android, Web Browser, iOS",
          "applicationCategory": "FinanceApplication",
          "url": "https://ppob.kancio.com",
          "description": "Aplikasi Agen Pulsa Termurah & Pembayaran Tagihan Online 24 Jam Terlengkap di Indonesia",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "IDR",
            "description": "Free Web & Mobile Access"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kancio Development",
            "url": "https://kancio.com"
          }
        },
        {
          "@type": "FinancialService",
          "name": "Kancio PPOB",
          "legalName": "Kancio PPOB Indonesia",
          "url": "https://ppob.kancio.com",
          "description": "Distributor resmi PPOB, agen pulsa murah semua operator, token listrik PLN 24 jam, pembayaran tagihan PDAM, BPJS, voucher game, dan layanan eSIM.",
          "currenciesAccepted": "IDR",
          "paymentAccepted": "Saldo Dompet Kancio, QRIS, Virtual Account, Bank Transfer",
          "priceRange": "Rp 1.000 - Rp 10.000.000"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://kancio.com" },
            { "@type": "ListItem", "position": 2, "name": "PulsaApp & PPOB", "item": "https://kancio.com/products/pulsaapp" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Bagaimana cara beli pulsa murah dan token listrik PLN di Kancio PPOB?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pilih menu Pulsa atau Token Listrik, masukkan nomor handphone atau nomor meteran PLN Anda, tentukan nominal, dan bayar instan via QRIS, Virtual Account, atau Saldo Dompet Kancio (PulsaPay). Transaksi diproses otomatis 1-5 detik."
              }
            },
            {
              "@type": "Question",
              "name": "Apakah transaksi PPOB di Kancio buka 24 jam nonstop?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ya, seluruh transaksi pembelian pulsa, kuota internet, token PLN, voucher game, dan pembayaran tagihan pascabayar di Kancio PPOB beroperasi otomatis 24 jam setiap hari tanpa henti."
              }
            },
            {
              "@type": "Question",
              "name": "Metode pembayaran apa saja yang didukung?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mendukung Saldo Dompet Kancio (bebas biaya admin), QRIS 24 Jam (GoPay, OVO, DANA, ShopeePay, LinkAja, BCA, Mandiri), dan Virtual Account Bank Nasional (BCA, Mandiri, BRI, BNI, Permata)."
              }
            },
            {
              "@type": "Question",
              "name": "Bagaimana jika pengisian pulsa atau token saya mengalami kendala?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sistem dilengkapi auto-routing dan auto-rekonsiliasi. Jika provider mengalami gangguan, saldo atau dana Anda dijamin 100% aman dan dikembalikan otomatis ke Saldo Dompet Kancio."
              }
            }
          ]
        }
      ]
    }
  })

  // State
  const [activeTab, setActiveTab] = useState<string>('pulsa')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Interactive Simulator State
  const [simCategory, setSimCategory] = useState<'pulsa' | 'pln' | 'emoney' | 'game'>('pulsa')
  const [simProvider, setSimProvider] = useState<string>('Telkomsel')
  const [simTarget, setSimTarget] = useState<string>('081234567890')
  const [simDenom, setSimDenom] = useState<number>(50000)
  const [simPayment, setSimPayment] = useState<'wallet' | 'qris' | 'va'>('wallet')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const categories: ProductCategory[] = [
    {
      id: 'pulsa',
      name: 'Pulsa & Paket Data',
      icon: '📱',
      tag: 'Semua Operator',
      badgeColor: '#0284c7',
      description: 'Isi ulang pulsa reguler, paket data kuota internet cepat, paket nelpon & SMS, perpanjangan masa aktif, serta pulsa transfer.',
      brands: [
        { name: 'Telkomsel', icon: '🔴', color: '#e11d48', sub: 'SimPATI, By.U, Halo' },
        { name: 'Indosat Ooredoo', icon: '🟡', color: '#eab308', sub: 'IM3, Freedom Data' },
        { name: 'XL Axiata', icon: '🔵', color: '#2563eb', sub: 'Xtra Combo, Akrab' },
        { name: 'Axis', icon: '🟣', color: '#9333ea', sub: 'Bronet, Warnet' },
        { name: 'Tri (3)', icon: '🟠', color: '#ea580c', sub: 'AlwaysOn, Happy' },
        { name: 'Smartfren', icon: '🔴', color: '#dc2626', sub: 'Kuota Nonstop, Unlimited' }
      ],
      features: [
        'Harga grosir langsung distributor resmi',
        'Auto-detect nomor provider secara presisi',
        'Tersedia denom mikro Rp 1.000 hingga Rp 1.000.000',
        'Paket data bonus kuota lokal & streaming'
      ]
    },
    {
      id: 'pln',
      name: 'Token Listrik & PLN',
      icon: '⚡',
      tag: '24 Jam Nonstop',
      badgeColor: '#eab308',
      description: 'Beli token listrik prabayar instan kapan saja tengah malam, bayar tagihan listrik bulanan, dan proses pembayaran PLN Non-Taglis.',
      brands: [
        { name: 'PLN Prabayar', icon: '⚡', color: '#eab308', sub: 'Token Listrik 24 Jam' },
        { name: 'PLN Pascabayar', icon: '📄', color: '#3b82f6', sub: 'Cek & Bayar Tagihan Bulanan' },
        { name: 'PLN Non-Taglis', icon: '🔌', color: '#10b981', sub: 'Pasang Baru & Tambah Daya' }
      ],
      features: [
        'Nomor token 20 digit muncul instan di layar',
        'Tersedia fitur copy token & simpan ID Pelanggan',
        'Biaya admin termurah se-Indonesia',
        'Bisa transaksi saat jam krusial 23:00 - 01:00 WIB'
      ]
    },
    {
      id: 'emoney',
      name: 'E-Money & Dompet Digital',
      icon: '💳',
      tag: 'Top Up Instan',
      badgeColor: '#10b981',
      description: 'Top-up saldo dompet digital konsumen dan mitra driver transportasi online terlengkap tanpa biaya admin memberatkan.',
      brands: [
        { name: 'DANA', icon: '🔷', color: '#0284c7', sub: 'Dompet Digital DANA' },
        { name: 'GoPay & Gojek Driver', icon: '🟢', color: '#10b981', sub: 'Saldo Customer & Mitra' },
        { name: 'OVO', icon: '🟣', color: '#7c3aed', sub: 'OVO Cash' },
        { name: 'ShopeePay', icon: '🟠', color: '#ea580c', sub: 'ShopeePay Instant' },
        { name: 'LinkAja', icon: '🔴', color: '#e11d48', sub: 'LinkAja BUMN' },
        { name: 'Grab & Maxim Driver', icon: '🛵', color: '#059669', sub: 'Top Up Saldo Driver' },
        { name: 'E-Toll & TapCash', icon: '💳', color: '#0284c7', sub: 'Mandiri, BRI Brizzi, BNI TapCash' }
      ],
      features: [
        'Verifikasi nama akun e-wallet otomatis sebelum bayar',
        'Saldo langsung masuk 1-3 detik setelah verifikasi',
        'Support top up nominal bebas (custom denom)',
        'Mendukung isi ulang kartu e-toll & uang elektronik'
      ]
    },
    {
      id: 'game',
      name: 'Voucher & Top-up Game',
      icon: '🎮',
      tag: 'Gamer Choice',
      badgeColor: '#ec4899',
      description: 'Top up diamond, cash, credit, dan voucher game favorit dengan harga miring langsung masuk ke User ID Anda.',
      brands: [
        { name: 'Mobile Legends', icon: '⚔️', color: '#2563eb', sub: 'Diamonds & Twilight Pass' },
        { name: 'Free Fire', icon: '🔥', color: '#ea580c', sub: 'Diamonds FF & Membership' },
        { name: 'PUBG Mobile', icon: '🪖', color: '#eab308', sub: 'UC Global & Indo' },
        { name: 'Genshin Impact', icon: '✨', color: '#6366f1', sub: 'Genesis Crystals & Blessing' },
        { name: 'Valorant Points', icon: '🎯', color: '#dc2626', sub: 'VP Riot Games' },
        { name: 'Steam Wallet & Roblox', icon: '🕹️', color: '#475569', sub: 'Voucher Digital IDR' },
        { name: 'Google Play Code', icon: '🛒', color: '#10b981', sub: 'Voucher Resmi Google Play' }
      ],
      features: [
        'Auto-validasi User ID + Zone ID game',
        'Tersedia paket mingguan, bulanan & season pass',
        '100% Legal dan aman dari banned',
        'Proses pengisian otomatis 24 jam'
      ]
    },
    {
      id: 'esim',
      name: 'eSIM & Roaming Global',
      icon: '🌐',
      tag: '50+ Negara',
      badgeColor: '#6366f1',
      description: 'Solusi internet luar negeri tanpa repot ganti kartu fisik atau sewa modem wifi. Scan QR eSIM dan langsung aktif saat mendarat.',
      brands: [
        { name: 'eSIM Asia & ASEAN', icon: '🌏', color: '#0284c7', sub: 'Singapore, Malaysia, Japan, Thailand' },
        { name: 'eSIM Europe & UK', icon: '🌍', color: '#4f46e5', sub: 'Netherlands, Belgium, Germany, France' },
        { name: 'eSIM Americas', icon: '🌎', color: '#059669', sub: 'USA, Canada, Mexico, Brazil' },
        { name: 'eSIM Middle East', icon: '🕌', color: '#eab308', sub: 'Saudi Arabia (Umroh/Haji), UAE' }
      ],
      features: [
        'Aktivasi cepat via QR Code dalam 5 menit',
        'Jaringan 4G/5G provider lokal terbaik di setiap negara',
        'Tersedia paket data unlimited dan kuota harian',
        'Hemat hingga 70% dibanding roaming konvensional'
      ]
    },
    {
      id: 'postpaid',
      name: 'Pascabayar & Pajak (PPOB)',
      icon: '📄',
      tag: 'Tagihan Rutin',
      badgeColor: '#059669',
      description: 'Layanan terlengkap untuk mengecek dan melunasi seluruh tagihan rutin bulanan rumah tangga dan instansi.',
      brands: [
        { name: 'PDAM Nusantara', icon: '💧', color: '#0284c7', sub: 'Seluruh PDAM Kota & Kab Indonesia' },
        { name: 'BPJS Kesehatan', icon: '🛡️', color: '#10b981', sub: 'Keluarga & Ketenagakerjaan' },
        { name: 'Telkom & IndiHome', icon: '☎️', color: '#e11d48', sub: 'Tagihan Telepon & Wi-Fi' },
        { name: 'Gas Negara (PGN)', icon: '🔥', color: '#ea580c', sub: 'Pelanggan PGN / PGAS' },
        { name: 'E-Samsat & PBB', icon: '🚗', color: '#6366f1', sub: 'Pajak Kendaraan & Bangunan' },
        { name: 'Internet & TV Kabel', icon: '📺', color: '#8b5cf6', sub: 'MNC Vision, First Media, MyRepublic' }
      ],
      features: [
        'Cek tagihan gratis sebelum pembayaran',
        'Cetak struk nota resmi dalam format PDF & Bluetooth printer',
        'Pengingat otomatis tanggal jatuh tempo',
        'Bukti pelunasan terdaftar valid di database instansi terkait'
      ]
    }
  ]

  const currentCategory = categories.find(c => c.id === activeTab) || categories[0]

  const corePillars = [
    {
      icon: '⚡',
      title: 'Auto-Routing 1-5 Detik',
      desc: 'Didukung server multi-cluster dengan failover otomatis ke jalur distributor alternatif jika jalur utama sibuk.'
    },
    {
      icon: '🛡️',
      title: 'Garansi 100% Saldo Aman',
      desc: 'Dilengkapi sistem auto-rekonsiliasi. Jika provider gangguan, dana Anda otomatis dikembalikan seketika tanpa ribet.'
    },
    {
      icon: '💰',
      title: 'Bebas Biaya Admin',
      desc: 'Gunakan Saldo Dompet Kancio untuk menikmati transaksi tanpa potongan admin tambahan pada produk pilihan.'
    },
    {
      icon: '🖨️',
      title: 'Cetak Struk & Nota Digital',
      desc: 'Atur margin keuntungan sendiri dan cetak struk profesional langsung via printer thermal Bluetooth atau bagikan PDF WhatsApp.'
    },
    {
      icon: '🔄',
      title: 'QRIS & Multi Virtual Account',
      desc: 'Top up saldo dan bayar instan melalui QRIS 24 Jam (GoPay/DANA/OVO/ShopeePay) dan Virtual Account BCA, Mandiri, BRI, BNI.'
    },
    {
      icon: '🧑‍💻',
      title: 'Layanan Bantuan Sigap',
      desc: 'Tim Customer Care siap mendampingi kebutuhan transaksi Anda setiap hari melalui live chat dan WhatsApp resmi.'
    }
  ]

  const faqs = [
    {
      q: 'Bagaimana cara mulai bertransaksi di Kancio PPOB / PulsaApp?',
      a: 'Anda dapat langsung membuka web app di https://ppob.kancio.com/ atau mengunduh aplikasi PulsaApp di Play Store. Masukkan nomor tujuan atau ID pelanggan, pilih denom yang diinginkan, dan selesaikan pembayaran via QRIS, Virtual Account, atau Saldo Dompet.'
    },
    {
      q: 'Berapa lama waktu yang dibutuhkan hingga pulsa atau kuota masuk?',
      a: 'Dalam kondisi normal, transaksi diproses otomatis oleh mesin server hanya dalam 1 hingga 5 detik setelah pembayaran terverifikasi.'
    },
    {
      q: 'Apakah saya bisa menggunakan PulsaApp untuk membuka usaha konter pulsa?',
      a: 'Sangat bisa! Anda mendapatkan harga distributor langsung (harga agen termurah) dan bebas menentukan harga jual sendiri saat mencetak struk nota digital kepada pelanggan.'
    },
    {
      q: 'Bagaimana jika terjadi kegagalan transaksi karena nomor salah atau provider gangguan?',
      a: 'Sistem kami memiliki auto-refund. Jika transaksi ditolak provider, saldo atau dana Anda dijamin 100% aman dan langsung dikembalikan secara otomatis ke Saldo Dompet Kancio.'
    },
    {
      q: 'Apakah bisa beli eSIM untuk kebutuhan perjalanan ke luar negeri?',
      a: 'Ya, kami menyediakan paket eSIM untuk 50+ negara tujuan (Eropa, Asia, Amerika, Timur Tengah/Umroh). Anda hanya perlu memindai QR Code eSIM yang dikirimkan untuk langsung terkoneksi internet tanpa ganti kartu fisik.'
    }
  ]

  // Simulator helper
  const getSimPrice = () => {
    let fee = 0
    if (simPayment === 'qris') fee = 300
    if (simPayment === 'va') fee = 1000
    return simDenom + fee
  }

  return (
    <div className="product-page pulsaapp-page">
      <Header />

      {/* Hero Section */}
      <section className="pulsaapp-hero">
        <div className="pulsaapp-hero__bg" />
        <div className="container">
          <div className="pulsaapp-hero__content">
            <div className="pulsaapp-hero__eyebrow">
              <span className="pulsa-pill-badge">⚡ Kancio PPOB & PulsaApp</span>
              <span className="pulsa-pill-tag">Platform Transaksi Digital 24 Jam</span>
            </div>
            <h1 className="pulsaapp-hero__title">
              Solusi Pulsa, Paket Data <br />
              <span className="pulsa-gradient-text">& Tagihan PPOB Termurah</span>
            </h1>
            <p className="pulsaapp-hero__desc">
              Nikmati kemudahan isi pulsa semua operator, kuota internet murah, token listrik PLN 24 jam,
              top up voucher game, eSIM roaming global, hingga pembayaran PDAM & BPJS dengan proses otomatis 1-5 detik.
            </p>

            {/* Quick Stats Grid */}
            <div className="pulsa-hero-stats">
              <div className="pulsa-stat-box">
                <span className="pulsa-stat-icon">⚡</span>
                <span className="pulsa-stat-num">1-5 Detik</span>
                <span className="pulsa-stat-lbl">Proses Instan</span>
              </div>
              <div className="pulsa-stat-box">
                <span className="pulsa-stat-icon">🏷️</span>
                <span className="pulsa-stat-num">Grosir</span>
                <span className="pulsa-stat-lbl">Harga Agen</span>
              </div>
              <div className="pulsa-stat-box">
                <span className="pulsa-stat-icon">🌐</span>
                <span className="pulsa-stat-num">50+ Negara</span>
                <span className="pulsa-stat-lbl">eSIM Global</span>
              </div>
              <div className="pulsa-stat-box">
                <span className="pulsa-stat-icon">🛡️</span>
                <span className="pulsa-stat-num">100% Aman</span>
                <span className="pulsa-stat-lbl">Auto-Refund</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pulsa-hero-actions">
              <a
                href="https://ppob.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pulsa-web"
              >
                <span>Buka Web App PPOB</span>
                <span>🚀</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pulsa-primary"
              >
                <span>Download Play Store</span>
                <span>📱</span>
              </a>
              <a href="#katalog-produk" className="btn-pulsa-outline">
                <span>Lihat Katalog</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* Hero Terminal Card */}
          <div className="pulsa-hero-visual">
            <div className="pulsa-terminal-card">
              <div className="pulsa-terminal-header">
                <div className="pulsa-brand-badge">
                  <span className="live-dot" />
                  <span>Kancio PPOB Terminal</span>
                </div>
                <span className="pulsa-server-status">Server Online 24/7</span>
              </div>

              <div className="pulsa-terminal-grid">
                <div className="pulsa-quick-item">
                  <span className="pulsa-quick-icon">📱</span>
                  <div>
                    <span className="pulsa-quick-title">Pulsa & Data</span>
                    <span className="pulsa-quick-sub">Semua Operator</span>
                  </div>
                </div>
                <div className="pulsa-quick-item">
                  <span className="pulsa-quick-icon">⚡</span>
                  <div>
                    <span className="pulsa-quick-title">Token PLN</span>
                    <span className="pulsa-quick-sub">24 Jam Nonstop</span>
                  </div>
                </div>
                <div className="pulsa-quick-item">
                  <span className="pulsa-quick-icon">💳</span>
                  <div>
                    <span className="pulsa-quick-title">Dompet Digital</span>
                    <span className="pulsa-quick-sub">DANA, GoPay, OVO</span>
                  </div>
                </div>
                <div className="pulsa-quick-item">
                  <span className="pulsa-quick-icon">🎮</span>
                  <div>
                    <span className="pulsa-quick-title">Top-Up Game</span>
                    <span className="pulsa-quick-sub">MLBB, FF, PUBG</span>
                  </div>
                </div>
              </div>

              <div className="pulsa-terminal-balance">
                <div>
                  <div className="pulsa-bal-label">Metode Transaksi</div>
                  <div className="pulsa-bal-amount">QRIS & Dompet Kancio</div>
                </div>
                <span className="pulsa-bal-badge">Bebas Biaya Admin</span>
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

      {/* =========================================================
          Interactive Product Catalog Explorer
          ========================================================= */}
      <section id="katalog-produk" ref={sectionRef} className="pulsa-catalog-section">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-pill-badge" style={{ marginBottom: '12px' }}>Katalog Produk Lengkap</div>
            <h2>
              Semua Kebutuhan Digital <span className="pulsa-gradient-text">Dalam Satu Akses</span>
            </h2>
            <p>
              Tersedia ribuan produk digital prabayar dan pascabayar terhubung langsung ke server distributor utama.
            </p>
          </div>

          {/* Catalog Tab Navigation */}
          <div className="pulsa-catalog-nav">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`pulsa-cat-btn ${activeTab === cat.id ? 'pulsa-cat-btn--active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div className="pulsa-catalog-card">
            <div className="pulsa-catalog-header">
              <div className="pulsa-catalog-info">
                <h3>{currentCategory.icon} {currentCategory.name}</h3>
                <p>{currentCategory.description}</p>
              </div>
              <span className="pulsa-catalog-badge">
                {currentCategory.tag}
              </span>
            </div>

            {/* Brands Grid */}
            <div className="pulsa-brands-grid">
              {currentCategory.brands.map((b, idx) => (
                <div key={idx} className="pulsa-brand-card">
                  <div className="pulsa-brand-icon" style={{ background: `${b.color}15`, color: b.color }}>
                    {b.icon}
                  </div>
                  <div>
                    <span className="pulsa-brand-name">{b.name}</span>
                    <span className="pulsa-brand-sub">{b.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Checkpoints */}
            <div className="pulsa-features-list">
              {currentCategory.features.map((feat, idx) => (
                <div key={idx} className="pulsa-feat-item">
                  <span className="pulsa-feat-check">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Interactive Transaction Simulator Widget
          ========================================================= */}
      <section className="pulsa-simulator-section">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-pill-badge" style={{ marginBottom: '12px' }}>Simulasi Transaksi Real-Time</div>
            <h2>
              Uji Coba Kemudahan <span className="pulsa-gradient-text">Transaksi PulsaApp</span>
            </h2>
            <p>
              Simulasikan proses pengisian pulsa atau produk digital dan lihat rincian struk transaksi yang siap dicetak.
            </p>
          </div>

          <div className="pulsa-sim-container">
            {/* Form Side */}
            <div className="pulsa-sim-form-card">
              <div className="pulsa-form-group">
                <label className="pulsa-form-label">1. Pilih Jenis Layanan</label>
                <div className="pulsa-denom-grid">
                  <button
                    className={`pulsa-denom-pill ${simCategory === 'pulsa' ? 'pulsa-denom-pill--active' : ''}`}
                    onClick={() => { setSimCategory('pulsa'); setSimProvider('Telkomsel'); }}
                  >
                    📱 Pulsa / Data
                  </button>
                  <button
                    className={`pulsa-denom-pill ${simCategory === 'pln' ? 'pulsa-denom-pill--active' : ''}`}
                    onClick={() => { setSimCategory('pln'); setSimProvider('PLN Prabayar'); }}
                  >
                    ⚡ Token PLN
                  </button>
                  <button
                    className={`pulsa-denom-pill ${simCategory === 'emoney' ? 'pulsa-denom-pill--active' : ''}`}
                    onClick={() => { setSimCategory('emoney'); setSimProvider('DANA'); }}
                  >
                    💳 Dompet E-Money
                  </button>
                  <button
                    className={`pulsa-denom-pill ${simCategory === 'game' ? 'pulsa-denom-pill--active' : ''}`}
                    onClick={() => { setSimCategory('game'); setSimProvider('Mobile Legends'); }}
                  >
                    🎮 Top-Up Game
                  </button>
                </div>
              </div>

              <div className="pulsa-form-group">
                <label className="pulsa-form-label">2. Nomor Tujuan / ID Pelanggan</label>
                <input
                  type="text"
                  className="pulsa-form-input"
                  value={simTarget}
                  onChange={(e) => setSimTarget(e.target.value)}
                  placeholder="Contoh: 081234567890 atau 14234567890"
                />
              </div>

              <div className="pulsa-form-group">
                <label className="pulsa-form-label">3. Pilih Denominasi / Nominal</label>
                <div className="pulsa-denom-grid">
                  {[10000, 25000, 50000, 100000, 200000].map((d) => (
                    <button
                      key={d}
                      className={`pulsa-denom-pill ${simDenom === d ? 'pulsa-denom-pill--active' : ''}`}
                      onClick={() => setSimDenom(d)}
                    >
                      Rp {d.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pulsa-form-group">
                <label className="pulsa-form-label">4. Metode Pembayaran</label>
                <select
                  className="pulsa-form-select"
                  value={simPayment}
                  onChange={(e) => setSimPayment(e.target.value as any)}
                >
                  <option value="wallet">Saldo Dompet Kancio (Bebas Biaya Admin)</option>
                  <option value="qris">QRIS 24 Jam (GoPay, DANA, OVO, ShopeePay)</option>
                  <option value="va">Virtual Account Bank (BCA, Mandiri, BRI, BNI)</option>
                </select>
              </div>
            </div>

            {/* Simulated Receipt Preview */}
            <div className="pulsa-receipt-card">
              <div className="receipt-header">
                <div className="receipt-title">STRUK TRANSAKSI DIGITAL</div>
                <div className="receipt-sub">Kancio PPOB Indonesia — Transaksi ID #{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>

              <div className="receipt-row">
                <span>Layanan</span>
                <strong>{simProvider} ({simCategory.toUpperCase()})</strong>
              </div>
              <div className="receipt-row">
                <span>Tujuan</span>
                <strong>{simTarget || '081234567890'}</strong>
              </div>
              <div className="receipt-row">
                <span>Waktu Proses</span>
                <span>{new Date().toLocaleDateString('id-ID')} {new Date().toLocaleTimeString('id-ID')}</span>
              </div>
              <div className="receipt-row">
                <span>Nominal Produk</span>
                <span>Rp {simDenom.toLocaleString('id-ID')}</span>
              </div>
              <div className="receipt-row">
                <span>Biaya Admin</span>
                <span>{simPayment === 'wallet' ? 'Rp 0 (GRATIS)' : (simPayment === 'qris' ? 'Rp 300' : 'Rp 1.000')}</span>
              </div>
              <div className="receipt-row receipt-row-total">
                <span>Total Bayar</span>
                <strong style={{ color: '#0284c7' }}>Rp {getSimPrice().toLocaleString('id-ID')}</strong>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span className="receipt-success-badge">
                  <span>✓</span> Transaksi Terverifikasi Otomatis (1-5 Detik)
                </span>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a
                  href="https://ppob.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pulsa-web"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Beli Sekarang di ppob.kancio.com →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6 Core Pillars Section
          ========================================================= */}
      <section className="section" style={{ background: 'rgba(2, 132, 199, 0.03)' }}>
        <div className="container">
          <div className="section-header">
            <div className="pulsa-pill-badge" style={{ marginBottom: '12px' }}>Keunggulan Utama</div>
            <h2>
              Mengapa Jutaan Transaksi <span className="pulsa-gradient-text">Memilih PulsaApp?</span>
            </h2>
            <p>
              Infrastruktur teknologi handal yang dirancang untuk kecepatan, keamanan, dan kepuasan pelanggan.
            </p>
          </div>

          <div className="features-grid">
            {corePillars.map((p, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
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

      {/* =========================================================
          FAQ Section
          ========================================================= */}
      <section className="pulsa-faq-section">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-pill-badge" style={{ marginBottom: '12px' }}>Tanya Jawab</div>
            <h2>
              Pertanyaan yang <span className="pulsa-gradient-text">Sering Diajukan</span>
            </h2>
            <p>
              Segala hal yang perlu Anda ketahui mengenai transaksi di Kancio PPOB dan PulsaApp.
            </p>
          </div>

          <div className="pulsa-faq-accordion">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className={`pulsa-faq-item ${isOpen ? 'pulsa-faq-item--open' : ''}`}>
                  <button
                    className="pulsa-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{f.q}</span>
                    <span className="pulsa-faq-chevron">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="pulsa-faq-answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="apotek-cta-banner">
            <div
              className="apotek-cta-banner__bg"
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #e6007e 100%)' }}
            />
            <div className="apotek-cta-banner__content">
              <div className="badge badge--accent">Mulai Sekarang</div>
              <h2>Mulai Bertransaksi Digital Lebih Murah</h2>
              <p>
                Akses web app Kancio PPOB langsung dari browser Anda atau pasang aplikasi PulsaApp di smartphone Anda.
                Transaksi cepat, harga distributor langsung, dan garansi aman 100%.
              </p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://ppob.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                  style={{ background: '#ffffff', color: '#0284c7' }}
                >
                  Buka Web App PPOB <span className="btn__icon">→</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--large"
                >
                  Download di Play Store
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