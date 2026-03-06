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
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
      title: 'Mobile App Development',
      description: 'Native iOS and Android apps built with modern frameworks and best practices for optimal performance.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: 'Web Applications',
      description: 'Responsive web applications using React, Vue.js, or Angular with cloud deployment and scalability.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
      title: 'E-commerce Solutions',
      description: 'Complete online store solutions with payment integration, inventory management, and analytics.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      title: 'Business Management Systems',
      description: 'Custom CRM, ERP, and business process automation tools tailored to your specific needs.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8"></path>
          <rect x="4" y="8" width="16" height="12" rx="2"></rect>
          <path d="M2 14h2"></path>
          <path d="M20 14h2"></path>
          <path d="M15 13v2"></path>
          <path d="M9 13v2"></path>
        </svg>
      ),
      title: 'AI-Powered Applications',
      description: 'Intelligent applications with machine learning, natural language processing, and predictive analytics.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      ),
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

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, define project scope, and create detailed technical specifications for your success.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Creating user-centered designs, wireframes, and interactive prototypes for early validation and feedback.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.5 1.5"></path>
          <path d="M7 11l-4 4"></path>
          <path d="M5 9l4 4"></path>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Agile development with continuous integration, robust testing, code reviews, and quality assurance.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Seamless deployment, comprehensive training, and ongoing maintenance with dedicated technical support.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"></path>
          <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"></path>
        </svg>
      )
    }
  ]

  const portfolio = [
    {
      title: 'FinTech Mobile App',
      description: 'Digital banking solution with advanced security features and real-time transaction monitoring.',
      category: 'Financial Technology',
      tech: ['React Native', 'Node.js', 'PostgreSQL'],
      image: 'portfolio-1'
    },
    {
      title: 'E-learning Platform',
      description: 'Comprehensive online education platform with video streaming and interactive quizzes.',
      category: 'Education Technology',
      tech: ['React', 'Python', 'AWS'],
      image: 'portfolio-2'
    },
    {
      title: 'Healthcare Management',
      description: 'Hospital management system with patient portal integration and secure data storage.',
      category: 'Healthcare',
      tech: ['Vue.js', 'Java', 'MySQL'],
      image: 'portfolio-3'
    },
    {
      title: 'IoT Dashboard',
      description: 'Real-time monitoring and control system for smart devices across multiple locations.',
      category: 'Internet of Things',
      tech: ['Angular', 'Python', 'MongoDB'],
      image: 'portfolio-4'
    }
  ]

  const specifications = [
    { label: 'Development Time', value: '8-24 weeks' },
    { label: 'Team Structure', value: '3-8 Dedicated Experts' },
    { label: 'Methodology', value: 'Agile / Scrum' },
    { label: 'Quality Standards', value: 'ISO-Inspired QA' },
    { label: 'Included Support', value: '6 Months Premium' },
    { label: 'Ownership', value: '100% IP Rights' }
  ]

  return (
    <div className="product-page">
      <Header />

      {/* Hero Section */}
      <section className="product-hero custom-apps-hero">
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <div className="hero-badge">
              <span className="badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </span>
              <span>Premium Custom Development</span>
            </div>
            <h1 className="text-gradient">Bespoke Software for Modern Success</h1>
            <p className="hero-description">
              We build scalable, high-performance software solutions tailored to your unique business challenges.
              Our expert team transforms your vision into a powerful digital competitive advantage.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Milestones</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partners</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years XP</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn--primary btn--large">
                <span>Start Discovery</span>
                <span className="btn__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>
              <button className="btn btn--secondary">
                <span>Explore Works</span>
              </button>
            </div>
          </div>
          <div className="hero-image animate-fadeInUp animate-delay-2">
            <div className="hero-image-container">
              <div className="glass-mockup">
                <img src="/assets/images/custom-development.png" alt="Custom Software Interface" style={{ width: '100%', borderRadius: '20px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="content-break-ad">
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleAdSense
            userConsent={userConsent}
            adFormat="horizontal"
            variant="minimal"
            adLabel="Advertisement"
            showLoadingAnimation={true}
            className="product-page-ad"
          />
        </div>
      </div>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-divider"></div>
            <h2>Full-Cycle Development</h2>
            <p>End-to-end software solutions designed for scalability, performance, and user engagement.</p>
          </div>
          <div className="features-grid">
            {services.map((service, index) => (
              <div key={index} className={`custom-feature-card animate-fadeInUp animate-delay-${(index % 3) + 1}`}>
                <div className="feature-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-divider"></div>
            <h2>The Kancio Tech Stack</h2>
            <p>We leverage the latest technologies to build future-proof applications that grow with your business.</p>
          </div>
          <div className="products-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="card animate-fadeInUp">
                <div className="product-icon">{tech.icon}</div>
                <h4 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{tech.category}</h4>
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
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-divider"></div>
            <h2>Our Winning Process</h2>
            <p>A transparent and collaborative approach ensuring project success from concept to launch.</p>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={index} className="process-item animate-fadeInUp">
                <div className="process-number-v2">
                  {step.step}
                </div>
                <div className="process-content-v2">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--primary-light)' }}>{step.icon}</span>
                    <h3 style={{ margin: 0 }}>{step.title}</h3>
                  </div>
                  <p style={{ margin: 0 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-divider"></div>
            <h2>Success Stories</h2>
            <p>Explore some of our recent custom-built solutions across various industries.</p>
          </div>
          <div className="screenshots-grid">
            {portfolio.map((project, index) => (
              <div key={index} className="portfolio-card animate-fadeInUp">
                <div className="portfolio-inner">
                  <div className="portfolio-image-wrapper">
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--bg-tertiary), var(--primary-glow))' }}></div>
                    <div className="portfolio-overlay">
                      <button className="btn btn--secondary btn--sm">View Case Study</button>
                    </div>
                  </div>
                  <div className="inner-content">
                    <span className="badge badge--accent" style={{ marginBottom: '10px', fontSize: '0.7rem' }}>{project.category}</span>
                    <h4 style={{ marginBottom: '10px' }}>{project.title}</h4>
                    <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>{project.description}</p>
                    <div className="tech-stack" style={{ justifyContent: 'flex-start' }}>
                      {project.tech.map((technology, idx) => (
                        <span key={idx} className="example-tag" style={{ fontSize: '0.7rem' }}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-divider"></div>
            <h2>Commitment to Quality</h2>
            <p>Our standards for every custom development project we undertake.</p>
          </div>
          <div className="specs-grid">
            {specifications.map((spec, index) => (
              <div key={index} className="spec-item glass-panel">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="content-break-ad">
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleAdSense
            userConsent={userConsent}
            adFormat="rectangle"
            variant="premium"
            adLabel="Sponsored"
            showLoadingAnimation={true}
            className="product-page-ad-footer"
          />
        </div>
      </div>

      {/* CTA Section */}
      <section className="section product-cta" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="cta-content animate-fadeInUp">
            <h2>Ready to Transform Your Business?</h2>
            <p>Partner with Kancio Development to build the software your business deserves. Let's discuss your project today.</p>
            <div className="cta-actions">
              <button className="btn btn--primary btn--large">
                <span>Book Free Consultation</span>
                <span className="btn__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>
              <button className="btn btn--outline btn--large" style={{ borderColor: 'white', color: 'white' }}>
                <span>Our Pricing Model</span>
              </button>
            </div>
          </div>
        </div>
        {/* Subtle decorative circles */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(50px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)', filter: 'blur(70px)' }}></div>
      </section>

      <Footer />
    </div>
  )
}

export default CustomAppsPage