import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import { useTheme } from '../contexts/ThemeContext'
import './ProductPage.css'
import './ApotekAppPage.css'

const modules = [
  {
    id: 'hpp-ai',
    title: 'AI-Powered HPP Intelligence',
    badge: 'Keunggulan Eksklusif',
    badgeColor: 'indigo',
    description:
      'Satu-satunya sistem ERP Apotek di Indonesia yang secara otomatis mendeteksi anomali Harga Pokok Pembelian (HPP) dan markup supplier sebelum disetujui.',
    features: [
      'Deteksi markup berlebih & lonjakan harga beli secara real-time',
      'Audit otomatis perbandingan harga lintas supplier & distributor',
      'Manager Intelligence Dashboard untuk verifikasi draft transaksi',
      'Melindungi margin laba bersih rata-rata Rp 12,4jt+ per periode',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    cyberColor: '#8b5cf6',
  },
  {
    id: 'pos-fefo',
    title: 'Kasir POS & Alokasi FEFO/FIFO',
    badge: 'Inti Operasional',
    badgeColor: 'green',
    description:
      'Point of Sale super cepat yang otomatis mengalokasikan batch obat berdasarkan tanggal kedaluwarsa terdekat (FEFO - First Expired First Out) untuk meminimalisir obat expired.',
    features: [
      'Pencarian obat instan via nama generik, merk & barcode scanner',
      'Otomasi alokasi batch stok FEFO / FIFO akurat tanpa salah ambil',
      'Mode Resep Dokter, Racikan Kompound & Obat Bebas (OTC)',
      'Fungsi multi-kasir, Hold & Recall transaksi tanpa antre',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
    cyberColor: '#10b981',
  },
  {
    id: 'bpjs-prb',
    title: 'BPJS Kapitasi & PRB (Kronis)',
    badge: 'Layanan Faskes',
    badgeColor: 'teal',
    description:
      'Modul terintegrasi khusus untuk memproses resep BPJS Kapitasi FKTP dan BPJS PRB (Program Rujuk Balik / Chronic Disease) secara presisi tanpa selisih klaim.',
    features: [
      'Resep BPJS Kapitasi & PRB terintegrasi langsung',
      'Pencocokan nama pintar (Spelling-Tolerant Matching)',
      'Auto-Discount & Proteksi Target Nilai Klaim Faskes',
      'Sinkronisasi CSV settlement & arsip resep digital otomatis',
    ],
    gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
    cyberColor: '#06b6d4',
  },
  {
    id: 'racikan',
    title: 'Terminal Resep & Komisi Dokter',
    badge: 'Klinis & Kemitraan',
    badgeColor: 'pink',
    description:
      'Kelola resep racikan puyer, kapsul, salep, sirup dengan kalkulasi tuslah & embalase otomatis, serta buku besar komisi dokter mitra yang transparan.',
    features: [
      'Kalkulator dosis & konversi sediaan racikan otomatis',
      'Pencatatan tuslah, embalase, dan jasa apoteker rapi',
      'Buku besar dan laporan komisi dokter mitra terperinci',
      'Riwayat resep pasien terpusat untuk monitoring interaksi obat',
    ],
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
    cyberColor: '#ec4899',
  },
  {
    id: 'defecta',
    title: 'Defecta & Surat Pesanan (SP) ke PBF',
    badge: 'Pengadaan Cerdas',
    badgeColor: 'blue',
    description:
      'Otomasi buku defecta dengan Reorder Point (ROP). Hasilkan draft Surat Pesanan (SP) reguler, prekursor, dan OOT terpisah ke berbagai distributor PBF resmi.',
    features: [
      'Auto-generate defecta saat stok menyentuh minimum safety stock',
      'Multi-split SP sesuai izin edar & kategori PBF resmi',
      'Pelacakan status PO (Draft → Terkirim → Faktur Masuk)',
      'Pencegahan stockout obat vital dan fast-moving',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    cyberColor: '#3b82f6',
  },
  {
    id: 'opname',
    title: 'Stock Opname & Deteksi Shrinkage',
    badge: 'Audit & Keamanan',
    badgeColor: 'yellow',
    description:
      'Sistem audit fisik stock opname cepat per rak dengan deteksi dini kehilangan barang (shrinkage) dan pelunasan otomatis hutang stok minus (debt netting).',
    features: [
      'Stock opname parsial atau total tanpa perlu menutup apotek',
      'Peringatan instan anomali selisih fisik vs sistem (shrinkage)',
      'Kartu stok ledger real-time dengan moving average HPP',
      'Penyatuan batch fisik identik untuk konsistensi database',
    ],
    gradient: 'linear-gradient(135deg, #eab308, #f97316)',
    cyberColor: '#eab308',
  },
  {
    id: 'omnichannel',
    title: 'Reservasi Obat Online (Click & Collect)',
    badge: 'Omnichannel Pasien',
    badgeColor: 'indigo',
    description:
      'Katalog obat publik terhubung ke apotek mitra. Pasien dapat mencari ketersediaan stok, memesan obat atau upload foto resep, dan mengambil di kasir tanpa antre.',
    features: [
      'Katalog indikasi klinis & status stok apotek mitra real-time',
      'Upload foto resep dokter & validasi oleh apoteker',
      'Soft-reserve stok otomatis & kode booking instan via WhatsApp',
      'Pengambilan cepat (Click & Collect) di outlet apotek terdekat',
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    cyberColor: '#8b5cf6',
  },
  {
    id: 'hr-payroll',
    title: 'Presensi GPS & KPI Staf Apotek',
    badge: 'SDM & Payroll',
    badgeColor: 'green',
    description:
      'Manajemen presensi berbasis geofencing GPS, penjadwalan shift tim otomatis, dan perhitungan komisi Balanced Scorecard (Bronze → Diamond) yang adil.',
    features: [
      'Presensi GPS Geofencing dengan auto-checkout 7 jam',
      'Jadwal shift mingguan otomatis & drag-and-drop shift swap',
      'Kalkulasi payroll bulanan 2 tahap siap persetujuan manager',
      'Papan peringkat (Leaderboard) produktivitas tim apotek',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    cyberColor: '#10b981',
  },
]

const clickCollectSteps = [
  {
    step: '01',
    title: 'Pilih Apotek Mitra',
    desc: 'Buka direktori cabang apotek mitra resmi terdekat di kota Anda.',
  },
  {
    step: '02',
    title: 'Cari Obat & Cek Stok',
    desc: 'Ketik nama obat atau kategori klinis dengan status ketersediaan live.',
  },
  {
    step: '03',
    title: 'Pilih Satuan & Jumlah',
    desc: 'Tentukan satuan sediaan (strip, botol, tube, tablet) ke keranjang.',
  },
  {
    step: '04',
    title: 'Upload Resep Dokter',
    desc: 'Lampirkan foto resep dokter untuk obat etiket keras / daftar G.',
  },
  {
    step: '05',
    title: 'Kode Booking WhatsApp',
    desc: 'Sistem soft-reserve stok dan kirim notifikasi ringkasan instan ke WA.',
  },
  {
    step: '06',
    title: 'Ambil Tanpa Antre',
    desc: 'Tunjukkan kode booking ke kasir apotek dan bawa pulang obat Anda.',
  },
]

const stats = [
  { number: '20+', label: 'Modul ERP Farmasi' },
  { number: '99.9%', label: 'Akurasi Stok FEFO' },
  { number: 'Rp 12,4jt+', label: 'Profit Rata-rata Terlindungi' },
  { number: '0 Antrean', label: 'Click & Collect Ready' },
]

const whyChoose = [
  {
    title: 'AI HPP Intelligence',
    desc: 'Audit real-time harga beli obat vs historis invoice. Sistem otomatis menandai anomali markup distributor.',
  },
  {
    title: 'BPJS Kapitasi & PRB Lengkap',
    desc: 'Resep obat kronis dan klaim faskes dengan spelling-tolerant matching dan ekspor CSV siap audit.',
  },
  {
    title: 'Omnichannel Click & Collect',
    desc: 'Katalog online publik dan booking WhatsApp terintegrasi yang mendatangkan omzet digital baru.',
  },
  {
    title: 'Defecta & Multi-Split SP',
    desc: 'Auto-reorder obat saat menyentuh ROP dan pisahkan draft SP reguler, prekursor, dan OOT ke distributor resmi.',
  },
  {
    title: 'GPS Geofencing & Payroll Otomatis',
    desc: 'Presensi presisi staf apotek, auto-checkout 7 jam, dan kalkulasi komisi Balanced Scorecard sekali klik.',
  },
  {
    title: 'Performa Cloud Real-Time',
    desc: 'Akses dari perangkat apa pun (Laptop kasir, Tablet, Smartphone) tanpa instalasi server lokal yang rumit.',
  },
]

const automations = [
  {
    title: 'Absensi Geofencing GPS',
    schedule: 'Setiap Jam',
    category: 'SDM & Shift',
    description: 'Karyawan yang lupa checkout dicatat keluar secara adil setelah 7 jam kerja untuk menjaga integritas data absensi.',
    impact: 'Mencegah data absensi menggantung & transparansi jam lembur 100% terjaga.',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    title: 'Pemesanan Stok (Defecta ROP)',
    schedule: 'Setiap Jam',
    category: 'Inventori',
    description: 'Memantau stok live dan menghasilkan draft Surat Pesanan (SP) otomatis saat obat menyentuh reorder point.',
    impact: 'Stok obat fast-moving selalu aman tanpa perlu cek fisik rak secara manual.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    title: 'Penggajian Otomatis (Payroll)',
    schedule: 'Bulanan (Tgl 21)',
    category: 'Keuangan',
    description: 'Mengkalkulasi gaji pokok, bonus Balanced Scorecard (BPJS, Umum), potongan pro-rata, dan keterlambatan.',
    impact: 'Proses payroll selesai dalam 1 klik persetujuan pemilik tanpa salah hitung.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    title: 'Pengingat Piutang & Tempo',
    schedule: 'Harian (09:00 WIB)',
    category: 'Piutang',
    description: 'Memantau tempo pembayaran tagihan pasien/faskes pada interval 7, 14, dan 30 hari secara terjadwal.',
    impact: 'Arus kas apotek lebih lancar dan risiko piutang macet berkurang signifikan.',
    gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
  },
  {
    title: 'Klasifikasi ABC / Pareto',
    schedule: 'Mingguan (Senin)',
    category: 'Analitik',
    description: 'Menganalisis perputaran produk untuk mengelompokkan obat Kelas A (terlaris), B, dan C secara matematis.',
    impact: 'Modal restock dialokasikan tepat sasaran pada obat dengan profit & perputaran tertinggi.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
  {
    title: 'Deteksi HPP Anomali Dini Hari',
    schedule: 'Harian (03:00 WIB)',
    category: 'Keamanan Laba',
    description: 'Scanning database faktur masuk untuk mendeteksi kenaikan harga sepihak sebelum transaksi disahkan.',
    impact: 'Melindungi margin profit bisnis apotek secara proaktif 24/7.',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    title: 'Debt Netting & Merge Batch',
    schedule: 'Harian & Bulanan',
    category: 'Database ERP',
    description: 'Melunasi hutang stok minus (debt netting) dan menyatukan duplikasi batch fisik identik secara berkala.',
    impact: 'Database tetap ramping, kecepatan kasir tetap kilat, dan audit stok 99.9% presisi.',
    gradient: 'linear-gradient(135deg, #64748b, #475569)',
  },
  {
    title: 'Jadwal Shift & Swap Mandiri',
    schedule: 'Mingguan',
    category: 'SDM',
    description: 'Memfasilitasi tukar jadwal shift antar staf secara mandiri dengan verifikasi otomatis ketersediaan tim.',
    impact: 'Operasional outlet tetap terisi tanpa kekosongan jadwal jaga kasir/apoteker.',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
  },
]

const roles = [
  {
    role: 'owner',
    title: 'Pimpinan & Pemilik Apotek',
    tagline: 'Kontrol Penuh & Proteksi Margin',
    benefits: [
      'Dashboard Laba Rugi real-time & laporan neraca tanpa perlu menunggu rekapan manual staf.',
      'Notifikasi seketika jika ada anomali lonjakan HPP obat dari distributor.',
      'Sistem Penggajian & Bonus Balanced Scorecard staf terhitung otomatis siap approval.',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    role: 'staff',
    title: 'Staf Apoteker & Kasir POS',
    tagline: 'Pelayanan Cepat & Akurat',
    benefits: [
      'Barcode POS cepat dengan alokasi otomatis batch FEFO (First Expired First Out).',
      'Terminal Resep racikan puyer/kapsul dengan kalkulasi tuslah & embalase otomatis.',
      'Presensi GPS Geofencing transparan dan pemantauan reward bonus tiering pribadi.',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
  {
    role: 'warehouse',
    title: 'Staf Gudang & Pengadaan',
    tagline: 'Manajemen Stok & SP PBF',
    benefits: [
      'Buku Defecta otomatis berdasarkan Reorder Point (ROP) minimum safety stock.',
      'Draft Surat Pesanan (SP) ter-generate terpisah untuk izin edar reguler, prekursor & OOT.',
      'Stock opname parsial cepat per rak dengan deteksi selisih shrinkage seketika.',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
]



const faqs = [
  {
    question: 'Apa keunggulan utama ApotekApp dibanding software apotek konvensional?',
    answer:
      'ApotekApp adalah SaaS ERP Farmasi cloud-native modern yang menggabungkan seluruh siklus farmasi dalam satu platform: Kasir POS FEFO otomatis, Deteksi Anomali HPP oleh AI, Rekonsiliasi Resep BPJS Kapitasi & PRB kronis, Defecta multi-PBF, Presensi GPS staf, hingga Toko Online Click & Collect untuk pasien tanpa biaya server tambahan.',
  },
  {
    question: 'Bagaimana cara kerja AI HPP Intelligence melindungi profit apotek?',
    answer:
      'Sistem secara otomatis membandingkan harga beli obat pada faktur masuk terhadap riwayat transaksi sebelumnya, rata-rata pasar, dan kesepakatan distributor. Jika terdeteksi markup berlebih atau lonjakan harga sepihak, sistem langsung memberi peringatan kepada manager sebelum faktur disetujui.',
  },
  {
    question: 'Apakah ApotekApp mendukung penuh transaksi resep BPJS Kesehatan?',
    answer:
      'Ya! ApotekApp mendukung modul BPJS Kapitasi untuk FKTP dan BPJS PRB (Program Rujuk Balik) untuk obat penyakit kronis. Dilengkapi spelling-tolerant search, proteksi batas target klaim, serta ekspor format CSV settlement siap verifikasi BPJS.',
  },
  {
    question: 'Apakah pasien bisa memesan obat secara online?',
    answer:
      'Bisa. ApotekApp menyediakan katalog indikasi klinis publik yang terhubung live ke stok apotek Anda. Pasien dapat mencari obat, mengunggah foto resep dokter, dan menerima kode booking WhatsApp untuk diambil langsung di kasir (Click & Collect) tanpa antre.',
  },
  {
    question: 'Apakah saya perlu membeli komputer server khusus di apotek?',
    answer:
      'Tidak perlu! ApotekApp berjalan 100% di cloud. Anda cukup menggunakan laptop kasir biasa, tablet, komputer kasir yang sudah ada, atau bahkan smartphone dengan koneksi internet. Data tersimpan aman dan terbackup otomatis.',
  },
  {
    question: 'Bagaimana cara memulai dan migrasi data stok apotek lama kami?',
    answer:
      'Anda dapat langsung mencoba Live Demo di https://apotek.kancio.com/ atau mengisi formulir konsultasi demo di halaman ini. Tim support kami siap mendampingi proses import data master obat, batch stok awal, dan training staf kasir hingga siap operasional.',
  },
]

const ApotekAppPage: React.FC = () => {
  const { userConsent } = useAds()
  const [activeModule, setActiveModule] = useState(0)
  const [visible, setVisible] = useState(false)
  const [activeDocTab, setActiveDocTab] = useState<'automation' | 'role' | 'faq'>('automation')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isAnnual, setIsAnnual] = useState(true)

  // Dark / Light Theme Toggle State
  const { isDarkMode, toggleTheme } = useTheme()

  // Contact / Lead Form State
  const [formState, setFormState] = useState({
    name: '',
    pharmacyName: '',
    branchCount: '1 Cabang',
    interestFocus: 'Full ERP & Kasir POS FEFO',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const docSectionRef = useRef<HTMLElement>(null)
  const [docVisible, setDocVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDocVisible(true)
      },
      { threshold: 0.05 }
    )
    if (docSectionRef.current) observer.observe(docSectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.pharmacyName) return

    const waMsg = encodeURIComponent(
      `Halo Tim ApotekApp Kancio,\n\nSaya ingin konsultasi & demo ApotekApp ERP untuk apotek saya:\n- Nama: ${formState.name}\n- Apotek / Klinik: ${formState.pharmacyName}\n- Jumlah Cabang: ${formState.branchCount}\n- Kebutuhan Utama: ${formState.interestFocus}\n- Catatan: ${formState.message || 'Mohon info jadwal demo & setup awal.'}\n\nMohon pendampingan migrasi data dan demo sistem.`
    )
    window.open(`https://wa.me/6282325600996?text=${waMsg}`, '_blank')
    setFormSubmitted(true)
  }

  useSEO({
    title: 'ApotekApp SaaS - Software ERP Apotek Terbaik, POS FEFO & BPJS PRB',
    description:
      'SaaS ERP Farmasi #1 di Indonesia: Kasir POS FEFO otomatis, deteksi HPP anomali AI, rekonsiliasi BPJS Kapitasi & PRB kronis, defecta multi-PBF, serta reservasi online Click & Collect.',
    keywords:
      'aplikasi apotek, software apotek terbaik, aplikasi kasir apotek, saas apotek, software erp farmasi, stok obat fefo, rekonsiliasi bpjs apotek, bpjs prb, apotekapp, kancio development',
    canonicalUrl: 'https://kancio.com/products/apotekapp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'ApotekApp',
          operatingSystem: 'Web Browser, Android, iOS, Windows, macOS',
          applicationCategory: 'BusinessApplication',
          url: 'https://apotek.kancio.com',
          description: 'Software ERP Apotek Terbaik & Aplikasi Kasir Apotek Terlengkap di Indonesia',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'IDR',
            lowPrice: '199000',
            highPrice: '999000',
            offerCount: '3',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Kancio Development',
            url: 'https://kancio.com',
          },
        },
        {
          '@type': 'HowTo',
          name: 'Cara Melakukan Reservasi Obat Online (Click & Collect) di ApotekApp',
          description:
            'Panduan 6 langkah mudah mereservasi obat di apotek mitra resmi ApotekApp untuk diambil langsung tanpa antre.',
          step: clickCollectSteps.map((s, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: s.title,
            text: s.desc,
          })),
        },
      ],
    },
  })

  return (
    <div className={`product-page apotek-page cyber-saas-theme ${isDarkMode ? 'apotek-theme-dark' : 'apotek-theme-light'}`}>
      {/* Floating / Sticky Theme Switcher */}
      <div className="apotek-theme-toggle-bar">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
        </button>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="apotek-hero cyber-hero" id="overview">
        <div className="cyber-glow-bg" />
        <div className="cyber-grid-overlay" />

        <div className="container">
          <div className="apotek-hero__content">
            <div className="apotek-hero__eyebrow">
              <span className="cyber-pulse-badge">
                <span className="pulse-dot" /> LIVE CLOUD ERP V3.4
              </span>
              <span className="apotek-hero__tag cyber-tag-glow">#1 SaaS Farmasi Modern</span>
            </div>

            <h1 className="apotek-hero__title">
              Software ERP Apotek Modern <br />
              <span className="text-gradient cyber-gradient-text">POS FEFO, BPJS &amp; AI Intelligence</span>
            </h1>

            <p className="apotek-hero__desc">
              Tingkatkan profit apotek dan efisiensi operasional tanpa batas. Otomatisasi alokasi stok FEFO terdekat, audit markup HPP dengan AI, integrasi resep BPJS Kapitasi &amp; PRB, serta hadirkan toko online Click &amp; Collect dalam hitungan menit.
            </p>

            <div className="apotek-hero__stats cyber-glass-stats">
              {stats.map((s, i) => (
                <div key={i} className="apotek-hero__stat">
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
                className="btn btn--primary btn--large cyber-btn-primary"
              >
                Pelajari Lebih Lanjut di Web App ApotekApp <span className="btn__icon">↗</span>
              </a>
              <a href="#lead-form" className="btn btn--secondary btn--large cyber-btn-secondary">
                Konsultasi &amp; Demo Gratis
              </a>
            </div>

            <div className="cyber-trust-badges">
              <span className="trust-item">Cloud Backup 24/7</span>
              <span className="trust-item">Setup Cepat &lt; 15 Menit</span>
              <span className="trust-item">Standar Kemenkes &amp; BPJS</span>
            </div>
          </div>

          {/* Hero Visual Interactive Mockup */}
          <div className="apotek-hero__visual">
            <div className="cyber-mockup-frame glass-panel">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <a
                  href="https://apotek.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-url-bar"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  title="Pelajari lebih lanjut & buka portal https://apotek.kancio.com/"
                >
                  <span className="mockup-protocol">https://</span>apotek.kancio.com/
                </a>
                <div className="mockup-status-pill">
                  <span className="live-indicator" /> Online
                </div>
              </div>

              <div className="mockup-body">
                {/* Top Quick Status Bar */}
                <div className="mockup-stat-row">
                  <div className="mockup-stat-mini">
                    <span className="label">Omzet Hari Ini</span>
                    <strong className="val text-green">Rp 8.450.000</strong>
                    <span className="sub">▲ 14% vs kemarin</span>
                  </div>
                  <div className="mockup-stat-mini">
                    <span className="label">Alokasi Stok FEFO</span>
                    <strong className="val text-cyan">99.9% Presisi</strong>
                    <span className="sub">Batch terdekat dialokasikan</span>
                  </div>
                  <div className="mockup-stat-mini">
                    <span className="label">AI HPP Shield</span>
                    <strong className="val text-pink">1 Anomali Ditahan</strong>
                    <span className="sub">Markup supplier Rp 450rb</span>
                  </div>
                </div>

                {/* Simulated POS Live Stream */}
                <div className="mockup-stream-card">
                  <div className="stream-header">
                    <span className="stream-title">Kasir POS — Live Transaction #TRX-9481</span>
                    <span className="stream-badge">FEFO AUTO-ASSIGNED</span>
                  </div>
                  <div className="stream-item">
                    <div className="item-info">
                      <strong>Amoxicillin 500mg (Strip)</strong>
                      <span>Batch: B-20260901 • Exp: Okt 2027</span>
                    </div>
                    <span className="item-qty">3 Strip</span>
                    <span className="item-price">Rp 45.000</span>
                  </div>
                  <div className="stream-item">
                    <div className="item-info">
                      <strong>Paracetamol 500mg Tablet</strong>
                      <span>Batch: B-20260812 • Exp: Nov 2027</span>
                    </div>
                    <span className="item-qty">2 Strip</span>
                    <span className="item-price">Rp 16.000</span>
                  </div>
                  <div className="stream-footer">
                    <span>Total Transaksi: <strong>Rp 61.000</strong></span>
                    <span className="status-success">✓ Struk Dicetak Instan</span>
                  </div>
                </div>

                {/* Live Action Ticker */}
                <div className="mockup-live-ticker">
                  <div className="ticker-badge"><span className="pulse-dot" /> Live Sync</div>
                  <div className="ticker-content">
                    <span>Resep BPJS PRB #PRB-108 terverifikasi otomatis</span>
                    <span className="ticker-time">12 dtk lalu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STICKY IN-PAGE NAVIGATION BAR ===== */}
      <nav className="apotek-inpage-nav" aria-label="Navigasi Halaman ApotekApp">
        <div className="container apotek-inpage-nav__inner">
          <a href="#overview" className="inpage-nav-pill">Ringkasan</a>
          <a href="#modul-lengkap" className="inpage-nav-pill">8 Modul ERP</a>
          <a href="#keunggulan" className="inpage-nav-pill">Keunggulan</a>
          <a href="#reservasi-online" className="inpage-nav-pill">Click &amp; Collect</a>
          <a href="#dokumentasi-otomatisasi" className="inpage-nav-pill">Otomatisasi 24/7</a>
          <a href="#lead-form" className="inpage-nav-pill">Konsultasi &amp; Demo</a>
        </div>
      </nav>

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


      {/* ===== 8 INTEGRATED MODULES SHOWCASE ===== */}
      <section
        ref={sectionRef}
        className={`section apotek-modules ${visible ? 'apotek-modules--visible' : ''}`}
        id="modul-lengkap"
      >
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-badge">8 Modul ERP Farmasi Terpadu</div>
            <h2>
              Semua Fitur Farmasi,{' '}
              <span className="text-gradient cyber-gradient-text">Dalam Satu Ekosistem Terpadu</span>
            </h2>
            <p>
              Dari kasir POS harian, alur resep BPJS, manajemen defecta ke PBF distributor, hingga reservasi online pasien — ApotekApp mengelola seluruh siklus operasional tanpa ribet.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="apotek-modules__tabs">
            {modules.map((m, i) => (
              <button
                key={i}
                className={`apotek-module-tab ${activeModule === i ? 'apotek-module-tab--active' : ''}`}
                onClick={() => setActiveModule(i)}
                aria-label={`Buka modul ${m.title}`}
              >
                <span className="apotek-module-tab__name">{m.title}</span>
              </button>
            ))}
          </div>

          {/* Active Module Full Spotlight */}
          <div className="apotek-module-detail card glass-panel cyber-spotlight-card">
            <div className="apotek-module-detail__left">
              <div className="apotek-module-detail__header">
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

              <div className="module-action-guides">
                {modules[activeModule].title.includes('Presensi') || modules[activeModule].title.includes('Staff') ? (
                  <Link
                    to="/products/apotekapp/presensi-guide"
                    className="btn btn-primary cyber-btn-primary"
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                    }}
                  >
                    Buka Panduan Lengkap Presensi &raquo;
                  </Link>
                ) : null}
                {modules[activeModule].title.includes('BPJS') ? (
                  <Link
                    to="/products/apotekapp/bpjs-guide"
                    className="btn btn-primary cyber-btn-primary"
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                    }}
                  >
                    Buka Panduan Lengkap BPJS &raquo;
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="apotek-module-detail__right">
              <div className="apotek-module-preview glass-panel">
                <div
                  className="apotek-module-preview__header"
                  style={{ background: modules[activeModule].gradient }}
                >
                  <span>ApotekApp — {modules[activeModule].title}</span>
                </div>
                <div className="apotek-module-preview__body">
                  {modules[activeModule].features.map((f, i) => (
                    <div key={i} className="apotek-preview-row">
                      <span className="apotek-check">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                  <div className="preview-status-pill">
                    <span className="live-dot" /> Terintegrasi Cloud &amp; Mobile Ready
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="apotek-modules-grid">
            {modules.map((mod, i) => (
              <div
                key={i}
                className={`apotek-mod-card card glass-panel ${activeModule === i ? 'apotek-mod-card--active' : ''}`}
                onClick={() => setActiveModule(i)}
                style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
              >
                <div className="apotek-mod-card__top">
                  <span className={`apotek-badge apotek-badge--${mod.badgeColor}`}>{mod.badge}</span>
                  <span className="apotek-mod-card__index">0{i + 1}</span>
                </div>
                <h4 className="apotek-mod-card__name">{mod.title}</h4>
                <p className="apotek-mod-card__desc">{mod.description.split('.')[0]}.</p>
                <span className="card-link-text">Pelajari Fitur →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE & ADVANTAGES ===== */}
      <section className="section cyber-why-section" id="keunggulan" style={{ background: 'rgba(99,102,241,0.02)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-badge">Keunggulan Arsitektur</div>
            <h2>
              Mengapa Apotek Terkemuka <span className="text-gradient cyber-gradient-text">Memilih ApotekApp?</span>
            </h2>
          </div>
          <div className="apotek-why-grid">
            {whyChoose.map((w, i) => (
              <div key={i} className="apotek-why-card card glass-panel">
                <div className="apotek-why-card__num">0{i + 1}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLICK & COLLECT HOW-TO SECTION ===== */}
      <section id="reservasi-online" className="apotek-click-collect-section">
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-badge">Click &amp; Collect Omnichannel</div>
            <h2>
              Cara Reservasi Obat Online <span className="text-gradient cyber-gradient-text">Tanpa Perlu Antre</span>
            </h2>
            <p>
              Pelajari 6 langkah mudah bagaimana pasien dapat mencari obat di apotek mitra resmi dan mengambilnya langsung di kasir.
            </p>
          </div>

          <div className="click-collect-grid">
            {clickCollectSteps.map((s, idx) => (
              <div key={idx} className="cc-step-card glass-panel">
                <span className="cc-step-num">{s.step}</span>
                <h3 className="cc-step-title">{s.title}</h3>
                <p className="cc-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 24/7 BACKGROUND AUTOMATIONS & WORKFLOWS ===== */}
      <section
        ref={docSectionRef}
        className={`section apotek-docs-section ${docVisible ? 'apotek-docs-section--visible' : ''}`}
        id="dokumentasi-otomatisasi"
      >
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-badge">Dokumentasi &amp; Otomatisasi 24/7</div>
            <h2>
              Sistem Cerdas Bekerja <span className="text-gradient cyber-gradient-text">Di Latar Belakang</span>
            </h2>
            <p>
              Pelajari bagaimana ApotekApp memangkas intervensi manual dengan mengotomatisasi 18+ proses operasional harian apotek Anda.
            </p>
          </div>

          {/* Doc Tabs */}
          <div className="apotek-docs-tabs glass-panel">
            <button
              className={`apotek-docs-tab ${activeDocTab === 'automation' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('automation')}
            >
              8 Otomatisasi Background
            </button>
            <button
              className={`apotek-docs-tab ${activeDocTab === 'role' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('role')}
            >
              Alur Kerja Berbasis Peran
            </button>
            <button
              className={`apotek-docs-tab ${activeDocTab === 'faq' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('faq')}
            >
              FAQ Farmasi ERP
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
                      <div className="apotek-auto-card__badges">
                        <span className="auto-badge auto-badge--schedule">{auto.schedule}</span>
                        <span className="auto-badge auto-badge--category">{auto.category}</span>
                      </div>
                    </div>
                    <h3 className="apotek-auto-card__title">{auto.title}</h3>
                    <p className="apotek-auto-card__desc">{auto.description}</p>
                    <div className="apotek-auto-card__impact">
                      <span className="impact-label">Dampak Utama:</span>
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

      {/* ===== INTERACTIVE LEAD CAPTURE / DEMO FORM ===== */}
      <section className="section cyber-lead-section" id="lead-form">
        <div className="container">
          <div className="lead-capture-card glass-panel">
            <div className="lead-capture-grid">
              <div className="lead-capture-info">
                <div className="cyber-pulse-badge">Mulai Transformasi Digital</div>
                <h2>Jadwalkan Live Demo &amp; Konsultasi Gratis</h2>
                <p>
                  Diskusikan kebutuhan apotek Anda dengan spesialis sistem ERP farmasi kami. Dapatkan pendampingan langsung, live walkthrough fitur, dan simulasi migrasi database.
                </p>

                <div className="lead-perks-list">
                  <div className="perk-item">
                    <div>
                      <strong>Free Trial &amp; Demo Walkthrough</strong>
                      <span>Akses akun demo lengkap tanpa komitmen.</span>
                    </div>
                  </div>
                  <div className="perk-item">
                    <div>
                      <strong>Bantuan Migrasi Data Stok Master</strong>
                      <span>Impor master obat dari file Excel / sistem lama.</span>
                    </div>
                  </div>
                  <div className="perk-item">
                    <div>
                      <strong>Direct Support WhatsApp</strong>
                      <span>Konsultasi instan dengan tim teknis kami.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lead-capture-form-box">
                {formSubmitted ? (
                  <div className="form-success-state animate-fade-in">
                    <div className="success-icon">✓</div>
                    <h3>Permintaan Terkirim!</h3>
                    <p>
                      Terima kasih! Kami telah mengarahkan Anda ke WhatsApp tim spesialis ApotekApp. Tim kami akan segera menghubungi Anda untuk setup akun demo.
                    </p>
                    <button
                      className="btn btn--secondary cyber-btn-secondary"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Kirim Formulir Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="lead-form">
                    <h3 className="form-title">Isi Data Apotek Anda</h3>

                    <div className="form-group">
                      <label htmlFor="name">Nama Lengkap Pemilik / Apoteker</label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Contoh: Apt. Rian Pratama, S.Farm"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="pharmacyName">Nama Apotek / Klinik</label>
                        <input
                          id="pharmacyName"
                          type="text"
                          required
                          placeholder="Contoh: Apotek Sehat Sentosa"
                          value={formState.pharmacyName}
                          onChange={(e) =>
                            setFormState({ ...formState, pharmacyName: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="branchCount">Jumlah Cabang</label>
                        <select
                          id="branchCount"
                          value={formState.branchCount}
                          onChange={(e) =>
                            setFormState({ ...formState, branchCount: e.target.value })
                          }
                        >
                          <option value="1 Cabang">1 Cabang (Mandiri)</option>
                          <option value="2-4 Cabang">2 - 4 Cabang</option>
                          <option value="5+ Cabang">5+ Cabang (Jaringan/Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="interestFocus">Kebutuhan Utama</label>
                      <select
                        id="interestFocus"
                        value={formState.interestFocus}
                        onChange={(e) =>
                          setFormState({ ...formState, interestFocus: e.target.value })
                        }
                      >
                        <option value="Full ERP & Kasir POS FEFO">Full ERP Farmasi &amp; Kasir POS FEFO</option>
                        <option value="Deteksi HPP & Anti-Markup AI">AI Deteksi HPP &amp; Audit Faktur Masuk</option>
                        <option value="Modul Klaim BPJS PRB & Kapitasi">Modul Resep &amp; Klaim BPJS PRB/Kapitasi</option>
                        <option value="Defecta & Pengadaan Multi-PBF">Defecta Otomatis &amp; Pemisahan SP PBF</option>
                        <option value="Multi-Cabang & Jaringan">Sistem Multi-Cabang &amp; Gudang Terpusat</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Catatan Tambahan (Opsional)</label>
                      <textarea
                        id="message"
                        rows={2}
                        placeholder="Contoh: Apakah bisa sinkron dengan resep dokter di klinik kami?"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn--primary btn-block cyber-btn-primary">
                      Ajukan Demo &amp; Terhubung ke WhatsApp
                    </button>
                    <span className="privacy-note">Privasi data aman. Tidak ada spam.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA BANNER ===== */}
      <section className="section">
        <div className="container">
          <div className="apotek-cta-banner glass-panel cyber-cta-banner">
            <div className="apotek-cta-banner__bg" />
            <div className="apotek-cta-banner__content">
              <div className="badge cyber-badge">Mulai Sekarang</div>
              <h2>Coba Live Web App ApotekApp Hari Ini</h2>
              <p>
                Lihat langsung bagaimana ApotekApp mengubah cara Anda mengelola kasir POS FEFO, klaim BPJS, defecta ke PBF, dan reservasi online dalam satu sistem handal.
              </p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://apotek.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large cyber-btn-primary"
                >
                  Pelajari Lebih Lanjut di Web App ApotekApp <span className="btn__icon">↗</span>
                </a>
                <a href="#lead-form" className="btn btn--secondary btn--large cyber-btn-secondary">
                  Konsultasi Onboarding
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ApotekAppPage