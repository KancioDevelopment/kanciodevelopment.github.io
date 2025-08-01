import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const CatetUangPage: React.FC = () => {
  const { userConsent } = useAds()

  const features = [
    {
      icon: '💰',
      title: 'Income Tracking',
      description: 'Record all your income sources with detailed categorization and automatic calculation of totals.'
    },
    {
      icon: '💸',
      title: 'Expense Management',
      description: 'Track daily expenses with smart categorization, photo receipts, and spending analytics.'
    },
    {
      icon: '📊',
      title: 'Financial Reports',
      description: 'Comprehensive reports with charts, graphs, and insights to understand your financial patterns.'
    },
    {
      icon: '🎯',
      title: 'Budget Planning',
      description: 'Set monthly budgets, track progress, and get alerts when approaching spending limits.'
    },
    {
      icon: '💳',
      title: 'Multi-Account Support',
      description: 'Manage multiple bank accounts, credit cards, and digital wallets in one app.'
    },
    {
      icon: '📱',
      title: 'Smart Notifications',
      description: 'Receive reminders for bill payments, budget alerts, and spending summaries.'
    }
  ]

  const categories = [
    {
      title: 'Expense Categories',
      description: 'Pre-defined and customizable expense categories for better organization',
      icon: '🏷️',
      examples: ['Food & Dining', 'Transportation', 'Shopping', 'Bills & Utilities', 'Entertainment']
    },
    {
      title: 'Income Sources',
      description: 'Track various income streams and their contribution to your finances',
      icon: '💼',
      examples: ['Salary', 'Freelance', 'Investment', 'Business', 'Other Income']
    },
    {
      title: 'Payment Methods',
      description: 'Support for multiple payment methods and account types',
      icon: '💳',
      examples: ['Cash', 'Credit Card', 'Debit Card', 'E-wallet', 'Bank Transfer']
    },
    {
      title: 'Financial Goals',
      description: 'Set and track financial goals with progress monitoring',
      icon: '🎯',
      examples: ['Emergency Fund', 'Vacation', 'Car Purchase', 'Investment', 'Debt Payment']
    }
  ]

  const benefits = [
    {
      title: 'Better Financial Control',
      description: 'Gain complete visibility into your spending habits and financial health',
      icon: '🎛️'
    },
    {
      title: 'Save Money',
      description: 'Identify unnecessary expenses and optimize your spending patterns',
      icon: '💎'
    },
    {
      title: 'Achieve Goals',
      description: 'Stay on track with your financial goals through systematic planning',
      icon: '🏆'
    },
    {
      title: 'Peace of Mind',
      description: 'Reduce financial stress with organized money management',
      icon: '😌'
    }
  ]

  const screenshots = [
    { title: 'Dashboard', description: 'Overview of your financial status at a glance' },
    { title: 'Add Transaction', description: 'Quick and easy transaction recording' },
    { title: 'Reports & Analytics', description: 'Detailed insights into your spending patterns' },
    { title: 'Budget Tracking', description: 'Monitor your budget progress in real-time' }
  ]

  const specifications = [
    { label: 'Platform', value: 'Android & iOS' },
    { label: 'Size', value: '20 MB' },
    { label: 'Languages', value: 'Indonesian, English' },
    { label: 'Cloud Sync', value: 'Automatic backup and synchronization' },
    { label: 'Security', value: 'PIN, Fingerprint, and Face ID protection' },
    { label: 'Export Formats', value: 'PDF, Excel, CSV reports' }
  ]

  return (
    <div className="product-page">
      <Header />
      
      {/* Hero Section */}
      <section className="product-hero catetUang-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">💰</span>
              <span>CatetUang</span>
            </div>
            <h1>Smart Personal Finance Manager</h1>
            <p className="hero-description">
              Take control of your finances with Indonesia's most intuitive money management app. 
              Track expenses, manage budgets, and achieve your financial goals with powerful analytics and insights.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">300K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free</span>
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
                <span>View Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <img src="/assets/images/catetUang-hero.png" alt="CatetUang Interface" />
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
            <h2>Comprehensive Financial Management</h2>
            <p>All the tools you need to master your personal finances</p>
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

      {/* Categories Section */}
      <section className="product-categories">
        <div className="container">
          <div className="section-header">
            <h2>Organized Financial Categories</h2>
            <p>Structured approach to categorize and manage your finances</p>
          </div>
          <div className="products-grid">
            {categories.map((category, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p className="product-description">{category.description}</p>
                <div className="category-examples">
                  {category.examples.map((example, idx) => (
                    <span key={idx} className="example-tag">{example}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="product-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Transform Your Financial Life</h2>
            <p>Experience the benefits of organized money management</p>
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
            <p>Explore CatetUang's clean and intuitive interface</p>
          </div>
          <div className="screenshots-grid">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="screenshot-card">
                <div className="screenshot-image">
                  <img src={`/assets/images/catetUang-screen-${index + 1}.png`} alt={screenshot.title} />
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
            <p>Detailed information about CatetUang's capabilities</p>
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
            <h2>Start Managing Your Money Better Today</h2>
            <p>Join hundreds of thousands of users who have improved their financial health with CatetUang</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <span>Download CatetUang</span>
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

export default CatetUangPage