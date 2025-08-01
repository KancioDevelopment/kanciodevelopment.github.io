import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const CustomAppsPage: React.FC = () => {
  const { userConsent } = useAds()

  const services = [
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native iOS and Android apps built with modern frameworks and best practices for optimal performance.'
    },
    {
      icon: '💻',
      title: 'Web Applications',
      description: 'Responsive web applications using React, Vue.js, or Angular with cloud deployment and scalability.'
    },
    {
      icon: '🛒',
      title: 'E-commerce Solutions',
      description: 'Complete online store solutions with payment integration, inventory management, and analytics.'
    },
    {
      icon: '📊',
      title: 'Business Management Systems',
      description: 'Custom CRM, ERP, and business process automation tools tailored to your specific needs.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Applications',
      description: 'Intelligent applications with machine learning, natural language processing, and predictive analytics.'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure, API development, and microservices architecture.'
    }
  ]

  const technologies = [
    {
      category: 'Mobile Development',
      tools: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
      icon: '📱'
    },
    {
      category: 'Web Development',
      tools: ['React', 'Vue.js', 'Angular', 'Node.js', 'Next.js'],
      icon: '🌐'
    },
    {
      category: 'Backend & Database',
      tools: ['Python', 'Java', 'PHP', 'PostgreSQL', 'MongoDB'],
      icon: '⚙️'
    },
    {
      category: 'Cloud & DevOps',
      tools: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'],
      icon: '☁️'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, define project scope, and create detailed technical specifications.',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Creating user-centered designs, wireframes, and interactive prototypes for validation.',
      icon: '🎨'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Agile development with continuous testing, code reviews, and quality assurance.',
      icon: '⚡'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Seamless deployment, training, and ongoing maintenance with 24/7 technical support.',
      icon: '🚀'
    }
  ]

  const portfolio = [
    {
      title: 'FinTech Mobile App',
      description: 'Digital banking solution with advanced security features',
      category: 'Financial Technology',
      tech: ['React Native', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'E-learning Platform',
      description: 'Comprehensive online education platform with video streaming',
      category: 'Education Technology',
      tech: ['React', 'Python', 'AWS']
    },
    {
      title: 'Healthcare Management',
      description: 'Hospital management system with patient portal integration',
      category: 'Healthcare',
      tech: ['Vue.js', 'Java', 'MySQL']
    },
    {
      title: 'IoT Dashboard',
      description: 'Real-time monitoring and control system for smart devices',
      category: 'Internet of Things',
      tech: ['Angular', 'Python', 'MongoDB']
    }
  ]

  const specifications = [
    { label: 'Development Time', value: '8-24 weeks (varies by complexity)' },
    { label: 'Team Size', value: '3-8 developers per project' },
    { label: 'Project Management', value: 'Agile/Scrum methodology' },
    { label: 'Quality Assurance', value: 'Automated testing & manual QA' },
    { label: 'Support Period', value: '6 months free support included' },
    { label: 'Documentation', value: 'Complete technical documentation' }
  ]

  return (
    <div className="product-page">
      <Header />
      
      {/* Hero Section */}
      <section className="product-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🛠️</span>
              <span>Custom Development</span>
            </div>
            <h1>Bespoke Software Solutions</h1>
            <p className="hero-description">
              Transform your business with custom-built applications tailored to your unique needs. 
              From mobile apps to enterprise systems, we deliver innovative solutions that drive growth and efficiency.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <span>Start Your Project</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <button className="btn btn-secondary">
                <span>View Portfolio</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <img src="/assets/images/custom-development.png" alt="Custom Development" />
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

      {/* Services Section */}
      <section className="product-features">
        <div className="container">
          <div className="section-header">
            <h2>Our Development Services</h2>
            <p>Comprehensive software development solutions for modern businesses</p>
          </div>
          <div className="features-grid">
            {services.map((service, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="product-categories">
        <div className="container">
          <div className="section-header">
            <h2>Technologies We Master</h2>
            <p>Cutting-edge tools and frameworks for superior application development</p>
          </div>
          <div className="products-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{tech.icon}</div>
                <h3>{tech.category}</h3>
                <div className="category-examples">
                  {tech.tools.map((tool, idx) => (
                    <span key={idx} className="example-tag">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="product-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Our Development Process</h2>
            <p>Proven methodology for delivering successful software projects</p>
          </div>
          <div className="benefits-grid">
            {process.map((step, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{step.icon}</div>
                <div className="process-step">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="product-screenshots">
        <div className="container">
          <div className="section-header">
            <h2>Our Recent Projects</h2>
            <p>Examples of successful applications we've built for various industries</p>
          </div>
          <div className="screenshots-grid">
            {portfolio.map((project, index) => (
              <div key={index} className="screenshot-card">
                <div className="screenshot-image">
                  <img src={`/assets/images/portfolio-${index + 1}.png`} alt={project.title} />
                </div>
                <h4>{project.title}</h4>
                <p className="project-category">{project.category}</p>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((technology, idx) => (
                    <span key={idx} className="tech-tag">{technology}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="product-specs">
        <div className="container">
          <div className="section-header">
            <h2>Project Information</h2>
            <p>What to expect when working with our development team</p>
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
            <h2>Ready to Build Something Amazing?</h2>
            <p>Let's discuss your project and turn your ideas into powerful digital solutions</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <span>Get Free Consultation</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
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

export default CustomAppsPage