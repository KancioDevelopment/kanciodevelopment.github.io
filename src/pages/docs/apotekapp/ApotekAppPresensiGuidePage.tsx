import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import GoogleAdSense from '../../../components/GoogleAdSense'
import { useAds } from '../../../hooks/useAds'
import '../../ProductPage.css'
import './ApotekAppPresensiGuidePage.css'

interface PresensiStep {
  number: number
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  actionUrl?: string
}

interface PresensiFaq {
  question: string
  answer: string
}

const presensiSteps: PresensiStep[] = [
  {
    number: 1,
    title: 'Deteksi Geofencing GPS (Radius 150 Meter)',
    description: 'Saat staff memuat portal presensi, sistem secara instan memindai sinyal GPS koordinat perangkat mereka. Hanya staff yang berada dalam radius maksimal 150 meter dari titik koordinat apotek resmi yang diizinkan melakukan absensi Check-In. Langkah ini menutup rapat celah kecurangan manipulasi lokasi (seperti fake GPS atau absensi titipan) dan memastikan kejujuran kedisiplinan kerja secara mutlak.',
    imageUrl: 'https://i.ibb.co/dwrDPpsT/terminal-presensi-staff.png',
    imageAlt: 'Visualisasi radius Geofencing GPS 150 Meter Terminal Presensi ApotekApp',
    actionUrl: 'https://apotek.kancio.com/app/terminal/presensi'
  },
  {
    number: 2,
    title: 'Pemilihan Shift Kerja Mandiri (Self-Scheduling)',
    description: 'Staff memilih shift tugas aktif yang telah dijadwalkan untuk hari itu (misalnya: Shift Pagi, Shift Siang, Shift Malam, atau Shift Middle) langsung dari dropdown pilihan di Terminal Presensi. Pilihan shift ini secara dinamis terintegrasi dengan data penjadwalan pusat ApotekApp, memudahkan pencocokan jadwal riil dengan jadwal terencana secara instan.',
    imageUrl: 'https://i.ibb.co/dwrDPpsT/terminal-presensi-staff.png',
    imageAlt: 'Dropdown pemilihan shift kerja mandiri di portal presensi ApotekApp'
  },
  {
    number: 3,
    title: 'Waktu Riil Server NTP & Batas Toleransi Keterlambatan',
    description: 'Terminal Presensi mencocokkan waktu kehadiran secara langsung dengan NTP (Network Time Protocol) Server global yang tersinkronisasi presisi tinggi. Ini mencegah manipulasi jam internal pada ponsel atau komputer staff. Sistem secara otomatis menghitung kedatangan terlambat berdasarkan jam mulai shift, menerapkan denda keterlambatan secara transparan, serta memotong poin KPI kehadiran staff sesuai peraturan apotek.',
    imageUrl: 'https://i.ibb.co/dwrDPpsT/terminal-presensi-staff.png',
    imageAlt: 'Detail catatan waktu NTP presisi tinggi dan batas toleransi keterlambatan staff'
  },
  {
    number: 4,
    title: 'Mode Bypass Geofencing untuk Tugas Luar & Kurir',
    description: 'Untuk mengakomodasi staff dengan mobilitas dinamis di luar apotek—seperti kurir pengantar obat pasien, staff bagian logistik, atau apoteker yang menghadiri rapat dinas resmi—ApotekApp menghadirkan fitur Bypass Geofencing. Setelah disetujui oleh Owner atau Manager melalui dashboard utama, koordinasi presensi luar tetap dianggap sah dan tercatat akurat tanpa batasan radius geofencing.',
    imageUrl: 'https://i.ibb.co/dwrDPpsT/terminal-presensi-staff.png',
    imageAlt: 'Panel aktivasi persetujuan bypass geofencing untuk tugas luar di ApotekApp'
  }
]

const presensiFaqs: PresensiFaq[] = [
  {
    question: 'Bagaimana jika GPS staff tidak akurat saat melakukan presensi di dalam apotek?',
    answer: 'Pastikan perangkat staff telah mengaktifkan mode "Akurasi Tinggi" (High Accuracy) pada pengaturan lokasi sistem operasi dan memberikan izin akses lokasi pada browser/aplikasi ApotekApp. Jika masih terjadi kendala sinyal GPS di dalam gedung, Supervisor/Manager dapat menyetujui bypass koordinat sementara menggunakan kode otorisasi manual.'
  },
  {
    question: 'Bagaimana sistem menangani staff yang lupa melakukan Checkout presensi?',
    answer: 'Sistem secara otomatis menerapkan kebijakan Auto-Checkout pada batas akhir shift harian (misalnya pukul 23:59) dengan status bendera khusus "Lupa Checkout". Status ini akan masuk ke daftar tinjauan Manager di dashboard admin untuk penyesuaian jam kerja manual agar perhitungan penggajian tetap adil.'
  },
  {
    question: 'Apakah data presensi terintegrasi langsung dengan perhitungan gaji (payroll)?',
    answer: 'Ya, seluruh data jam kerja efektif, akumulasi keterlambatan, cuti, serta ketidakhadiran staff disinkronkan secara real-time ke modul penggajian (payroll) ApotekApp. Sistem menghitung gaji pokok dan insentif secara otomatis berdasarkan penilaian kedisiplinan KPI kehadiran.'
  },
  {
    question: 'Apakah satu akun staff bisa digunakan untuk login di beberapa perangkat berbeda?',
    answer: 'Untuk menjaga integritas dan menghindari penyalahgunaan, ApotekApp menerapkan kebijakan Device Binding. Setiap akun staff akan diikat secara unik pada satu perangkat utama. Penggantian perangkat absensi harus diajukan terlebih dahulu ke Administrator atau Pemilik Apotek untuk di-reset.'
  },
  {
    question: 'Bagaimana jika staff sedang melakukan tugas luar apotek?',
    answer: 'Staff dapat mengajukan permohonan status "Tugas Luar". Setelah disetujui oleh Manager melalui panel administrasi, geofencing radius 150m akan di-bypass secara otomatis untuk hari penugasan tersebut, memungkinkan presensi dari lokasi tugas luar secara sah.'
  }
]

const ApotekAppPresensiGuidePage: React.FC = () => {
  const { userConsent } = useAds()
  const [activeTab, setActiveTab] = useState<'steps' | 'faq'>('steps')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  // Lightbox & Zoom State
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [lightboxImage, setLightboxImage] = useState<string>('')
  const [lightboxAlt, setLightboxAlt] = useState<string>('')
  const [zoomScale, setZoomScale] = useState<number>(1)
  const [panOffset, setPanOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    document.title = 'Panduan Fitur Terminal Presensi Staff ApotekApp | Kancio';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Panduan lengkap penggunaan Terminal Presensi Staff di ApotekApp. Pelajari keunggulan geofencing GPS 150m, klaim shift mandiri, mode tugas luar, sinkronisasi NTP server, dan integrasi payroll KPI.');
    
    window.scrollTo(0, 0);
  }, [])

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const handleOpenLightbox = (src: string, alt: string) => {
    setLightboxImage(src)
    setLightboxAlt(alt)
    setZoomScale(1)
    setPanOffset({ x: 0, y: 0 })
    setLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setLightboxOpen(false)
  }

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 4))
  }

  const handleZoomOut = () => {
    setZoomScale(prev => {
      const next = Math.max(prev - 0.25, 1)
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 })
      }
      return next
    })
  }

  const handleResetZoom = () => {
    setZoomScale(1)
    setPanOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomScale <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomScale <= 1 || e.touches.length !== 1) return
    setIsDragging(true)
    const touch = e.touches[0]
    setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y })
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return
    const touch = e.touches[0]
    setPanOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const zoomIntensity = 0.08
    const delta = e.deltaY < 0 ? 1 : -1
    setZoomScale(prev => {
      const next = Math.max(1, Math.min(prev + delta * zoomIntensity, 4))
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 })
      }
      return next
    })
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseLightbox()
    }
  }

  return (
    <div className="product-page apotek-presensi-docs-page">
      <Header />
      <div className="container">
        
        {/* Breadcrumbs */}
        <div className="docs-breadcrumb">
          <Link to="/">Beranda</Link>
          <span className="docs-breadcrumb-separator">/</span>
          <Link to="/products/custom-apps">Produk</Link>
          <span className="docs-breadcrumb-separator">/</span>
          <Link to="/products/apotekapp">ApotekApp</Link>
          <span className="docs-breadcrumb-separator">/</span>
          <span className="docs-breadcrumb-current">Panduan Presensi Staff</span>
        </div>

        <div className="docs-grid">
          
          {/* Left Sidebar */}
          <aside className="docs-sidebar">
            <h3 className="docs-sidebar-title">🧭 Navigasi Panduan</h3>
            <ul className="docs-sidebar-menu">
              <li className="docs-sidebar-item">
                <a href="#overview" className="docs-sidebar-link docs-sidebar-link--active">
                  📌 Gambaran Umum
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a href="#workflow" className="docs-sidebar-link">
                  🔄 Alur Kerja Presensi
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a href="#features" className="docs-sidebar-link">
                  📱 Fitur Utama
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a href="#roles" className="docs-sidebar-link">
                  👥 Hak Akses & Peran
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a href="#business-logic" className="docs-sidebar-link">
                  ⚖️ Logika Bisnis & Aturan
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a href="#faq-section" className="docs-sidebar-link">
                  ❓ Pertanyaan Umum
                </a>
              </li>
            </ul>
          </aside>

          {/* Right Main Content */}
          <main className="docs-content-wrapper">
            
            {/* Header Title Card */}
            <div className="docs-header-card" id="overview">
              <div className="docs-badge-wrapper">
                <span>🛡️ FITUR PREMIUM</span>
              </div>
              <h1>📱 Panduan Lengkap: Terminal Presensi Staff</h1>
              <p className="docs-description">
                Selamat datang di panduan resmi Terminal Presensi Staff ApotekApp. Portal kehadiran digital interaktif ini dirancang dengan antarmuka yang sangat premium, modern, dan andal untuk mencatat kehadiran secara presisi. Dengan geofencing koordinat GPS, sinkronisasi waktu server global, dan laporan terpadu, Anda dapat mengelola kedisiplinan serta integritas operasional apotek dengan aman dan efisien.
              </p>
            </div>

            {/* Google AdSense Inline Content Break Ad */}
            <div className="content-break-ad" style={{ margin: '10px 0' }}>
              <GoogleAdSense
                userConsent={userConsent}
                adFormat="horizontal"
                variant="premium"
                adLabel="Sponsor Resmi ApotekApp"
                showLoadingAnimation={true}
              />
            </div>

            {/* Workflow Diagram Card */}
            <div className="docs-flowchart-card" id="workflow">
              <h3>🔄 Skema Alur Operasional Kehadiran Staff</h3>
              <div className="docs-flowchart-visual">
                <pre style={{ margin: 0, fontFamily: 'monospace', color: '#ffeaa7', whiteSpace: 'pre-wrap', fontSize: '0.88rem', lineHeight: '1.5' }}>
{`[Mulai Absensi di Perangkat Staff] 
                │
                ▼
  [Deteksi Sinyal Koordinat GPS] 
                │
                ├─► Jarak > 150m ──► [Butuh Bypass / Tugas Luar?]
                │                           ├─► Ya  ──► [Persetujuan Manager] ──► [Presensi Sah]
                │                           └─► Tidak ──► [Akses Presensi Ditolak 🚫]
                │
                └─► Jarak ≤ 150m ──► [Sinkronisasi Waktu Server NTP]
                                            │
                                            ▼
                                [Pilih Shift Kerja Aktif]
                                            │
                                            ▼
                               [Penyimpanan Data Absen Sah ✅]`}
                </pre>
              </div>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="docs-tabs-container" id="features">
              <button 
                className={`docs-tab-btn ${activeTab === 'steps' ? 'docs-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('steps')}
              >
                📖 Panduan Operasional
              </button>
              <button 
                className={`docs-tab-btn ${activeTab === 'faq' ? 'docs-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                ❓ Pertanyaan Umum & FAQ
              </button>
            </div>

            {/* Tabs Body Content */}
            <div className="docs-tabs-body">
              {activeTab === 'steps' ? (
                
                /* Tab 1: Steps & Visual Guides */
                <div className="docs-presensi-steps">
                  {presensiSteps.map((step) => (
                    <div className="docs-presensi-step-card" key={step.number}>
                      
                      {/* Left Step Info */}
                      <div className="docs-step-info">
                        <div className="docs-step-badge">
                          <div className="docs-step-number">{step.number}</div>
                          <h3>{step.title}</h3>
                        </div>
                        <p>{step.description}</p>
                        
                        {step.actionUrl && (
                          <div className="docs-copy-card">
                            <span className="docs-copy-url">{step.actionUrl}</span>
                            <button 
                              className={`docs-copy-btn ${copied ? 'docs-copy-btn--copied' : ''}`}
                              onClick={() => handleCopyLink(step.actionUrl!)}
                            >
                              {copied ? 'Tersalin! ✅' : 'Salin Tautan 🔗'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Right Step Visual */}
                      <div 
                        className="docs-step-visual"
                        onClick={() => handleOpenLightbox(step.imageUrl, step.imageAlt)}
                      >
                        <img 
                          className="docs-step-img" 
                          src={step.imageUrl} 
                          alt={step.imageAlt} 
                          loading="lazy"
                        />
                      </div>

                    </div>
                  ))}

                  {/* Access Levels & User Roles Section */}
                  <div className="docs-header-card" id="roles" style={{ marginTop: '20px' }}>
                    <h3 style={{ color: 'var(--accent-color)', fontSize: '1.25rem', marginBottom: '15px' }}>
                      👥 Pembagian Hak Akses & Peran Pengguna
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ borderLeft: '3px solid var(--accent-color)', paddingLeft: '15px' }}>
                        <strong style={{ color: 'white' }}>1. Administrator / Pemilik Apotek (Owner)</strong>
                        <p style={{ margin: '5px 0 0', fontSize: '0.92rem' }}>
                          Memiliki kontrol penuh atas konfigurasi titik koordinat GPS apotek, toleransi keterlambatan, reset Device Binding staff, aktivasi integrasi payroll, serta akses penuh ke ekspor data kehadiran.
                        </p>
                      </div>
                      <div style={{ borderLeft: '3px solid #6e3f3f', paddingLeft: '15px' }}>
                        <strong style={{ color: 'white' }}>2. Manager / Supervisor</strong>
                        <p style={{ margin: '5px 0 0', fontSize: '0.92rem' }}>
                          Mempunyai otorisasi untuk menyetujui pengajuan status "Tugas Luar", melakukan bypass geofencing manual jika terjadi gangguan GPS, serta meninjau kelalaian Check-In / Check-Out staff.
                        </p>
                      </div>
                      <div style={{ borderLeft: '3px solid var(--text-muted)', paddingLeft: '15px' }}>
                        <strong style={{ color: 'white' }}>3. Staff Pelaksana (Apoteker, Asisten, Kasir)</strong>
                        <p style={{ margin: '5px 0 0', fontSize: '0.92rem' }}>
                          Hanya dapat menggunakan Terminal Presensi untuk melakukan Check-In dan Check-Out dalam radius geofencing, memilih shift mandiri harian, serta memantau riwayat kehadiran bulanan mereka.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Logic & Policies Section */}
                  <div className="docs-header-card" id="business-logic">
                    <h3 style={{ color: 'var(--accent-color)', fontSize: '1.25rem', marginBottom: '15px' }}>
                      ⚖️ Logika Bisnis & Aturan Kehadiran
                    </h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                      <li style={{ marginBottom: '10px' }}>
                        <strong style={{ color: 'white' }}>Geofencing Valid:</strong> Radius absensi dihitung berdasarkan rumus matematis jarak Haversine antara koordinat perangkat sensorik browser staff dan koordinat tetap apotek. Jika selisih jarak &gt; 150 meter, transaksi absensi gagal secara otomatis.
                      </li>
                      <li style={{ marginBottom: '10px' }}>
                        <strong style={{ color: 'white' }}>Pemberlakuan Denda Keterlambatan:</strong> Apabila staff melakukan absen masuk melewati menit mulai shift (ditambah batas toleransi 15 menit), sistem secara otomatis menandai status kehadiran sebagai "Terlambat" dan memotong nominal insentif KPI bulanan pada menu payroll.
                      </li>
                      <li style={{ marginBottom: '10px' }}>
                        <strong style={{ color: 'white' }}>Device Binding:</strong> Setiap staff hanya diizinkan mengabsen melalui satu pengenal perangkat (Browser Fingerprint / Device UUID) yang telah diregistrasikan pertama kali. Ini mencegah kecurangan absensi antarteman sejawat.
                      </li>
                    </ul>
                  </div>

                </div>
              ) : (
                
                /* Tab 2: FAQ Accordion */
                <div className="docs-faq-list" id="faq-section">
                  {presensiFaqs.map((faq, index) => (
                    <div 
                      className={`docs-faq-card ${openFaqIndex === index ? 'docs-faq-card--open' : ''}`} 
                      key={index}
                    >
                      <button 
                        className="docs-faq-trigger"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="docs-faq-question">{faq.question}</span>
                        <span className="docs-faq-chevron">+</span>
                      </button>
                      <div className="docs-faq-content">
                        <p className="docs-faq-answer">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Pro Tip Panel */}
                  <div className="docs-tip-panel" style={{ marginTop: '20px' }}>
                    <span className="docs-tip-icon">💡</span>
                    <div className="docs-tip-content">
                      <h4>Rekomendasi Terbaik Admin</h4>
                      <p>
                        Untuk menjaga kelancaran presensi harian, sarankan staff Anda untuk melatih browser mereka dengan melakukan pre-loaded halaman absensi 5 menit sebelum jam shift dimulai. Ini berguna agar sensor GPS perangkat beradaptasi dengan koordinat lingkungan sekitar.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Google AdSense Footer Context Ad */}
            <div className="content-break-ad" style={{ margin: '20px 0 10px' }}>
              <GoogleAdSense
                userConsent={userConsent}
                adFormat="horizontal"
                variant="minimal"
                adLabel="Sponsor Resmi ApotekApp"
                showLoadingAnimation={true}
              />
            </div>

            {/* Footer Internal Links Card */}
            <div className="docs-footer-links-card">
              <h4>🔗 Referensi Layanan & Produk Terkait</h4>
              <ul className="docs-internal-links-list">
                <li className="docs-internal-link-item">
                  Ingin memodernisasi tata kelola sumber daya manusia apotek Anda secara menyeluruh? Konsultasikan kebutuhan Anda melalui <a href="https://kancio.com/services/consulting">Jasa Konsultasi Transformasi Digital Kancio Development</a>.
                </li>
                <li className="docs-internal-link-item">
                  Butuh penyesuaian khusus (custom features) atau integrasi modul presensi dengan perangkat keras sidik jari? Kembangkan bersama tim expert kami via <a href="https://kancio.com/services/custom-solution">Layanan Pembuatan Aplikasi Kustom Kancio</a>.
                </li>
                <li className="docs-internal-link-item">
                  Pelajari panduan integrasi sistem jaminan apotek Anda di <Link to="/products/apotekapp/bpjs-guide">Panduan Fitur Review & Lengkapi BPJS ApotekApp</Link>.
                </li>
              </ul>
            </div>

          </main>

        </div>
      </div>
      <Footer />

      {/* Premium Zoomable & Draggable Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="docs-lightbox-overlay"
          onClick={handleOverlayClick}
        >
          {/* Top Instruction Badge */}
          <div className="docs-lightbox-instruction">
            <span>Gunakan mouse-wheel atau tombol bawah untuk zoom. Drag untuk menggeser gambar.</span>
          </div>

          {/* Close Button */}
          <button 
            className="docs-lightbox-close"
            onClick={handleCloseLightbox}
            aria-label="Tutup pratinjau"
          >
            ✕
          </button>

          {/* Zoomable Container */}
          <div 
            className="docs-lightbox-content"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            onClick={handleOverlayClick}
          >
            <img 
              className="docs-lightbox-img"
              src={lightboxImage} 
              alt={lightboxAlt}
              style={{
                transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>

          {/* Glassmorphic Controls Bar */}
          <div className="docs-lightbox-controls">
            <div className="docs-control-indicator">
              {Math.round(zoomScale * 100)}%
            </div>
            <button 
              className="docs-control-btn"
              onClick={handleZoomOut}
              disabled={zoomScale <= 1}
              title="Perkecil"
            >
              −
            </button>
            <button 
              className="docs-control-btn"
              onClick={handleZoomIn}
              disabled={zoomScale >= 4}
              title="Perbesar"
            >
              +
            </button>
            <button 
              className="docs-control-btn docs-control-btn--text"
              onClick={handleResetZoom}
              title="Kembalikan ukuran semula"
            >
              Reset 🔄
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default ApotekAppPresensiGuidePage
