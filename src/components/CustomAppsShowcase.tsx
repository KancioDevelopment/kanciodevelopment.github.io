import React from 'react'
import './CustomAppsShowcase.css'

const CustomAppsShowcase: React.FC = () => {
  const customSolutions = [
    {
      icon: '💳',
      title: 'Custom Payment Solutions',
      description: 'Based on PulsaApp success',
      baseApp: 'PulsaApp',
      examples: [
        'E-wallet for specific institutions',
        'Corporate payment systems',
        'Loyalty point management',
        'Multi-merchant payment hubs'
      ],
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      icon: '📚',
      title: 'Educational & Religious Apps',
      description: 'Inspired by QuranMind technology',
      baseApp: 'QuranMind',
      examples: [
        'AI-powered Bible study apps',
        'Language learning platforms',
        'Religious text analysis tools',
        'Educational content with AI insights'
      ],
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
      icon: '🏥',
      title: 'Healthcare Management',
      description: 'Built on ApotekApp framework',
      baseApp: 'ApotekApp',
      examples: [
        'Clinic management systems',
        'Medical inventory tracking',
        'Patient record management',
        'Healthcare analytics dashboards'
      ],
      gradient: 'linear-gradient(135deg, #ef4444, #ec4899)'
    },
    {
      icon: '📊',
      title: 'Financial Management Tools',
      description: 'Enhanced from Catet Uang',
      baseApp: 'Catet Uang',
      examples: [
        'Corporate expense tracking',
        'Investment portfolio managers',
        'Budget planning for organizations',
        'Multi-currency financial apps'
      ],
      gradient: 'linear-gradient(135deg, #eab308, #ea580c)'
    }
  ]

  const advantages = [
    {
      icon: '✅',
      title: 'Proven Architecture',
      description: 'Built on battle-tested foundations from our successful live applications'
    },
    {
      icon: '⚡',
      title: 'Faster Development',
      description: 'Leverage existing components and patterns to reduce development time by 40-60%'
    },
    {
      icon: '🎯',
      title: 'Industry Expertise',
      description: 'Deep understanding of specific industry needs and user behaviors'
    },
    {
      icon: '🔒',
      title: 'Security & Reliability',
      description: 'Inherit security features and reliability from production-tested applications'
    },
    {
      icon: '📈',
      title: 'Scalable Solutions',
      description: 'Architecture designed to handle growth from startup to enterprise level'
    },
    {
      icon: '🛠️',
      title: 'Ongoing Support',
      description: 'Continuous maintenance and updates based on our experience with live apps'
    }
  ]

  return (
    <section className="custom-apps-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">Custom Development</div>
          <h2 className="showcase__title">
            Custom Applications
            <span className="showcase__title-highlight"> Based on Proven Success</span>
          </h2>
          <p className="showcase__subtitle">
            Leverage the success of our flagship applications to create tailored solutions
            for your specific industry needs. Get the benefits of proven architecture with
            custom features designed for your business.
          </p>
        </div>

        <div className="showcase__content">
          <div className="showcase__hero">
            <div className="hero-text">
              <h3>Why Build from Scratch When You Can Build on Success?</h3>
              <p>
                Our flagship applications - PulsaApp, QuranMind, ApotekApp, and Catet Uang -
                represent thousands of hours of development, testing, and real-world validation.
                Instead of starting from zero, we can adapt these proven solutions to create
                custom applications tailored to your specific industry and requirements.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Proven Apps</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Business Clients</span>
                </div>
                {/* <div className="stat-item">
                  <span className="stat-number">50k+</span>
                  <span className="stat-label">Total Users</span>
                </div> */}
                <div className="stat-item">
                  <span className="stat-number">40-60%</span>
                  <span className="stat-label">Time Savings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__solutions">
            <h3>Custom Solutions We Can Build</h3>
            <div className="solutions-grid">
              {customSolutions.map((solution, index) => (
                <div key={index} className="solution-card">
                  <div className="solution-card__header">
                    <div className="solution-card__icon" style={{ background: solution.gradient }}>
                      {solution.icon}
                    </div>
                    <div className="solution-card__badge">
                      Based on {solution.baseApp}
                    </div>
                  </div>
                  <div className="solution-card__content">
                    <h4 className="solution-card__title">{solution.title}</h4>
                    <p className="solution-card__description">{solution.description}</p>
                    <ul className="solution-card__examples">
                      {solution.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="solution-example">
                          <span className="example-bullet">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__advantages">
            <h3>Advantages of Custom Apps Based on Our Success</h3>
            <div className="advantages-grid">
              {advantages.map((advantage, index) => (
                <div key={index} className="advantage-card">
                  <div className="advantage-card__icon">{advantage.icon}</div>
                  <div className="advantage-card__content">
                    <h4 className="advantage-card__title">{advantage.title}</h4>
                    <p className="advantage-card__description">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase__process">
            <h3>Our Custom Development Process</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="process-step__number">1</div>
                <div className="process-step__content">
                  <h4>Discovery & Analysis</h4>
                  <p>Understanding your specific requirements and identifying the best base application to adapt</p>
                </div>
              </div>
              <div className="process-step">
                <div className="process-step__number">2</div>
                <div className="process-step__content">
                  <h4>Architecture Planning</h4>
                  <p>Designing the custom features and modifications needed while preserving proven core functionality</p>
                </div>
              </div>
              <div className="process-step">
                <div className="process-step__number">3</div>
                <div className="process-step__content">
                  <h4>Rapid Development</h4>
                  <p>Building your custom application using our proven frameworks and tested components</p>
                </div>
              </div>
              <div className="process-step">
                <div className="process-step__number">4</div>
                <div className="process-step__content">
                  <h4>Testing & Deployment</h4>
                  <p>Rigorous testing followed by deployment with ongoing support and maintenance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase__cta">
            <div className="cta-content">
              <h3>Ready to Build Your Custom Application?</h3>
              <p>
                Let's discuss how we can adapt our proven successful applications to create
                the perfect solution for your business needs.
              </p>
              <div className="cta-buttons">
                <a href="mailto:kancio.indonesia@gmail.com" className="cta-button cta-button--primary">
                  Start Your Project
                  <span className="cta-arrow">→</span>
                </a>
                <a href="tel:+6282325600996" className="cta-button cta-button--secondary">
                  Call Us Now
                </a>
              </div>
              <div className="cta-note">
                Free consultation • Fast turnaround • Proven results
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomAppsShowcase