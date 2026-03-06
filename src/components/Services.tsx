import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    icon: '🚀',
    title: 'Custom Digital Solution',
    desc: 'We build web, mobile, and desktop applications tailored precisely to your unique business processes — from concept to deployment.',
    features: [
      'Full-stack Web & Mobile Apps',
      'Proven architecture (PulsaApp, ApotekApp)',
      'Industry-specific workflows',
      'Scalable & maintainable code',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    path: '/services/custom-solution',
    tag: 'Featured',
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    desc: 'Supercharge your existing systems with intelligent automation, natural language processing, and data-driven AI models.',
    features: [
      'LLM & Chatbot Integration',
      'Computer Vision pipelines',
      'Predictive analytics',
      'Process automation',
    ],
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    path: '/services/ai-integration',
    tag: 'Trending',
  },
  {
    icon: '💡',
    title: 'Digital Consulting',
    desc: 'Strategic guidance for your digital transformation — technology audit, roadmap planning, and implementation oversight.',
    features: [
      'Technology stack assessment',
      'Digital transformation roadmap',
      'Architecture consulting',
      'Team training & workshops',
    ],
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
    path: '/services/consulting',
    tag: null,
  },
]

const industries = [
  { icon: '🛒', label: 'E-Commerce & Retail' },
  { icon: '💳', label: 'FinTech & PPOB' },
  { icon: '💊', label: 'Healthcare' },
  { icon: '📚', label: 'Education & EdTech' },
]

const Services: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      className={`services section ${visible ? 'services--visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-header">
          <div className="badge">Our Services</div>
          <h2>
            End-to-End{' '}
            <span className="text-gradient">Digital Services</span>
          </h2>
          <p>
            From ideation to deployment — we provide the technology, expertise,
            and support your business needs to thrive in the digital era.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Gradient top border */}
              <div className="service-card__border" style={{ background: service.gradient }} />

              <div className="service-card__body">
                <div className="service-card__top">
                  <div className="service-card__icon" style={{ background: service.gradient }}>
                    {service.icon}
                  </div>
                  {service.tag && (
                    <span className="service-card__tag">{service.tag}</span>
                  )}
                </div>

                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>

                <ul className="service-card__features">
                  {service.features.map((feat) => (
                    <li key={feat}>
                      <span className="service-feat-check">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link to={service.path} className="service-card__cta btn btn--outline btn--sm">
                  Learn More
                  <span className="btn__icon">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="services__industries">
          <p className="services__industries-label">Industries We Serve</p>
          <div className="services__industries-grid">
            {industries.map((ind) => (
              <div key={ind.label} className="industry-chip">
                <span>{ind.icon}</span>
                <span>{ind.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="services__cta-banner">
          <div className="services__cta-text">
            <h3>Have a project in mind?</h3>
            <p>Let's discuss how Kancio can bring your idea to life.</p>
          </div>
          <div className="services__cta-actions">
            <a
              href="#contact"
              className="btn btn--primary btn--large"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get a Free Quote
              <span className="btn__icon">→</span>
            </a>
            <Link to="/services/custom-solution" className="btn btn--secondary btn--large">
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services