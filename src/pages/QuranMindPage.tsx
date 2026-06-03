import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import './ProductPage.css'
import './ApotekAppPage.css'
import './QuranMindPage.css'

const QuranMindPage: React.FC = () => {
  const { userConsent } = useAds()

  useSEO({
    title: 'QuranMind: Aplikasi Tafsir Al-Quran AI & Murottal Sheikh Mishary',
    description: 'Aplikasi tafsir Al-Quran tematis berbasis kecerdasan buatan (AI) per Ruku, dilengkapi murottal berkualitas tinggi oleh Sheikh Mishary Rashid Al-Afasy.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "QuranMind",
      "operatingSystem": "Android",
      "applicationCategory": "ReferenceApplication",
      "description": "Aplikasi Tafsir Al-Quran AI & Audio Murottal",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IDR",
        "description": "Free Download"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kancio Development",
        "url": "https://kancio.com"
      }
    }
  })

  const [activeFeature, setActiveFeature] = useState(0)
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const features = [
    {
      icon: '📖',
      title: 'Teks Al-Quran Premium',
      badge: 'Visual Jernih',
      badgeColor: 'green',
      description: 'Membaca Al-Quran menjadi lebih nyaman dengan dukungan font Mushaf Madinah (KFGQPC) yang jernih dan otentik.',
      details: [
        'Font KFGQPC Mushaf Madinah',
        'Terjemahan Kemenag RI akurat',
        'Dukungan Dark/Light Mode',
        'Navigasi Surah & Ayat super cepat'
      ],
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: '🤖',
      title: 'Analisis AI (Ruku)',
      badge: 'Smart Engine',
      badgeColor: 'indigo',
      description: 'Kupas tuntas makna ayat per kelompok (Ruku) dengan bantuan kecerdasan buatan untuk pemahaman lebih dalam.',
      details: [
        'Konteks sejarah (Asbabunnuzul)',
        'Ringkasan tema per Ruku',
        'Analisis nilai-nilai universal',
        'Relevansi dengan kehidupan modern'
      ],
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
      icon: '🎵',
      title: 'Murottal Berkualitas',
      badge: 'Sheikh Mishary',
      badgeColor: 'blue',
      description: 'Dengarkan lantunan ayat suci dari Qori terkemuka dengan fitur sinkronisasi teks otomatis.',
      details: [
        'Audio Sheikh Mishary Rashid Al-Afasy',
        'Auto-scroll sinkronisasi ayat',
        'Download untuk diderngar offline',
        'Kontrol playback yang intuitif'
      ],
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    },
    {
      icon: '🔖',
      title: 'Bookmark & Catatan',
      badge: 'Studi Mandiri',
      badgeColor: 'teal',
      description: 'Kelola bahan belajar Anda dengan fitur penanda dan catatan pribadi yang aman.',
      details: [
        'Bookmark per Ruku atau Ayat',
        'Catatan refleksi pribadi',
        'Kelompokkan bahan tadabbur',
        'Akses cepat dari dashboard'
      ],
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)'
    },
    {
      icon: '🔄',
      title: 'Sinkronisasi Cloud',
      badge: 'Multi-Device',
      badgeColor: 'yellow',
      description: 'Jangan takut kehilangan data. Semua bookmark dan catatan Anda tersimpan aman di cloud.',
      details: [
        'Sinkronisasi antar perangkat',
        'Backup otomatis ke akun Kancio',
        'Akses di mana saja kapan saja',
        'Data aman dan terenkripsi'
      ],
      gradient: 'linear-gradient(135deg, #eab308, #d97706)'
    },
    {
      icon: '📜',
      title: 'Tafsir Modern',
      badge: 'Pemahaman Dalam',
      badgeColor: 'pink',
      description: 'Akses berbagai literatur tafsir yang disajikan dengan bahasa yang mudah dipahami.',
      details: [
        'Tafsir Ringkas & Mendalam',
        'Penjelasan istilah sulit',
        'Struktur pembelajaran tematik',
        'Dilengkapi kutipan hadits relevan'
      ],
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
    }
  ]

  const statistics = [
    { number: '1.0.3', label: 'Versi Terbaru', icon: '✨' },
    { number: 'AI', label: 'Tafsir Engine', icon: '🤖' },
    { number: 'Offline', label: 'Teks Lengkap', icon: '📱' },
    { number: 'Free', label: 'Selamanya Gratis', icon: '🎁' }
  ]

  return (
    <div className={`product-page apotek-page quranmind-page ${scrolled ? 'page--scrolled' : ''}`}>
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="apotek-hero quranmind-hero">
        {/* Decorative background elements */}
        <div className="hero-bg-accent" />
        <div className="hero-pattern-overlay" />

        <div className="container">
          <div className="apotek-hero__content">
            <div className="apotek-hero__eyebrow">
              <span className="badge glass-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                <span className="pulse-dot" /> QuranMind AI
              </span>
              <span className="apotek-hero__tag" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
                Teknologi Tafsir Masa Depan
              </span>
            </div>

            <h1 className="apotek-hero__title" style={{ color: '#064e3b' }}>
              Selami Kedalaman <br />
              <span className="text-gradient" style={{ background: 'linear-gradient(to right)' }}>Makna Al-Quran</span>
            </h1>

            <p className="apotek-hero__desc" style={{ color: '#374151' }}>
              Gabungan harmonis antara <strong>Sains Data</strong> dan <strong>Tafsir Klasik</strong>.
              QuranMind membantu Anda tadabbur lebih dalam with analisis Ruku cerdas
              untuk pemahaman spiritual yang modern.
            </p>

            <div className="hero-stats-glass">
              {statistics.map((s, i) => (
                <div key={i} className="stat-glass-card">
                  <span className="stat-glass-icon">{s.icon}</span>
                  <div className="stat-glass-info">
                    <strong>{s.number}</strong>
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="apotek-hero__cta">
              <a
                href="https://play.google.com/store/apps/details?id=com.kancio.quranapp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--large glass-btn"
                style={{ background: '#059669', boxShadow: '0 10px 25px rgba(5, 150, 105, 0.3)' }}
              >
                Download Gratis <span className="btn__icon">→</span>
              </a>
              <a href="#ai-deep-dive" className="btn btn--secondary btn--large">
                Demo Analisis AI
              </a>
            </div>
          </div>

          <div className="apotek-hero__visual">
            <div className="floating-elements">
              <div className="float-obj float-obj-1" />
              <div className="float-obj float-obj-2" />
            </div>
            <div className="apotek-hero__card-stack">
              <div className="apotek-stat-card apotek-stat-card--top glass-card">
                <div className="card-shine" />
                <span className="apotek-stat-card__icon">🧠</span>
                <div>
                  <div className="apotek-stat-card__label">AI Tadabbur Engine</div>
                  <div className="apotek-stat-card__value">Context Ready</div>
                </div>
                <span className="apotek-stat-card__badge" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>Core</span>
              </div>

              <div className="quran-preview-card glass-card">
                <div className="card-header-quran">
                  <div className="quran-dots"><span></span><span></span><span></span></div>
                  <span>QuranMind Viewer</span>
                </div>
                <div className="quran-preview-content">
                  <div className="arabic-line text-right">أعوذ بالله من الشيطان الرجيم</div>
                  <div className="translation-line">Aku berlindung kepada Allah...</div>
                  <div className="ai-insight-snip">
                    <span className="badge-ai">AI INSIGHT</span>
                    <p>Menganalisis konteks sejarah Ruku ini...</p>
                    <div className="progress-bar-ai"><div className="progress-ai" style={{ width: '85%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="apotek-stat-card apotek-stat-card--bottom glass-card">
                <span className="apotek-stat-card__icon">✨</span>
                <div>
                  <div className="apotek-stat-card__label">Data Sync</div>
                  <div className="apotek-stat-card__value">All devices synced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI DEEP DIVE SECTION (NEW PREMIUM) ===== */}
      <section id="ai-deep-dive" className="section ai-deep-dive-section">
        <div className="container">
          <div className="interactive-ai-grid">
            <div className="ai-demo-visual">
              <div className="ai-brain-mesh">
                <div className="node n1" />
                <div className="node n2" />
                <div className="node n3" />
                <div className="line l1" />
                <div className="line l2" />
              </div>
              <div className="demo-message-stack">
                <div className="demo-message demo-message--ai">
                  <strong>AI Mind:</strong> Menganalisis kelompok ayat 1-5 Surah Al-Baqarah...
                </div>
                <div className="demo-message demo-message--result">
                  <span className="icon">💡</span>
                  Konteks: Mendefinisikan karakter 'Al-Muttaqin' dalam perspektif universal.
                </div>
              </div>
            </div>
            <div className="ai-demo-text">
              <div className="badge gold-badge">Eksklusif</div>
              <h2>Live AI <span className="text-gradient">Deep Dive</span></h2>
              <p>
                QuranMind bukan sekadar pembaca digital. AI kami menyisir literatur klasik
                untuk menjawab: <em>"Kenapa ayat ini turun?"</em> dan <em>"Kenapa di sini?"</em>.
              </p>
              <div className="ai-feature-checklist">
                <div className="check-item">
                  <span className="dot" />
                  <strong>Struktur Ruku:</strong> Menghubungkan titik antar ayat dalam satu tema.
                </div>
                <div className="check-item">
                  <span className="dot" />
                  <strong>Refleksi Modern:</strong> Menyederhanakan tafsir berat ke bahasa sehari-hari.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AD ===== */}
      <div className="content-break-ad container">
        <GoogleAdSense
          userConsent={userConsent}
          adFormat="horizontal"
          variant="minimal"
          adLabel="Advertisement"
          showLoadingAnimation={true}
          className="product-page-ad"
        />
      </div>

      {/* ===== FEATURES TABBED SECTION ===== */}
      <section
        id="features"
        ref={sectionRef}
        className={`section apotek-modules ${visible ? 'apotek-modules--visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <div className="badge glass-badge" style={{ color: '#059669' }}>Ekosistem Belajar</div>
            <h2>Fitur Unggulan <span className="text-gradient">Profesional</span></h2>
            <p>Dirancang dengan standar UI/UX modern untuk menjaga kekhusyukan dan kenyamanan belajar Anda.</p>
          </div>

          <div className="apotek-modules__tabs scroll-hide">
            {features.map((f, i) => (
              <button
                key={i}
                className={`apotek-module-tab ${activeFeature === i ? 'apotek-module-tab--active' : ''}`}
                onClick={() => setActiveFeature(i)}
                style={activeFeature === i ? { background: features[i].gradient } : {}}
              >
                <span>{f.icon}</span>
                <span className="apotek-module-tab__name">{f.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="apotek-module-detail card glass-card-dark">
            <div className="apotek-module-detail__left">
              <div className="apotek-module-detail__header">
                <div className="apotek-module-detail__icon" style={{ background: features[activeFeature].gradient }}>
                  {features[activeFeature].icon}
                </div>
                <span className={`apotek-badge apotek-badge--${features[activeFeature].badgeColor}`}>
                  {features[activeFeature].badge}
                </span>
              </div>
              <h3 className="apotek-module-detail__title">{features[activeFeature].title}</h3>
              <p className="apotek-module-detail__desc">{features[activeFeature].description}</p>
              <ul className="apotek-module-detail__features">
                {features[activeFeature].details.map((d, i) => (
                  <li key={i}>
                    <span className="apotek-check" style={{ color: '#059669' }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="apotek-module-detail__right">
              <div className="premium-preview-window">
                <div className="window-header">
                  <span className="w-dot" /><span className="w-dot" /><span className="w-dot" />
                </div>
                <div className="window-body">
                  <div className="skeleton-line" style={{ width: '80%' }} />
                  <div className="skeleton-line" style={{ width: '60%' }} />
                  <div className="highlight-box" style={{ background: features[activeFeature].gradient + '22' }}>
                    {features[activeFeature].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY SECTION (FILOSOFI TADABBUR) ===== */}
      <section className="section philosophy-section">
        <div className="philosophy-bg-pattern" />
        <div className="container">
          <div className="philosophy-card-v2 glass-card-emerald">
            <div className="philosophy-content">
              <div className="badge philosophy-badge">Visi Kancio</div>
              <h2 className="philosophy-title">Filosofi Tadabbur Digital</h2>
              <p className="philosophy-text">
                Kami percaya bahwa teknologi seharusnya tidak menjauhkan kita dari akar spiritual,
                melainkan menjadi jembatan untuk memahaminya lebih baik. QuranMind dirancang untuk
                menghadirkan kedalaman ilmu para ulama klasik ke ujung jari Anda melalui
                kecanggihan kecerdasan buatan.
              </p>
              <div className="philosophy-signature-v2">
                <div className="sig-line" />
                <div className="sig-text">
                  <strong>Kancio.com Team</strong>
                  <span>Modernizing Traditions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AD ===== */}
      <div className="content-break-ad container">
        <GoogleAdSense
          userConsent={userConsent}
          adFormat="rectangle"
          variant="premium"
          adLabel="Sponsored"
          showLoadingAnimation={true}
          className="product-page-ad-footer"
        />
      </div>

      {/* ===== CTA SECTION ===== */}
      <section className="section">
        <div className="container">
          <div className="apotek-cta-banner premium-cta">
            <div className="cta-gradient-overlay" />
            <div className="apotek-cta-banner__content">
              <div className="badge glass-badge" style={{ background: '#10b981', color: '#fff' }}>Hanya di Play Store</div>
              <h2>Mulai Perjalanan Spiritual Anda</h2>
              <p>Miliki teman setia untuk memahami pesan-pesan Ilahi dengan lebih cerdas dan mendalam.</p>
              <div className="apotek-cta-banner__actions">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kancio.quranapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--large glass-btn-primary"
                >
                  Download Gratis <span className="btn__icon">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />


    </div>
  )
}

export default QuranMindPage