import React from 'react'
import './PulsaAppShowcase.css'

const PulsaAppShowcase: React.FC = () => {
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
    { name: 'Mobile Credit', icon: '📞', providers: '10+ Providers' },
    { name: 'Data Packages', icon: '📶', providers: 'All Networks' },
    { name: 'Game Vouchers', icon: '🎮', providers: '50+ Games' },
    { name: 'E-Money', icon: '💳', providers: 'GoPay, OVO, DANA' }
  ]

  return (
    <section className="pulsaapp-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">Featured Product</div>
          <h2 className="showcase__title">
            PulsaApp
            <span className="showcase__title-highlight"> Digital Payment Solution</span>
          </h2>
          <p className="showcase__subtitle">
            Your trusted companion for all digital payment needs - from mobile credit to game vouchers, 
            all with guaranteed cheaper prices and instant delivery.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="showcase__hero-text">
              <h3>Why Choose PulsaApp?</h3>
              <p>
                Experience the future of digital payments with PulsaApp - designed to make 
                your life easier with cheaper prices, faster transactions, and complete security.
              </p>
              <div className="showcase__download">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.kancio.indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn download-btn--playstore"
                >
                  <div className="download-btn__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
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
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="app-preview">
                    <div className="app-header">
                      <div className="app-logo">PulsaApp</div>
                      <div className="app-balance">Saldo: Rp 50.000</div>
                    </div>
                    <div className="app-menu">
                      <div className="menu-item">📞 Pulsa</div>
                      <div className="menu-item">📶 Data</div>
                      <div className="menu-item">🎮 Game</div>
                      <div className="menu-item">💳 E-Money</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__products">
            <h3>Available Products</h3>
            <div className="products-grid">
              {products.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-card__icon">{product.icon}</div>
                  <h4 className="product-card__name">{product.name}</h4>
                  <p className="product-card__providers">{product.providers}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__features">
            <h3>Key Features & Benefits</h3>
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
        </div>
      </div>
    </section>
  )
}

export default PulsaAppShowcase