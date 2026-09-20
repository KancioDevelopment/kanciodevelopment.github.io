import React, { useEffect, useRef, useState } from 'react'
import './About.css'

const stats = [
  { number: '50+', label: 'Proyek Selesai' },
  { number: '5K+', label: 'Pengguna Aktif' },
  { number: '4.8/5', label: 'Rating Kepuasan' },
  { number: '24/7', label: 'Dukungan Cloud' },
]

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </svg>
    ),
    title: 'Inovasi Modern',
    description: 'Mengadopsi teknologi mutakhir untuk menghadirkan solusi perangkat lunak yang unggul dan relevan.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Fokus Kebutuhan Bisnis',
    description: 'Setiap keputusan arsitektur dipandu oleh kebutuhan nyata alur kerja operasional klien.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Performa Tinggi',
    description: 'Aplikasi cepat, stabil, dan siap menangani pertumbuhan volume transaksi tanpa hambatan.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Keamanan Data Ketat',
    description: 'Privasi data dan integritas rekonsiliasi finansial adalah prioritas non-kompromistis.',
  },
]

const About: React.FC = () => {
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
      id="about"
      className={`about section ${visible ? 'about--visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge badge--accent">Tentang Kancio</div>
          <h2>
            Mendorong Akselerasi Bisnis Melalui{' '}
            <span className="text-gradient">Inovasi Digital</span>
          </h2>
          <p>
            Kancio Development menghadirkan ekosistem perangkat lunak SaaS terpercaya dan solusi AI mutakhir untuk akselerasi operasional bisnis di seluruh Indonesia.
          </p>
        </div>

        {/* Stats */}
        <div className="about__stats">
          {stats.map((stat, i) => (
            <div key={i} className="about__stat-card">
              <div className="about__stat-number">{stat.number}</div>
              <div className="about__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="about__values">
          <h3 className="about__values-title">Keunggulan Kancio Development</h3>
          <div className="about__values-grid">
            {values.map((val, i) => (
              <div key={i} className="about__value-card card">
                <div className="about__value-icon">{val.icon}</div>
                <h4 className="about__value-title">{val.title}</h4>
                <p className="about__value-desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About