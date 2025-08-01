import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const ApotekAppPage: React.FC = () => {
  const { userConsent } = useAds()

  const features = [
    {
      icon: '💊',
      title: 'Medicine Search',
      description: 'Comprehensive database of medications with detailed information, dosage instructions, and side effects.'
    },
    {
      icon: '🏥',
      title: 'Pharmacy Locator',
      description: 'Find nearby pharmacies with real-time availability, opening hours, and contact information.'
    },
    {
      icon: '📱',
      title: 'Digital Prescription',
      description: 'Upload and manage your prescriptions digitally with secure cloud storage and easy access.'
    },
    {
      icon: '💳',
      title: 'Easy Payment',
      description: 'Multiple payment options including cash, credit card, and digital wallets for convenient transactions.'
    },
    {
      icon: '🚚',
      title: 'Home Delivery',
      description: 'Get your medications delivered to your doorstep with fast and reliable delivery service.'
    },
    {
      icon: '⏰',
      title: 'Medication Reminder',
      description: 'Smart reminder system to help you take medications on time with customizable notifications.'
    }
  ]

  const services = [
    {
      title: 'Prescription Drugs',
      description: 'Wide range of prescription medications from trusted pharmaceutical companies',
      icon: '💊',
      availability: 'Available'
    },
    {
      title: 'Over-the-Counter',
      description: 'Common OTC medications for everyday health needs and minor ailments',
      icon: '🩹',
      availability: 'In Stock'
    },
    {
      title: 'Health Supplements',
      description: 'Vitamins, minerals, and dietary supplements for optimal health',
      icon: '💪',
      availability: 'Available'
    },
    {
      title: 'Medical Devices',
      description: 'Essential medical equipment and devices for home healthcare',
      icon: '🩺',
      availability: 'Available'
    }
  ]

  const benefits = [
    {
      title: 'Save Time',
      description: 'Skip the queues and order medications from the comfort of your home',
      icon: '⏱️'
    },
    {
      title: 'Better Prices',
      description: 'Competitive pricing with regular discounts and promotional offers',
      icon: '💰'
    },
    {
      title: 'Professional Support',
      description: '24/7 pharmacist consultation and medication guidance',
      icon: '👨‍⚕️'
    },
    {
      title: 'Secure & Safe',
      description: 'Licensed pharmacies with authentic medications and secure transactions',
      icon: '🔒'
    }
  ]

  const screenshots = [
    { title: 'Home Dashboard', description: 'Easy navigation and quick access to services' },
    { title: 'Medicine Search', description: 'Comprehensive drug database and information' },
    { title: 'Pharmacy Map', description: 'Find nearest pharmacies with live updates' },
    { title: 'Order Tracking', description: 'Real-time delivery tracking and updates' }
  ]

  const specifications = [
    { label: 'Platform', value: 'Android & iOS' },
    { label: 'Size', value: '35 MB' },
    { label: 'Languages', value: 'Indonesian, English' },
    { label: 'Pharmacy Partners', value: '500+ Registered Pharmacies' },
    { label: 'Payment Methods', value: 'Cash, Card, E-wallet, Bank Transfer' },
    { label: 'Delivery Areas', value: 'Jakarta, Surabaya, Bandung, Medan' }
  ]

  return (
    <div className="product-page">
      <Header />
      
      {/* Hero Section */}
      <section className="product-hero apotekapp-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🏥</span>
              <span>ApotekApp</span>
            </div>
            <h1>Your Digital Pharmacy Companion</h1>
            <p className="hero-description">
              Complete pharmacy solution in your pocket. Find medications, locate pharmacies, 
              manage prescriptions, and get medicines delivered to your door with Indonesia's most trusted pharmacy app.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">250K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Pharmacies</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.7</span>
                <span className="stat-label">Rating</span>
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
              <img src="/assets/images/apotekapp-hero.png" alt="ApotekApp Interface" />
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
            <h2>Complete Pharmacy Solutions</h2>
            <p>Everything you need for convenient and safe medication management</p>
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

      {/* Services Section */}
      <section className="product-categories">
        <div className="container">
          <div className="section-header">
            <h2>Available Products & Services</h2>
            <p>Comprehensive range of pharmaceutical products and healthcare services</p>
          </div>
          <div className="products-grid">
            {services.map((service, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="product-providers">Status: {service.availability}</p>
                <p className="product-description">{service.description}</p>
                <button className="btn btn-outline">Browse Products</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="product-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose ApotekApp?</h2>
            <p>Experience the advantages of digital pharmacy services</p>
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
            <h2>App Screenshots</h2>
            <p>Explore ApotekApp's user-friendly interface and features</p>
          </div>
          <div className="screenshots-grid">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="screenshot-card">
                <div className="screenshot-image">
                  <img src={`/assets/images/apotekapp-screen-${index + 1}.png`} alt={screenshot.title} />
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
            <p>Detailed information about ApotekApp's features and coverage</p>
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
            <h2>Get Your Medications Delivered Today</h2>
            <p>Join thousands of users who trust ApotekApp for their pharmacy needs</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <span>Download ApotekApp</span>
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

export default ApotekAppPage