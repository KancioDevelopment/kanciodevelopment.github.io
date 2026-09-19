import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import './SupportPage.css'

interface FAQItem {
  id: string
  category: 'all' | 'apotekapp' | 'pulsaapp' | 'custom' | 'billing'
  question: string
  answer: string
  badge: string
}

const faqs: FAQItem[] = [
  {
    id: 'apotek-1',
    category: 'apotekapp',
    badge: 'ApotekApp ERP',
    question: 'Bagaimana cara memulai registrasi dan setup awal ApotekApp ERP?',
    answer:
      'Anda dapat langsung mengakses portal resmi di https://apotek.kancio.com/ atau menghubungi Customer Support via WhatsApp. Tim teknis Kancio akan mendampingi proses import data master obat, batch nomor & tanggal kedaluwarsa (FEFO), penetapan HPP & margin harga, hingga konfigurasi hak akses staf kasir dan apoteker.',
  },
  {
    id: 'apotek-2',
    category: 'apotekapp',
    badge: 'ApotekApp ERP',
    question: 'Apakah ApotekApp mendukung integrasi BPJS Kesehatan (Kapitasi & PRB)?',
    answer:
      'Ya. ApotekApp dilengkapi modul rekonsiliasi klaim BPJS untuk Program Rujuk Balik (PRB) dan verifikasi resep kronis. Data resep dan obat yang diserahkan terekonsiliasi otomatis tanpa risiko selisih data saat pelaporan ke faskes tingkat pertama.',
  },
  {
    id: 'apotek-3',
    category: 'apotekapp',
    badge: 'ApotekApp ERP',
    question: 'Bagaimana jika koneksi internet di apotek mengalami gangguan sementara?',
    answer:
      'Sistem kasir POS ApotekApp dirancang dengan mekanisme sinkronisasi data cerdas (offline-resilient sync). Transaksi penjualan tunai harian tetap dapat berjalan, dan data akan terunggah secara otomatis saat koneksi internet kembali normal.',
  },
  {
    id: 'pulsa-1',
    category: 'pulsaapp',
    badge: 'PulsaApp 24 Jam',
    question: 'Berapa lama rata-rata kecepatan transaksi di server PulsaApp?',
    answer:
      'Server PulsaApp beroperasi nonstop 24 jam dengan auto-routing multi-provider berkecepatan 1–5 detik untuk pulsa reguler, paket data internet, token PLN, dan top up e-wallet. Sistem otomatis mengalihkan jalur jika salah satu jalur provider sedang mengalami gangguan.',
  },
  {
    id: 'pulsa-2',
    category: 'pulsaapp',
    badge: 'PulsaApp 24 Jam',
    question: 'Bagaimana metode deposit saldo dan apakah terverifikasi otomatis?',
    answer:
      'Deposit saldo dapat dilakukan 24 jam nonstop melalui QRIS Real-Time (semua bank & e-wallet) serta Transfer Virtual Account bank nasional (BCA, Mandiri, BRI, BNI). Saldo akan bertambah secara instan dalam hitungan detik tanpa perlu konfirmasi manual.',
  },
  {
    id: 'pulsa-3',
    category: 'pulsaapp',
    badge: 'PulsaApp 24 Jam',
    question: 'Apakah PulsaApp mendukung cetak struk via printer thermal Bluetooth?',
    answer:
      'Ya, aplikasi web & mobile PulsaApp mendukung pencetakan struk pembayaran ke printer thermal Bluetooth 58mm & 80mm, serta ekspor struk digital dalam format PDF dan gambar untuk dikirim via WhatsApp ke pelanggan Anda.',
  },
  {
    id: 'custom-1',
    category: 'custom',
    badge: 'Custom & AI Solution',
    question: 'Bagaimana proses pembuatan aplikasi kustom atau integrasi AI bersama Kancio?',
    answer:
      'Proses dimulai dari sesi konsultasi awal & analisis kebutuhan bisnis (Requirement Gathering), dilanjutkan dengan perancangan arsitektur UI/UX, pengembangan iteratif berkala (Agile Sprint), hingga implementasi production dan pelatihan tim operasional Anda.',
  },
  {
    id: 'custom-2',
    category: 'custom',
    badge: 'Custom & AI Solution',
    question: 'Apakah Kancio menyediakan garansi dan SLA maintenance pasca-rilis?',
    answer:
      'Setiap proyek solusi digital Kancio disertai masa garansi bug-free, pemantauan server cloud berkala, SLA respon teknis darurat, serta paket maintenance berkelanjutan untuk update keamanan dan penambahan fitur baru.',
  },
  {
    id: 'billing-1',
    category: 'billing',
    badge: 'Kemitraan & Billing',
    question: 'Bagaimana cara mengajukan invoice resmi atau kerja sama kemitraan institusi?',
    answer:
      'Untuk kebutuhan invoice perusahaan, nota dinas, penawaran harga (quotation), atau kerja sama kemitraan B2B, silakan hubungi tim administrasi kami melalui formulir tiket di bawah atau langsung via email ke support@kancio.com.',
  },
]

const systemStatus = [
  { service: 'Server PulsaApp 24 Jam', status: 'Operational', uptime: '99.99%', color: '#10b981' },
  { service: 'ApotekApp Cloud ERP', status: 'Operational', uptime: '99.95%', color: '#10b981' },
  { service: 'Gateway Pembayaran QRIS', status: 'Operational', uptime: '99.98%', color: '#10b981' },
  { service: 'Customer Support WhatsApp', status: 'Online 24/7', uptime: '< 5 Menit Respon', color: '#06b6d4' },
]

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'apotekapp' | 'pulsaapp' | 'custom' | 'billing'>('all')
  const [openFaqId, setOpenFaqId] = useState<string | null>('apotek-1')

  // Form State
  const [ticketForm, setTicketForm] = useState({
    name: '',
    phone: '',
    serviceType: 'ApotekApp ERP',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  useSEO({
    title: 'Pusat Bantuan & Layanan Dukungan Pelanggan 24 Jam',
    description:
      'Pusat bantuan resmi Kancio Development: panduan teknis, FAQ ApotekApp ERP & PulsaApp SaaS, status uptime server, dan akses langsung WhatsApp Customer Support 24 jam.',
    keywords:
      'pusat bantuan kancio, cs pulsaapp 24 jam, support apotekapp, bantuan kasir apotek, kontak kancio development, tiket bantuan digital, layanan teknis apotekapp',
    canonicalUrl: 'https://kancio.com/support',
  })

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCat = selectedCategory === 'all' || faq.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchQuery =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.badge.toLowerCase().includes(query)
      return matchCat && matchQuery
    })
  }, [selectedCategory, searchQuery])

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketForm.name.trim() || !ticketForm.message.trim()) return

    setIsSubmitting(true)

    // Construct WhatsApp message
    const waText = encodeURIComponent(
      `Halo Tim Support Kancio Development,\n\nSaya ingin mengajukan kendala/pertanyaan bantuan:\n- Nama: ${ticketForm.name}\n- Nomor HP/WA: ${ticketForm.phone || 'Sesuai pengirim'}\n- Layanan/Produk: ${ticketForm.serviceType}\n- Detail Kendala: ${ticketForm.message}\n\nMohon bantuan dan arahannya. Terima kasih.`
    )

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
      window.open(`https://wa.me/6282325600996?text=${waText}`, '_blank')
    }, 400)
  }

  return (
    <div className="support-page">
      {/* Ambient background glows */}
      <div className="support-ambient-glow" aria-hidden="true">
        <div className="glow-circle glow-circle--1" />
        <div className="glow-circle glow-circle--2" />
        <div className="glow-grid" />
      </div>

      <div className="container">
        {/* Breadcrumb */}
        <nav className="support-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Beranda</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Pusat Bantuan &amp; Support</span>
        </nav>

        {/* Hero Section */}
        <header className="support-hero">
          <div className="support-hero__badge">
            <span className="support-pulse-dot" />
            <span>PUSAT DUKUNGAN RESMI KANCIO</span>
          </div>

          <h1 className="support-hero__title">
            Bagaimana Kami Dapat <br />
            <span className="text-gradient">Membantu Bisnis Anda?</span>
          </h1>

          <p className="support-hero__subtitle">
            Dapatkan respon kilat, panduan operasional sistem ApotekApp &amp; PulsaApp, pemantauan status server, serta akses langsung ke tim teknis Kancio Development.
          </p>

          {/* Quick Search Bar */}
          <div className="support-search-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="support-search-input"
              placeholder="Cari solusi, kendala transaksi, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari bantuan atau pertanyaan umum"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        {/* 1-Tap Mobile Direct Channels */}
        <section className="support-channels-section" aria-labelledby="channels-heading">
          <div className="section-header-compact">
            <span className="badge badge--accent">Respon Cepat</span>
            <h2 id="channels-heading" className="section-compact-title">Saluran Bantuan Langsung</h2>
          </div>

          <div className="support-channels-grid">
            {/* WhatsApp 24 Jam */}
            <a
              href="https://wa.me/6282325600996?text=Halo%20Tim%20Support%20Kancio%2C%20saya%20memerlukan%20bantuan%20teknis%20layanan."
              target="_blank"
              rel="noopener noreferrer"
              className="support-channel-card card channel-wa"
              title="Hubungi WhatsApp Customer Support 24 Jam"
            >
              <div className="channel-icon-bubble">💬</div>
              <div className="channel-info">
                <div className="channel-status-pill">● Aktif 24 Jam</div>
                <h3 className="channel-title">WhatsApp Priority CS</h3>
                <p className="channel-desc">Konsultasi cepat, panduan fitur, dan penanganan kendala sistem dalam hitungan menit.</p>
                <div className="channel-action-label">
                  <span>Chat WhatsApp Sekarang</span>
                  <span className="arrow-icon">↗</span>
                </div>
              </div>
            </a>

            {/* Email Support */}
            <a
              href="mailto:support@kancio.com?subject=Permintaan%20Bantuan%20Teknis%20Kancio"
              className="support-channel-card card channel-email"
              title="Kirim Email ke Helpdesk Kancio"
            >
              <div className="channel-icon-bubble">✉️</div>
              <div className="channel-info">
                <div className="channel-status-pill">Tiket Resmi</div>
                <h3 className="channel-title">Email Helpdesk</h3>
                <p className="channel-desc">Kirim dokumen teknis, pengajuan invoice institusi, atau laporan investigasi mendalam.</p>
                <div className="channel-action-label">
                  <span>support@kancio.com</span>
                  <span className="arrow-icon">↗</span>
                </div>
              </div>
            </a>

            {/* Live Web Portals */}
            <div className="support-channel-card card channel-portals">
              <div className="channel-icon-bubble">🌐</div>
              <div className="channel-info">
                <div className="channel-status-pill">Portal Web Apps</div>
                <h3 className="channel-title">Akses Portal Mandiri</h3>
                <p className="channel-desc">Login mandiri ke dashboard resmi untuk cek transaksi dan pantau stok apotek secara live.</p>
                <div className="channel-portal-links">
                  <a href="https://apotek.kancio.com/" target="_blank" rel="noopener noreferrer" className="mini-portal-btn">
                    💊 ApotekApp Web ↗
                  </a>
                  <a href="https://ppob.kancio.com/" target="_blank" rel="noopener noreferrer" className="mini-portal-btn">
                    ⚡ PulsaApp Web ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time System Health / Status Bar */}
        <section className="support-status-section" aria-labelledby="status-heading">
          <div className="status-bar-card glass-panel">
            <div className="status-bar-header">
              <div className="status-badge-live">
                <span className="live-radar-dot" />
                <span className="status-badge-text">STATUS SISTEM CLOUD</span>
              </div>
              <span className="status-overall-text">Seluruh Sistem Normal &amp; Beroperasi Penuh</span>
            </div>

            <div className="status-metrics-grid">
              {systemStatus.map((item, idx) => (
                <div key={idx} className="status-metric-item">
                  <div className="status-metric-header">
                    <span className="metric-dot" style={{ backgroundColor: item.color }} />
                    <span className="metric-service-name">{item.service}</span>
                  </div>
                  <div className="status-metric-footer">
                    <span className="metric-status-val">{item.status}</span>
                    <span className="metric-uptime-val">{item.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section with Filter Tabs */}
        <section className="support-faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="section-header">
            <div className="badge badge--accent">Pertanyaan Umum</div>
            <h2 id="faq-heading">
              Pertanyaan yang Sering <span className="text-gradient">Diajukan (FAQ)</span>
            </h2>
            <p>Temukan jawaban instan seputar aktivasi produk, transaksi, dan integrasi sistem.</p>
          </div>

          {/* Category Filter Chips */}
          <div className="faq-category-tabs" role="tablist" aria-label="Filter kategori FAQ">
            <button
              role="tab"
              aria-selected={selectedCategory === 'all'}
              className={`faq-cat-btn ${selectedCategory === 'all' ? 'faq-cat-btn--active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Semua Topik
            </button>
            <button
              role="tab"
              aria-selected={selectedCategory === 'apotekapp'}
              className={`faq-cat-btn ${selectedCategory === 'apotekapp' ? 'faq-cat-btn--active' : ''}`}
              onClick={() => setSelectedCategory('apotekapp')}
            >
              💊 ApotekApp ERP
            </button>
            <button
              role="tab"
              aria-selected={selectedCategory === 'pulsaapp'}
              className={`faq-cat-btn ${selectedCategory === 'pulsaapp' ? 'faq-cat-btn--active' : ''}`}
              onClick={() => setSelectedCategory('pulsaapp')}
            >
              ⚡ PulsaApp 24 Jam
            </button>
            <button
              role="tab"
              aria-selected={selectedCategory === 'custom'}
              className={`faq-cat-btn ${selectedCategory === 'custom' ? 'faq-cat-btn--active' : ''}`}
              onClick={() => setSelectedCategory('custom')}
            >
              🚀 Custom &amp; AI
            </button>
            <button
              role="tab"
              aria-selected={selectedCategory === 'billing'}
              className={`faq-cat-btn ${selectedCategory === 'billing' ? 'faq-cat-btn--active' : ''}`}
              onClick={() => setSelectedCategory('billing')}
            >
              💼 Kemitraan &amp; Billing
            </button>
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-accordion-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id
                return (
                  <div key={faq.id} className={`faq-accordion-item ${isOpen ? 'faq-accordion-item--open' : ''}`}>
                    <button
                      className="faq-question-trigger"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <div className="faq-question-content">
                        <span className="faq-item-badge">{faq.badge}</span>
                        <h3 className="faq-question-text">{faq.question}</h3>
                      </div>
                      <span className={`faq-toggle-icon ${isOpen ? 'faq-toggle-icon--rotated' : ''}`} aria-hidden="true">
                        ▼
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${faq.id}`}
                      className="faq-answer-wrapper"
                      hidden={!isOpen}
                    >
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="faq-empty-state glass-panel">
                <span className="empty-icon">🔍</span>
                <h3>Topik Tidak Ditemukan</h3>
                <p>Tidak ada jawaban yang sesuai dengan kata kunci &quot;{searchQuery}&quot;.</p>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                >
                  Reset Filter &amp; Tampilkan Semua
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Ticket & Consultation Form */}
        <section className="support-form-section" id="tiket" aria-labelledby="form-heading">
          <div className="support-form-card glass-panel">
            <div className="form-card-text">
              <span className="badge">Tiket Bantuan</span>
              <h2 id="form-heading">Belum Menemukan Solusi?</h2>
              <p>
                Tuliskan kendala Anda secara ringkas. Tim teknis Kancio akan langsung menganalisis dan menghubungi Anda via WhatsApp resmi.
              </p>

              <div className="form-perks-list">
                <div className="form-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Respon rata-rata kurang dari 5 menit pada jam aktif</span>
                </div>
                <div className="form-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Pendampingan teknis langsung dari engineer pengembang</span>
                </div>
                <div className="form-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Privasi data operasional terjamin 100% aman</span>
                </div>
              </div>
            </div>

            <div className="form-card-wrapper">
              {isSent ? (
                <div className="support-success-box" role="status">
                  <span className="success-icon">✅</span>
                  <h3>Pesan Berhasil Diteruskan!</h3>
                  <p>
                    Anda telah diarahkan ke WhatsApp Customer Support resmi Kancio Development. Tim kami segera merespon tiket Anda.
                  </p>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => {
                      setIsSent(false)
                      setTicketForm({
                        name: '',
                        phone: '',
                        serviceType: 'ApotekApp ERP',
                        message: '',
                      })
                    }}
                  >
                    Kirim Pertanyaan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="support-ticket-form">
                  <div className="form-group">
                    <label htmlFor="support-name">Nama Lengkap / Nama Bisnis *</label>
                    <input
                      id="support-name"
                      type="text"
                      required
                      className="form-input"
                      placeholder="Contoh: Apotek Sehat Farma / Bpk. Rian"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="support-phone">Nomor WhatsApp Aktif</label>
                    <input
                      id="support-phone"
                      type="tel"
                      className="form-input"
                      placeholder="Contoh: 081234567890"
                      value={ticketForm.phone}
                      onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="support-service">Pilih Layanan Terkait *</label>
                    <select
                      id="support-service"
                      className="form-select"
                      value={ticketForm.serviceType}
                      onChange={(e) => setTicketForm({ ...ticketForm, serviceType: e.target.value })}
                    >
                      <option value="ApotekApp ERP">💊 ApotekApp ERP &amp; Kasir POS</option>
                      <option value="PulsaApp SaaS">⚡ PulsaApp &amp; Server PPOB 24 Jam</option>
                      <option value="Custom Software Development">🚀 Jasa Pembuatan Aplikasi Kustom</option>
                      <option value="AI Integration & Automation">🤖 Integrasi AI &amp; Otomasi Sistem</option>
                      <option value="Billing, Invoice & Kemitraan">💼 Pembayaran, Invoice &amp; Kemitraan</option>
                      <option value="Lainnya">💬 Pertanyaan Umum Lainnya</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="support-message">Jelaskan Kendala atau Kebutuhan Bantuan *</label>
                    <textarea
                      id="support-message"
                      required
                      rows={4}
                      className="form-textarea"
                      placeholder="Ceritakan kendala yang dihadapi, pertanyaan setup, atau bantuan yang dibutuhkan..."
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary btn--large submit-ticket-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Meneruskan Pesan...' : 'Kirim ke Customer Support WhatsApp ↗'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SupportPage
