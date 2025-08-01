import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const QuranMindPage: React.FC = () => {
  const { userConsent } = useAds()

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
      description: 'Learn about the circumstances and background of each revelation',
      icon: '📚'
    },
    {
      title: 'Personal Growth',
      description: 'Enhance your spiritual journey with guided reflection and study',
      icon: '🌱'
    }
  ]

  const aiFeatures = [
    {
      title: 'Contextual Analysis',
      description: 'AI provides detailed context about when and why verses were revealed',
      icon: '🔍'
    },
    {
      title: 'Modern Application',
      description: 'Discover how Quranic teachings apply to contemporary challenges',
      icon: '🌐'
    },
    {
      title: 'Thematic Connections',
      description: 'Find connections between different verses and surahs on similar topics',
      icon: '🔗'
    },
    {
      title: 'Study Guides',
      description: 'AI-generated study plans and reflection questions for deeper learning',
      icon: '📝'
    }
  ]

  const screenshots = [
    { title: 'Quran Reader', description: 'Beautiful Arabic text with translation' },
    { title: 'AI Analysis', description: 'Deep insights powered by artificial intelligence' },
    { title: 'Audio Player', description: 'High-quality recitation with sync' },
    { title: 'Bookmarks', description: 'Save and organize your favorite verses' }
  ]

  const specifications = [
    { label: 'Platform', value: 'Android & iOS' },
    { label: 'Size', value: '45 MB' },
    { label: 'Languages', value: 'Arabic, Indonesian, English' },
    { label: 'Offline Mode', value: 'Full Quran text available offline' },
    { label: 'Audio Quality', value: 'High-quality MP3 recitation' },
    { label: 'AI Technology', value: 'Advanced NLP and contextual analysis' }
  ]

  return (
    <div className="product-page">
      <Header />
      
      {/* Hero Section */}
      <section className="product-hero quranmind-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🤖</span>
              <span>QuranMind</span>
            </div>
            <h1>AI-Powered Quran Study Companion</h1>
            <p className="hero-description">
              Revolutionary Islamic app that combines traditional Quran reading with cutting-edge AI technology. 
              Discover deeper meanings, historical contexts, and modern applications of Quranic verses.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">114</span>
                <span className="stat-label">Surahs</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <span>Download Free</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              <button className="btn btn-secondary">
                <span>Try Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <img src="/assets/images/quranmind-hero.png" alt="QuranMind Interface" />
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
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

      {/* Features Section */}
      <section className="product-features">
        <div className="container">
          <div className="section-header">
            <h2>Comprehensive Quran Study Features</h2>
            <p>Everything you need for a meaningful Quran study experience</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="ai-features">
        <div className="container">
          <div className="section-header">
            <h2>Revolutionary AI Technology</h2>
            <p>Discover how artificial intelligence enhances your Quran study experience</p>
          </div>
          <div className="ai-features-grid">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="ai-feature-card">
                <div className="ai-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="product-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Transform Your Spiritual Journey</h2>
            <p>Experience the benefits of AI-enhanced Quran study</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="product-screenshots">
        <div className="container">
          <div className="section-header">
            <h2>App Interface</h2>
            <p>Beautiful, intuitive design for enhanced Quran study</p>
          </div>
          <div className="screenshots-grid">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="screenshot-card">
                <div className="screenshot-image">
                  <img src={`/assets/images/quranmind-screen-${index + 1}.png`} alt={screenshot.title} />
                </div>
                <h4>{screenshot.title}</h4>
                <p>{screenshot.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="product-specs">
        <div className="container">
          <div className="section-header">
            <h2>Technical Specifications</h2>
            <p>Detailed information about QuranMind's capabilities</p>
          </div>
          <div className="specs-grid">
            {specifications.map((spec, index) => (
              <div key={index} className="spec-item">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="content-break-ad">
        <GoogleAdSense
          userConsent={userConsent}
          adFormat="rectangle"
          variant="premium"
          adLabel="Sponsored"
          showLoadingAnimation={true}
          className="product-page-ad-footer"
        />
      </div>

      {/* CTA Section */}
      <section className="product-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Begin Your Enhanced Quran Journey</h2>
            <p>Join thousands of users who have transformed their Quran study with AI technology</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <span>Download QuranMind</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default QuranMindPage