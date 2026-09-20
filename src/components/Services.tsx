import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Custom Digital Solution',
    desc: 'Kami membangun aplikasi web, mobile, dan desktop kustom yang disesuaikan secara presisi dengan alur proses bisnis Anda.',
    features: [
      'Aplikasi Web & Mobile Multi-Platform',
      'Arsitektur Teruji (PulsaApp, ApotekApp)',
      'Alur Kerja Spesifik Industri',
      'Kode Bersih, Terukur & Mudah Dikelola',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    path: '/services/custom-solution',
    tag: 'Featured',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </svg>
    ),
    title: 'AI Integration',
    desc: 'Tingkatkan efisiensi sistem Anda dengan otomasi cerdas, pemrosesan bahasa alami (NLP), dan pipeline kecerdasan buatan.',
    features: [
      'Integrasi Chatbot LLM WhatsApp & Web',
      'Pipeline Dokumen OCR & Vision AI',
      'Analitik Prediktif & Deteksi Anomali',
      'Otomasi Alur Operasional Bisnis',
    ],
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    path: '/services/ai-integration',
    tag: 'Trending',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    title: 'Digital Consulting',
    desc: 'Panduan strategis untuk transformasi digital — audit teknologi, perencanaan roadmap, dan pengawasan implementasi sistem.',
    features: [
      'Audit & Penilaian Arsitektur Sistem',
      'Roadmap Transformasi Digital Bisnis',
      'Konsultasi Skalabilitas & Keamanan',
      'Pelatihan Tim & Transfer Teknologi',
    ],
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
    path: '/services/consulting',
    tag: null,
  },
]

const industries = [
  'E-Commerce & Retail',
  'FinTech & Server PPOB',
  'Farmasi & Fasilitas Kesehatan',
  'Pendidikan & EdTech',
]

const Services: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      className={`services section ${visible ? 'services--visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-header">
          <div className="badge">Layanan Kami</div>
          <h2>
            Solusi Rekayasa{' '}
            <span className="text-gradient">Perangkat Lunak &amp; AI</span>
          </h2>
          <p>
            Dari perencanaan arsitektur hingga implementasi produksi — kami menyediakan keahlian teknis dan teknologi mutakhir untuk percepatan bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Gradient top border */}
              <div className="service-card__border" style={{ background: service.gradient }} />

              <div className="service-card__body">
                <div className="service-card__top">
                  <div className="service-card__icon" style={{ background: service.gradient }}>
                    {service.icon}
                  </div>
                  {service.tag && (
                    <span className="service-card__tag">{service.tag}</span>
                  )}
                </div>

                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>

                <ul className="service-card__features">
                  {service.features.map((feat) => (
                    <li key={feat}>
                      <span className="service-feat-check">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link to={service.path} className="service-card__cta btn btn--outline btn--sm">
                  Lihat Detail Layanan
                  <span className="btn__icon">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="services__industries">
          <p className="services__industries-label">Sektor Industri Yang Kami Layani</p>
          <div className="services__industries-grid">
            {industries.map((label) => (
              <div key={label} className="industry-chip">
                <span className="industry-dot" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="services__cta-banner">
          <div className="services__cta-text">
            <h3>Punya Kebutuhan Proyek Digital?</h3>
            <p>Diskusikan bersama tim konsultan Kancio untuk rancangan arsitektur dan estimasi terbaik.</p>
          </div>
          <div className="services__cta-actions">
            <a
              href="#contact"
              className="btn btn--primary btn--large"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Konsultasi Sekarang
              <span className="btn__icon">→</span>
            </a>
            <Link to="/services/custom-solution" className="btn btn--secondary btn--large">
              Semua Layanan
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services