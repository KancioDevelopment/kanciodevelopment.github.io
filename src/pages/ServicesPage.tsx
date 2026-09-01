import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import './services/ServicePage.css'

interface ServicePillar {
  id: string
  title: string
  tagline: string
  icon: string
  badge: string
  badgeColor: string
  gradient: string
  description: string
  deliverables: string[]
  idealFor: string
  path: string
}

const servicePillars: ServicePillar[] = [
  {
    id: 'custom-solutions',
    title: 'Custom Digital Solutions & Enterprise Apps',
    tagline: 'Aplikasi Web, Mobile & Desktop Skalabilitas Tinggi',
    icon: '🚀',
    badge: 'Core Service',
    badgeColor: 'indigo',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    description:
      'Kami merancang dan membangun aplikasi kustom yang disesuaikan secara presisi dengan alur bisnis unik Anda — dari arsitektur backend andal, database terdistribusi, hingga antarmuka pengguna responsif.',
    deliverables: [
      'Aplikasi Web Full-Stack & Portal Enterprise',
      'Aplikasi Mobile Multi-Platform (iOS & Android)',
      'Sistem ERP Internal & Dashboard Manajemen',
      'Integrasi REST API, Webhook & Payment Gateway',
    ],
    idealFor: 'Bisnis yang membutuhkan sistem operasional spesifik yang tidak dapat diakomodasi oleh software off-the-shelf konvensional.',
    path: '/services/custom-solution',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration & Intelligent Automation',
    tagline: 'Otomatisasi Cerdas Berbasis Kecerdasan Buatan',
    icon: '🤖',
    badge: 'Trending Tech',
    badgeColor: 'cyan',
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    description:
      'Tingkatkan produktivitas bisnis Anda dengan integrasi Large Language Models (LLM), chatbot pintar customer support, computer vision, dan algoritma otomasi alur kerja tanpa henti.',
    deliverables: [
      'Chatbot Asisten AI Kontekstual & WhatsApp Bot',
      'Sistem Ekstraksi Dokumen & Scan OCR Cerdas',
      'Audit Anomali Data & Deteksi Fraud Real-time',
      'Pipeline Machine Learning & Predictive Analytics',
    ],
    idealFor: 'Perusahaan yang ingin mengotomatisasi pekerjaan repetitif, mempercepat respon pelanggan, dan mengambil keputusan berbasis data AI.',
    path: '/services/ai-integration',
  },
  {
    id: 'consulting',
    title: 'Digital Transformation & Tech Architecture Consulting',
    tagline: 'Audit Teknologi & Roadmap Transformasi Digital',
    icon: '💡',
    badge: 'Strategic Advisory',
    badgeColor: 'pink',
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
    description:
      'Pendampingan strategis dari perancangan arsitektur sistem, pemilihan teknologi modern, modernisasi warisan sistem lama (legacy migration), hingga audit keamanan aplikasi.',
    deliverables: [
      'Audit Arsitektur Sistem & Review Performa',
      'Roadmap Transformasi Digital 1-3 Tahun',
      'Perancangan Database & Skema Skalabilitas',
      'Training & Mentoring Tim Teknis Internal',
    ],
    idealFor: 'Pimpinan bisnis dan CTO yang ingin memastikan investasi teknologi tepat sasaran, aman, dan siap menopang pertumbuhan skala besar.',
    path: '/services/consulting',
  },
  {
    id: 'devops-sla',
    title: 'Cloud Infrastructure, DevOps & 24/7 SLA Support',
    tagline: 'Pemeliharaan Server, CI/CD & Keamanan Cloud',
    icon: '☁️',
    badge: 'Enterprise SLA',
    badgeColor: 'emerald',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    description:
      'Jaminan stabilitas dan ketersediaan aplikasi bisnis Anda dengan manajemen cloud server, pipeline CI/CD otomatis, pemantauan performa real-time, dan Service Level Agreement (SLA) 99.9%.',
    deliverables: [
      'Setup & Manajemen Cloud Infrastructure',
      'Automated CI/CD Deployment Pipeline',
      'Monitoring Performa, Backup & Disaster Recovery',
      'Garansi Dukungan Perbaikan Bug & Patch Keamanan',
    ],
    idealFor: 'Bisnis yang membutuhkan jaminan sistem berjalan tanpa henti 24/7 dengan respon darurat cepat dari tim teknis berpengalaman.',
    path: '/services/custom-solution',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Blueprinting',
    icon: '🔍',
    desc: 'Kami membedah alur kerja, kebutuhan pengguna, dan target bisnis Anda untuk menyusun dokumen spesifikasi teknis (SRS) dan wireframe arsitektur yang presisi.',
  },
  {
    step: '02',
    title: 'UI/UX Design & Prototype',
    icon: '🎨',
    desc: 'Desain visual interaktif dengan standar desain modern (Cyberpunk/Glassmorphism atau Clean SaaS) yang intuitif dan diuji coba langsung sebelum coding.',
  },
  {
    step: '03',
    title: 'Agile Sprint Development',
    icon: '⚡',
    desc: 'Pengembangan menggunakan arsitektur clean code dan sprint berkala dengan sesi demo progress mingguan agar Anda dapat memantau perkembangan secara transparan.',
  },
  {
    step: '04',
    title: 'Quality Assurance & Security Audit',
    icon: '🛡️',
    desc: 'Pengujian mendalam mencakup automated testing, stress test beban tinggi, uji kompabilitas lintas perangkat, dan audit kerentanan keamanan.',
  },
  {
    step: '05',
    title: 'Cloud Deployment & SLA Maintenance',
    icon: '🚀',
    desc: 'Peluncuran produksi ke server cloud, migrasi data awal, pelatihan staf pengguna, dan garansi pemeliharaan teknis berkesinambungan.',
  },
]

const faqs = [
  {
    question: 'Berapa lama estimasi waktu pengerjaan sebuah aplikasi kustom?',
    answer:
      'Waktu pengerjaan bergantung pada kompleksitas dan ruang lingkup proyek. Untuk aplikasi MVP atau modul spesifik biasanya berkisar antara 4-8 minggu, sedangkan sistem ERP enterprise komprehensif berkisar antara 8-16 minggu dengan metode sprint terukur.',
  },
  {
    question: 'Apakah source code dan database sepenuhnya menjadi milik klien?',
    answer:
      'Ya! Setelah serah terima proyek selesai, seluruh source code, hak kekayaan intelektual (IP), dan kepemilikan database sepenuhnya dialihkan kepada pihak klien.',
  },
  {
    question: 'Bagaimana model pembayaran dan garansi pengerjaannya?',
    answer:
      'Kami menerapkan model pembayaran bertahap berbasis milestone (Termin DP, Sprint Milestones, dan Final Acceptance). Seluruh proyek dilengkapi masa garansi pemeliharaan (warranty period) bebas biaya untuk perbaikan bug.',
  },
  {
    question: 'Bisakah sistem yang dibangun diintegrasikan dengan hardware atau API pihak ketiga?',
    answer:
      'Tentu saja. Kami berpengalaman mengintegrasikan sistem dengan thermal printer, barcode scanner, payment gateway (Midtrans, Xendit), WhatsApp Gateway, BPJS API, serta webhook pihak ketiga lainnya.',
  },
]

const ServicesPage: React.FC = () => {
  const { userConsent } = useAds()

  // Interactive Project Estimator State
  const [projectType, setProjectType] = useState<'webapp' | 'mobile' | 'erp' | 'ai'>('webapp')
  const [platformScale, setPlatformScale] = useState<'mvp' | 'standard' | 'enterprise'>('standard')
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['auth', 'payment'])
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // RFQ Form State
  const [rfqForm, setRfqForm] = useState({
    name: '',
    company: '',
    email: '',
    serviceType: 'Custom Digital Solution',
    budgetRange: 'Rp 20jt - Rp 50jt',
    projectDescription: '',
  })
  const [rfqSent, setRfqSent] = useState(false)

  // Calculate Estimator Output
  let baseWeeks = projectType === 'webapp' ? 4 : projectType === 'mobile' ? 6 : projectType === 'erp' ? 8 : 4
  if (platformScale === 'mvp') baseWeeks = Math.max(3, baseWeeks - 1)
  if (platformScale === 'enterprise') baseWeeks += 4
  baseWeeks += selectedAddons.length * 1

  const teamMembers =
    platformScale === 'enterprise'
      ? ['Lead Architect', '2x Fullstack Engineer', 'UI/UX Designer', 'QA Engineer', 'DevOps Specialist']
      : ['Senior Fullstack Engineer', 'UI/UX Designer', 'QA Tester', 'Project Manager']

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId))
    } else {
      setSelectedAddons([...selectedAddons, addonId])
    }
  }

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rfqForm.name) return

    const waMsg = encodeURIComponent(
      `Halo Tim Rekayasa Kancio Development,\n\nSaya ingin mengajukan Request for Quote (RFQ) / Konsultasi Proyek:\n- Nama: ${rfqForm.name}\n- Perusahaan: ${rfqForm.company || '-'}\n- Layanan: ${rfqForm.serviceType}\n- Kisaran Budget: ${rfqForm.budgetRange}\n- Deskripsi Proyek: ${rfqForm.projectDescription || 'Mohon jadwal konsultasi dan proposal teknis.'}`
    )
    window.open(`https://wa.me/6282325600996?text=${waMsg}`, '_blank')
    setRfqSent(true)
  }

  useSEO({
    title: 'Services: What We Offer - Jasa Pembuatan Aplikasi, ERP & AI Kancio',
    description:
      'Layanan rekayasa perangkat lunak end-to-end Kancio: Jasa pembuatan aplikasi web & mobile kustom, integrasi AI, konsultasi transformasi digital, dan cloud DevOps dengan standar SLA tinggi.',
    keywords:
      'jasa pembuatan aplikasi, jasa software house, software erp custom, integrasi ai bisnis, jasa pembuatan web enterprise, kancio development services, konsultan it indonesia',
    canonicalUrl: 'https://kancio.com/services',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Kancio Digital Engineering & AI Services',
      provider: {
        '@type': 'Organization',
        name: 'Kancio Development',
        url: 'https://kancio.com',
      },
      serviceType: 'Software Development, AI Integration, IT Consulting',
      areaServed: 'Indonesia',
      description: 'End-to-end digital solution and enterprise software engineering partner.',
    },
  })

  return (
    <div className="product-page services-page cyber-services-theme">
      {/* ===== HERO SECTION ===== */}
      <section className="services-hero">
        <div className="services-hero__bg" />
        <div className="services-grid-overlay" />

        <div className="container">
          <div className="services-hero__content">
            <div className="hero-badge-pill">
              <span className="live-dot-cyan" />
              <span>WHAT WE OFFER • END-TO-END DIGITAL ENGINEERING</span>
            </div>

            <h1 className="services-hero__title">
              Rekayasa Perangkat Lunak <br />
              <span className="text-gradient-cyan">Solusi Digital Kustom &amp; Integrasi AI</span>
            </h1>

            <p className="services-hero__desc">
              Dari perancangan arsitektur sistem, aplikasi enterprise web &amp; mobile, hingga integrasi kecerdasan buatan — kami membangun perangkat lunak berkualitas tinggi yang siap mengakselerasi pertumbuhan bisnis Anda.
            </p>

            <div className="services-hero__stats glass-panel">
              <div className="stat-box">
                <span className="stat-icon">🚀</span>
                <strong>100%</strong>
                <span>Custom Built</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">⚡</span>
                <strong>4-8 Mgg</strong>
                <span>Rata-rata Sprint MVP</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">🛡️</span>
                <strong>99.9%</strong>
                <span>SLA Uptime Ready</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">🤝</span>
                <strong>Full IP</strong>
                <span>Hak Cipta Milik Anda</span>
              </div>
            </div>

            <div className="services-hero__cta">
              <a href="#estimator" className="btn btn--primary btn--large cyber-btn-primary">
                🧪 Coba Estimator Proyek Interaktif <span className="btn__icon">→</span>
              </a>
              <a href="#rfq-form" className="btn btn--secondary btn--large cyber-btn-secondary">
                💬 Ajukan Konsultasi / Request Quote
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

      {/* ===== INTERACTIVE PROJECT ESTIMATOR SIMULATOR ===== */}
      <section className="section services-estimator-section" id="estimator">
        <div className="container">
          <div className="section-header">
            <div className="cyber-pulse-badge">Live Interactive Simulator</div>
            <h2>
              Estimator Ruang Lingkup &amp; Timeline Proyek <br />
              <span className="text-gradient-cyan">Dapatkan Gambaran Alur Pengerjaan Instan</span>
            </h2>
            <p>
              Tentukan jenis aplikasi, skala platform, dan fitur yang dibutuhkan untuk melihat estimasi timeline pengerjaan dan komposisi tim teknis yang direkomendasikan.
            </p>
          </div>

          <div className="estimator-container glass-panel">
            <div className="estimator-grid">
              {/* Left Column: Project Configurator */}
              <div className="estimator-config">
                <h3 className="config-title">1. Tipe Aplikasi &amp; Skala</h3>

                <div className="config-group">
                  <label className="config-lbl">Kategori Solusi</label>
                  <div className="options-pill-grid">
                    <button
                      className={`opt-btn ${projectType === 'webapp' ? 'opt-btn--active' : ''}`}
                      onClick={() => setProjectType('webapp')}
                    >
                      🌐 Web App Enterprise
                    </button>
                    <button
                      className={`opt-btn ${projectType === 'mobile' ? 'opt-btn--active' : ''}`}
                      onClick={() => setProjectType('mobile')}
                    >
                      📱 Mobile App (iOS/Android)
                    </button>
                    <button
                      className={`opt-btn ${projectType === 'erp' ? 'opt-btn--active' : ''}`}
                      onClick={() => setProjectType('erp')}
                    >
                      🏢 Custom ERP / POS System
                    </button>
                    <button
                      className={`opt-btn ${projectType === 'ai' ? 'opt-btn--active' : ''}`}
                      onClick={() => setProjectType('ai')}
                    >
                      🤖 AI Bot &amp; Automation
                    </button>
                  </div>
                </div>

                <div className="config-group">
                  <label className="config-lbl">Skala &amp; Kompleksitas</label>
                  <div className="options-pill-grid">
                    <button
                      className={`opt-btn ${platformScale === 'mvp' ? 'opt-btn--active' : ''}`}
                      onClick={() => setPlatformScale('mvp')}
                    >
                      ⚡ MVP / Tahap 1
                    </button>
                    <button
                      className={`opt-btn ${platformScale === 'standard' ? 'opt-btn--active' : ''}`}
                      onClick={() => setPlatformScale('standard')}
                    >
                      🚀 Standard Production
                    </button>
                    <button
                      className={`opt-btn ${platformScale === 'enterprise' ? 'opt-btn--active' : ''}`}
                      onClick={() => setPlatformScale('enterprise')}
                    >
                      👑 Enterprise Skala Besar
                    </button>
                  </div>
                </div>

                <h3 className="config-title" style={{ marginTop: '20px' }}>2. Modul &amp; Integrasi Fitur</h3>

                <div className="addons-checkbox-grid">
                  <label className={`addon-chip ${selectedAddons.includes('auth') ? 'addon-chip--active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('auth')}
                      onChange={() => toggleAddon('auth')}
                    />
                    <span>🔐 Role &amp; Permission Access Control</span>
                  </label>
                  <label className={`addon-chip ${selectedAddons.includes('payment') ? 'addon-chip--active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('payment')}
                      onChange={() => toggleAddon('payment')}
                    />
                    <span>💳 Payment Gateway &amp; QRIS</span>
                  </label>
                  <label className={`addon-chip ${selectedAddons.includes('ai') ? 'addon-chip--active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('ai')}
                      onChange={() => toggleAddon('ai')}
                    />
                    <span>🤖 Asisten AI / Chatbot LLM</span>
                  </label>
                  <label className={`addon-chip ${selectedAddons.includes('realtime') ? 'addon-chip--active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('realtime')}
                      onChange={() => toggleAddon('realtime')}
                    />
                    <span>⚡ Real-Time WebSocket &amp; Notif</span>
                  </label>
                  <label className={`addon-chip ${selectedAddons.includes('analytics') ? 'addon-chip--active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('analytics')}
                      onChange={() => toggleAddon('analytics')}
                    />
                    <span>📊 Custom BI &amp; Export Laporan</span>
                  </label>
                </div>
              </div>

              {/* Right Column: Dynamic Scope & Output Preview */}
              <div className="estimator-output">
                <div className="output-card glass-panel">
                  <span className="output-tag">Proyeksi Ruang Lingkup Pengerjaan</span>
                  <div className="output-timeline-box">
                    <span className="lbl">Estimasi Waktu Pengerjaan (Sprint):</span>
                    <strong className="timeline-val text-gradient-cyan">~ {baseWeeks} Minggu</strong>
                    <span className="sub">Termasuk Blueprinting, UI/UX, Coding, QA &amp; Deployment</span>
                  </div>

                  <div className="team-composition-box">
                    <span className="team-title">Komposisi Tim Rekayasa:</span>
                    <div className="team-chips">
                      {teamMembers.map((member, idx) => (
                        <span key={idx} className="team-chip">
                          ✓ {member}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="deliverables-summary">
                    <span className="deliv-title">Paket Deliverables Termasuk:</span>
                    <ul className="deliv-list">
                      <li>✓ Dokumentasi Arsitektur &amp; Swagger API</li>
                      <li>✓ Full Source Code &amp; Repositori Git Pribadi</li>
                      <li>✓ Desain UI/UX Figma Design System</li>
                      <li>✓ Setup CI/CD &amp; Hosting Cloud Server</li>
                      <li>✓ Masa Garansi Pemeliharaan Bebas Biaya</li>
                    </ul>
                  </div>

                  <div className="output-cta-box">
                    <a
                      href="#rfq-form"
                      onClick={() =>
                        setRfqForm((prev) => ({
                          ...prev,
                          serviceType:
                            projectType === 'webapp'
                              ? 'Custom Web Application'
                              : projectType === 'mobile'
                              ? 'Mobile Application'
                              : projectType === 'erp'
                              ? 'Enterprise ERP Solution'
                              : 'AI Integration & Automation',
                        }))
                      }
                      className="btn btn--primary btn-block cyber-btn-primary"
                    >
                      ⚡ Diskusikan Scope Ini Bersama Tim Kami
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 CORE SERVICE PILLARS ===== */}
      <section className="section services-pillars-section" id="pillars">
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">4 Pilar Layanan Unggulan</div>
            <h2>
              Layanan End-to-End,{' '}
              <span className="text-gradient-cyan">Dari Konsep Hingga Skala Penuh</span>
            </h2>
            <p>
              Kami mengombinasikan keahlian rekayasa perangkat lunak, otomatisasi AI, dan infrastruktur cloud untuk menghasilkan solusi bisnis berkinerja tinggi.
            </p>
          </div>

          <div className="pillars-grid">
            {servicePillars.map((pillar) => (
              <div key={pillar.id} className="pillar-card glass-panel">
                <div className="pillar-header">
                  <div className="pillar-icon-box" style={{ background: pillar.gradient }}>
                    {pillar.icon}
                  </div>
                  <span className={`pillar-badge pillar-badge--${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="pillar-title">{pillar.title}</h3>
                <span className="pillar-tagline">{pillar.tagline}</span>
                <p className="pillar-desc">{pillar.description}</p>

                <div className="pillar-deliverables">
                  <span className="deliv-label">Deliverables Utama:</span>
                  <ul className="pillar-list">
                    {pillar.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="check-cyan">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pillar-ideal">
                  <strong>Cocok Untuk:</strong>
                  <p>{pillar.idealFor}</p>
                </div>

                <div className="pillar-footer">
                  <Link to={pillar.path} className="pillar-link">
                    Pelajari Layanan Detail <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5-STEP AGILE ENGINEERING PROCESS ===== */}
      <section className="section services-process-section" id="process">
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Metodologi Teruji</div>
            <h2>
              5 Tahap Proses Rekayasa <span className="text-gradient-cyan">Transparan &amp; Terukur</span>
            </h2>
            <p>
              Pendekatan terstruktur kami memastikan setiap baris kode dibangun tepat waktu, sesuai anggaran, dan bebas dari kendala skalabilitas.
            </p>
          </div>

          <div className="process-timeline-grid">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step-card glass-panel">
                <span className="step-number">{step.step}</span>
                <span className="step-icon">{step.icon}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REQUEST FOR QUOTE (RFQ) & CONSULTATION FORM ===== */}
      <section className="section services-rfq-section" id="rfq-form">
        <div className="container">
          <div className="rfq-card glass-panel">
            <div className="rfq-grid">
              <div className="rfq-intro">
                <div className="badge cyber-pulse-badge">🤝 Mulai Kolaborasi</div>
                <h2>Siap Mewujudkan Aplikasi Impian Bisnis Anda?</h2>
                <p>
                  Konsultasikan kebutuhan spesifik perusahaan Anda secara langsung bersama Principal Software Engineer &amp; Solution Architect kami. Dapatkan penawaran proposal teknis dan roadmap implementasi yang jelas.
                </p>

                <div className="rfq-perks">
                  <div className="perk-row">
                    <span className="p-icon">📐</span>
                    <div>
                      <strong>Konsultasi &amp; Estimasi Biaya Gratis</strong>
                      <span>Analisis kebutuhan awal tanpa komitmen finansial di muka.</span>
                    </div>
                  </div>
                  <div className="perk-row">
                    <span className="p-icon">🔒</span>
                    <div>
                      <strong>Jaminan Kerahasiaan (NDA)</strong>
                      <span>Ide bisnis dan data proprietary Anda 100% terlindungi.</span>
                    </div>
                  </div>
                  <div className="perk-row">
                    <span className="p-icon">⚡</span>
                    <div>
                      <strong>Respon Cepat &lt; 2 Jam</strong>
                      <span>Terhubung langsung ke tim teknis via WhatsApp resmi.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rfq-form-wrap">
                {rfqSent ? (
                  <div className="rfq-success-state animate-fade-in">
                    <div className="success-emoji">🎉</div>
                    <h3>Pengajuan RFQ Terkirim!</h3>
                    <p>
                      Terima kasih! Kami telah mengarahkan Anda ke WhatsApp Solution Architect Kancio. Tim kami akan segera meninjau deskripsi proyek Anda dan menyiapkan proposal awal.
                    </p>
                    <button
                      className="btn btn--secondary cyber-btn-secondary"
                      onClick={() => setRfqSent(false)}
                    >
                      Kirim Permintaan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRfqSubmit} className="rfq-form">
                    <h3 className="form-heading">Formulir Request for Quote (RFQ)</h3>

                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Hendra Pratama"
                        value={rfqForm.name}
                        onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Nama Perusahaan / Organisasi</label>
                      <input
                        type="text"
                        placeholder="Contoh: PT Medika Farma Digital"
                        value={rfqForm.company}
                        onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Layanan yang Dibutuhkan</label>
                        <select
                          value={rfqForm.serviceType}
                          onChange={(e) => setRfqForm({ ...rfqForm, serviceType: e.target.value })}
                        >
                          <option value="Custom Digital Solution">Custom Web/Mobile Application</option>
                          <option value="AI Integration">AI Integration &amp; Automation</option>
                          <option value="Digital Consulting">Tech Architecture Consulting</option>
                          <option value="Cloud DevOps & SLA">Cloud Infrastructure &amp; SLA Support</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Alokasi Budget Proyek</label>
                        <select
                          value={rfqForm.budgetRange}
                          onChange={(e) => setRfqForm({ ...rfqForm, budgetRange: e.target.value })}
                        >
                          <option value="< Rp 20jt">&lt; Rp 20 Juta (Modul Kecil)</option>
                          <option value="Rp 20jt - Rp 50jt">Rp 20 Juta - Rp 50 Juta (MVP)</option>
                          <option value="Rp 50jt - Rp 150jt">Rp 50 Juta - Rp 150 Juta (Full Application)</option>
                          <option value="> Rp 150jt">&gt; Rp 150 Juta (Enterprise Scale)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Deskripsi Singkat Kebutuhan Proyek</label>
                      <textarea
                        rows={3}
                        placeholder="Ceritakan fitur utama, target pengguna, atau sistem yang ingin diintegrasikan..."
                        value={rfqForm.projectDescription}
                        onChange={(e) =>
                          setRfqForm({ ...rfqForm, projectDescription: e.target.value })
                        }
                      />
                    </div>

                    <button type="submit" className="btn btn--primary btn-block cyber-btn-primary">
                      ⚡ Ajukan Proposal &amp; Hubungkan ke WhatsApp
                    </button>
                    <span className="privacy-info">🔒 Privasi terjamin. Kami tidak pernah membagikan data Anda.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section services-faq-section">
        <div className="container">
          <div className="section-header">
            <div className="badge cyber-pulse-badge">Tanya Jawab Layanan</div>
            <h2>Pertanyaan Seputar Kerjasama</h2>
            <p>Informasi transparan mengenai garansi, kepemilikan source code, dan SLA.</p>
          </div>

          <div className="services-faq-box">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i
              return (
                <div
                  key={i}
                  className={`services-faq-item glass-panel ${isOpen ? 'services-faq-item--open' : ''}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-chevron">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer-box">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}

export default ServicesPage
