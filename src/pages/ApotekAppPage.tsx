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

const automations = [
  {
    icon: '⏱️',
    title: 'Absensi Otomatis',
    schedule: 'Setiap Jam',
    category: 'SDM',
    description: 'Karyawan yang lupa mencatat waktu pulang kerja akan otomatis dicatat keluar (check-out) secara adil setelah 7 jam kerja oleh sistem.',
    impact: 'Mencegah data absensi tidak valid & menggantung secara 100% otomatis.',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    icon: '📦',
    title: 'Pemesanan Stok Otomatis',
    schedule: 'Setiap Jam',
    category: 'Inventori',
    description: 'Memantau tingkat stok secara live. Menghasilkan draft Purchase Order (PO) otomatis saat stok obat vital mendekati batas minimum.',
    impact: 'Menjaga persediaan tetap aman tanpa harus melakukan pengecekan gudang secara manual.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: '💰',
    title: 'Penggajian Otomatis',
    schedule: 'Bulanan (Tgl 21)',
    category: 'Keuangan',
    description: 'Mengkalkulasi seluruh komponen gaji karyawan, termasuk bonus tiering penjualan staf, potongan terlambat, dan cicilan hutang secara otomatis.',
    impact: 'Proses payroll sekali klik persetujuan oleh manager, menghemat waktu administrasi bulanan.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    icon: '📱',
    title: 'Pengingat Tagihan Pasien',
    schedule: 'Harian (09:00 WIB)',
    category: 'Piutang',
    description: 'Memantau jatuh tempo tempo pembayaran pasien. Membuat log pengingat pembayaran pada hari ke-7, 14, dan 30 secara mandiri.',
    impact: 'Meningkatkan kelancaran cash flow & meminimalisir risiko piutang macet terabaikan.',
    gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
  },
  {
    icon: '📈',
    title: 'Klasifikasi ABC Terlaris',
    schedule: 'Mingguan (Senin)',
    category: 'Analitik',
    description: 'Menganalisis volume transaksi mingguan untuk mengelompokkan obat ke kelas A (terlaris), B, dan C secara matematis.',
    impact: 'Membantu manager mengambil keputusan restock produk bernilai tinggi secara presisi.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
  {
    icon: '📅',
    title: 'Jadwal Shift Mingguan',
    schedule: 'Mingguan (Minggu)',
    category: 'SDM',
    description: 'Menyusun slot kosong secara otomatis berdasarkan ketersediaan staf dan mengunci jadwal sebelum hari Senin dimulai.',
    impact: 'Distribusi shift kerja staf yang adil, merata, dan terjadwal otomatis di latar belakang.',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
  },
  {
    icon: '🔍',
    title: 'Deteksi HPP Anomali',
    schedule: 'Harian (03:00 WIB)',
    category: 'Keamanan',
    description: 'Memindai database HPP setiap dini hari untuk mendeteksi ketidakwajaran harga beli, markup supplier nakal, dan ketidakcocokan konversi satuan.',
    impact: 'Melindungi margin profit apotek secara proaktif saat Anda tertidur.',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    icon: '🧹',
    title: 'Pembersihan Data Otomatis',
    schedule: 'Harian & Bulanan',
    category: 'Database',
    description: 'Konsolidasi batch stok duplikat secara cerdas, menonaktifkan master item usang, dan membersihkan rekam data kosong di sistem.',
    impact: 'Menjaga kinerja database ERP tetap kencang dan akurasi stok tetap 99.9%.',
    gradient: 'linear-gradient(135deg, #64748b, #475569)',
  },
]

const roles = [
  {
    role: 'owner',
    title: 'Pimpinan & Pemilik Apotek',
    icon: '👑',
    tagline: 'Manajemen & Pemantauan',
    benefits: [
      'Akses laporan bisnis & laba rugi real-time di ujung jari tanpa perlu meminta laporan manual dari admin.',
      'Mendapatkan notifikasi instan HPP Anomali jika terdeteksi supplier menaikkan harga secara tidak wajar.',
      'Sistem payroll bulanan terhitung otomatis, siap bayar hanya dengan persetujuan akhir sekali klik.',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    role: 'staff',
    title: 'Staf Apoteker & Kasir',
    icon: '🧑‍⚕️',
    tagline: 'Kemudahan Kerja Harian',
    benefits: [
      'Pencatatan absensi yang transparan dengan fitur auto-checkout jika lupa checkout saat pulang.',
      'Kalkulasi komisi bonus tiering (Bronze → Diamond) yang adil dan dapat dipantau langsung di dashboard.',
      'Jadwal shift mingguan terbit otomatis dan rapi, meminimalisir konflik jam kerja antar staf.',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
  {
    role: 'warehouse',
    title: 'Staf Gudang & Logistik',
    icon: '📦',
    tagline: 'Logistik & Persediaan',
    benefits: [
      'Mendapatkan notifikasi persediaan kritis sebelum obat benar-benar habis di rak penyimpanan.',
      'Draft Purchase Order (PO) terisi otomatis ke supplier resmi terpilih untuk disetujui manager.',
      'Batch stok terkelola rapi dengan otomasi FEFO/FIFO, bebas dari penumpukan obat kedaluwarsa.',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
]

const faqs = [
  {
    question: 'Apakah saya perlu melakukan sesuatu agar fitur otomatis ini berjalan?',
    answer: 'Tidak. Seluruh 18+ otomatisasi berjalan 24/7 di latar belakang server cloud ApotekApp. Pengguna hanya perlu melakukan tindakan bernilai tinggi seperti konfirmasi akhir draft PO atau persetujuan penggajian bulanan.',
  },
  {
    question: 'Apakah sistem bisa salah mengambil keputusan pembelian?',
    answer: 'Sistem dirancang dengan keamanan berlapis. Untuk tindakan krusial (seperti kirim PO atau transfer uang), sistem TIDAK melakukannya langsung, melainkan menyiapkannya dalam bentuk DRAFT untuk ditinjau dan disetujui terlebih dahulu oleh Manager.',
  },
  {
    question: 'Di mana saya bisa melihat hasil kerja sistem otomatisasi ini?',
    answer: 'Seluruh log aktivitas otomatisasi tercatat sangat transparan di panel admin. Anda bisa melihat riwayat draft PO yang dibuat, log komisi staf, deteksi anomali HPP, dan log perapian database kapan saja.',
  },
  {
    question: 'Apakah semua cabang apotek mendapatkan fitur otomatisasi yang sama?',
    answer: 'Ya. Sistem multi-cabang kami mendukung otomatisasi di setiap cabang secara independen. Data stok, shift staf, dan profitabilitas cabang diisolasi dengan aman demi kerahasiaan bisnis Anda.',
  },
  {
    question: 'Bagaimana HPP Intelligence mendeteksi kecurangan supplier?',
    answer: 'Sistem secara berkala membandingkan harga beli obat saat ini dengan riwayat pembelian sebelumnya serta master referensi harga pasar. Jika terdeteksi kenaikan harga di luar batas wajar (anomali markup), sistem langsung menandai transaksi tersebut untuk ditinjau.',
  },
]

const ApotekAppPage: React.FC = () => {
  const { userConsent } = useAds()
  const [activeModule, setActiveModule] = useState(0)
  const [visible, setVisible] = useState(false)
  const [activeDocTab, setActiveDocTab] = useState<'automation' | 'role' | 'faq'>('automation')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
  const sectionRef = useRef<HTMLElement>(null)
  const docSectionRef = useRef<HTMLElement>(null)
  const [docVisible, setDocVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDocVisible(true) },
      { threshold: 0.05 }
    )
    if (docSectionRef.current) observer.observe(docSectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.title = 'ApotekApp: Software Apotek Terbaik & Aplikasi Kasir Apotek | Kancio';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Aplikasi kasir apotek terbaik & sistem inventori ERP apotek multi-cabang dengan kecerdasan AI HPP Intelligence, pengelolaan FEFO/FIFO, serta sinkronisasi data BPJS.');
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
                href="#dokumentasi-otomatisasi"
                className="btn btn--secondary btn--large"
              >
                Dokumentasi Fitur
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
              {modules[activeModule].title === 'BPJS Kapitasi' && (
                <div style={{ marginTop: '24px' }}>
                  <Link 
                    to="/products/apotekapp/bpjs-guide" 
                    className="btn btn-primary" 
                    style={{ 
                      padding: '10px 20px', 
                      fontSize: '0.9rem',
                      background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                      boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)'
                    }}
                  >
                    📖 Buka Panduan BPJS &raquo;
                  </Link>
                </div>
              )}
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

      {/* ===== INTERACTIVE DOCUMENTATION SECTION ===== */}
      <section
        ref={docSectionRef}
        className={`section apotek-docs-section ${docVisible ? 'apotek-docs-section--visible' : ''}`}
        id="dokumentasi-otomatisasi"
      >
        <div className="container">
          <div className="section-header">
            <div className="badge">Dokumentasi & Otomatisasi</div>
            <h2>
              Sistem Cerdas Bekerja <span className="text-gradient">24/7 Tanpa Henti</span>
            </h2>
            <p>
              Pelajari bagaimana ApotekApp memangkas intervensi manual dengan mengotomatisasi
              18+ proses operasional harian di latar belakang apotek Anda.
            </p>
          </div>

          {/* Doc Tabs */}
          <div className="apotek-docs-tabs glass-panel">
            <button
              className={`apotek-docs-tab ${activeDocTab === 'automation' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('automation')}
            >
              <span className="tab-icon">⏱️</span> 8 Otomatisasi Latar Belakang
            </button>
            <button
              className={`apotek-docs-tab ${activeDocTab === 'role' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('role')}
            >
              <span className="tab-icon">👥</span> Alur Kerja Peran
            </button>
            <button
              className={`apotek-docs-tab ${activeDocTab === 'faq' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('faq')}
            >
              <span className="tab-icon">❓</span> FAQ Otomatisasi
            </button>
          </div>

          {/* Doc Content Area */}
          <div className="apotek-docs-content">
            {activeDocTab === 'automation' && (
              <div className="apotek-auto-grid">
                {automations.map((auto, i) => (
                  <div
                    key={i}
                    className="apotek-auto-card glass-panel"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="apotek-auto-card__top">
                      <div className="apotek-auto-card__icon" style={{ background: auto.gradient }}>
                        {auto.icon}
                      </div>
                      <div className="apotek-auto-card__badges">
                        <span className="auto-badge auto-badge--schedule">{auto.schedule}</span>
                        <span className="auto-badge auto-badge--category">{auto.category}</span>
                      </div>
                    </div>
                    <h3 className="apotek-auto-card__title">{auto.title}</h3>
                    <p className="apotek-auto-card__desc">{auto.description}</p>
                    <div className="apotek-auto-card__impact">
                      <span className="impact-label">🔑 Dampak Utama:</span>
                      <p className="impact-text">{auto.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeDocTab === 'role' && (
              <div className="apotek-roles-grid">
                {roles.map((r, i) => (
                  <div
                    key={i}
                    className="apotek-role-card glass-panel"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="apotek-role-card__header">
                      <div className="apotek-role-card__icon" style={{ background: r.gradient }}>
                        {r.icon}
                      </div>
                      <div>
                        <h3 className="apotek-role-card__title">{r.title}</h3>
                        <span className="apotek-role-card__tagline">{r.tagline}</span>
                      </div>
                    </div>
                    <ul className="apotek-role-card__benefits">
                      {r.benefits.map((b, idx) => (
                        <li key={idx} className="role-benefit-item">
                          <span className="check-icon">✓</span>
                          <span className="benefit-text">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeDocTab === 'faq' && (
              <div className="apotek-faq-accordion">
                {faqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i
                  return (
                    <div
                      key={i}
                      className={`apotek-faq-item glass-panel ${isOpen ? 'apotek-faq-item--open' : ''}`}
                    >
                      <button
                        className="apotek-faq-question"
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      >
                        <span className="faq-q-text">{faq.question}</span>
                        <span className="faq-chevron">{isOpen ? '−' : '+'}</span>
                      </button>
                      <div className="apotek-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
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