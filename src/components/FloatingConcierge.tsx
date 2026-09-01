import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './FloatingConcierge.css'

const quickIntents = [
  {
    icon: '💊',
    title: 'Konsultasi ApotekApp ERP',
    desc: 'Otomasi POS FEFO & Rekonsiliasi BPJS PRB',
    message: 'Halo Tim Kancio, saya ingin konsultasi demo & implementasi ApotekApp ERP untuk apotek/klinik saya.',
  },
  {
    icon: '⚡',
    title: 'Distributor Pulsa & Server PPOB',
    desc: 'Transaksi 1-5 detik, QRIS 24 jam & API H2H',
    message: 'Halo Tim Kancio, saya ingin daftar kemitraan Agen PulsaApp / integrasi Server PPOB H2H.',
  },
  {
    icon: '🚀',
    title: 'Jasa Pembuatan Aplikasi Kustom',
    desc: 'Web portal enterprise, mobile app iOS/Android',
    message: 'Halo Tim Kancio, saya memiliki ide proyek aplikasi kustom dan ingin mendiskusikan estimasi biaya & timeline.',
  },
  {
    icon: '🤖',
    title: 'Integrasi AI & Otomasi Alur Kerja',
    desc: 'Chatbot WhatsApp pintar & ekstraksi dokumen OCR',
    message: 'Halo Tim Kancio, saya tertarik mengintegrasikan teknologi AI (Chatbot/OCR) ke dalam sistem operasional kami.',
  },
]

const quickDemos = [
  {
    name: 'ApotekApp POS & FEFO Demo',
    badge: 'Live ERP Demo',
    icon: '💊',
    path: '/products/apotekapp#simulator',
    color: '#06b6d4',
  },
  {
    name: 'PulsaApp Margin Calculator',
    badge: 'Live Calculator',
    icon: '⚡',
    path: '/products/pulsaapp#simulator',
    color: '#f472b6',
  },
  {
    name: 'Project Scope & Timeline Estimator',
    badge: 'Interactive Estimator',
    icon: '🧪',
    path: '/services#estimator',
    color: '#818cf8',
  },
  {
    name: 'AI Pipeline & OCR Simulator',
    badge: 'Live AI Simulator',
    icon: '🤖',
    path: '/services/ai-integration#ai-sim',
    color: '#34d399',
  },
]

const FloatingConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'demos' | 'schedule'>('chat')
  const [hasUnread, setHasUnread] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  // Booking Form State
  const [booking, setBooking] = useState({
    name: '',
    preferredDate: '',
    preferredTime: '10:00 WIB',
    topic: 'Konsultasi Ekosistem Kancio',
  })
  const [bookingSent, setBookingSent] = useState(false)

  // Keyboard Escape Handler & Outside Click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Only close if clicked outside the floating widget
        const trigger = document.getElementById('concierge-trigger')
        if (trigger && !trigger.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleOpenToggle = () => {
    setIsOpen(!isOpen)
    if (hasUnread) setHasUnread(false)
  }

  const handleSendWhatsApp = (customMsg: string) => {
    const url = `https://wa.me/6282325600996?text=${encodeURIComponent(customMsg)}`
    window.open(url, '_blank')
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!booking.name) return

    const msg = `Halo Tim Rekayasa Kancio Development,\n\nSaya ingin booking 30-Minute Discovery Call via Concierge:\n- Nama: ${booking.name}\n- Tanggal Pilihan: ${booking.preferredDate || 'Segera (Fleksibel)'}\n- Jam: ${booking.preferredTime}\n- Topik: ${booking.topic}`
    handleSendWhatsApp(msg)
    setBookingSent(true)
  }

  return (
    <div className="floating-concierge-wrapper">
      {/* ===== EXPANDED CONCIERGE PANEL ===== */}
      {isOpen && (
        <div className="concierge-panel glass-panel animate-scale-up" ref={panelRef}>
          {/* Panel Header */}
          <div className="concierge-header">
            <div className="concierge-profile">
              <div className="concierge-avatar">
                <span>🚀</span>
                <span className="avatar-online-dot" />
              </div>
              <div className="concierge-info">
                <span className="concierge-title">Kancio Concierge</span>
                <span className="concierge-subtitle">● Tim Teknis Siaga Online</span>
              </div>
            </div>
            <button
              className="concierge-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup Concierge"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="concierge-tabs">
            <button
              className={`concierge-tab ${activeTab === 'chat' ? 'concierge-tab--active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 WhatsApp
            </button>
            <button
              className={`concierge-tab ${activeTab === 'demos' ? 'concierge-tab--active' : ''}`}
              onClick={() => setActiveTab('demos')}
            >
              🧪 Demo Live
            </button>
            <button
              className={`concierge-tab ${activeTab === 'schedule' ? 'concierge-tab--active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              📅 Booking Call
            </button>
          </div>

          {/* Tab 1: WhatsApp Quick Intents */}
          {activeTab === 'chat' && (
            <div className="concierge-body animate-fade-in">
              <p className="concierge-intro-text">
                Pilih topik kebutuhan Anda untuk terhubung langsung dengan Solution Architect Kancio:
              </p>
              <div className="intent-list">
                {quickIntents.map((item, idx) => (
                  <button
                    key={idx}
                    className="intent-card"
                    onClick={() => handleSendWhatsApp(item.message)}
                  >
                    <span className="intent-icon">{item.icon}</span>
                    <div className="intent-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <span className="intent-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Quick Demos & Simulators */}
          {activeTab === 'demos' && (
            <div className="concierge-body animate-fade-in">
              <p className="concierge-intro-text">
                Uji coba langsung antarmuka dan simulator interaktif produk unggulan kami:
              </p>
              <div className="demo-list">
                {quickDemos.map((demo, idx) => (
                  <Link
                    key={idx}
                    to={demo.path}
                    className="demo-item-card"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="demo-icon" style={{ borderColor: demo.color }}>
                      {demo.icon}
                    </span>
                    <div className="demo-meta">
                      <span className="demo-badge" style={{ color: demo.color }}>
                        {demo.badge}
                      </span>
                      <strong>{demo.name}</strong>
                    </div>
                    <span className="demo-action">Coba ⚡</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Inline 1-Click Meeting Scheduler */}
          {activeTab === 'schedule' && (
            <div className="concierge-body animate-fade-in">
              {bookingSent ? (
                <div className="concierge-success-state">
                  <span className="succ-icon">🎉</span>
                  <h4>Jadwal Terkirim!</h4>
                  <p>
                    Anda telah diarahkan ke WhatsApp untuk konfirmasi jadwal Google Meet bersama tim teknis Kancio.
                  </p>
                  <button
                    className="btn btn--secondary btn--sm cyber-btn-secondary"
                    onClick={() => setBookingSent(false)}
                  >
                    Jadwalkan Sesi Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="concierge-booking-form">
                  <p className="concierge-intro-text">
                    Jadwalkan sesi konsultasi teknis 30 menit (Google Meet) bebas biaya:
                  </p>

                  <div className="form-group-mini">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Pratama"
                      value={booking.name}
                      onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row-mini">
                    <div className="form-group-mini">
                      <label>Tanggal</label>
                      <input
                        type="date"
                        value={booking.preferredDate}
                        onChange={(e) =>
                          setBooking({ ...booking, preferredDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group-mini">
                      <label>Waktu</label>
                      <select
                        value={booking.preferredTime}
                        onChange={(e) =>
                          setBooking({ ...booking, preferredTime: e.target.value })
                        }
                      >
                        <option value="10:00 WIB">10:00 WIB</option>
                        <option value="14:00 WIB">14:00 WIB</option>
                        <option value="16:00 WIB">16:00 WIB</option>
                        <option value="19:30 WIB">19:30 WIB</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary btn-block cyber-btn-primary">
                    ⚡ Konfirmasi Jadwal via WhatsApp
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Panel Footer */}
          <div className="concierge-footer">
            <span>🛡️ Respon Cepat &lt; 2 Jam • Kancio Development</span>
          </div>
        </div>
      )}

      {/* ===== FLOATING TRIGGER BUTTON ===== */}
      <button
        id="concierge-trigger"
        className={`concierge-floating-btn ${isOpen ? 'concierge-floating-btn--active' : ''}`}
        onClick={handleOpenToggle}
        aria-label="Buka Kancio Concierge"
      >
        <span className="floating-btn-glow" />
        <span className="floating-btn-icon">{isOpen ? '✕' : '💬'}</span>
        <span className="floating-btn-label">Tanya Kancio</span>

        {hasUnread && !isOpen && <span className="floating-unread-badge">1</span>}
      </button>
    </div>
  )
}

export default FloatingConcierge
