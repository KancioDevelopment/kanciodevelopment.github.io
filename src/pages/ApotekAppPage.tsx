import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import './ProductPage.css'
import './ApotekAppPage.css'

const modules = [
  {
    icon: '🧠',
    title: 'AI-Powered HPP Intelligence',
    badge: 'Keunggulan Eksklusif',
    badgeColor: 'indigo',
    description:
      'Satu-satunya sistem ERP Apotek di Indonesia yang secara otomatis mendeteksi anomali Harga Pokok Pembelian (HPP) dan markup supplier nakal sebelum disetujui.',
    features: [
      'Deteksi markup berlebih & lonjakan harga beli secara real-time',
      'Audit otomatis perbandingan harga lintas supplier & distributor',
      'Manager Intelligence Dashboard untuk verifikasi draft transaksi',
      'Melindungi margin laba bersih rata-rata Rp 12,4jt+ per periode',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    icon: '🛒',
    title: 'Kasir POS & Alokasi FEFO/FIFO',
    badge: 'Inti Operasional',
    badgeColor: 'green',
    description:
      'Point of Sale super cepat yang otomatis mengalokasikan batch obat berdasarkan tanggal kedaluwarsa terdekat (FEFO - First Expired First Out) untuk meminimalisir obat expired.',
    features: [
      'Pencarian obat instan via nama generik, merk & barcode scanner',
      'Otomasi alokasi batch stok FEFO / FIFO akurat',
      'Mode Resep Dokter, Racikan Kompound & Obat Bebas (OTC)',
      'Fungsi multi-kasir, Hold & Recall transaksi tanpa antre',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
  {
    icon: '🏥',
    title: 'BPJS Kapitasi & PRB (Kronis)',
    badge: 'Layanan Faskes',
    badgeColor: 'teal',
    description:
      'Modul terintegrasi khusus untuk memproses resep BPJS Kapitasi FKTP dan BPJS PRB (Program Rujuk Balik / Chronic Disease) secara presisi tanpa selisih klaim.',
    features: [
      'Resep BPJS Kapitasi & PRB terintegrasi',
      'Pencocokan nama pintar (Spelling-Tolerant Matching)',
      'Auto-Discount & Proteksi Target Nilai Klaim Faskes',
      'Sinkronisasi CSV settlement & arsip resep digital',
    ],
    gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
  },
  {
    icon: '📋',
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
  },
  {
    icon: '📦',
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
  },
  {
    icon: '🔍',
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
  },
  {
    icon: '🌐',
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
  },
  {
    icon: '👥',
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
  },
]

const clickCollectSteps = [
  {
    step: '01',
    icon: '🏪',
    title: 'Pilih Apotek Mitra Terdekat',
    desc: 'Buka direktori cabang apotek mitra resmi terdekat di kota Anda (seperti Apotek Mitra Syifa atau Apotek E 32).'
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Cari Obat & Cek Ketersediaan',
    desc: 'Ketik nama obat atau pilih dari kategori indikasi klinis dengan status ketersediaan stok real-time.'
  },
  {
    step: '03',
    icon: '💊',
    title: 'Pilih Satuan & Jumlah Sediaan',
    desc: 'Tentukan satuan sediaan yang dibutuhkan (tablet, strip, botol, sirup, tube) dan masukkan ke keranjang pemesanan.'
  },
  {
    step: '04',
    icon: '📸',
    title: 'Isi Data Pasien & Upload Resep',
    desc: 'Lengkapi identitas pemesan dan lampirkan foto resep dokter jika memesan obat etiket keras / daftar G.'
  },
  {
    step: '05',
    icon: '🎟️',
    title: 'Terima Kode Booking WhatsApp',
    desc: 'Sistem mengunci stok sementara (soft-reserve) dan mengirimkan notifikasi ringkasan pesanan ke WhatsApp Anda.'
  },
  {
    step: '06',
    icon: '⚡',
    title: 'Ambil di Kasir Tanpa Antre',
    desc: 'Tunjukkan kode booking ke kasir apotek, selesaikan pembayaran, dan bawa pulang obat Anda tanpa antre lama.'
  }
]

const publicStores = [
  {
    name: 'Apotek Mitra Syifa',
    city: 'Kab. Blitar, Jawa Timur',
    address: 'Jl. Mastrip, RT.02/RW.01, Togogan, Kec. Srengat',
    phone: '0856-4200-7123',
    hours: '07:30 - 21:00 WIB (Buka Setiap Hari)',
    supportsBpjs: true
  },
  {
    name: 'Apotek E 32',
    city: 'Kab. Blitar, Jawa Timur',
    address: 'Jl. Raya Garum No.14, Ngebra, Tawangsari, Kec. Garum',
    phone: '0882-2616-7200',
    hours: '07:00 - 21:00 WIB (Buka Setiap Hari)',
    supportsBpjs: false
  }
]

const stats = [
  { number: '20+', label: 'Modul ERP Farmasi', icon: '⚡' },
  { number: '99.9%', label: 'Akurasi Stok FEFO', icon: '🎯' },
  { number: 'Rp 12,4jt+', label: 'Profit Terlindungi', icon: '💰' },
  { number: 'Multi', label: 'Cabang & Public Store', icon: '🏪' },
]

const testimonials = [
  {
    name: 'Apotek Mitra Syifa',
    quote:
      'HPP Intelligence menyelamatkan kami dari markup supplier. Dalam sebulan pertama saja kami sudah terhindar dari kerugian jutaan rupiah dan klaim BPJS jadi 100% akurat.',
    role: 'Apotek Mitra — Srengat, Blitar',
  },
  {
    name: 'Apotek E 32',
    quote:
      'Fitur alokasi stok FEFO dan reservasi online Click & Collect membuat pasien kami sangat senang. Pengambilan obat jadi instan dan tidak ada lagi obat expired di gudang.',
    role: 'Apotek Mitra — Garum, Blitar',
  },
]

const whyChoose = [
  {
    icon: '🧠',
    title: 'Satu-satunya HPP Intelligence',
    desc: 'Mendeteksi anomali harga supplier secara otomatis sehingga margin profit apotek Anda terlindungi 24/7.',
  },
  {
    icon: '🏥',
    title: 'BPJS Kapitasi & PRB Lengkap',
    desc: 'Dirancang khusus untuk alur faskes Indonesia dengan fitur verifikasi klaim obat kronis dan arsip PDF resep.',
  },
  {
    icon: '🌐',
    title: 'Omnichannel Click & Collect',
    desc: 'Pasien bisa mencari stok obat dan pesan online, apotek Anda mendapatkan tambahan omzet penjualan digital.',
  },
  {
    icon: '📊',
    title: 'Laporan Keuangan Otomatis',
    desc: 'Laporan Laba/Rugi, Neraca, Moving Average HPP, dan KPI staf terbit otomatis dalam satu dashboard terpusat.',
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
    title: 'Pemesanan Stok Otomatis (Defecta)',
    schedule: 'Setiap Jam',
    category: 'Inventori',
    description: 'Memantau tingkat stok live dan menghasilkan draft Surat Pesanan (SP) otomatis saat stok mendekati reorder point minimum.',
    impact: 'Menjaga persediaan tetap aman tanpa harus melakukan pengecekan gudang secara manual.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: '💰',
    title: 'Penggajian Otomatis (Payroll)',
    schedule: 'Bulanan (Tgl 21)',
    category: 'Keuangan',
    description: 'Mengkalkulasi penggajian dua tahap termasuk bonus Balanced Scorecard (BPJS, Umum), potongan pro-rata, dan denda keterlambatan.',
    impact: 'Proses payroll sekali klik persetujuan oleh manager, menghemat waktu administrasi bulanan.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    icon: '📱',
    title: 'Pengingat Piutang & Jatuh Tempo',
    schedule: 'Harian (09:00 WIB)',
    category: 'Piutang',
    description: 'Memantau jatuh tempo pembayaran tempo pasien dan membuat log pengingat pada hari ke-7, 14, dan 30 secara mandiri.',
    impact: 'Meningkatkan kelancaran arus kas & meminimalisir risiko piutang macet terabaikan.',
    gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
  },
  {
    icon: '📈',
    title: 'Klasifikasi Paretop / ABC Terlaris',
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
    description: 'Menyusun slot kosong secara otomatis berdasarkan ketersediaan staf dan memfasilitasi tukar shift (swap) secara drag-and-drop.',
    impact: 'Distribusi shift kerja staf yang adil, merata, dan terjadwal otomatis di latar belakang.',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
  },
  {
    icon: '🔍',
    title: 'Deteksi HPP Anomali',
    schedule: 'Harian (03:00 WIB)',
    category: 'Keamanan',
    description: 'Memindai database HPP setiap dini hari untuk mendeteksi ketidakwajaran harga beli dan markup supplier nakal.',
    impact: 'Melindungi margin profit apotek secara proaktif saat Anda tertidur.',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    icon: '🧹',
    title: 'Pembersihan Data & Debt Netting',
    schedule: 'Harian & Bulanan',
    category: 'Database',
    description: 'Menjalankan program harian untuk melunasi hutang stok minus (debt netting) dan menyatukan duplikasi batch fisik obat yang identik.',
    impact: 'Menjaga kinerja database ERP tetap kencang dan akurasi stok tetap 99.9%.',
    gradient: 'linear-gradient(135deg, #64748b, #475569)',
  },
]

const roles = [
  {
    role: 'owner',
    title: 'Pimpinan & Pemilik Apotek',
    icon: '👑',
    tagline: 'Manajemen & Pemantauan Laba',
    benefits: [
      'Akses laporan laba rugi real-time di ujung jari tanpa perlu meminta laporan manual dari staf kasir.',
      'Mendapatkan notifikasi instan HPP Anomali jika terdeteksi supplier menaikkan harga secara tidak wajar.',
      'Sistem payroll bulanan terhitung otomatis, siap bayar hanya dengan persetujuan akhir sekali klik.',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    role: 'staff',
    title: 'Staf Apoteker & Kasir POS',
    icon: '🧑‍⚕️',
    tagline: 'Pelayanan Cepat & Presisi',
    benefits: [
      'Pencarian obat barcode instan dengan alokasi otomatis batch kedaluwarsa terdekat (FEFO).',
      'Input resep racikan puyer/kapsul langsung menghitung tuslah dan embalase tanpa hitung manual.',
      'Pencatatan absensi geofencing GPS transparan dan pemantauan bonus tiering langsung di dashboard.',
    ],
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
  {
    role: 'warehouse',
    title: 'Staf Gudang & Logistik PBF',
    icon: '📦',
    tagline: 'Kontrol Stok & Surat Pesanan',
    benefits: [
      'Mendapatkan notifikasi otomatis saat stok mendekati Reorder Point (ROP) minimum.',
      'Draft Surat Pesanan (SP) ter-generate otomatis terpisah sesuai izin edar distributor PBF resmi.',
      'Stock opname cepat per rak dengan deteksi selisih fisik vs sistem (shrinkage) secara instan.',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
]

const faqs = [
  {
    question: 'Apa keunggulan ApotekApp dibandingkan software apotek konvensional?',
    answer: 'ApotekApp menyediakan lebih dari 20 modul farmasi lengkap tanpa biaya tersembunyi. Mencakup POS Kasir FEFO otomatis, Rekonsiliasi BPJS Kapitasi & PRB, Terminal Racikan & Komisi Dokter, Defecta Otomatis ke PBF, HPP Intelligence, hingga Reservasi Obat Online Click & Collect.',
  },
  {
    question: 'Bagaimana cara kerja reservasi obat online (Click & Collect) bagi pasien?',
    answer: 'Pasien dapat mencari stok obat di apotek mitra resmi, memesan obat bebas atau mengunggah foto resep dokter, lalu mengambil langsung di kasir apotek tanpa perlu mengantre lama.',
  },
  {
    question: 'Apakah ApotekApp mendukung transaksi BPJS Kesehatan Kapitasi & PRB?',
    answer: 'Ya, mendukung penuh transaksi BPJS Kapitasi untuk FKTP serta BPJS PRB (Program Rujuk Balik) untuk obat penyakit kronis lengkap dengan spelling-tolerant matching, proteksi target klaim, dan impor CSV.',
  },
  {
    question: 'Bagaimana HPP Intelligence melindungi profit apotek kami?',
    answer: 'Sistem secara berkala membandingkan harga beli obat saat ini dengan riwayat faktur sebelumnya serta harga pasar. Jika terdeteksi kenaikan harga tidak wajar dari supplier, sistem langsung menandai transaksi untuk ditinjau.',
  },
  {
    question: 'Bagaimana cara mencoba atau mendaftarkan apotek kami ke ApotekApp?',
    answer: 'Anda dapat langsung membuka live demo di https://apotek.kancio.com/ atau menghubungi tim kami melalui formulir konsultasi untuk pendampingan setup data awal secara gratis.',
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

  useSEO({
    title: 'Aplikasi Apotek Terbaik & Cek Stok Obat Online | Software Kasir Apotek FEFO ApotekApp',
    description: 'Software aplikasi apotek terbaik di Indonesia: Kasir POS FEFO/FIFO, cek stok obat real-time, rekonsiliasi BPJS Kapitasi & PRB kronis, resep dokter, defecta PBF, & reservasi obat online Click & Collect di apotek.kancio.com.',
    keywords: 'aplikasi apotek, software apotek terbaik, aplikasi kasir apotek, stok obat, cek stok obat, reservasi obat online, sistem inventori apotek, bpjs apotek, obat fefo, apotekapp',
    canonicalUrl: 'https://kancio.com/products/apotekapp',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "ApotekApp",
          "operatingSystem": "All (Web Browser, Android, iOS, Windows, macOS)",
          "applicationCategory": "BusinessApplication",
          "url": "https://apotek.kancio.com",
          "description": "Software ERP Apotek Terbaik & Aplikasi Kasir Apotek Terlengkap di Indonesia",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "IDR",
            "description": "Free Live Demo Available"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kancio Development",
            "url": "https://kancio.com"
          }
        },
        {
          "@type": "HowTo",
          "name": "Cara Melakukan Reservasi Obat Online (Click & Collect) di ApotekApp",
          "description": "Panduan 6 langkah mudah mereservasi obat di apotek mitra resmi ApotekApp untuk diambil langsung tanpa antre.",
          "step": clickCollectSteps.map((s, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": s.title,
            "text": s.desc
          }))
        }
      ]
    }
  })

  return (
    <div className="product-page apotek-page">
      <Header />

      {/* ===== HERO ===== */}
      <section className="apotek-hero">
        <div className="apotek-hero__bg" />
        <div className="container">
          <div className="apotek-hero__content">
            <div className="apotek-hero__eyebrow">
              <span className="badge">💊 ApotekApp Farmasi ERP</span>
              <span className="apotek-hero__tag">Sistem Informasi Apotek Terpadu #1</span>
            </div>
            <h1 className="apotek-hero__title">
              Software Apotek Modern <br />
              <span className="text-gradient">POS FEFO, BPJS &amp; Online Store</span>
            </h1>
            <p className="apotek-hero__desc">
              Tingkatkan efisiensi operasional dan profit apotek Anda dengan sistem ERP farmasi terlengkap:
              alokasi stok FEFO/FIFO otomatis, rekonsiliasi BPJS Kapitasi &amp; PRB, terminal resep dokter,
              defecta multi-PBF, serta reservasi obat online Click &amp; Collect.
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
                Buka Web App ApotekApp <span className="btn__icon">→</span>
              </a>
              <a
                href="#reservasi-online"
                className="btn btn--secondary btn--large"
              >
                Cara Click &amp; Collect
              </a>
            </div>
          </div>
          <div className="apotek-hero__visual">
            <div className="apotek-hero__card-stack">
              <div className="apotek-stat-card apotek-stat-card--top">
                <span className="apotek-stat-card__icon">🧠</span>
                <div>
                  <div className="apotek-stat-card__label">HPP Intelligence</div>
                  <div className="apotek-stat-card__value">Anomali Markup Terdeteksi</div>
                </div>
                <span className="apotek-stat-card__badge">AI Protected</span>
              </div>
              <div className="apotek-hero__dashboard">
                <div className="apotek-dashboard__row">
                  <span>🛒 Kasir POS FEFO</span>
                  <strong className="text-green">Alokasi Otomatis</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>🏥 Klaim BPJS PRB &amp; Kapitasi</span>
                  <strong>100% Cocok</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>📦 Defecta &amp; SP PBF</span>
                  <strong className="text-gradient">Multi-Split Auto</strong>
                </div>
                <div className="apotek-dashboard__row">
                  <span>🌐 Reservasi Click &amp; Collect</span>
                  <strong className="text-green">Siap Ambil</strong>
                </div>
              </div>
              <div className="apotek-stat-card apotek-stat-card--bottom">
                <span className="apotek-stat-card__icon">✅</span>
                <div>
                  <div className="apotek-stat-card__label">Stock Opname &amp; Shrinkage</div>
                  <div className="apotek-stat-card__value">Akurasi Fisik 99.9%</div>
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

      {/* ===== 8 INTEGRATED MODULES ===== */}
      <section
        ref={sectionRef}
        className={`section apotek-modules ${visible ? 'apotek-modules--visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <div className="badge">Modul ERP Farmasi Terpadu</div>
            <h2>
              Semua Fitur Farmasi,{' '}
              <span className="text-gradient">Dalam Satu Platform Terintegrasi</span>
            </h2>
            <p>
              Dari kasir POS harian, alur BPJS, manajemen defecta ke PBF, hingga reservasi online pasien —
              ApotekApp mengelola seluruh operasional apotek Anda tanpa ribet.
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
              {modules[activeModule].title.includes('Presensi') || modules[activeModule].title.includes('Staff') ? (
                <div style={{ marginTop: '24px' }}>
                  <Link 
                    to="/products/apotekapp/presensi-guide" 
                    className="btn btn-primary" 
                    style={{ 
                      padding: '10px 20px', 
                      fontSize: '0.9rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    📖 Buka Panduan Lengkap Presensi &raquo;
                  </Link>
                </div>
              ) : null}
              {modules[activeModule].title.includes('BPJS') ? (
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
                    📖 Buka Panduan Lengkap BPJS &raquo;
                  </Link>
                </div>
              ) : null}
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

          {/* Module Cards Grid */}
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

      {/* ===== CLICK & COLLECT HOW-TO SECTION ===== */}
      <section id="reservasi-online" className="apotek-click-collect-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge--accent">Click &amp; Collect Omnichannel</div>
            <h2>
              Cara Reservasi Obat Online <span className="text-gradient">Tanpa Perlu Antre</span>
            </h2>
            <p>
              Pelajari 6 langkah mudah bagaimana pasien dapat mencari obat di apotek mitra resmi dan mengambilnya langsung di kasir.
            </p>
          </div>

          <div className="click-collect-grid">
            {clickCollectSteps.map((s, idx) => (
              <div key={idx} className="cc-step-card">
                <span className="cc-step-num">{s.step}</span>
                <span className="cc-step-icon">{s.icon}</span>
                <h3 className="cc-step-title">{s.title}</h3>
                <p className="cc-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Public Stores Directory Card */}
          <div className="section-header" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <div className="badge">Direktori Cabang Mitra</div>
            <h3>Jaringan Apotek Mitra Resmi</h3>
          </div>

          <div className="apotek-stores-grid">
            {publicStores.map((store, idx) => (
              <div key={idx} className="store-card">
                <div className="store-card__header">
                  <span className="store-name">{store.name}</span>
                  {store.supportsBpjs && <span className="store-badge">✓ Support BPJS</span>}
                </div>
                <div className="store-info">📍 {store.address}, {store.city}</div>
                <div className="store-info">📞 Telepon: {store.phone}</div>
                <div className="store-info">⏰ Jam Buka: {store.hours}</div>
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
            <div className="badge">Dokumentasi &amp; Otomatisasi 24/7</div>
            <h2>
              Sistem Cerdas Bekerja <span className="text-gradient">Di Latar Belakang</span>
            </h2>
            <p>
              Pelajari bagaimana ApotekApp memangkas intervensi manual dengan mengotomatisasi
              18+ proses operasional harian apotek Anda.
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
              <span className="tab-icon">❓</span> FAQ Farmasi ERP
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
            <div className="badge">Apotek Mitra Terpercaya</div>
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
              <h2>Coba Live Demo ApotekApp Hari Ini</h2>
              <p>
                Lihat langsung bagaimana ApotekApp mengubah cara Anda mengelola kasir POS FEFO, klaim BPJS,
                defecta ke PBF, dan penjualan online apotek Anda.
              </p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://apotek.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large"
                >
                  Buka Web App ApotekApp <span className="btn__icon">→</span>
                </a>
                <Link to="/services/consulting" className="btn btn--secondary btn--large">
                  Konsultasi Onboarding
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