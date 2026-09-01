import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GoogleAdSense from '../../components/GoogleAdSense'
import { useAds } from '../../hooks/useAds'
import { useSEO } from '../../hooks/useSEO'
import './ServicePage.css'

const aiCapabilities = [
  {
    icon: '💬',
    title: 'Contextual AI Chatbot & Agent',
    desc: 'Asisten pintar terintegrasi WhatsApp & Web yang memahami konteks SOP perusahaan, katalog produk, dan histori interaksi pelanggan.',
  },
  {
    icon: '📄',
    title: 'Intelligent OCR & Document Extraction',
    desc: 'Ekstraksi otomatis struk nota, faktur pajak, KTP, dan resep obat dengan akurasi tinggi dan validasi otomatis ke database ERP.',
  },
  {
    icon: '🛡️',
    title: 'Real-Time Anomaly & Fraud Detection',
    desc: 'Audit otomatis transaksi anomali, deteksi markup harga mencurigakan, dan monitoring pola belanja tidak wajar secara instan.',
  },
  {
    icon: '🔍',
    title: 'Custom Vector Search & Semantic RAG',
    desc: 'Pencarian dokumen dan arsip internal berbasis makna (semantic search) menggunakan embedding dan Retrieval-Augmented Generation (RAG).',
  },
  {
    icon: '📈',
    title: 'Predictive Demand & Stock Forecasting',
    desc: 'Model prediksi kebutuhan stok dan tren penjualan untuk meminimalkan deadstock dan kehabisan barang di masa mendatang.',
  },
  {
    icon: '⚡',
    title: 'Autonomous Workflow Automation',
    desc: 'Otomatisasi pengiriman laporan harian, penagihan piutang via WhatsApp, dan sinkronisasi data antar sistem tanpa campur tangan manual.',
  },
]

const aiSimulations = [
  {
    id: 'ocr',
    title: '📄 Scan OCR Nota & Struk',
    inputDesc: 'Gambar Struk Belanja Retail (Input Simulasi):',
    inputSample: '[Foto Nota Pembelian Toko Maju Jaya: 2x Paracetamol @15.000, 1x Amoxicillin @28.000. Total Rp 58.000]',
    outputData: {
      status: '✅ Berhasil Diekstrak (Akurasi 99.4%)',
      supplier: 'Toko Maju Jaya',
      items: [
        { name: 'Paracetamol 500mg', qty: 2, price: 15000, subtotal: 30000 },
        { name: 'Amoxicillin 500mg', qty: 1, price: 28000, subtotal: 28000 },
      ],
      grandTotal: 'Rp 58.000',
      action: 'Otomatis Masuk Buku Kas & Update Stok ERP',
    },
  },
  {
    id: 'bot',
    title: '💬 AI Customer Support (WhatsApp)',
    inputDesc: 'Pesan Masuk dari Pelanggan:',
    inputSample: '"Halo min, apakah obat Cefixime 100mg masih ada stoknya dan berapa harganya?"',
    outputData: {
      status: '🤖 Respon Instan (0.8 Detik)',
      reply:
        '"Halo Kak! Obat Cefixime 100mg tersedia di Apotek Kancio (Stok: 24 Strip) dengan harga Rp 35.000/strip. Apakah ingin direservasi untuk diambil langsung via Click & Collect?"',
      intent: 'Cek Stok & Harga Obat',
      sentiment: 'Positif / Tertarik Membeli',
    },
  },
  {
    id: 'anomaly',
    title: '🛡️ Audit Markup & Anomali HPP',
    inputDesc: 'Data Faktur Masuk dari PBF Supplier:',
    inputSample: 'Faktur PBF ABC: Betahistine 6mg naik dari Rp 18.000 menjadi Rp 24.500 (+36.1%)',
    outputData: {
      status: '⚠️ Peringatan Anomali Terdeteksi!',
      alert: 'Kenaikan HPP Melebihi Batas Toleransi (+36.1% vs Rata-rata Pasar)',
      recommendation: 'Tahan pembayaran faktur sementara & rekomendasikan PBF alternatif XYZ (Rp 18.500)',
      potentialSavings: 'Rp 1.200.000 / Bulan',
    },
  },
]

const AIServicePage: React.FC = () => {
  const { userConsent } = useAds()
  const [activeSim, setActiveSim] = useState(0)

  // Booking Meeting
  const [booking, setBooking] = useState({
    name: '',
    company: '',
    phone: '',
    preferredDate: '',
    preferredTime: '14:00 WIB',
    topic: 'Integrasi AI & Otomasi Bisnis',
  })
  const [bookingSent, setBookingSent] = useState(false)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!booking.name || !booking.phone) return

    const waMsg = encodeURIComponent(
      `Halo Tim AI Kancio Development,\n\nSaya ingin konsultasi AI Integration & Automation:\n- Nama: ${booking.name}\n- Perusahaan: ${booking.company || '-'}\n- No WhatsApp: ${booking.phone}\n- Tanggal Pilihan: ${booking.preferredDate || 'Fleksibel'}\n- Waktu: ${booking.preferredTime}\n- Topik Diskusi: ${booking.topic}`
    )
    window.open(`https://wa.me/6285642007123?text=${waMsg}`, '_blank')
    setBookingSent(true)
  }

  useSEO({
    title: 'AI Integration & Intelligent Automation Services - Kancio',
    description:
      'Layanan integrasi AI untuk otomatisasi operasional bisnis: Chatbot WhatsApp pintar, OCR ekstraksi dokumen otomatis, deteksi anomali data, dan RAG semantic search.',
    keywords:
      'jasa integrasi ai, chatbot whatsapp ai, ai ocr nota struk, ai anomaly detection, konsultan ai indonesia, kancio ai integration',
    canonicalUrl: 'https://kancio.com/services/ai-integration',
  })

  const sim = aiSimulations[activeSim]

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
              <span>AI INTEGRATION &amp; WORKFLOW AUTOMATION</span>
            </div>

            <h1 className="services-hero__title">
              Otomasi Cerdas Bisnis Anda <br />
              <span className="text-gradient-cyan">Dengan Kecerdasan Buatan Terapan</span>
            </h1>

            <p className="services-hero__desc">
              Tingkatkan efisiensi kerja tim Anda hingga 10x lipat dengan AI yang memahami dokumen, merespon pelanggan secara kontekstual 24 jam, dan mengaudit data operasional tanpa henti.
            </p>

            <div className="services-hero__cta">
              <a href="#ai-sim" className="btn btn--primary btn--large cyber-btn-primary">
                🧪 Coba Live AI Simulator <span className="btn__icon">→</span>
              </a>
              <a href="#schedule" className="btn btn--secondary btn--large cyber-btn-secondary">
                📅 Jadwalkan 30-Min AI Discovery Call
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

      {/* ===== INTERACTIVE LIVE AI SIMULATOR ===== */}
      <section className="section" id="ai-sim" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Live AI Simulator</div>
            <h2>
              Uji Cara Kerja AI Dalam Bisnis Nyata <br />
              <span className="text-gradient-cyan">Simulasi Ekstraksi, Chatbot &amp; Audit Anomali</span>
            </h2>
            <p>Pilih modul AI di bawah untuk melihat proses input dan hasil inferensi AI secara langsung.</p>
          </div>

          <div className="estimator-container glass-panel">
            {/* Simulation Tabs */}
            <div className="solution-filter-tabs glass-panel" style={{ margin: '0 auto 24px', display: 'flex' }}>
              {aiSimulations.map((item, idx) => (
                <button
                  key={item.id}
                  className={`filter-tab ${idx === activeSim ? 'filter-tab--active' : ''}`}
                  onClick={() => setActiveSim(idx)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="estimator-grid">
              {/* Left Column: Sample Input */}
              <div className="estimator-config">
                <h3 className="config-title">1. Input Data Operasional</h3>
                <span className="config-lbl">{sim.inputDesc}</span>
                <div
                  style={{
                    background: 'rgba(2, 6, 23, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#94a3b8',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    lineHeight: '1.6',
                  }}
                >
                  {sim.inputSample}
                </div>

                <div style={{ marginTop: '16px' }}>
                  <span className="config-lbl">Kecepatan Inferensi Model:</span>
                  <div style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: '700', marginTop: '4px' }}>
                    ⚡ Sub-Second Latency (0.4 - 0.9 Detik)
                  </div>
                </div>
              </div>

              {/* Right Column: AI Output */}
              <div className="estimator-output">
                <div className="output-card glass-panel">
                  <span className="output-tag">Hasil Inferensi &amp; Ekstraksi AI</span>

                  <div className="output-timeline-box">
                    <span className="lbl">Status Pipeline:</span>
                    <strong className="timeline-val text-gradient-cyan" style={{ fontSize: '1.15rem' }}>
                      {sim.outputData.status}
                    </strong>
                  </div>

                  {activeSim === 0 && (
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <p><strong>Supplier:</strong> {sim.outputData.supplier}</p>
                      <p><strong>Items Terdeteksi:</strong> 2 Produk ({sim.outputData.grandTotal})</p>
                      <p style={{ color: '#38bdf8' }}>✓ {sim.outputData.action}</p>
                    </div>
                  )}

                  {activeSim === 1 && (
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <p><strong>Respon Bot:</strong> {sim.outputData.reply}</p>
                      <p><strong>Klasifikasi Intent:</strong> <span style={{ color: '#34d399' }}>{sim.outputData.intent}</span></p>
                    </div>
                  )}

                  {activeSim === 2 && (
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <p style={{ color: '#f87171' }}><strong>Peringatan:</strong> {sim.outputData.alert}</p>
                      <p><strong>Rekomendasi:</strong> {sim.outputData.recommendation}</p>
                      <p style={{ color: '#34d399' }}><strong>Potensi Efisiensi:</strong> {sim.outputData.potentialSavings}</p>
                    </div>
                  )}

                  <div className="output-cta-box">
                    <a href="#schedule" className="btn btn--primary btn-block cyber-btn-primary">
                      ⚡ Integrasikan AI Ini ke Sistem Anda
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6 CORE AI CAPABILITIES ===== */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Fitur &amp; Kemampuan AI</div>
            <h2>Kecerdasan Buatan Siap Pakai Untuk Bisnis</h2>
            <p>Solusi AI yang dirancang khusus untuk meningkatkan omzet dan memangkas waktu kerja manual.</p>
          </div>

          <div className="pillars-grid">
            {aiCapabilities.map((cap, i) => (
              <div key={i} className="pillar-card glass-panel">
                <div className="pillar-header">
                  <div className="pillar-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                    {cap.icon}
                  </div>
                  <span className="pillar-badge pillar-badge--cyan">AI-Powered</span>
                </div>
                <h3 className="pillar-title">{cap.title}</h3>
                <p className="pillar-desc">{cap.desc}</p>
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
                <h2>Konsultasi AI Integration Bersama Expert</h2>
                <p>
                  Diskusikan alur kerja manual yang ingin Anda otomatisasi. Tim kami akan menyiapkan live POC (Proof of Concept) dan estimasi implementasi.
                </p>

                <div className="rfq-perks">
                  <div className="perk-row">
                    <span className="p-icon">🤖</span>
                    <div>
                      <strong>Analisis Kelayakan Model AI</strong>
                      <span>Ketahui model LLM / OCR yang paling efisien dan hemat biaya untuk bisnis Anda.</span>
                    </div>
                  </div>
                  <div className="perk-row">
                    <span className="p-icon">🔒</span>
                    <div>
                      <strong>Privasi Data Perusahaan Terjamin</strong>
                      <span>Data bisnis Anda tidak pernah digunakan untuk melatih model publik.</span>
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
                      Kami telah mengarahkan Anda ke WhatsApp Kancio untuk konfirmasi link Google Meet sesi konsultasi AI.
                    </p>
                    <button
                      className="btn btn--secondary cyber-btn-secondary"
                      onClick={() => setBookingSent(false)}
                    >
                      Jadwalkan Sesi Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="rfq-form">
                    <h3 className="form-heading">Formulir Booking AI Discovery Call</h3>

                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Farhan Pratama"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Perusahaan / Bisnis</label>
                        <input
                          type="text"
                          placeholder="Contoh: PT Retail Sinergi"
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

export default AIServicePage
