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
    id: 'hpp-ai',
    icon: '🧠',
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
    icon: '🛒',
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
    icon: '🏥',
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
    cyberColor: '#ec4899',
  },
  {
    id: 'defecta',
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
    cyberColor: '#3b82f6',
  },
  {
    id: 'opname',
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
    cyberColor: '#eab308',
  },
  {
    id: 'omnichannel',
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
    cyberColor: '#8b5cf6',
  },
  {
    id: 'hr-payroll',
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
    cyberColor: '#10b981',
  },
]

const clickCollectSteps = [
  {
    step: '01',
    icon: '🏪',
    title: 'Pilih Apotek Mitra',
    desc: 'Buka direktori cabang apotek mitra resmi terdekat di kota Anda.',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Cari Obat & Cek Stok',
    desc: 'Ketik nama obat atau kategori klinis dengan status ketersediaan live.',
  },
  {
    step: '03',
    icon: '💊',
    title: 'Pilih Satuan & Jumlah',
    desc: 'Tentukan satuan sediaan (strip, botol, tube, tablet) ke keranjang.',
  },
  {
    step: '04',
    icon: '📸',
    title: 'Upload Resep Dokter',
    desc: 'Lampirkan foto resep dokter untuk obat etiket keras / daftar G.',
  },
  {
    step: '05',
    icon: '🎟️',
    title: 'Kode Booking WhatsApp',
    desc: 'Sistem soft-reserve stok dan kirim notifikasi ringkasan instan ke WA.',
  },
  {
    step: '06',
    icon: '⚡',
    title: 'Ambil Tanpa Antre',
    desc: 'Tunjukkan kode booking ke kasir apotek dan bawa pulang obat Anda.',
  },
]

const publicStores = [
  {
    name: 'Apotek Mitra Syifa',
    city: 'Kab. Blitar, Jawa Timur',
    address: 'Jl. Mastrip, RT.02/RW.01, Togogan, Kec. Srengat',
    phone: '0856-4200-7123',
    hours: '07:30 - 21:00 WIB (Buka Setiap Hari)',
    supportsBpjs: true,
  },
  {
    name: 'Apotek E 32',
    city: 'Kab. Blitar, Jawa Timur',
    address: 'Jl. Raya Garum No.14, Ngebra, Tawangsari, Kec. Garum',
    phone: '0882-2616-7200',
    hours: '07:00 - 21:00 WIB (Buka Setiap Hari)',
    supportsBpjs: false,
  },
]

const stats = [
  { number: '20+', label: 'Modul ERP Farmasi', icon: '⚡' },
  { number: '99.9%', label: 'Akurasi Stok FEFO', icon: '🎯' },
  { number: 'Rp 12,4jt+', label: 'Profit Rata-rata Terlindungi', icon: '💰' },
  { number: '0 Antrean', label: 'Click & Collect Ready', icon: '🏪' },
]

const testimonials = [
  {
    name: 'Apotek Mitra Syifa',
    city: 'Srengat, Blitar',
    avatar: '🏥',
    rating: 5,
    quote:
      'HPP Intelligence benar-benar menyelamatkan kami dari kenaikan harga sepihak distributor. Dalam 1 bulan pertama, kami langsung terhindar dari kerugian jutaan rupiah. Klaim BPJS PRB juga 100% cocok tanpa selisih!',
    highlight: 'Klaim BPJS 100% Cocok & HPP Terproteksi',
  },
  {
    name: 'Apotek E 32',
    city: 'Garum, Blitar',
    avatar: '💊',
    rating: 5,
    quote:
      'Alokasi stok FEFO otomatis memangkas risiko obat expired hingga 0%. Pasien kami sangat terbantu dengan fitur Click & Collect online, datang tinggal ambil tanpa perlu antre di kasir!',
    highlight: 'Zero Obat Expired & Pasien Puas',
  },
  {
    name: 'Apotek Medika Sejahtera',
    city: 'Kediri, Jawa Timur',
    avatar: '🔬',
    rating: 5,
    quote:
      'Sistem defecta otomatis yang langsung memisahkan Surat Pesanan reguler, prekursor, dan OOT sangat mempercepat kerja bagian pengadaan ke PBF resmi. Super praktis!',
    highlight: 'Pengadaan PBF 5x Lebih Cepat',
  },
]

const whyChoose = [
  {
    icon: '🧠',
    title: 'AI HPP Intelligence',
    desc: 'Audit real-time harga beli obat vs historis invoice. Sistem otomatis menandai anomali markup distributor.',
  },
  {
    icon: '🏥',
    title: 'BPJS Kapitasi & PRB Lengkap',
    desc: 'Resep obat kronis dan klaim faskes dengan spelling-tolerant matching dan ekspor CSV siap audit.',
  },
  {
    icon: '🌐',
    title: 'Omnichannel Click & Collect',
    desc: 'Katalog online publik dan booking WhatsApp terintegrasi yang mendatangkan omzet digital baru.',
  },
  {
    icon: '📦',
    title: 'Defecta & Multi-Split SP',
    desc: 'Auto-reorder obat saat menyentuh ROP dan pisahkan draft SP reguler, prekursor, dan OOT ke distributor resmi.',
  },
  {
    icon: '👥',
    title: 'GPS Geofencing & Payroll Otomatis',
    desc: 'Presensi presisi staf apotek, auto-checkout 7 jam, dan kalkulasi komisi Balanced Scorecard sekali klik.',
  },
  {
    icon: '⚡',
    title: 'Performa Cloud Real-Time',
    desc: 'Akses dari perangkat apa pun (Laptop kasir, Tablet, Smartphone) tanpa instalasi server lokal yang rumit.',
  },
]

const automations = [
  {
    icon: '⏱️',
    title: 'Absensi Geofencing GPS',
    schedule: 'Setiap Jam',
    category: 'SDM & Shift',
    description: 'Karyawan yang lupa checkout dicatat keluar secara adil setelah 7 jam kerja untuk menjaga integritas data absensi.',
    impact: 'Mencegah data absensi menggantung & transparansi jam lembur 100% terjaga.',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    icon: '📦',
    title: 'Pemesanan Stok (Defecta ROP)',
    schedule: 'Setiap Jam',
    category: 'Inventori',
    description: 'Memantau stok live dan menghasilkan draft Surat Pesanan (SP) otomatis saat obat menyentuh reorder point.',
    impact: 'Stok obat fast-moving selalu aman tanpa perlu cek fisik rak secara manual.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: '💰',
    title: 'Penggajian Otomatis (Payroll)',
    schedule: 'Bulanan (Tgl 21)',
    category: 'Keuangan',
    description: 'Mengkalkulasi gaji pokok, bonus Balanced Scorecard (BPJS, Umum), potongan pro-rata, dan keterlambatan.',
    impact: 'Proses payroll selesai dalam 1 klik persetujuan pemilik tanpa salah hitung.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    icon: '📱',
    title: 'Pengingat Piutang & Tempo',
    schedule: 'Harian (09:00 WIB)',
    category: 'Piutang',
    description: 'Memantau tempo pembayaran tagihan pasien/faskes pada interval 7, 14, dan 30 hari secara terjadwal.',
    impact: 'Arus kas apotek lebih lancar dan risiko piutang macet berkurang signifikan.',
    gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
  },
  {
    icon: '📈',
    title: 'Klasifikasi ABC / Pareto',
    schedule: 'Mingguan (Senin)',
    category: 'Analitik',
    description: 'Menganalisis perputaran produk untuk mengelompokkan obat Kelas A (terlaris), B, dan C secara matematis.',
    impact: 'Modal restock dialokasikan tepat sasaran pada obat dengan profit & perputaran tertinggi.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
  {
    icon: '🔍',
    title: 'Deteksi HPP Anomali Dini Hari',
    schedule: 'Harian (03:00 WIB)',
    category: 'Keamanan Laba',
    description: 'Scanning database faktur masuk untuk mendeteksi kenaikan harga sepihak sebelum transaksi disahkan.',
    impact: 'Melindungi margin profit bisnis apotek secara proaktif 24/7.',
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    icon: '🧹',
    title: 'Debt Netting & Merge Batch',
    schedule: 'Harian & Bulanan',
    category: 'Database ERP',
    description: 'Melunasi hutang stok minus (debt netting) dan menyatukan duplikasi batch fisik identik secara berkala.',
    impact: 'Database tetap ramping, kecepatan kasir tetap kilat, dan audit stok 99.9% presisi.',
    gradient: 'linear-gradient(135deg, #64748b, #475569)',
  },
  {
    icon: '📅',
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
    icon: '👑',
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
    icon: '🧑‍⚕️',
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
    icon: '📦',
    tagline: 'Manajemen Stok & SP PBF',
    benefits: [
      'Buku Defecta otomatis berdasarkan Reorder Point (ROP) minimum safety stock.',
      'Draft Surat Pesanan (SP) ter-generate terpisah untuk izin edar reguler, prekursor & OOT.',
      'Stock opname parsial cepat per rak dengan deteksi selisih shrinkage seketika.',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
]

const pricingPlans = [
  {
    name: 'Starter Mitra',
    tagline: 'Untuk 1 Apotek Mandiri atau Klinik Pratama baru',
    monthlyPrice: 249000,
    annualPrice: 199000,
    badge: 'Mulai Cepat',
    popular: false,
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    features: [
      '1 Outlet Apotek & 2 Akun Kasir POS',
      'Manajemen Stok FEFO/FIFO Otomatis',
      'Katalog Obat Publik & Click & Collect',
      'Defecta & Cetak Surat Pesanan (SP)',
      'Laporan Penjualan & Stok Harian',
      'Panduan Setup & Support WhatsApp',
    ],
    notIncluded: ['BPJS PRB & Kapitasi Faskes', 'AI HPP Anomaly Detection', 'Multi-Cabang & Gudang Terpusat'],
  },
  {
    name: 'Pro Pharmacy',
    tagline: 'Paling diminati untuk apotek aktif, faskes mitra & BPJS',
    monthlyPrice: 499000,
    annualPrice: 399000,
    badge: '⭐ Paling Populer',
    popular: true,
    gradient: 'linear-gradient(135deg, #6366f1, #ec4899)',
    features: [
      'Semua fitur Starter Mitra',
      'Unlimited Akun Kasir POS & Apoteker',
      'AI HPP Intelligence & Anti-Markup Anomaly',
      'Modul BPJS Kapitasi FKTP & BPJS PRB Kronis',
      'Terminal Resep Racikan, Embalase & Komisi Dokter',
      'Presensi Geofencing GPS & Payroll Otomatis',
      'Analitik Pareto ABC & Notifikasi Piutang Tempo',
      'Priority Customer Support 24/7',
    ],
    notIncluded: ['Multi-Cabang & Gudang Terpusat'],
  },
  {
    name: 'Enterprise Multi-Outlet',
    tagline: 'Untuk jaringan apotek berantai (Chain Pharmacy) & distributor',
    monthlyPrice: 999000,
    annualPrice: 799000,
    badge: 'Solusi Jaringan',
    popular: false,
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    features: [
      'Semua fitur Pro Pharmacy',
      'Hingga 5 Cabang Terintegrasi (Bisa Tambah)',
      'Gudang Utama Terpusat (Central Warehouse)',
      'Transfer Stok Antar-Cabang (Inter-Branch)',
      'Laporan Konsolidasi Finansial Laba Rugi Multi-Outlet',
      'Custom Domain / Subdomain Apotek Sendiri',
      'Dedicated Account Manager & On-Site Training',
      'Service Level Agreement (SLA) 99.9%',
    ],
    notIncluded: [],
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

  // Interactive Live Demo Simulator State
  const [demoTab, setDemoTab] = useState<'pos' | 'hpp' | 'bpjs' | 'omnichannel'>('pos')
  const [simulatedScan, setSimulatedScan] = useState(false)
  const [simulatedHppCheck, setSimulatedHppCheck] = useState(false)
  const [simulatedBpjsMatch, setSimulatedBpjsMatch] = useState(false)
  const [simulatedOrderSent, setSimulatedOrderSent] = useState(false)

  // Contact / Lead Form State
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    pharmacyName: '',
    branchCount: '1 Cabang',
    planInterest: 'Pro Pharmacy',
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
    if (!formState.name || !formState.phone || !formState.pharmacyName) return

    // Open WhatsApp with pre-filled message
    const waText = encodeURIComponent(
      `Halo Tim ApotekApp SaaS,\n\nSaya ingin konsultasi & demo gratis untuk sistem apotek kami:\n- Nama: ${formState.name}\n- Apotek: ${formState.pharmacyName} (${formState.branchCount})\n- Paket Pilihan: ${formState.planInterest}\n- No. Kontak: ${formState.phone}\n- Catatan: ${formState.message || 'Mohon info setup & live demo.'}`
    )
    window.open(`https://wa.me/6285642007123?text=${waText}`, '_blank')
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
    <div className="product-page apotek-page cyber-saas-theme">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="apotek-hero cyber-hero">
        <div className="cyber-glow-bg" />
        <div className="cyber-grid-overlay" />

        <div className="container">
          <div className="apotek-hero__content">
            <div className="apotek-hero__eyebrow">
              <span className="cyber-pulse-badge">
                <span className="pulse-dot" /> LIVE CLOUD ERP V3.4
              </span>
              <span className="apotek-hero__tag cyber-tag-glow">⚡ #1 SaaS Farmasi Modern</span>
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
                className="btn btn--primary btn--large cyber-btn-primary"
              >
                🚀 Buka Web App ApotekApp <span className="btn__icon">→</span>
              </a>
              <a href="#pricing" className="btn btn--secondary btn--large cyber-btn-secondary">
                Lihat Paket Harga
              </a>
              <a href="#lead-form" className="btn btn--outline btn--large cyber-btn-glow">
                Konsultasi &amp; Demo Gratis
              </a>
            </div>

            <div className="cyber-trust-badges">
              <span className="trust-item">🛡️ Cloud Backup 24/7</span>
              <span className="trust-item">⚡ Setup Cepat &lt; 15 Menit</span>
              <span className="trust-item">🏥 Support Standar Kemenkes &amp; BPJS</span>
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
                <div className="mockup-url-bar">
                  <span className="lock-icon">🔒</span> https://apotek.kancio.com/dashboard/live
                </div>
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
                    <span className="stream-title">🛒 Kasir POS — Live Transaction #TRX-9481</span>
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
                  <div className="ticker-badge">⚡ Live Sync</div>
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

      {/* ===== INTERACTIVE LIVE DEMO SIMULATOR ===== */}
      <section className="section cyber-simulator-section" id="interactive-demo">
        <div className="container">
          <div className="section-header">
            <div className="cyber-pulse-badge">Live Interactive Simulator</div>
            <h2>
              Rasakan Kemudahan ApotekApp <br />
              <span className="text-gradient cyber-gradient-text">Uji Coba Fitur Kunci Langsung Di Sini</span>
            </h2>
            <p>
              Klik dan coba langsung simulasi fitur unggulan ApotekApp untuk melihat bagaimana sistem mengotomatisasi pekerjaan apoteker dan kasir Anda.
            </p>
          </div>

          <div className="simulator-container glass-panel">
            {/* Simulator Tabs */}
            <div className="simulator-tabs">
              <button
                className={`sim-tab ${demoTab === 'pos' ? 'sim-tab--active' : ''}`}
                onClick={() => setDemoTab('pos')}
              >
                🛒 Kasir POS FEFO
              </button>
              <button
                className={`sim-tab ${demoTab === 'hpp' ? 'sim-tab--active' : ''}`}
                onClick={() => setDemoTab('hpp')}
              >
                🧠 AI HPP Anomaly
              </button>
              <button
                className={`sim-tab ${demoTab === 'bpjs' ? 'sim-tab--active' : ''}`}
                onClick={() => setDemoTab('bpjs')}
              >
                🏥 BPJS PRB Verifier
              </button>
              <button
                className={`sim-tab ${demoTab === 'omnichannel' ? 'sim-tab--active' : ''}`}
                onClick={() => setDemoTab('omnichannel')}
              >
                🌐 Click &amp; Collect
              </button>
            </div>

            {/* Simulator Interactive Screen */}
            <div className="simulator-screen">
              {demoTab === 'pos' && (
                <div className="sim-view sim-view--pos">
                  <div className="sim-header-bar">
                    <h4>Simulasi Kasir POS Cepat — First Expired First Out</h4>
                    <span className="sim-tag">Barcode &amp; FEFO Engine</span>
                  </div>
                  <p className="sim-desc">
                    Saat kasir mengetik atau scan barcode obat, sistem secara otomatis memilih nomor batch dengan tanggal expired terdekat agar tidak ada obat kedaluwarsa di gudang.
                  </p>

                  <div className="sim-interactive-box">
                    <button
                      className="btn btn--primary cyber-btn-primary"
                      onClick={() => setSimulatedScan(!simulatedScan)}
                    >
                      {simulatedScan ? '🔄 Reset Simulasi Scan' : '⚡ Klik Simulasi Scan Barcode: "Cefixime 100mg"'}
                    </button>

                    {simulatedScan && (
                      <div className="sim-result-card animate-fade-in">
                        <div className="sim-result-header">
                          <span className="success-badge">✓ Obat Ditemukan via Barcode 8991234567</span>
                          <span className="batch-priority">Auto FEFO Priority: 1</span>
                        </div>
                        <div className="sim-batch-table">
                          <div className="batch-row batch-row--selected">
                            <span>Batch <strong>#A-2401</strong> (Exp: Nov 2026)</span>
                            <span className="badge-highlight">DIALOKASIKAN SISTEM</span>
                            <span>Sisa: 40 Kapsul</span>
                          </div>
                          <div className="batch-row batch-row--locked">
                            <span>Batch <strong>#B-2508</strong> (Exp: Des 2027)</span>
                            <span className="badge-secondary">Disimpan untuk Nanti</span>
                            <span>Sisa: 120 Kapsul</span>
                          </div>
                        </div>
                        <div className="sim-tip">
                          💡 <em>Kasir tidak perlu mencari-cari manual tanggal kedaluwarsa. Sistem menjamin kepatuhan rotasi obat.</em>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {demoTab === 'hpp' && (
                <div className="sim-view sim-view--hpp">
                  <div className="sim-header-bar">
                    <h4>Simulasi AI HPP Intelligence &amp; Anti-Markup Supplier</h4>
                    <span className="sim-tag sim-tag--pink">Margin Shield AI</span>
                  </div>
                  <p className="sim-desc">
                    Saat staf memasukkan faktur pembelian baru dari distributor PBF, AI membandingkan harga beli dengan riwayat sebelumnya untuk mendeteksi lonjakan tidak wajar.
                  </p>

                  <div className="sim-interactive-box">
                    <button
                      className="btn btn--secondary cyber-btn-secondary"
                      onClick={() => setSimulatedHppCheck(!simulatedHppCheck)}
                    >
                      {simulatedHppCheck ? '🔄 Reset Simulasi Faktur' : '🔍 Klik Simulasi Audit Faktur Masuk PBF'}
                    </button>

                    {simulatedHppCheck && (
                      <div className="sim-result-card animate-fade-in alert-border">
                        <div className="sim-result-header">
                          <span className="warning-badge">⚠️ Anomali Markup HPP Terdeteksi (+28.5%)</span>
                          <span className="status-hold">Transaksi Ditahan untuk Approval Manager</span>
                        </div>
                        <div className="sim-audit-details">
                          <div className="audit-col">
                            <span className="lbl">Produk:</span>
                            <strong>Atorvastatin 20mg Box 30</strong>
                          </div>
                          <div className="audit-col">
                            <span className="lbl">HPP Faktur Lalu:</span>
                            <strong className="text-green">Rp 120.000 / box</strong>
                          </div>
                          <div className="audit-col">
                            <span className="lbl">HPP Faktur Ini:</span>
                            <strong className="text-pink">Rp 154.200 / box (+Rp 34.200)</strong>
                          </div>
                        </div>
                        <div className="sim-action-row">
                          <span className="action-note">🛡️ Manajer dapat langsung konfirmasi ke salesman PBF sebelum membayar.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {demoTab === 'bpjs' && (
                <div className="sim-view sim-view--bpjs">
                  <div className="sim-header-bar">
                    <h4>Simulasi BPJS PRB (Program Rujuk Balik) &amp; Rekonsiliasi</h4>
                    <span className="sim-tag sim-tag--cyan">Faskes BPJS Compliance</span>
                  </div>
                  <p className="sim-desc">
                    Resep obat kronis pasien PRB dicocokkan otomatis dengan Master Formularium Nasional, target nilai klaim, dan spelling-tolerant search untuk mencegah resep ditolak.
                  </p>

                  <div className="sim-interactive-box">
                    <button
                      className="btn btn--primary cyber-btn-primary"
                      onClick={() => setSimulatedBpjsMatch(!simulatedBpjsMatch)}
                    >
                      {simulatedBpjsMatch ? '🔄 Reset Simulasi Resep' : '🏥 Klik Simulasi Verifikasi Resep BPJS PRB'}
                    </button>

                    {simulatedBpjsMatch && (
                      <div className="sim-result-card animate-fade-in">
                        <div className="sim-result-header">
                          <span className="success-badge">✓ Resep Pasien PRB Valid &amp; Siap Cetak</span>
                          <span className="claim-match">Target Klaim: 100% Cocok</span>
                        </div>
                        <div className="sim-bpjs-grid">
                          <div className="bpjs-card">
                            <span className="title">Pasien: Bpk. Bambang S.</span>
                            <span>Diagnosa: Hipertensi Primer (I10)</span>
                            <span>Amlodipine 10mg — 30 Tab</span>
                          </div>
                          <div className="bpjs-card">
                            <span className="title">Status Klaim Faskes</span>
                            <span className="text-green">Tarif Klaim: Sesuai Plafon BPJS</span>
                            <span className="text-cyan">Auto-Generate CSV &amp; PDF Resep</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {demoTab === 'omnichannel' && (
                <div className="sim-view sim-view--omnichannel">
                  <div className="sim-header-bar">
                    <h4>Simulasi Reservasi Pasien Online (Click &amp; Collect)</h4>
                    <span className="sim-tag sim-tag--green">WhatsApp Integrated</span>
                  </div>
                  <p className="sim-desc">
                    Pasien mencari obat di katalog apotek online Anda, memesan atau upload foto resep, dan stok di-lock sementara hingga pasien mengambil di kasir.
                  </p>

                  <div className="sim-interactive-box">
                    <button
                      className="btn btn--outline cyber-btn-glow"
                      onClick={() => setSimulatedOrderSent(!simulatedOrderSent)}
                    >
                      {simulatedOrderSent ? '🔄 Reset Simulasi Booking' : '📱 Klik Simulasi Reservasi dari Pasien Online'}
                    </button>

                    {simulatedOrderSent && (
                      <div className="sim-result-card animate-fade-in">
                        <div className="sim-result-header">
                          <span className="success-badge">🎟️ Kode Booking #APT-9042 Diterbitkan</span>
                          <span className="wa-status">Notifikasi WhatsApp Terkirim</span>
                        </div>
                        <div className="sim-order-preview">
                          <div className="order-msg">
                            <strong>Pesan WhatsApp Pasien:</strong>
                            <p>
                              "Halo Ibu Siti, pesanan Vitamin C 500mg (1 Botol) di Apotek Mitra telah disiapkan. Tunjukkan Kode: <strong>APT-9042</strong> ke kasir untuk ambil langsung tanpa antre."
                            </p>
                          </div>
                          <span className="stock-reserve-alert">🔒 Stok fisik dikunci selama 3 jam di sistem kasir POS.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
                style={activeModule === i ? { background: modules[i].gradient } : {}}
              >
                <span>{m.icon}</span>
                <span className="apotek-module-tab__name">{m.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Module Full Spotlight */}
          <div className="apotek-module-detail card glass-panel cyber-spotlight-card">
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
                    📖 Buka Panduan Lengkap Presensi &raquo;
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
                    📖 Buka Panduan Lengkap BPJS &raquo;
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
                      <span className="apotek-preview-row__icon">⚡</span>
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
                  <div className="apotek-mod-card__icon" style={{ background: mod.gradient }}>
                    {mod.icon}
                  </div>
                  <span className={`apotek-badge apotek-badge--${mod.badgeColor}`}>{mod.badge}</span>
                </div>
                <h4 className="apotek-mod-card__name">{mod.title}</h4>
                <p className="apotek-mod-card__desc">{mod.description.split('.')[0]}.</p>
                <span className="card-link-text">Pelajari Fitur →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SAAS PRICING TIERS SECTION ===== */}
      <section className="section cyber-pricing-section" id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="cyber-pulse-badge">Paket Harga Transparan</div>
            <h2>
              Investasi Terjangkau,{' '}
              <span className="text-gradient cyber-gradient-text">Hasil Maksimal Tanpa Biaya Tersembunyi</span>
            </h2>
            <p>
              Pilih paket yang sesuai dengan skala apotek Anda. Tidak perlu instalasi server mahal — semua berjalan instan di cloud.
            </p>

            {/* Billing Toggle (Monthly / Annual) */}
            <div className="billing-toggle-wrapper">
              <span className={`billing-label ${!isAnnual ? 'billing-label--active' : ''}`}>
                Bulanan
              </span>
              <button
                className={`billing-switch ${isAnnual ? 'billing-switch--annual' : ''}`}
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Toggle Billing Frequency"
              >
                <span className="switch-thumb" />
              </button>
              <span className={`billing-label ${isAnnual ? 'billing-label--active' : ''}`}>
                Tahunan <span className="discount-badge">Hemat 20% + Gratis Setup</span>
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="pricing-cards-grid">
            {pricingPlans.map((plan, i) => {
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice
              return (
                <div
                  key={i}
                  className={`pricing-card glass-panel ${plan.popular ? 'pricing-card--popular' : ''}`}
                >
                  {plan.popular && <div className="popular-badge-ribbon">{plan.badge}</div>}

                  <div className="pricing-card__header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-tagline">{plan.tagline}</p>
                  </div>

                  <div className="pricing-card__price-box">
                    <span className="currency">Rp</span>
                    <strong className="amount">{currentPrice.toLocaleString('id-ID')}</strong>
                    <span className="period">/ bulan</span>
                  </div>
                  {isAnnual && (
                    <div className="annual-billed-note">
                      Ditagih tahunan (Rp {(currentPrice * 12).toLocaleString('id-ID')}/tahun)
                    </div>
                  )}

                  <div className="pricing-card__cta">
                    <a
                      href="#lead-form"
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, planInterest: plan.name }))
                      }
                      className={`btn btn--large btn-block ${plan.popular ? 'cyber-btn-primary' : 'cyber-btn-secondary'}`}
                    >
                      Pilih Paket {plan.name}
                    </a>
                  </div>

                  <div className="pricing-card__features">
                    <div className="features-title">Fitur Termasuk:</div>
                    <ul className="features-list">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="feat-item feat-item--included">
                          <span className="feat-check">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feat, idx) => (
                        <li key={idx} className="feat-item feat-item--excluded">
                          <span className="feat-cross">✕</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pricing-guarantee-banner glass-panel">
            <div className="guarantee-icon">🛡️</div>
            <div className="guarantee-text">
              <strong>Garansi Onboarding &amp; Bantuan Migrasi Data Stok 100%</strong>
              <p>Tim support kami akan membantu proses upload database obat, setup batch awal, dan pelatihan staf kasir Anda sampai lancar digunakan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE & ADVANTAGES ===== */}
      <section className="section cyber-why-section" style={{ background: 'rgba(99,102,241,0.02)' }}>
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
                <div className="apotek-why-card__icon">{w.icon}</div>
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
                <span className="cc-step-icon">{s.icon}</span>
                <h3 className="cc-step-title">{s.title}</h3>
                <p className="cc-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Public Stores Directory Card */}
          <div className="section-header" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <div className="badge">Direktori Jaringan Mitra</div>
            <h3>Contoh Outlet Apotek Mitra Terkoneksi</h3>
          </div>

          <div className="apotek-stores-grid">
            {publicStores.map((store, idx) => (
              <div key={idx} className="store-card glass-panel">
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
              <span className="tab-icon">⏱️</span> 8 Otomatisasi Background
            </button>
            <button
              className={`apotek-docs-tab ${activeDocTab === 'role' ? 'apotek-docs-tab--active' : ''}`}
              onClick={() => setActiveDocTab('role')}
            >
              <span className="tab-icon">👥</span> Alur Kerja Berbasis Peran
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

      {/* ===== TESTIMONIALS & SOCIAL PROOF ===== */}
      <section className="section cyber-testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-badge">Testimoni Apotek Mitra</div>
            <h2>
              Dipercaya Apotek &amp; Faskes <span className="text-gradient cyber-gradient-text">Terkemuka</span>
            </h2>
            <p>Dengarkan langsung cerita bagaimana ApotekApp menyelamatkan margin dan mempercepat layanan resep.</p>
          </div>
          <div className="apotek-testimonials">
            {testimonials.map((t, i) => (
              <div key={i} className="apotek-testimonial card glass-panel">
                <div className="testimonial-rating">
                  {'★'.repeat(t.rating)}
                  <span className="rating-tag">{t.highlight}</span>
                </div>
                <div className="apotek-testimonial__quote">"{t.quote}"</div>
                <div className="apotek-testimonial__author">
                  <div className="apotek-testimonial__avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE LEAD CAPTURE / DEMO FORM ===== */}
      <section className="section cyber-lead-section" id="lead-form">
        <div className="container">
          <div className="lead-capture-card glass-panel">
            <div className="lead-capture-grid">
              <div className="lead-capture-info">
                <div className="cyber-pulse-badge">🚀 Mulai Transformasi Digital</div>
                <h2>Jadwalkan Live Demo &amp; Konsultasi Gratis</h2>
                <p>
                  Diskusikan kebutuhan apotek Anda dengan spesialis sistem ERP farmasi kami. Dapatkan pendampingan langsung, live walkthrough fitur, dan simulasi migrasi database.
                </p>

                <div className="lead-perks-list">
                  <div className="perk-item">
                    <span className="perk-icon">⚡</span>
                    <div>
                      <strong>Free Trial &amp; Demo Walkthrough</strong>
                      <span>Akses akun demo lengkap tanpa komitmen.</span>
                    </div>
                  </div>
                  <div className="perk-item">
                    <span className="perk-icon">📦</span>
                    <div>
                      <strong>Bantuan Migrasi Data Stok Master</strong>
                      <span>Impor master obat dari file Excel / sistem lama.</span>
                    </div>
                  </div>
                  <div className="perk-item">
                    <span className="perk-icon">💬</span>
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
                    <div className="success-icon">🎉</div>
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

                    <div className="form-group">
                      <label htmlFor="phone">Nomor WhatsApp Aktif</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Contoh: 0812-3456-7890"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
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
                      <label htmlFor="planInterest">Pilihan Paket Tertarik</label>
                      <select
                        id="planInterest"
                        value={formState.planInterest}
                        onChange={(e) =>
                          setFormState({ ...formState, planInterest: e.target.value })
                        }
                      >
                        <option value="Starter Mitra">Starter Mitra (Rp 199rb/bln)</option>
                        <option value="Pro Pharmacy">Pro Pharmacy (Rp 399rb/bln) — Rekomendasi</option>
                        <option value="Enterprise Multi-Outlet">Enterprise Multi-Outlet (Rp 799rb/bln)</option>
                        <option value="Custom Enterprise">Custom Solusi Farmasi</option>
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
                      ⚡ Ajukan Demo &amp; Terhubung ke WhatsApp
                    </button>
                    <span className="privacy-note">🔒 Privasi data aman. Tidak ada spam.</span>
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
                  Buka Web App ApotekApp <span className="btn__icon">→</span>
                </a>
                <a href="#lead-form" className="btn btn--secondary btn--large cyber-btn-secondary">
                  Konsultasi Onboarding
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

export default ApotekAppPage