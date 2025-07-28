import React from 'react'
import './Services.css'

const Services: React.FC = () => {
  const services = [
    {
      icon: '🚀',
      title: 'Custom Application Development',
      description: 'Tailored applications based on our proven successful apps like PulsaApp, QuranMind, ApotekApp, and Catet Uang.',
      features: ['Custom Payment Solutions', 'Industry-Specific Apps', 'Business Management Tools', 'Proven Architecture'],
      color: 'from-violet-500 to-purple-600',
      isHighlight: true
    },
    {
      icon: '🤖',
      title: 'AI Integration for Existing Apps',
      description: 'Transform your existing applications with cutting-edge AI capabilities. Enhance user experience and automate processes.',
      features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Intelligent Automation'],
      color: 'from-cyan-500 to-blue-600',
      isNew: true
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with exceptional user experience.',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with the latest technologies.',
      features: ['React/Next.js', 'Node.js', 'Progressive Web Apps', 'SEO Optimization'],
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: '🛍️',
      title: 'E-commerce Solutions',
      description: 'Complete online store solutions with payment integration and inventory management.',
      features: ['Custom E-commerce', 'Payment Gateway', 'Inventory System', 'Analytics Dashboard'],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: '💳',
      title: 'Digital Payment Integration',
      description: 'Secure payment processing and fintech solutions for seamless transactions.',
      features: ['Payment Gateway', 'Digital Wallet', 'Transaction Security', 'Multi-currency Support'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'User-centered design that creates engaging and intuitive digital experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: 'from-indigo-500 to-blue-600'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services__header">
          <div className="services__badge">Our Services</div>
          <h2 className="services__title">
            Comprehensive Digital Solutions
            <span className="services__title-highlight"> For Your Business</span>
          </h2>
          <p className="services__subtitle">
            From concept to deployment, we provide end-to-end digital services 
            that drive growth and innovation for your business.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className={`service-card ${service.isHighlight ? 'service-card--highlight' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="service-card__header">
                <div className={`service-card__icon service-card__icon--${service.color}`}>
                  {service.icon}
                </div>
                <div className="service-card__number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                {service.isHighlight && (
                  <div className="service-card__badge">Featured</div>
                )}
                {service.isNew && (
                  <div className="service-card__badge service-card__badge--new">New</div>
                )}
              </div>
              
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                
                <ul className="service-card__features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="service-card__feature">
                      <span className="service-card__feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="service-card__footer">
                <button className="service-card__cta">
                  Learn More
                  <span className="service-card__cta-icon">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="services__cta">
          <div className="services__cta-content">
            <h3>Ready to Start Your Project?</h3>
            <p>Let's discuss how we can help transform your ideas into reality.</p>
            <div className="services__cta-buttons">
              <a href="#contact" className="btn btn--primary btn--large">
                Get Started
                <span className="btn__icon">→</span>
              </a>
              <a href="#about" className="btn btn--secondary btn--large">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services