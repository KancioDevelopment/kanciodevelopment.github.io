import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GoogleAdSense from '../../components/GoogleAdSense'
import { useAds } from '../../hooks/useAds'
import { useSEO } from '../../hooks/useSEO'
import './ServicePage.css'

const auditQuestions = [
  {
    id: 'infra',
    question: '1. Bagaimana status infrastruktur server & hosting sistem Anda saat ini?',
    options: [
      { text: 'Server lokal / shared hosting tanpa backup otomatis', score: 10 },
      { text: 'Cloud VPS tunggal dengan backup manual berkala', score: 20 },
      { text: 'Cloud terdistribusi (Docker / K8s / Serverless) dengan auto-scaling', score: 30 },
    ],
  },
  {
    id: 'data',
    question: '2. Bagaimana pengelolaan & sinkronisasi database operasional Anda?',
    options: [
      { text: 'Masih banyak catatan manual di Excel / kertas terpisah', score: 10 },
      { text: 'Database terpusat namun belum ada API terpadu & caching', score: 20 },
      { text: 'Arsitektur database relasional/NoSQL modern dengan real-time sync', score: 30 },
    ],
  },
  {
    id: 'automation',
    question: '3. Apakah alur bisnis Anda sudah memanfaatkan otomatisasi atau AI?',
    options: [
      { text: 'Belum sama sekali, sebagian besar proses masih manual', score: 10 },
      { text: 'Menggunakan bot dasar / form otomatis sederhana', score: 20 },
      { text: 'Terintegrasi AI LLM, webhook realtime & pipeline otomatis', score: 30 },
    ],
  },
]

const consultingPillars = [
  {
    icon: '🔍',
    title: 'Technology & Architecture Audit',
    desc: 'Evaluasi menyeluruh terhadap kode sumber, efisiensi database, kerentanan keamanan, dan hambatan bottleneck sistem Anda.',
  },
  {
    icon: '🗺️',
    title: 'Digital Transformation Roadmap',
    desc: 'Penyusunan rencana kerja strategis tahapan modernisasi sistem 1-3 tahun yang selaras dengan kapasitas anggaran dan target bisnis.',
  },
  {
    icon: '⚡',
    title: 'Legacy System Modernization',
    desc: 'Migrasi aman dari aplikasi warisan lama ke arsitektur cloud modern tanpa mengganggu operasional harian yang sedang berjalan.',
  },
  {
    icon: '🤝',
    title: 'CTO Advisory & Team Mentoring',
    desc: 'Pendampingan langsung bagi pimpinan perusahaan dalam pengambilan keputusan teknologi, evaluasi vendor, dan standarisasi rekayasa internal.',
  },
]

const ConsultingPage: React.FC = () => {
  const { userConsent } = useAds()

  // Interactive Digital Maturity Quiz State
  const [answers, setAnswers] = useState<{ [key: string]: number }>({
    infra: 10,
    data: 10,
    automation: 10,
  })

  // 30-Min Discovery Meeting Scheduler
  const [booking, setBooking] = useState({
    name: '',
    company: '',
    phone: '',
    preferredDate: '',
    preferredTime: '10:00 WIB',
    topic: 'Tech Audit & Strategic Consulting',
  })
  const [bookingSent, setBookingSent] = useState(false)

  const totalScore = (answers.infra || 0) + (answers.data || 0) + (answers.automation || 0)
  const scorePercent = Math.round((totalScore / 90) * 100)

  let maturityLevel = 'Fase Awal (Perlu Fondasi Digital)'
  let recommendation = 'Prioritaskan migrasi database terpusat dan setup cloud hosting terkelola untuk mencegah risiko kehilangan data.'
  if (scorePercent > 75) {
    maturityLevel = 'Modern & Siap Skala Enterprise'
    recommendation = 'Fokus pada integrasi AI prediktif, optimasi efisiensi biaya cloud, dan ekspansi multi-platform.'
  } else if (scorePercent > 45) {
    maturityLevel = 'Berkembang (Tahap Transisi)'
    recommendation = 'Otomatisasi alur komunikasi pelanggan dan implementasikan caching layer untuk mempercepat performa sistem.'
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!booking.name || !booking.phone) return

    const waMsg = encodeURIComponent(
      `Halo Tim Konsultan Kancio Development,\n\nSaya ingin konsultasi Tech Audit & Roadmap:\n- Nama: ${booking.name}\n- Perusahaan: ${booking.company || '-'}\n- No WhatsApp: ${booking.phone}\n- Tanggal Pilihan: ${booking.preferredDate || 'Fleksibel'}\n- Waktu: ${booking.preferredTime}\n- Skor Audit: ${scorePercent}/100 (${maturityLevel})\n- Topik: ${booking.topic}`
    )
    window.open(`https://wa.me/6285642007123?text=${waMsg}`, '_blank')
    setBookingSent(true)
  }

  useSEO({
    title: 'Digital Transformation & Tech Architecture Consulting - Kancio',
    description:
      'Layanan konsultasi arsitektur perangkat lunak, audit teknologi, modernisasi sistem warisan (legacy), dan advisory CTO independen.',
    keywords:
      'konsultan it indonesia, audit arsitektur software, digital transformation consulting, cto as a service, kancio consulting',
    canonicalUrl: 'https://kancio.com/services/consulting',
  })

  return (
    <div className="product-page services-page cyber-services-theme">
      <Header />

      {/* ===== HERO ===== */}
      <section className="services-hero">
        <div className="services-hero__bg" />
        <div className="services-grid-overlay" />

        <div className="container">
          <div className="services-hero__content">
            <div className="hero-badge-pill">
              <span className="live-dot-cyan" />
              <span>STRATEGIC IT ADVISORY &amp; ARCHITECTURE AUDIT</span>
            </div>

            <h1 className="services-hero__title">
              Investasi Teknologi Tepat Sasaran <br />
              <span className="text-gradient-cyan">Bebas Kendala Teknis &amp; Skalabilitas</span>
            </h1>

            <p className="services-hero__desc">
              Kami mendampingi pimpinan bisnis dan tim teknologi dalam merancang roadmap digital, memilih arsitektur terbaik, dan memodernisasi sistem tanpa mengganggu kelangsungan operasional.
            </p>

            <div className="services-hero__cta">
              <a href="#audit" className="btn btn--primary btn--large cyber-btn-primary">
                🧪 Coba Self-Audit Kematangan Digital <span className="btn__icon">→</span>
              </a>
              <a href="#schedule" className="btn btn--secondary btn--large cyber-btn-secondary">
                📅 Jadwalkan Sesi Konsultasi 30-Min
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

      {/* ===== INTERACTIVE DIGITAL MATURITY & AUDIT ASSESSMENT ===== */}
      <section className="section" id="audit" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Interactive Audit Gauge</div>
            <h2>
              Self-Assessment Kesiapan Digital Bisnis <br />
              <span className="text-gradient-cyan">Dapatkan Skor Kematangan Sistem Anda</span>
            </h2>
            <p>Jawab 3 pertanyaan singkat untuk melihat skor kesiapan infrastruktur dan rekomendasi mitigasi risiko dari tim konsultan Kancio.</p>
          </div>

          <div className="estimator-container glass-panel">
            <div className="estimator-grid">
              {/* Left Column: Quiz Questions */}
              <div className="estimator-config">
                {auditQuestions.map((q) => (
                  <div key={q.id} className="config-group" style={{ marginBottom: '14px' }}>
                    <label className="config-lbl" style={{ color: '#fff', fontSize: '0.85rem' }}>
                      {q.question}
                    </label>
                    <div className="options-pill-grid" style={{ gridTemplateColumns: '1fr', marginTop: '6px' }}>
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          className={`opt-btn ${answers[q.id] === opt.score ? 'opt-btn--active' : ''}`}
                          onClick={() => setAnswers({ ...answers, [q.id]: opt.score })}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Score Meter */}
              <div className="estimator-output">
                <div className="output-card glass-panel">
                  <span className="output-tag">Hasil Evaluasi Kematangan Digital</span>

                  <div className="output-timeline-box">
                    <span className="lbl">Skor Kesiapan Infrastruktur:</span>
                    <strong className="timeline-val text-gradient-cyan">
                      {scorePercent} / 100
                    </strong>
                    <span className="sub">Level: {maturityLevel}</span>
                  </div>

                  <div className="deliverables-summary">
                    <span className="deliv-title">Rekomendasi Roadmap Teknis:</span>
                    <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.55', margin: 0 }}>
                      {recommendation}
                    </p>
                  </div>

                  <div className="output-cta-box">
                    <a href="#schedule" className="btn btn--primary btn-block cyber-btn-primary">
                      ⚡ Bahas Rencana Modernisasi Bersama Konsultan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 CONSULTING PILLARS ===== */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Pilar Pendampingan</div>
            <h2>Layanan Konsultasi Komprehensif</h2>
            <p>Membantu perusahaan mengambil keputusan arsitektur dan investasi teknologi yang tepat.</p>
          </div>

          <div className="pillars-grid">
            {consultingPillars.map((p, i) => (
              <div key={i} className="pillar-card glass-panel">
                <div className="pillar-header">
                  <div className="pillar-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                    {p.icon}
                  </div>
                  <span className="pillar-badge pillar-badge--cyan">Strategic</span>
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
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
                <h2>Konsultasikan Roadmap Teknologi Anda</h2>
                <p>
                  Diskusikan arsitektur dan hambatan teknis bisnis Anda langsung bersama Senior IT Consultant Kancio tanpa komitmen finansial di muka.
                </p>

                <div className="rfq-perks">
                  <div className="perk-row">
                    <span className="p-icon">🛡️</span>
                    <div>
                      <strong>Analisis Keamanan &amp; Skalabilitas</strong>
                      <span>Identifikasi potensi bottleneck sebelum sistem mengalami downtime.</span>
                    </div>
                  </div>
                  <div className="perk-row">
                    <span className="p-icon">📋</span>
                    <div>
                      <strong>Rangkuman Rekomendasi Tertulis</strong>
                      <span>Dapatkan checklist perbaikan konkret pasca sesi konsultasi.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rfq-form-wrap">
                {bookingSent ? (
                  <div className="rfq-success-state animate-fade-in">
                    <div className="success-emoji">🎉</div>
                    <h3>Permintaan Jadwal Terkirim!</h3>
                    <p>
                      Kami telah mengarahkan Anda ke WhatsApp Kancio untuk konfirmasi link Google Meet sesi konsultasi strategis.
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
                    <h3 className="form-heading">Formulir Booking Consulting Call</h3>

                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Dian Prasetyo"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Nama Perusahaan</label>
                        <input
                          type="text"
                          placeholder="Contoh: PT Surya Logistik"
                          value={booking.company}
                          onChange={(e) => setBooking({ ...booking, company: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Nomor WhatsApp</label>
                        <input
                          type="tel"
                          required
                          placeholder="Contoh: 0812-3456-7890"
                          value={booking.phone}
                          onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        />
                      </div>
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

      <Footer />
    </div>
  )
}

export default ConsultingPage
