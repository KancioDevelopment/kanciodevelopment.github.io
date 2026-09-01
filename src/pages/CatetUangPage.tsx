import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import './ProductPage.css'

interface TransactionItem {
  id: string
  title: string
  category: string
  amount: number
  type: 'income' | 'expense'
  icon: string
}

const features = [
  {
    icon: '💼',
    title: 'Buku Kas Multi-Usaha & Pribadi',
    badge: 'Core Ledger',
    badgeColor: 'emerald',
    description:
      'Pisahkan keuangan pribadi, toko kelontong, online shop, atau proyek freelance dalam satu aplikasi tanpa tercampur baur.',
    details: ['Unlimited Buku Kas Terpisah', 'Kategori Kustom & Tag', 'Multi-Rekening & E-Wallet', 'Export Laporan Excel / PDF'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    icon: '📊',
    title: 'Analisis Arus Kas & Tren Otomatis',
    badge: 'AI Analytics',
    badgeColor: 'blue',
    description:
      'Grafik interaktif visual yang memetakan pola pengeluaran terbesar, tren laba bersih bulanan, dan proyeksi sisa saldo akhir bulan.',
    details: ['Grafik Donut Kategori', 'Proyeksi Runway Keuangan', 'Laporan Laba/Rugi Bulanan', 'Deteksi Pengeluaran Bocor Halus'],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  {
    icon: '🧾',
    title: 'Scan Struk & Nota Otomatis (OCR)',
    badge: 'Smart Scanner',
    badgeColor: 'purple',
    description:
      'Cukup foto nota belanja atau struk kasir, sistem secara cerdas membaca nominal, tanggal, dan nama toko secara otomatis.',
    details: ['Optical Character Recognition', 'Auto-Kategori Pengeluaran', 'Arsip Digital Foto Nota', 'Pencarian Riwayat Cepat'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  {
    icon: '🤝',
    title: 'Buku Hutang & Piutang Terjadwal',
    badge: 'Cash Flow Safe',
    badgeColor: 'amber',
    description:
      'Catat pinjaman atau piutang pelanggan lengkap dengan tanggal jatuh tempo dan tombol kirim invoice pengingat via WhatsApp.',
    details: ['Tracking Jatuh Tempo Otomatis', 'Pengingat WhatsApp 1-Klik', 'Riwayat Cicilan Parsial', 'Laporan Piutang Macet'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    icon: '🎯',
    title: 'Target Tabungan & Budget Envelopes',
    badge: 'Goal Tracking',
    badgeColor: 'cyan',
    description:
      'Tentukan batas anggaran per kategori belanja dan pantau progres pencapaian tabungan impian dengan visual bar interaktif.',
    details: ['Alokasi Budget 50/30/20', 'Visual Progress Bar Tabungan', 'Peringatan Over-Budget Live', 'Kunci Dana Darurat'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  },
  {
    icon: '☁️',
    title: 'Backup Cloud Enkripsi 256-Bit',
    badge: 'Privacy Safe',
    badgeColor: 'emerald',
    description:
      'Data keuangan Anda aman, tersinkronisasi otomatis di semua perangkat (Android, Web & iOS) dengan standar privasi perbankan.',
    details: ['Enkripsi End-to-End', 'Bisa Digunakan Offline', 'Sinkronisasi Multi-Device', 'Biometric Lock (Fingerprint/PIN)'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
  },
]

const pricingPlans = [
  {
    name: 'Free Personal',
    tagline: 'Ideal untuk pencatatan keuangan harian pribadi & mahasiswa',
    monthlyPrice: 0,
    annualPrice: 0,
    badge: 'Gratis Selamanya',
    popular: false,
    features: [
      '1 Buku Kas Pribadi',
      'Pencatatan Pemasukan & Pengeluaran',
      'Grafik Analisis Dasar',
      'Target Tabungan (Hingga 3 Goals)',
      'Backup Lokal & Offline Mode',
    ],
    notIncluded: ['Buku Kas Multi-Usaha', 'Scan Struk OCR Otomatis', 'Kirim Pengingat Hutang WA', 'Export PDF Laporan Bisnis'],
  },
  {
    name: 'Pro UMKM & Freelance',
    tagline: 'Solusi lengkap untuk pebisnis online, toko, & profesional',
    monthlyPrice: 49000,
    annualPrice: 39000,
    badge: '⭐ Paling Populer',
    popular: true,
    features: [
      'Semua fitur Free Personal',
      'Unlimited Buku Kas Multi-Usaha',
      'Scan Struk / Nota OCR Tanpa Batas',
      'Buku Hutang & Notifikasi WhatsApp',
      'Laporan Keuangan Laba/Rugi & Neraca',
      'Export PDF, Excel & CSV Siap Pajak',
      'Sinkronisasi Cloud Real-time',
    ],
    notIncluded: ['Multi-User Kasir / Tim'],
  },
  {
    name: 'Business Multi-User',
    tagline: 'Untuk tim bisnis kecil dengan multi-admin atau staf kasir',
    monthlyPrice: 129000,
    annualPrice: 99000,
    badge: 'Solusi Tim',
    popular: false,
    features: [
      'Semua fitur Pro UMKM',
      'Hingga 5 Akses Staf / Partner dengan Hak Akses',
      'Audit Trail Riwayat Pengubahan Data',
      'Analisis Margin Profit Per Produk / Jasa',
      'Custom Header Logo Perusahaan di Laporan PDF',
      'Priority Support WhatsApp 24/7',
    ],
    notIncluded: [],
  },
]

const initialTransactions: TransactionItem[] = [
  { id: '1', title: 'Penjualan Toko Online', category: 'Omzet Usaha', amount: 3500000, type: 'income', icon: '🛍️' },
  { id: '2', title: 'Jasa Desain Freelance', category: 'Project', amount: 1800000, type: 'income', icon: '💻' },
  { id: '3', title: 'Restock Barang & Bahan', category: 'HPP Usaha', amount: 1450000, type: 'expense', icon: '📦' },
  { id: '4', title: 'Sewa Tempat & Listrik', category: 'Operasional', amount: 750000, type: 'expense', icon: '💡' },
  { id: '5', title: 'Alokasi Tabungan Bisnis', category: 'Investasi', amount: 1000000, type: 'expense', icon: '🏦' },
]

const faqs = [
  {
    question: 'Apakah CatetUang bisa digunakan tanpa koneksi internet (offline)?',
    answer:
      'Bisa! CatetUang mendukung offline-first architecture. Anda dapat mencatat transaksi kapan saja dan data akan tersinkronisasi otomatis ke cloud saat perangkat terhubung ke internet.',
  },
  {
    question: 'Bagaimana CatetUang membantu memisahkan uang pribadi dan usaha?',
    answer:
      'Anda dapat membuat multiple buku kas terpisah dalam satu akun (misal: "Dompet Pribadi", "Toko Sembako", "Freelance"). Saldo, mutasi, dan laporan laba/rugi masing-masing buku tidak akan saling bercampur.',
  },
  {
    question: 'Apakah data keuangan saya aman dan tidak disalahgunakan?',
    answer:
      'Sangat aman. Seluruh data keuangan dienkripsi dengan standar 256-bit enkripsi end-to-end. Kami memegang teguh privasi pengguna dan tidak pernah membagikan atau menjual data keuangan Anda kepada pihak ketiga.',
  },
  {
    question: 'Bagaimana cara kerja fitur pengingat hutang via WhatsApp?',
    answer:
      'Saat mencatat piutang dengan nomor WhatsApp pelanggan, Anda dapat menekan satu tombol "Kirim Pengingat" untuk membuat template pesan pengingat tagihan ramah dan profesional yang langsung terbuka di WhatsApp.',
  },
]

const CatetUangPage: React.FC = () => {
  const { userConsent } = useAds()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAnnual, setIsAnnual] = useState(true)
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions)
  const [newTitle, setNewTitle] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newType, setNewType] = useState<'income' | 'expense'>('income')
  const [newCategory, setNewCategory] = useState('Penjualan')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Lead capture form
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    businessType: 'Toko Online / Retail',
    planInterest: 'Pro UMKM & Freelance',
    notes: '',
  })
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  // Calculations for live simulator
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const netCashflow = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((netCashflow / totalIncome) * 100)) : 0

  // Calculate Health Score
  const healthScore = Math.min(100, Math.max(20, Math.round(50 + savingsRate * 0.5)))

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseFloat(newAmount)
    if (!newTitle || isNaN(num) || num <= 0) return

    const newItem: TransactionItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      amount: num,
      type: newType,
      icon: newType === 'income' ? '💵' : '💸',
    }

    setTransactions([newItem, ...transactions])
    setNewTitle('')
    setNewAmount('')
  }

  const handleRemoveTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name || !leadForm.phone) return

    const waMsg = encodeURIComponent(
      `Halo Tim CatetUang SaaS,\n\nSaya tertarik dengan software manajemen keuangan CatetUang:\n- Nama: ${leadForm.name}\n- Jenis Usaha: ${leadForm.businessType}\n- Pilihan Paket: ${leadForm.planInterest}\n- No WhatsApp: ${leadForm.phone}\n- Catatan: ${leadForm.notes || 'Mohon panduan registrasi & promo.'}`
    )
    window.open(`https://wa.me/6285642007123?text=${waMsg}`, '_blank')
    setLeadSubmitted(true)
  }

  useSEO({
    title: 'Catet Uang SaaS - Software Keuangan UMKM, Pembukuan Kas & Arus Kas Bisnis',
    description:
      'Software aplikasi pencatat keuangan harian & pembukuan UMKM cerdas: multi-buku kas, scan struk OCR otomatis, buku hutang piutang WhatsApp, target budget, dan analisis arus kas komprehensif.',
    keywords:
      'catet uang, software keuangan umkm, aplikasi pembukuan toko, pencatat keuangan harian, laporan laba rugi otomatis, aplikasi kasir umkm, catet kas, catet uang saas',
    canonicalUrl: 'https://kancio.com/products/catetUang',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'Catet Uang',
          operatingSystem: 'Web Browser, Android, iOS',
          applicationCategory: 'FinanceApplication',
          url: 'https://kancio.com/products/catetUang',
          description: 'Aplikasi Pencatat Keuangan & Pembukuan Kas UMKM Cerdas',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'IDR',
            lowPrice: '0',
            highPrice: '99000',
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
    <div className={`product-page catetuang-page ${isDarkMode ? 'catetuang-theme-dark' : 'catetuang-theme-light'}`}>
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="catetuang-hero">
        <div className="catetuang-bg-glow" />
        <div className="catetuang-grid-pattern" />

        <div className="container">
          <div className="catetuang-hero__content">
            <div className="catetuang-eyebrow">
              <span className="catetuang-badge-pulse">
                <span className="pulse-emerald" /> SMART FINANCIAL ERP 2.0
              </span>
              <span className="catetuang-tag-pill">💰 Pencatat Keuangan &amp; Arus Kas Bisnis</span>
              
              {/* Adaptive Theme Toggle Button */}
              <button
                className="theme-switch-btn"
                onClick={() => setIsDarkMode(!isDarkMode)}
                title={`Ganti ke ${isDarkMode ? 'Mode Terang' : 'Mode Gelap'}`}
              >
                {isDarkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
              </button>
            </div>

            <h1 className="catetuang-hero__title">
              Kelola Keuangan &amp; Arus Kas <br />
              <span className="text-gradient-emerald">Dengan Cerdas, Rapi &amp; Otomatis</span>
            </h1>

            <p className="catetuang-hero__desc">
              Tinggalkan pembukuan manual yang membingungkan. CatetUang menyatukan pencatatan kas multi-usaha, scan struk otomatis, buku piutang WhatsApp, dan analisis laba rugi real-time dalam satu aplikasi modern.
            </p>

            <div className="catetuang-hero__stats glass-card">
              <div className="stat-item">
                <span className="stat-icon">📈</span>
                <strong>Rp 2,4 M+</strong>
                <span>Arus Kas Tercatat</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⚡</span>
                <strong>&lt; 3 Detik</strong>
                <span>Input Cepat Transaksi</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🛡️</span>
                <strong>100% Aman</strong>
                <span>Enkripsi Cloud 256-Bit</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📱</span>
                <strong>Multi-Platform</strong>
                <span>Android, Web &amp; iOS</span>
              </div>
            </div>

            <div className="catetuang-hero__cta">
              <a
                href="https://play.google.com/store/apps/details?id=com.kancio.cashflow"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary catetuang-btn-primary"
              >
                📲 Download Gratis di Play Store <span className="btn__icon">→</span>
              </a>
              <a href="#simulator" className="btn btn--secondary catetuang-btn-secondary">
                🧪 Coba Live Simulator Kas
              </a>
              <a href="#pricing" className="btn btn--outline catetuang-btn-outline">
                Lihat Paket SaaS
              </a>
            </div>
          </div>

          {/* Hero Visual Live Financial Card */}
          <div className="catetuang-hero__visual">
            <div className="catetuang-mockup-frame glass-card">
              <div className="mockup-top-bar">
                <div className="window-dots">
                  <span className="w-dot dot-red" />
                  <span className="w-dot dot-yellow" />
                  <span className="w-dot dot-green" />
                </div>
                <span className="mockup-title-text">CatetUang Dashboard — Buku Toko &amp; Usaha</span>
                <span className="live-status-tag">● Live Sync</span>
              </div>

              <div className="mockup-main-body">
                <div className="balance-overview-card">
                  <span className="balance-label">Total Saldo Bersih Saat Ini</span>
                  <div className="balance-amount">
                    Rp {netCashflow.toLocaleString('id-ID')}
                  </div>
                  <div className="balance-meta">
                    <span className="income-badge">▲ Masuk: Rp {totalIncome.toLocaleString('id-ID')}</span>
                    <span className="expense-badge">▼ Keluar: Rp {totalExpense.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="mini-insights-row">
                  <div className="insight-chip">
                    <span className="chip-label">Financial Health</span>
                    <strong className="text-emerald">{healthScore}/100 (Sangat Sehat)</strong>
                  </div>
                  <div className="insight-chip">
                    <span className="chip-label">Savings Rate</span>
                    <strong className="text-cyan">{savingsRate}% dari Omzet</strong>
                  </div>
                </div>

                <div className="recent-trx-list">
                  <span className="list-heading">Mutasi Terakhir Hari Ini:</span>
                  {transactions.slice(0, 3).map((t) => (
                    <div key={t.id} className="trx-row-mini">
                      <span className="trx-icon">{t.icon}</span>
                      <div className="trx-details">
                        <strong>{t.title}</strong>
                        <span>{t.category}</span>
                      </div>
                      <span className={`trx-amount ${t.type === 'income' ? 'text-emerald' : 'text-rose'}`}>
                        {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
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
          adFormat="horizontal"
          variant="minimal"
          adLabel="Advertisement"
          showLoadingAnimation={true}
          className="product-page-ad"
        />
      </div>

      {/* ===== INTERACTIVE LIVE CASHFLOW & PROFIT SIMULATOR ===== */}
      <section className="section catetuang-simulator-section" id="simulator">
        <div className="container">
          <div className="section-header">
            <div className="catetuang-badge-pulse">Live Interactive Simulator</div>
            <h2>
              Uji Coba Simulator Arus Kas <br />
              <span className="text-gradient-emerald">Rasakan Mudahnya Pembukuan Otomatis</span>
            </h2>
            <p>
              Masukkan transaksi contoh atau hapus item di bawah untuk melihat kalkulasi saldo bersih, rasio tabungan, dan skor kesehatan finansial secara real-time.
            </p>
          </div>

          <div className="simulator-box glass-card">
            <div className="simulator-grid">
              {/* Left Column: Form & Add New Entry */}
              <div className="sim-control-panel">
                <h3 className="sim-panel-title">➕ Tambah Transaksi Percobaan</h3>
                <form onSubmit={handleAddTransaction} className="sim-form">
                  <div className="form-group">
                    <label>Deskripsi Transaksi</label>
                    <input
                      type="text"
                      placeholder="Misal: Penjualan Produk A / Beli Kertas"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Jenis Transaksi</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as 'income' | 'expense')}
                      >
                        <option value="income">🟢 Pemasukan (+)</option>
                        <option value="expense">🔴 Pengeluaran (-)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Kategori</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      >
                        {newType === 'income' ? (
                          <>
                            <option value="Penjualan Toko">Penjualan Toko</option>
                            <option value="Jasa / Service">Jasa / Service</option>
                            <option value="Gaji / Honor">Gaji / Honor</option>
                            <option value="Dividen / Investasi">Dividen / Investasi</option>
                          </>
                        ) : (
                          <>
                            <option value="HPP / Kulakan">HPP / Kulakan</option>
                            <option value="Operasional">Operasional</option>
                            <option value="Gaji Karyawan">Gaji Karyawan</option>
                            <option value="Pemasaran & Iklan">Pemasaran &amp; Iklan</option>
                            <option value="Kebutuhan Pribadi">Kebutuhan Pribadi</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nominal Transaksi (Rp)</label>
                    <input
                      type="number"
                      placeholder="Contoh: 500000"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn--primary catetuang-btn-primary btn-block">
                    ⚡ Tambah ke Simulasi Kas
                  </button>
                </form>

                {/* Score & Insights Card */}
                <div className="sim-health-card">
                  <div className="health-score-gauge">
                    <span className="gauge-val">{healthScore}</span>
                    <span className="gauge-label">/ 100</span>
                  </div>
                  <div className="health-info">
                    <strong>Skor Kesehatan Arus Kas</strong>
                    <p>
                      {healthScore >= 75
                        ? '🔥 Arus kas sangat sehat! Margin operasional aman untuk ekspansi usaha.'
                        : healthScore >= 50
                        ? '⚠️ Cukup seimbang. Disarankan menekan pos biaya operasional tidak wajib.'
                        : '🚨 Peringatan defisit! Pengeluaran melebihi pemasukan bulan ini.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Table & Summary */}
              <div className="sim-display-panel">
                <div className="sim-summary-cards">
                  <div className="sum-card sum-card--income">
                    <span className="sum-label">Total Pemasukan</span>
                    <strong className="text-emerald">Rp {totalIncome.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="sum-card sum-card--expense">
                    <span className="sum-label">Total Pengeluaran</span>
                    <strong className="text-rose">Rp {totalExpense.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="sum-card sum-card--net">
                    <span className="sum-label">Sisa Saldo Kas Bersih</span>
                    <strong className={netCashflow >= 0 ? 'text-emerald' : 'text-rose'}>
                      Rp {netCashflow.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>

                <div className="trx-table-box">
                  <div className="trx-table-header">
                    <span>Daftar Transaksi Simulasi ({transactions.length})</span>
                    <button
                      className="reset-btn"
                      onClick={() => setTransactions(initialTransactions)}
                    >
                      🔄 Reset Data Awal
                    </button>
                  </div>

                  <div className="trx-items-scroll">
                    {transactions.map((t) => (
                      <div key={t.id} className="trx-item-row animate-fade-in">
                        <span className="item-icon">{t.icon}</span>
                        <div className="item-main">
                          <strong>{t.title}</strong>
                          <span className="item-cat">{t.category}</span>
                        </div>
                        <span
                          className={`item-amount ${t.type === 'income' ? 'text-emerald' : 'text-rose'}`}
                        >
                          {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                        </span>
                        <button
                          className="delete-item-btn"
                          title="Hapus Transaksi"
                          onClick={() => handleRemoveTransaction(t.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6 CORE FEATURE MODULES ===== */}
      <section className="section catetuang-features-section" id="fitur">
        <div className="container">
          <div className="section-header">
            <div className="catetuang-badge-pulse">Fitur Unggulan CatetUang</div>
            <h2>
              Semua Kebutuhan Pembukuan,{' '}
              <span className="text-gradient-emerald">Dalam Satu Aplikasi Cerdas</span>
            </h2>
            <p>
              Dirancang khusus untuk kenyamanan pemilik usaha UMKM, freelancer, dan pencatat keuangan harian keluarga.
            </p>
          </div>

          <div className="catetuang-features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card-modern glass-card">
                <div className="feature-top">
                  <div className="feature-icon-box" style={{ background: f.gradient }}>
                    {f.icon}
                  </div>
                  <span className={`feat-badge feat-badge--${f.badgeColor}`}>{f.badge}</span>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.description}</p>
                <ul className="feature-bullets">
                  {f.details.map((d, idx) => (
                    <li key={idx}>
                      <span className="bullet-check">✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SAAS PRICING TIERS SECTION ===== */}
      <section className="section catetuang-pricing-section" id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="catetuang-badge-pulse">Paket Harga Ramah UMKM</div>
            <h2>
              Pilih Paket Sesuai <span className="text-gradient-emerald">Kebutuhan Usaha Anda</span>
            </h2>
            <p>Mulai gratis sekarang dan upgrade kapan saja bisnis Anda berkembang semakin besar.</p>

            {/* Monthly / Annual Toggle */}
            <div className="pricing-toggle-box glass-card">
              <span className={`toggle-lbl ${!isAnnual ? 'toggle-lbl--active' : ''}`}>
                Bulanan
              </span>
              <button
                className={`switch-toggle ${isAnnual ? 'switch-toggle--annual' : ''}`}
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Toggle Billing Frequency"
              >
                <span className="switch-thumb" />
              </button>
              <span className={`toggle-lbl ${isAnnual ? 'toggle-lbl--active' : ''}`}>
                Tahunan <span className="savings-badge">Hemat 20%</span>
              </span>
            </div>
          </div>

          <div className="pricing-cards-grid">
            {pricingPlans.map((plan, i) => {
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice
              return (
                <div
                  key={i}
                  className={`pricing-box glass-card ${plan.popular ? 'pricing-box--popular' : ''}`}
                >
                  {plan.popular && <div className="popular-ribbon">{plan.badge}</div>}

                  <div className="pricing-box__head">
                    <h3 className="plan-title">{plan.name}</h3>
                    <p className="plan-sub">{plan.tagline}</p>
                  </div>

                  <div className="pricing-box__price">
                    <span className="cur">Rp</span>
                    <strong className="amt">{currentPrice.toLocaleString('id-ID')}</strong>
                    <span className="per">/ bulan</span>
                  </div>

                  {isAnnual && currentPrice > 0 && (
                    <span className="annual-note">
                      Ditagih tahunan (Rp {(currentPrice * 12).toLocaleString('id-ID')}/thn)
                    </span>
                  )}

                  <div className="pricing-box__cta">
                    <a
                      href="#lead-form"
                      onClick={() =>
                        setLeadForm((prev) => ({ ...prev, planInterest: plan.name }))
                      }
                      className={`btn btn--large btn-block ${plan.popular ? 'catetuang-btn-primary' : 'catetuang-btn-secondary'}`}
                    >
                      {currentPrice === 0 ? 'Mulai Gratis Sekarang' : `Pilih ${plan.name}`}
                    </a>
                  </div>

                  <div className="pricing-box__features">
                    <span className="list-title">Fitur Utama:</span>
                    <ul className="plan-feat-list">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="feat-line feat-line--yes">
                          <span className="icon-check">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feat, idx) => (
                        <li key={idx} className="feat-line feat-line--no">
                          <span className="icon-cross">✕</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== LEAD CAPTURE & ONBOARDING FORM ===== */}
      <section className="section catetuang-lead-section" id="lead-form">
        <div className="container">
          <div className="lead-card glass-card">
            <div className="lead-grid">
              <div className="lead-intro">
                <div className="catetuang-badge-pulse">🚀 Konsultasi Gratis</div>
                <h2>Siap Rencanakan Pembukuan Bisnis Anda?</h2>
                <p>
                  Konsultasikan kebutuhan pencatatan keuangan dan pembukuan toko Anda bersama tim spesialis CatetUang. Kami siap membantu setup awal akun hingga siap digunakan.
                </p>

                <div className="lead-benefits">
                  <div className="benefit-row">
                    <span className="b-icon">💡</span>
                    <div>
                      <strong>Bimbingan Setup Kategori &amp; Kas</strong>
                      <span>Disesuaikan dengan jenis bisnis retail, jasa, atau online shop.</span>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <span className="b-icon">📱</span>
                    <div>
                      <strong>Demo Live Fitur Pro &amp; Multi-User</strong>
                      <span>Coba seluruh fitur premium tanpa komitmen awal.</span>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <span className="b-icon">💬</span>
                    <div>
                      <strong>Dukungan Langsung WhatsApp</strong>
                      <span>Terhubung langsung ke tim teknis support Kancio.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lead-form-wrap">
                {leadSubmitted ? (
                  <div className="lead-success-card animate-fade-in">
                    <div className="success-emoji">🎉</div>
                    <h3>Permintaan Terkirim!</h3>
                    <p>
                      Terima kasih! Kami telah mengarahkan Anda ke WhatsApp tim CatetUang. Kami akan segera membantu setup dan demo fitur terbaik untuk bisnis Anda.
                    </p>
                    <button
                      className="btn btn--secondary catetuang-btn-secondary"
                      onClick={() => setLeadSubmitted(false)}
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="lead-form-inner">
                    <h3 className="form-head">Formulir Pendaftaran &amp; Demo</h3>

                    <div className="form-group">
                      <label>Nama Pemilik / Pengelola Usaha</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Nomor WhatsApp Aktif</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 0812-3456-7890"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Jenis Usaha</label>
                        <select
                          value={leadForm.businessType}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, businessType: e.target.value })
                          }
                        >
                          <option value="Toko Online / Retail">Toko Online / Retail</option>
                          <option value="Jasa & Freelance">Jasa &amp; Freelance</option>
                          <option value="Kuliner / Kafe / Resto">Kuliner / Kafe / Resto</option>
                          <option value="Keuangan Pribadi">Keuangan Pribadi</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Paket Diminati</label>
                        <select
                          value={leadForm.planInterest}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, planInterest: e.target.value })
                          }
                        >
                          <option value="Free Personal">Free Personal (Rp 0)</option>
                          <option value="Pro UMKM & Freelance">Pro UMKM (Rp 39rb/bln)</option>
                          <option value="Business Multi-User">Business Multi-User (Rp 99rb/bln)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Catatan Tambahan (Opsional)</label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Ingin tahu cara export laporan PDF bulanan..."
                        value={leadForm.notes}
                        onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary catetuang-btn-primary btn-block"
                    >
                      ⚡ Hubungkan ke WhatsApp &amp; Mulai Demo
                    </button>
                    <span className="privacy-text">🔒 Data Anda terlindungi dan tidak akan disebarluaskan.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section catetuang-faq-section">
        <div className="container">
          <div className="section-header">
            <div className="catetuang-badge-pulse">Tanya Jawab</div>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <p>Jawaban lengkap seputar fitur, privasi, dan paket CatetUang.</p>
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

      <Footer />
    </div>
  )
}

export default CatetUangPage