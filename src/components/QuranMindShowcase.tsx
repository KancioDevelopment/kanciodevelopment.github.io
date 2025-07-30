import React from 'react'
import './QuranMindShowcase.css'

const QuranMindShowcase: React.FC = () => {
  const features = [
    {
      icon: '📖',
      title: 'Read the Quran',
      description: 'Clear Arabic text with high-quality KFGQPC font, accurate Indonesian translation, dark/light modes, and verse bookmarks for comfortable reading.'
    },
    {
      icon: '🎵',
      title: 'Audio Al-Quran',
      description: 'Beautiful Murottal from trusted Qori (Al-Afasy) with smooth playback controls, auto-scroll feature, and verse position markers.'
    },
    {
      icon: '🤖',
      title: 'AI Analysis',
      description: 'Comprehensive AI-powered analysis of each verse group (ruku) with historical context, interpretation, and relevance to modern life.'
    },
    {
      icon: '🔖',
      title: 'Smart Bookmarks',
      description: 'Save favorite ruku for study, cross-device sync, personal notes for each ruku, and easy bookmark management system.'
    },
    {
      icon: '⚙️',
      title: 'Personalization',
      description: 'Customizable app themes, user account synchronization, clean intuitive interface, and easy navigation between surahs.'
    },
    {
      icon: '🌟',
      title: 'Deep Understanding',
      description: 'Focus on understanding verse groups with unique AI technology, specially designed for Indonesian users, free and easy to use.'
    }
  ]

  const benefits = [
    {
      title: 'Deeper Understanding',
      description: 'Gain profound insights into Quranic teachings with AI-powered analysis',
      icon: '🧠'
    },
    {
      title: 'Daily Relevance',
      description: 'Discover how ancient wisdom applies to modern life situations',
      icon: '🌅'
    },
    {
      title: 'Historical Context',
      description: 'Learn the background and interpretation of verses easily',
      icon: '📚'
    },
    {
      title: 'Enhanced Learning',
      description: 'Improve your Quranic study quality with structured approach',
      icon: '📈'
    }
  ]

  return (
    <section className="quranmind-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">Featured Product</div>
          <h2 className="showcase__title">
            QuranMind
            <span className="showcase__title-highlight"> AI-Powered Quran Learning</span>
          </h2>
          <p className="showcase__subtitle">
            Experience the perfect harmony of traditional Islamic scholarship and cutting-edge AI technology
            for a deeper, more meaningful understanding of the Holy Quran.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="showcase__hero-text">
              <h3>Revolutionary Quran Learning Experience</h3>
              <p>
                QuranMind combines modern AI technology with traditional understanding to provide
                comprehensive analysis, beautiful audio recitation, and personalized learning features
                designed specifically for Indonesian-speaking users.
              </p>
              <div className="showcase__highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🤖</span>
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎧</span>
                  <span>Trusted Qori Audio</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🇮🇩</span>
                  <span>Indonesian Translation</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💡</span>
                  <span>Modern Relevance</span>
                </div>
              </div>
              <div className="showcase__download">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kancio.quranapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn download-btn--quranmind"
                >
                  <div className="download-btn__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="download-btn__text">
                    <span className="download-btn__label">Download on</span>
                    <span className="download-btn__store">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="showcase__hero-visual">
              <div className="phone-mockup phone-mockup--quran">
                <div className="phone-screen">
                  <div className="quran-app-preview">
                    <div className="app-header">
                      <div className="app-title">
                        <span className="app-icon">📖</span>
                        <span className="app-name">QuranMind</span>
                      </div>
                      <div className="app-controls">
                        <span className="theme-toggle">🌙</span>
                        <span className="bookmark-icon">🔖</span>
                      </div>
                    </div>
                    <div className="surah-header">
                      <div className="surah-name">Al-Fatiha</div>
                      <div className="surah-info">7 Ayat • Makkiyyah</div>
                    </div>
                    <div className="verse-container">
                      <div className="arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                      <div className="translation">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</div>
                      <div className="ai-analysis">
                        <div className="ai-badge">🤖 AI Analysis</div>
                        <div className="analysis-text">Pembukaan yang mengajarkan pentingnya memulai segala aktivitas...</div>
                      </div>
                    </div>
                    <div className="audio-controls">
                      <button className="play-btn">▶️</button>
                      <div className="audio-progress">
                        <div className="progress-bar"></div>
                      </div>
                      <span className="qori-name">Al-Afasy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__features">
            <h3>Comprehensive Features</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-card__icon">{feature.icon}</div>
                  <h4 className="feature-card__title">{feature.title}</h4>
                  <p className="feature-card__description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__benefits">
            <div className="benefits-header">
              <h3>Transform Your Quran Learning Journey</h3>
              <p>Discover the profound wisdom of the Quran with modern tools designed for deeper understanding</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-card__icon">{benefit.icon}</div>
                  <div className="benefit-card__content">
                    <h4 className="benefit-card__title">{benefit.title}</h4>
                    <p className="benefit-card__description">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="showcase__cta">
            <div className="cta-content">
              <h3>Begin Your Journey to Deeper Understanding</h3>
              <p>Join thousands of users who have transformed their Quran learning experience with QuranMind</p>
              <div className="cta-stats">
                <div className="stat-item">
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">★ Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50k+</span>
                  <span className="stat-label">Downloads</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Free</span>
                </div>
              </div>
              <a 
                href="https://play.google.com/store/apps/details?id=com.kancio.quranapp"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Download QuranMind Now
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default QuranMindShowcase