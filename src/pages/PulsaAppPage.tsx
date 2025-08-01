import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const PulsaAppPage: React.FC = () => {
  const { userConsent } = useAds()

  const features = [
    {
      icon: '💰',
      title: 'Cheaper Purchases',
      description: 'Get better prices compared to physical outlets or other apps. Save money on regular purchases of credit, data packages, and more.'
    },
    {
      icon: '⚡',
      title: 'Fast Transactions',
      description: 'Complete your purchases in seconds with our automated online transaction system. Products are delivered instantly after payment.'
    },
    {
      icon: '📱',
      title: 'Easy to Use',
      description: 'Simple and intuitive interface with purchase history and payment reminders to make your buying process more efficient.'
    },
    {
      icon: '🛡️',
      title: 'Secure & Safe',
      description: 'Advanced security technology protects your data with secure payment methods including bank transfers and PulsaPay digital wallet.'
    },
    {
      icon: '🎯',
      title: 'Complete Products',
      description: 'Wide variety of products from different providers - credit, data packages, game vouchers, and e-money all in one place.'
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Professional customer support team available via phone, email, or chat to help with any issues during your purchase process.'
    }
  ]

  const products = [
    { name: 'Mobile Credit', icon: '📞', providers: '10+ Providers', description: 'Top-up your mobile credit instantly from all major Indonesian networks' },
    { name: 'Data Packages', icon: '📶', providers: 'All Networks', description: 'Internet data packages for Telkomsel, Indosat, XL, Tri, and more' },
    { name: 'Game Vouchers', icon: '🎮', providers: '50+ Games', description: 'Gaming credits for Mobile Legends, PUBG, Free Fire, and other popular games' },
    { name: 'E-Money', icon: '💳', providers: 'GoPay, OVO, DANA', description: 'Top-up your digital wallet for seamless cashless transactions' }
  ]

  const screenshots = [
    { title: 'Dashboard', description: 'Clean and intuitive main interface' },
    { title: 'Product Selection', description: 'Easy product browsing and selection' },
    { title: 'Payment Process', description: 'Secure and fast payment methods' },
    { title: 'Transaction History', description: 'Complete purchase tracking' }
  ]

  const specifications = [
    { label: 'Platform', value: 'Android & iOS' },
    { label: 'Size', value: '25 MB' },
    { label: 'Languages', value: 'Indonesian, English' },
    { label: 'Payment Methods', value: 'Bank Transfer, E-wallet, Credit Card' },
    { label: 'Supported Networks', value: 'Telkomsel, Indosat, XL, Tri, Smartfren' },
    { label: 'Security', value: 'SSL Encryption, OTP Verification' }
  ]

  return (
    <div className="product-page">
      <Header />
      
      {/* Hero Section */}
      <section className="product-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">📱</span>
              <span>PulsaApp</span>
            </div>
            <h1>Smart Mobile Credit & Digital Payment Solution</h1>
            <p className="hero-description">
              Indonesia's leading mobile app for purchasing credit, data packages, game vouchers, and e-money top-ups. 
              Experience faster, cheaper, and more secure digital transactions.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Downloads</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Products</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <span>Download Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              <button className="btn btn-secondary">
                <span>View Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <img src="/assets/images/pulsaapp-hero.png" alt="PulsaApp Interface" />
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
            <h2>Why Choose PulsaApp?</h2>
            <p>Discover the features that make PulsaApp the preferred choice for millions of users</p>
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

      {/* Products Section */}
      <section className="product-categories">
        <div className="container">
          <div className="section-header">
            <h2>Available Products</h2>
            <p>Complete range of digital products for all your needs</p>
          </div>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{product.icon}</div>
                <h3>{product.name}</h3>
                <p className="product-providers">{product.providers}</p>
                <p className="product-description">{product.description}</p>
                <button className="btn btn-outline">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="product-screenshots">
        <div className="container">
          <div className="section-header">
            <h2>App Screenshots</h2>
            <p>Take a look at PulsaApp's beautiful and intuitive interface</p>
          </div>
          <div className="screenshots-grid">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="screenshot-card">
                <div className="screenshot-image">
                  <img src={`/assets/images/pulsaapp-screen-${index + 1}.png`} alt={screenshot.title} />
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
            <p>Detailed information about PulsaApp's technical requirements and features</p>
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
            <h2>Ready to Start Saving?</h2>
            <p>Join millions of users who trust PulsaApp for their digital payment needs</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <span>Download PulsaApp</span>
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

export default PulsaAppPage