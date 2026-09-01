import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import GoogleAdSense from '../../components/GoogleAdSense'
import { useAds } from '../../hooks/useAds'
import { useSEO } from '../../hooks/useSEO'
import './ServicePage.css'

const capabilities = [
  {
    icon: '🌐',
    title: 'Enterprise Web Application',
    desc: 'Portal internal, dashboard analitik multi-role, dan backoffice berskala tinggi dengan performa loading instan.',
  },
  {
    icon: '📱',
    title: 'Cross-Platform Mobile Apps',
    desc: 'Aplikasi Android & iOS dari satu codebase teroptimasi dengan integrasi push notification & offline-first sync.',
  },
  {
    icon: '🏢',
    title: 'Custom ERP & POS Retail',
    desc: 'Otomasi stok barang FEFO/FIFO, kasir POS barcode, cetak struk thermal, dan rekonsiliasi keuangan multi-outlet.',
  },
  {
    icon: '⚡',
    title: 'High-Concurrency API Gateway',
    desc: 'Arsitektur microservices dan API routing kilat yang mampu menangani jutaan request transaksi per hari tanpa lag.',
  },
  {
    icon: '💳',
    title: 'Payment & Third-Party Sync',
    desc: 'Integrasi otomatis ke payment gateway (QRIS, VA, E-Wallet), WhatsApp Business API, BPJS, dan sistem ekspedisi.',
  },
  {
    icon: '🛡️',
    title: 'Enterprise Security & SLA',
    desc: 'Enkripsi data end-to-end, proteksi DDoS, automated disaster backup, dan garansi uptime 99.9% 24/7.',
  },
]

const stackOptions = {
  frontend: [
    { id: 'react-ts', name: 'React + TypeScript SPA', latency: '12ms', tps: '15.000 TPS' },
    { id: 'next-ssr', name: 'Next.js SSR & Edge Rendering', latency: '8ms', tps: '25.000 TPS' },
    { id: 'mobile-flutter', name: 'Flutter Mobile (iOS & Android)', latency: '16ms', tps: '10.000 TPS' },
  ],
  backend: [
    { id: 'node-fastify', name: 'Node.js Fastify Async API', latency: '4ms', tps: '30.000 TPS' },
    { id: 'go-micro', name: 'Go (Golang) Microservices', latency: '1.5ms', tps: '75.000 TPS' },
    { id: 'python-fastapi', name: 'Python FastAPI (AI & Data Pipeline)', latency: '7ms', tps: '18.000 TPS' },
  ],
  database: [
    { id: 'postgres-relational', name: 'PostgreSQL Relational + ACID', cap: 'High Integrity' },
    { id: 'redis-cache', name: 'Redis In-Memory Cache Tier', cap: 'Sub-Millisecond Read' },
    { id: 'mongo-document', name: 'MongoDB Flexible Document Store', cap: 'Dynamic Schemas' },
  ],
}

const CustomSolutionPage: React.FC = () => {
  const { userConsent } = useAds()

  // Interactive Architecture Sandbox State
  const [selectedFe, setSelectedFe] = useState(0)
  const [selectedBe, setSelectedBe] = useState(1)
  const [selectedDb, setSelectedDb] = useState(0)

  // 30-Min Discovery Meeting Scheduler State
  const [booking, setBooking] = useState({
    name: '',
    company: '',
    preferredDate: '',
    preferredTime: '10:00 WIB',
    topic: 'Konsultasi Arsitektur Web & Mobile App',
  })
  const [bookingSent, setBookingSent] = useState(false)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!booking.name) return

    const waMsg = encodeURIComponent(
      `Halo Tim Kancio Development,\n\nSaya ingin menjadwalkan 30-Minute Discovery Call:\n- Nama: ${booking.name}\n- Perusahaan: ${booking.company || '-'}\n- Tanggal Pilihan: ${booking.preferredDate || 'Segera (Fleksibel)'}\n- Waktu: ${booking.preferredTime}\n- Topik: ${booking.topic}\n- Stack Konfigurasi: ${stackOptions.frontend[selectedFe].name} + ${stackOptions.backend[selectedBe].name} + ${stackOptions.database[selectedDb].name}`
    )
    window.open(`https://wa.me/6282325600996?text=${waMsg}`, '_blank')
    setBookingSent(true)
  }

  useSEO({
    title: 'Custom Digital Solutions - Jasa Pembuatan Aplikasi Enterprise Kancio',
    description:
      'Layanan pembuatan aplikasi web, mobile, dan sistem ERP kustom enterprise. Arsitektur skalabilitas tinggi, full source code ownership, dan dukungan SLA 99.9%.',
    keywords:
      'jasa pembuatan web app enterprise, jasa pembuatan aplikasi mobile, custom erp development, software house jakarta indonesia, kancio custom solution',
    canonicalUrl: 'https://kancio.com/services/custom-solution',
  })

  return (
    <div className="product-page services-page cyber-services-theme">
      {/* ===== HERO ===== */}
      <section className="services-hero">
        <div className="services-hero__bg" />
        <div className="services-grid-overlay" />

        <div className="container">
          <div className="services-hero__content">
            <div className="hero-badge-pill">
              <span className="live-dot-cyan" />
              <span>CUSTOM DIGITAL ENGINEERING • 100% PROPRIETARY IP</span>
            </div>

            <h1 className="services-hero__title">
              Bangun Solusi Perangkat Lunak <br />
              <span className="text-gradient-cyan">Yang Presisi Dengan Skala Bisnis Anda</span>
            </h1>

            <p className="services-hero__desc">
              Dari web portal enterprise, aplikasi mobile, hingga sistem POS dan ERP terdistribusi — kami merekayasa aplikasi yang andal, aman, dan siap bertumbuh bersama bisnis Anda.
            </p>

            <div className="services-hero__cta">
              <a href="#sandbox" className="btn btn--primary btn--large cyber-btn-primary">
                🧪 Live Architecture Sandbox <span className="btn__icon">→</span>
              </a>
              <a href="#schedule" className="btn btn--secondary btn--large cyber-btn-secondary">
                📅 Jadwalkan 30-Min Discovery Call
              </a>
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

      {/* ===== LIVE ARCHITECTURE & STACK SANDBOX ===== */}
      <section className="section" id="sandbox" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Interactive Tech Sandbox</div>
            <h2>
              Uji Simulasi Topologi Arsitektur <br />
              <span className="text-gradient-cyan">Kombinasi Stack Modern &amp; Estimasi Throughput</span>
            </h2>
            <p>
              Pilih komponen arsitektur di bawah untuk melihat estimasi performa latency dan ketahanan throughput yang dihasilkan.
            </p>
          </div>

          <div className="estimator-container glass-panel">
            <div className="estimator-grid">
              {/* Stack Configurator */}
              <div className="estimator-config">
                <h3 className="config-title">Komponen Arsitektur Sistem</h3>

                <div className="config-group">
                  <label className="config-lbl">1. Frontend Layer</label>
                  <div className="options-pill-grid">
                    {stackOptions.frontend.map((item, i) => (
                      <button
                        key={item.id}
                        className={`opt-btn ${i === selectedFe ? 'opt-btn--active' : ''}`}
                        onClick={() => setSelectedFe(i)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="config-group" style={{ marginTop: '10px' }}>
                  <label className="config-lbl">2. Backend API Engine</label>
                  <div className="options-pill-grid">
                    {stackOptions.backend.map((item, i) => (
                      <button
                        key={item.id}
                        className={`opt-btn ${i === selectedBe ? 'opt-btn--active' : ''}`}
                        onClick={() => setSelectedBe(i)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="config-group" style={{ marginTop: '10px' }}>
                  <label className="config-lbl">3. Data &amp; Caching Layer</label>
                  <div className="options-pill-grid">
                    {stackOptions.database.map((item, i) => (
                      <button
                        key={item.id}
                        className={`opt-btn ${i === selectedDb ? 'opt-btn--active' : ''}`}
                        onClick={() => setSelectedDb(i)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Architecture Metric Output */}
              <div className="estimator-output">
                <div className="output-card glass-panel">
                  <span className="output-tag">Simulasi Performa Topologi Terpilih</span>

                  <div className="output-timeline-box">
                    <span className="lbl">Proyeksi Throughput Kapasitas API:</span>
                    <strong className="timeline-val text-gradient-cyan">
                      {stackOptions.backend[selectedBe].tps}
                    </strong>
                    <span className="sub">
                      Estimasi Latency: ~{stackOptions.backend[selectedBe].latency} (Edge Region Jakarta)
                    </span>
                  </div>

                  <div className="team-composition-box">
                    <span className="team-title">Karakteristik &amp; Keunggulan Arsitektur:</span>
                    <div className="team-chips">
                      <span className="team-chip">✓ Zero-Downtime Deployment</span>
                      <span className="team-chip">✓ Auto-Scaling Worker Pods</span>
                      <span className="team-chip">✓ REST &amp; WebSocket Ready</span>
                      <span className="team-chip">✓ Full Source Code Handover</span>
                    </div>
                  </div>

                  <div className="output-cta-box">
                    <a href="#schedule" className="btn btn--primary btn-block cyber-btn-primary">
                      ⚡ Konsultasikan Stack Ini dengan Engineer Kami
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6 CORE CAPABILITIES ===== */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Kapabilitas Rekayasa</div>
            <h2>Solusi Komprehensif Untuk Berbagai Industri</h2>
            <p>Dibangun di atas fondasi arsitektur bersih yang telah teruji melayani jutaan transaksi.</p>
          </div>

          <div className="pillars-grid">
            {capabilities.map((c, i) => (
              <div key={i} className="pillar-card glass-panel">
                <div className="pillar-header">
                  <div className="pillar-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                    {c.icon}
                  </div>
                  <span className="pillar-badge pillar-badge--cyan">Enterprise Grade</span>
                </div>
                <h3 className="pillar-title">{c.title}</h3>
                <p className="pillar-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 30-MIN DISCOVERY CALL SCHEDULER ===== */}
      <section className="section services-rfq-section" id="schedule">
        <div className="container">
          <div className="rfq-card glass-panel">
            <div className="rfq-grid">
              <div className="rfq-intro">
                <div className="badge cyber-pulse-badge">📅 Jadwalkan Sesi</div>
                <h2>Jadwalkan 30-Minute Discovery Call</h2>
                <p>
                  Diskusikan spesifikasi kebutuhan aplikasi Anda bersama Senior Software Architect kami. Dapatkan masukan arsitektur, estimasi timeline, dan rekomendasi teknologi gratis.
                </p>

                <div className="rfq-perks">
                  <div className="perk-row">
                    <span className="p-icon">🎯</span>
                    <div>
                      <strong>Sesi Konsultasi Teknis 1-on-1</strong>
                      <span>Langsung bersama engineer, bukan hanya tim sales.</span>
                    </div>
                  </div>
                  <div className="perk-row">
                    <span className="p-icon">📝</span>
                    <div>
                      <strong>Dokumen Rekomendasi Arsitektur</strong>
                      <span>Dapatkan rangkuman blueprint setelah sesi selesai.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rfq-form-wrap">
                {bookingSent ? (
                  <div className="rfq-success-state animate-fade-in">
                    <div className="success-emoji">🎉</div>
                    <h3>Jadwal Berhasil Diajukan!</h3>
                    <p>
                      Kami telah mengarahkan Anda ke WhatsApp Kancio untuk konfirmasi link Google Meet dan jadwal final.
                    </p>
                    <button
                      className="btn btn--secondary cyber-btn-secondary"
                      onClick={() => setBookingSent(false)}
                    >
                      Pilih Jadwal Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="rfq-form">
                    <h3 className="form-heading">Formulir Booking Discovery Call</h3>

                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Perusahaan / Startup</label>
                      <input
                        type="text"
                        placeholder="Contoh: PT Surya Niaga"
                        value={booking.company}
                        onChange={(e) => setBooking({ ...booking, company: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Pilihan Hari / Tanggal</label>
                        <input
                          type="date"
                          value={booking.preferredDate}
                          onChange={(e) =>
                            setBooking({ ...booking, preferredDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Waktu Pertemuan</label>
                        <select
                          value={booking.preferredTime}
                          onChange={(e) =>
                            setBooking({ ...booking, preferredTime: e.target.value })
                          }
                        >
                          <option value="10:00 WIB">10:00 WIB (Pagi)</option>
                          <option value="14:00 WIB">14:00 WIB (Siang)</option>
                          <option value="16:00 WIB">16:00 WIB (Sore)</option>
                          <option value="19:30 WIB">19:30 WIB (Malam)</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn btn--primary btn-block cyber-btn-primary">
                      ⚡ Jadwalkan Sesi via WhatsApp &amp; Google Meet
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default CustomSolutionPage
