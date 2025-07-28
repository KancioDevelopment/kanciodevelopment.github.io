import React from 'react'
import './ApotekAppShowcase.css'

const ApotekAppShowcase: React.FC = () => {
  const features = [
    {
      icon: '📦',
      title: 'Drug Stock Management',
      description: 'Comprehensive inventory control with initial stock setup, real-time tracking, and automated alerts for low stock levels.'
    },
    {
      icon: '💳',
      title: 'Sales Recording',
      description: 'Efficient sales transaction recording with detailed customer information, prescription management, and receipt generation.'
    },
    {
      icon: '📊',
      title: 'Financial Reports',
      description: 'Complete financial tracking with daily, weekly, and monthly reports to monitor revenue, expenses, and profitability.'
    },
    {
      icon: '📋',
      title: 'Stock Taking',
      description: 'Easy stock taking functionality to verify physical inventory against system records and identify discrepancies.'
    },
    {
      icon: '🎯',
      title: 'Intuitive Interface',
      description: 'User-friendly and responsive design that provides a comfortable experience for pharmacy staff and management.'
    },
    {
      icon: '📈',
      title: 'Business Growth',
      description: 'Analytics and insights to help optimize operations, track performance, and support pharmacy growth and success.'
    }
  ]

  const benefits = [
    {
      title: 'Streamlined Operations',
      description: 'Automate routine tasks and reduce manual work with integrated systems',
      icon: '⚡'
    },
    {
      title: 'Accurate Inventory',
      description: 'Real-time stock tracking prevents overstocking and stockouts',
      icon: '🎯'
    },
    {
      title: 'Financial Control',
      description: 'Complete visibility into pharmacy finances and profitability',
      icon: '💰'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Built-in features to help maintain pharmacy regulations and standards',
      icon: '✅'
    }
  ]

  const clientTestimonials = [
    {
      name: 'Apotek Mitra Syifa',
      location: 'Srengat, Blitar',
      feedback: 'ApotekApp has revolutionized our pharmacy management. Stock control is now effortless!',
      rating: 5
    },
    {
      name: 'Apotek E32',
      location: 'Garum, Blitar',
      feedback: 'The financial reports feature helps us make better business decisions every day.',
      rating: 5
    }
  ]

  return (
    <section className="apotekapp-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">Business Solution</div>
          <h2 className="showcase__title">
            ApotekApp
            <span className="showcase__title-highlight"> Pharmacy Management System</span>
          </h2>
          <p className="showcase__subtitle">
            The complete solution for modern pharmacy management. Streamline your operations,
            track inventory, record sales, and monitor finances - all in one intuitive platform.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="showcase__hero-text">
              <h3>Transform Your Pharmacy Operations</h3>
              <p>
                ApotekApp is designed specifically for pharmacy owners and managers who want to
                optimize their operations, reduce manual work, and focus on growing their business.
                With over 10+ satisfied clients, we understand what pharmacies need to succeed.
              </p>
              <div className="showcase__highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">📦</span>
                  <span>Smart Inventory</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💳</span>
                  <span>Easy Sales</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">📊</span>
                  <span>Financial Insights</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">👥</span>
                  <span>10+ Clients</span>
                </div>
              </div>
              <div className="showcase__download">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kancio.apotikapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn download-btn--apotekapp"
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
              <div className="phone-mockup phone-mockup--pharmacy">
                <div className="phone-screen">
                  <div className="pharmacy-app-preview">
                    <div className="app-header">
                      <div className="app-title">
                        <span className="app-icon">💊</span>
                        <span className="app-name">ApotekApp</span>
                      </div>
                      <div className="app-user">
                        <span className="user-name">Admin</span>
                        <span className="notification-badge">3</span>
                      </div>
                    </div>
                    <div className="dashboard-summary">
                      <div className="summary-card">
                        <div className="card-icon">💰</div>
                        <div className="card-info">
                          <div className="card-value">Rp 2.5M</div>
                          <div className="card-label">Today's Sales</div>
                        </div>
                      </div>
                      <div className="summary-card">
                        <div className="card-icon">📦</div>
                        <div className="card-info">
                          <div className="card-value">1,247</div>
                          <div className="card-label">Items in Stock</div>
                        </div>
                      </div>
                    </div>
                    <div className="quick-actions">
                      <div className="action-grid">
                        <div className="action-btn">
                          <span className="action-icon">🛒</span>
                          <span className="action-text">New Sale</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">📋</span>
                          <span className="action-text">Stock Take</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">📊</span>
                          <span className="action-text">Reports</span>
                        </div>
                        <div className="action-btn">
                          <span className="action-icon">⚠️</span>
                          <span className="action-text">Low Stock</span>
                        </div>
                      </div>
                    </div>
                    <div className="recent-transactions">
                      <div className="section-title">Recent Sales</div>
                      <div className="transaction-item">
                        <span className="drug-name">Paracetamol 500mg</span>
                        <span className="transaction-amount">Rp 15,000</span>
                      </div>
                      <div className="transaction-item">
                        <span className="drug-name">Amoxicillin 250mg</span>
                        <span className="transaction-amount">Rp 25,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__features">
            <h3>Complete Pharmacy Management Features</h3>
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
              <h3>Why Choose ApotekApp for Your Pharmacy?</h3>
              <p>Join 10+ successful pharmacies that have transformed their operations with ApotekApp</p>
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

          <div className="showcase__testimonials">
            <h3>What Our Clients Say</h3>
            <div className="testimonials-grid">
              {clientTestimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.feedback}"</p>
                    <div className="testimonial-author">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-location">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__cta">
            <div className="cta-content">
              <h3>Ready to Optimize Your Pharmacy Operations?</h3>
              <p>Join successful pharmacy owners who have streamlined their business with ApotekApp</p>
              <div className="cta-stats">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Reliable</span>
                </div>
              </div>
              <a
                href="https://play.google.com/store/apps/details?id=com.kancio.apotikapp"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Download ApotekApp Now
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApotekAppShowcase