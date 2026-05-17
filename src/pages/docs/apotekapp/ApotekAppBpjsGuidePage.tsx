import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import GoogleAdSense from '../../../components/GoogleAdSense'
import { useAds } from '../../../hooks/useAds'
import '../../ProductPage.css'
import './ApotekAppBpjsGuidePage.css'

interface BpjsStep {
  number: number
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  actionUrl?: string
}

interface BpjsFaq {
  question: string
  answer: string
}

const bpjsSteps: BpjsStep[] = [
  {
    number: 1,
    title: 'Kunjungi Halaman Penjualan BPJS',
    description: 'Langkah awal adalah mengakses terminal operasional utama jaminan kesehatan. Buka menu transaksi jaminan pada panel kasir ApotekApp Anda, atau kunjungi langsung tautan terminal Penjualan BPJS yang telah terintegrasi. Halaman ini berfungsi sebagai dasbor pusat untuk memantau status validasi seluruh resep kapitasi pasien jaminan BPJS Anda secara real-time.',
    imageUrl: 'https://i.ibb.co/ttBpHQ5/bpjs-index.png',
    imageAlt: 'Halaman utama dasbor Penjualan BPJS Kapitasi ApotekApp',
    actionUrl: 'https://apotek.kancio.com/app/terminal/penjualan-bpjs'
  },
  {
    number: 2,
    title: 'Pilih Transaksi untuk Direview',
    description: 'Di tabel transaksi jaminan, temukan baris resep pasien BPJS yang membutuhkan tindakan penyesuaian (biasanya ditandai dengan status perlu ditinjau). Klik tombol aksi berwarna merah muda/magenta bertuliskan "Review & Lengkapi". Tombol interaktif ini secara instan akan meluncurkan lembar kerja pengisian data pelengkap resep tanpa harus memuat ulang seluruh halaman.',
    imageUrl: 'https://i.ibb.co/n2FsNfp/review-lengkapi.png',
    imageAlt: 'Tombol aksi Review dan Lengkapi pada tabel transaksi BPJS'
  },
  {
    number: 3,
    title: 'Lengkapi Formulir & Validasi Obat',
    description: 'Pada jendela pop-up atau formulir review yang terbuka, isi detail yang valid dari pasien. Mulai dari memilih Fasilitas Kesehatan Tingkat Pertama (FKTP) Rujukan asal pasien, mengunggah salinan/foto resep fisik resmi dari dokter, dan memasukkan item obat beserta jumlahnya secara akurat sesuai isi resep asli. Setelah data terverifikasi cocok, tekan tombol "Simpan Transaksi" untuk merampungkan proses verifikasi klaim.',
    imageUrl: 'https://i.ibb.co/spm8hDMg/form-review.png',
    imageAlt: 'Formulir rujukan FKTP, unggah resep, dan pengisian obat BPJS'
  }
]

const bpjsFaqs: BpjsFaq[] = [
  {
    question: 'Mengapa saya harus melengkapi data rujukan FKTP dan resep?',
    answer: 'Sesuai dengan regulasi jaminan BPJS Kesehatan, setiap klaim obat kapitasi wajib disertai bukti FKTP rujukan yang sah dan lampiran resep asli dokter. Pengisian data yang lengkap dan valid menjamin proses settlement klaim bulanan apotek Anda berjalan mulus tanpa penolakan atau retur berkas oleh verifikator BPJS.'
  },
  {
    question: 'Format berkas apa saja yang didukung untuk unggah resep?',
    answer: 'ApotekApp mendukung format gambar standar berkinerja tinggi seperti JPG, JPEG, PNG, serta dokumen PDF. Pastikan foto atau pindaian resep fisik asli terlihat jelas, tajam, dan nama obat serta paraf dokter terbaca dengan baik untuk mempermudah audit klaim.'
  },
  {
    question: 'Apakah stok obat akan otomatis terpotong setelah saya menyimpan formulir?',
    answer: 'Ya, sistem inventori pintar ApotekApp menerapkan real-time update. Begitu tombol "Simpan Transaksi" ditekan, stok obat pada batch FEFO (First Expired, First Out) terdekat di apotek Anda akan langsung terpotong secara otomatis.'
  },
  {
    question: 'Bagaimana jika resep pasien memiliki obat racikan multi-item?',
    answer: 'Pada Langkah 3, sistem input ApotekApp menyediakan tombol khusus untuk menambahkan resep racikan. Anda dapat memasukkan multi-item obat sekaligus, menentukan metode kemasan (kapsul, puyer, salep), serta menetapkan biaya jasa peracikan secara transparan.'
  }
]

const ApotekAppBpjsGuidePage: React.FC = () => {
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
    document.title = 'Panduan Fitur Review & Lengkapi BPJS ApotekApp | Kancio';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Panduan langkah demi langkah memvalidasi klaim BPJS Kapitasi di ApotekApp. Pelajari pengisian rujukan FKTP, unggah berkas resep, dan verifikasi kuantitas obat.');
    
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
    <div className="product-page apotek-docs-page">
      <div className="container">
        
        {/* Breadcrumbs */}
        <div className="docs-breadcrumb">
          <Link to="/">Beranda</Link>
          <span className="docs-breadcrumb-separator">/</span>
          <Link to="/products/custom-apps">Produk</Link>
          <span className="docs-breadcrumb-separator">/</span>
          <Link to="/products/apotekapp">ApotekApp</Link>
          <span className="docs-breadcrumb-separator">/</span>
          <span className="docs-breadcrumb-current">Panduan BPJS</span>
        </div>

        <div className="docs-grid">
          
          {/* Sidebar Navigation Index */}
          <aside className="docs-sidebar">
            <h3 className="docs-sidebar-title">
              <span>📖</span> Menu Navigasi
            </h3>
            <ul className="docs-sidebar-menu">
              <li className="docs-sidebar-item">
                <a
                  href="#pengantar"
                  className={`docs-sidebar-link ${activeTab === 'steps' ? 'docs-sidebar-link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('steps');
                    document.getElementById('pengantar')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  🏥 Pengantar Modul BPJS
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a
                  href="#panduan"
                  className={`docs-sidebar-link ${activeTab === 'steps' ? 'docs-sidebar-link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('steps');
                    document.getElementById('panduan')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  🚀 Alur 3 Langkah
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a
                  href="#faq"
                  className={`docs-sidebar-link ${activeTab === 'faq' ? 'docs-sidebar-link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('faq');
                    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ❓ Pertanyaan Umum (FAQ)
                </a>
              </li>
              <li className="docs-sidebar-item">
                <a
                  href="#konsultasi"
                  className="docs-sidebar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('konsultasi-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  🤝 Layanan Konsultasi
                </a>
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="docs-content-wrapper">
            
            {/* Header Card */}
            <div className="docs-header-card" id="pengantar">
              <div className="docs-badge-wrapper">
                <span>🛡️</span> Modul Penjualan BPJS
              </div>
              <h1>Panduan Lengkap Fitur "Review &amp; Lengkapi" BPJS</h1>
              <p className="docs-description">
                Selamat datang di pusat bantuan ApotekApp. Halaman ini menyajikan petunjuk praktis bagi petugas kasir dan apoteker dalam mengoperasikan alur tinjauan resep jaminan kesehatan nasional BPJS Kesehatan. Pahami cara melengkapi data FKTP rujukan, mengunggah bukti resep fisik, dan memverifikasi kuantitas obat demi kelancaran administrasi apotek Anda.
              </p>
            </div>

            {/* Google AdSense Content Break Ad */}
            <div className="content-break-ad" style={{ margin: '20px 0' }}>
              <GoogleAdSense
                userConsent={userConsent}
                adFormat="horizontal"
                variant="premium"
                adLabel="Advertisement"
                showLoadingAnimation={true}
                className="docs-inline-ad"
              />
            </div>

            {/* Content Tabs */}
            <div className="docs-tabs-container" id="panduan">
              <button
                className={`docs-tab-btn ${activeTab === 'steps' ? 'docs-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('steps')}
              >
                📖 Alur & Langkah Panduan
              </button>
              <button
                className={`docs-tab-btn ${activeTab === 'faq' ? 'docs-tab-btn--active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                ❓ Pertanyaan Umum (FAQ)
              </button>
            </div>

            {/* Dynamic Tab Content rendering */}
            {activeTab === 'steps' ? (
              <div className="docs-bpjs-steps">
                {bpjsSteps.map((step) => (
                  <section key={step.number} className="docs-bpjs-step-card" id={`langkah-${step.number}`}>
                    <div className="docs-step-info">
                      <div className="docs-step-badge">
                        <span className="docs-step-number">{step.number}</span>
                        <h3>Langkah {step.number}: {step.title}</h3>
                      </div>
                      <p>{step.description}</p>
                      
                      {step.actionUrl && (
                        <div className="docs-copy-card">
                          <span className="docs-copy-url">{step.actionUrl}</span>
                          <button
                            className={`docs-copy-btn ${copied ? 'docs-copy-btn--copied' : ''}`}
                            onClick={() => handleCopyLink(step.actionUrl || '')}
                          >
                            {copied ? 'Tautan Tersalin! 📋' : 'Salin Tautan 🔗'}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="docs-step-visual" onClick={() => handleOpenLightbox(step.imageUrl, step.imageAlt)}>
                      <img
                        src={step.imageUrl}
                        alt={step.imageAlt}
                        className="docs-step-img"
                      />
                    </div>
                  </section>
                ))}

                {/* Pro Tip Panel */}
                <div className="docs-tip-panel">
                  <div className="docs-tip-icon">💡</div>
                  <div className="docs-tip-content">
                    <h4>Rekomendasi Operasional Apotek</h4>
                    <p>
                      Selalu lakukan pencocokan data nama pasien BPJS di lembar resep fisik dengan data identitas jaminan kartu BPJS yang terinput di komputer kasir untuk menghindari kesalahan klaim administratif.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="docs-faq-list" id="faq-section">
                {bpjsFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div
                      key={index}
                      className={`docs-faq-card ${isOpen ? 'docs-faq-card--open' : ''}`}
                    >
                      <button
                        className="docs-faq-trigger"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="docs-faq-question">{faq.question}</span>
                        <span className="docs-faq-chevron">{isOpen ? '−' : '+'}</span>
                      </button>
                      <div className="docs-faq-content" style={{ maxHeight: isOpen ? '300px' : '0' }}>
                        <p className="docs-faq-answer">{faq.answer}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Google AdSense Footer Context Ad */}
            <div className="content-break-ad" style={{ margin: '30px 0 10px' }}>
              <GoogleAdSense
                userConsent={userConsent}
                adFormat="horizontal"
                variant="minimal"
                adLabel="Advertisement"
                showLoadingAnimation={true}
                className="docs-footer-ad"
              />
            </div>

            {/* Footer Internal Links Card */}
            <div className="docs-footer-links-card" id="konsultasi-section">
              <h4>🔍 Artikel &amp; Informasi Relevan Lainnya</h4>
              <ul className="docs-internal-links-list">
                <li className="docs-internal-link-item">
                  Kembali ke halaman utama produk untuk mempelajari kecanggihan kecerdasan AI penilai markup supplier, dashboard keuangan multi-cabang, dan sistem POS kasir lengkap di [halaman fitur utama ApotekApp Kancio](/products/apotekapp).
                </li>
                <li className="docs-internal-link-item">
                  Ingin mengintegrasikan sistem ERP kustom ini dengan aplikasi POS internal klinik, puskesmas, atau jaringan waralaba apotek besar Anda? Ajukan konsultasi langsung dengan [Jasa Konsultan IT Spesialis Kancio Development](/services/consulting) hari ini.
                </li>
              </ul>
            </div>

          </main>

        </div>
      </div>

      {/* Zoomable Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="docs-lightbox-overlay" 
          onClick={handleOverlayClick}
          onWheel={handleWheel}
        >
          {/* Top Instruction Badge */}
          <div className="docs-lightbox-instruction">
            Seret gambar untuk menggeser • Klik dua kali untuk reset
          </div>

          {/* Close Button */}
          <button className="docs-lightbox-close" onClick={handleCloseLightbox} aria-label="Tutup">
            &times;
          </button>

          {/* Draggable Viewport */}
          <div 
            className="docs-lightbox-content"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleResetZoom}
            onClick={handleOverlayClick}
          >
            <img 
              src={lightboxImage} 
              alt={lightboxAlt} 
              className="docs-lightbox-img"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>

          {/* Control Bar */}
          <div className="docs-lightbox-controls">
            <span className="docs-control-indicator">
              {Math.round(zoomScale * 100)}%
            </span>
            <button className="docs-control-btn" onClick={handleZoomOut} title="Perkecil">
              &minus;
            </button>
            <button className="docs-control-btn" onClick={handleZoomIn} title="Perbesar">
              &#43;
            </button>
            <button className="docs-control-btn docs-control-btn--text" onClick={handleResetZoom}>
              🔄 Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApotekAppBpjsGuidePage
