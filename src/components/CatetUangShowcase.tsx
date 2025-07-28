import React from 'react'
import './CatetUangShowcase.css'

const CatetUangShowcase: React.FC = () => {
  const features = [
    {
      icon: '📝',
      title: 'Income & Expense Recording',
      description: 'Record all financial transactions manually or automatically with customizable categories like food, transportation, salary, and entertainment.'
    },
    {
      icon: '📊',
      title: 'Automatic Financial Reports',
      description: 'Daily, weekly, and monthly financial summaries with graphs and diagrams showing spending patterns and income sources.'
    },
    {
      icon: '🧠',
      title: 'Financial Analytics & Insights',
      description: 'Data-driven advice on saving, budget balancing, and achieving financial goals with wasteful habit identification.'
    },
    {
      icon: '💸',
      title: 'Budget Management',
      description: 'Set budgets for specific categories and monitor usage in real-time to avoid overspending and encourage financial discipline.'
    },
    {
      icon: '📅',
      title: 'Personal Financial Planning',
      description: 'Monthly and yearly planning with savings targets, debt repayment, and investment goals plus payment reminders.'
    },
    {
      icon: '🔒',
      title: 'Security & Privacy',
      description: 'Encrypted data storage with high security standards and dual authentication features for protecting personal information.'
    }
  ]

  const benefits = [
    {
      title: 'Financial Awareness',
      description: 'Regular recording increases awareness of spending habits and helps avoid unnecessary expenses',
      icon: '👁️'
    },
    {
      title: 'Full Money Control',
      description: 'Know your financial position anytime to make confident financial decisions',
      icon: '🎯'
    },
    {
      title: 'Future Preparation',
      description: 'Build emergency funds, education savings, and retirement preparation systematically',
      icon: '🌟'
    },
    {
      title: 'Fun Experience',
      description: 'Friendlier, lighter, and more humanistic approach compared to rigid financial apps',
      icon: '😊'
    }
  ]

  const targetUsers = [
    {
      title: 'Individuals',
      description: 'People who want to manage personal finances better',
      icon: '👤'
    },
    {
      title: 'Couples & Families',
      description: 'Joint expense recording for shared financial goals',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Freelancers',
      description: 'Manage irregular income and variable expenses',
      icon: '💼'
    },
    {
      title: 'New Users',
      description: 'Perfect for those new to financial recording apps',
      icon: '🆕'
    }
  ]

  return (
    <section className="catetang-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">Personal Finance</div>
          <h2 className="showcase__title">
            Catet Uang
            <span className="showcase__title-highlight"> Money Recording Made Simple</span>
          </h2>
          <p className="showcase__subtitle">
            Transform your financial habits with intelligent tracking, insightful analytics, 
            and personalized planning tools designed for everyone - from students to business owners.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="showcase__hero-text">
              <h3>Your Daily Financial Companion</h3>
              <p>
                Catet Uang is more than just a money tracking app - it's a comprehensive financial 
                empowerment tool that combines ease of use with intelligent analysis. Whether you're 
                a student managing allowances or a family planning for the future, our app provides 
                the insights you need to build healthy financial habits.
              </p>
              <div className="showcase__highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">📱</span>
                  <span>Intuitive Interface</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">📈</span>
                  <span>Smart Analytics</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎯</span>
                  <span>Goal Tracking</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🔒</span>
                  <span>Secure & Private</span>
                </div>
              </div>
              <div className="showcase__download">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.kancio.cashflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn download-btn--catetang"
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
              <div className="phone-mockup phone-mockup--finance">
                <div className="phone-screen">
                  <div className="finance-app-preview">
                    <div className="app-header">
                      <div className="app-title">
                        <span className="app-icon">💰</span>
                        <span className="app-name">Catet Uang</span>
                      </div>
                      <div className="app-profile">
                        <span className="profile-icon">👤</span>
                        <span className="greeting">Hi, Sarah!</span>
                      </div>
                    </div>
                    <div className="balance-summary">
                      <div className="balance-card">
                        <div className="balance-label">Total Balance</div>
                        <div className="balance-amount">Rp 2,450,000</div>
                        <div className="balance-change positive">+5.2% this month</div>
                      </div>
                    </div>
                    <div className="quick-stats">
                      <div className="stat-item income">
                        <div className="stat-icon">📈</div>
                        <div className="stat-info">
                          <div className="stat-label">Income</div>
                          <div className="stat-value">Rp 3.2M</div>
                        </div>
                      </div>
                      <div className="stat-item expense">
                        <div className="stat-icon">📉</div>
                        <div className="stat-info">
                          <div className="stat-label">Expenses</div>
                          <div className="stat-value">Rp 750K</div>
                        </div>
                      </div>
                    </div>
                    <div className="recent-transactions">
                      <div className="section-title">Recent Transactions</div>
                      <div className="transaction-list">
                        <div className="transaction-item">
                          <div className="transaction-icon food">🍕</div>
                          <div className="transaction-details">
                            <div className="transaction-name">Lunch</div>
                            <div className="transaction-category">Food</div>
                          </div>
                          <div className="transaction-amount expense">-Rp 25,000</div>
                        </div>
                        <div className="transaction-item">
                          <div className="transaction-icon income">💼</div>
                          <div className="transaction-details">
                            <div className="transaction-name">Salary</div>
                            <div className="transaction-category">Income</div>
                          </div>
                          <div className="transaction-amount income">+Rp 3,200,000</div>
                        </div>
                      </div>
                    </div>
                    <div className="action-buttons">
                      <button className="action-btn add-expense">
                        <span className="btn-icon">➖</span>
                        <span className="btn-text">Add Expense</span>
                      </button>
                      <button className="action-btn add-income">
                        <span className="btn-icon">➕</span>
                        <span className="btn-text">Add Income</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__features">
            <h3>Comprehensive Financial Management Features</h3>
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
              <h3>Transform Your Financial Journey</h3>
              <p>Build healthy financial habits with tools designed for real-life money management</p>
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

          <div className="showcase__target-users">
            <h3>Perfect For Everyone</h3>
            <p className="target-subtitle">Whether you're just starting your financial journey or looking to optimize your money management</p>
            <div className="users-grid">
              {targetUsers.map((user, index) => (
                <div key={index} className="user-card">
                  <div className="user-card__icon">{user.icon}</div>
                  <h4 className="user-card__title">{user.title}</h4>
                  <p className="user-card__description">{user.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__cta">
            <div className="cta-content">
              <h3>Start Your Financial Transformation Today</h3>
              <p>Join thousands who have taken control of their finances with Catet Uang</p>
              <div className="cta-features">
                <div className="feature-highlight">
                  <span className="feature-icon">✨</span>
                  <span>Beautiful & Intuitive Design</span>
                </div>
                <div className="feature-highlight">
                  <span className="feature-icon">📊</span>
                  <span>Powerful Analytics & Insights</span>
                </div>
                <div className="feature-highlight">
                  <span className="feature-icon">🎯</span>
                  <span>Goal-Oriented Planning</span>
                </div>
              </div>
              <a 
                href="https://play.google.com/store/apps/details?id=com.kancio.cashflow"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Download Catet Uang Now
                <span className="cta-arrow">→</span>
              </a>
              <div className="cta-note">
                Free to download • Available on Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatetUangShowcase