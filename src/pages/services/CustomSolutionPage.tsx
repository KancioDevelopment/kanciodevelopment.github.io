import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import '../ProductPage.css'
import './ServicePage.css'

const process = [
    { step: '01', title: 'Discovery', desc: 'We deeply understand your business needs, challenges, and goals through structured discovery sessions.' },
    { step: '02', title: 'Design', desc: 'UI/UX wireframing and architectural planning — ensuring scalable, maintainable solutions.' },
    { step: '03', title: 'Develop', desc: 'Iterative development with frequent demos, using proven React, Node.js, and mobile technologies.' },
    { step: '04', title: 'Deploy', desc: 'Production deployment with CI/CD pipelines, monitoring, and post-launch support.' },
]

const industries = [
    { icon: '💳', name: 'FinTech & PPOB', desc: 'Digital payment systems, transaction platforms, and e-money solutions.' },
    { icon: '💊', name: 'Healthcare', desc: 'Pharmacy management, clinic systems, and medical record platforms.' },
    { icon: '📖', name: 'Education', desc: 'E-learning platforms, quiz systems, and AI-powered learning tools.' },
    { icon: '🛒', name: 'E-Commerce', desc: 'Online stores, inventory systems, and multi-vendor marketplaces.' },
    { icon: '🏢', name: 'Enterprise', desc: 'HR systems, ERP integrations, and business process automation.' },
    { icon: '📊', name: 'Analytics', desc: 'Custom dashboards, reporting tools, and data visualization platforms.' },
]

const portfolioItems = [
    { name: 'PulsaApp', category: 'FinTech', icon: '📱', path: '/products/pulsaapp', desc: 'Digital payment platform for 1M+ users' },
    { name: 'ApotekApp', category: 'Healthcare', icon: '💊', path: '/products/apotekapp', desc: 'Pharmacy management for 10+ clinics' },
    { name: 'Catet Uang', category: 'Finance', icon: '💰', path: '/products/catetUang', desc: 'Personal finance tracker app' },
]

const CustomSolutionPage: React.FC = () => {
    return (
        <div className="service-page">
            {/* Hero */}
            <section className="service-hero">
                <div className="service-hero__bg" />
                <div className="container">
                    <div className="service-hero__content">
                        <div className="badge">Custom Digital Solution</div>
                        <h1 className="service-hero__title">
                            Build the App Your <br />
                            <span className="text-gradient">Business Deserves</span>
                        </h1>
                        <p className="service-hero__desc">
                            We design and develop web, mobile, and desktop applications tailored exactly
                            to your business processes — leveraging our proven architecture from
                            PulsaApp, ApotekApp, and more.
                        </p>
                        <div className="service-hero__cta">
                            <a
                                href="#contact"
                                className="btn btn--primary btn--large"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                            >
                                Start Your Project <span className="btn__icon">→</span>
                            </a>
                            <Link to="/products/pulsaapp" className="btn btn--secondary btn--large">
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">How We Work</div>
                        <h2>Our Development <span className="text-gradient">Process</span></h2>
                        <p>A structured approach that ensures quality delivery and transparency at every stage.</p>
                    </div>
                    <div className="process-steps">
                        {process.map((p) => (
                            <div key={p.step} className="process-step card">
                                <div className="process-step__number">{p.step}</div>
                                <h3 className="process-step__title">{p.title}</h3>
                                <p className="process-step__desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries */}
            <section className="section" style={{ background: 'rgba(99,102,241,0.03)' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Industries</div>
                        <h2>Sectors We <span className="text-gradient">Specialize In</span></h2>
                        <p>Deep domain knowledge across key verticals — we speak your industry's language.</p>
                    </div>
                    <div className="industries-grid">
                        {industries.map((ind) => (
                            <div key={ind.name} className="industry-card card">
                                <span className="industry-card__icon">{ind.icon}</span>
                                <h4 className="industry-card__name">{ind.name}</h4>
                                <p className="industry-card__desc">{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Portfolio</div>
                        <h2>Products We've <span className="text-gradient">Built</span></h2>
                        <p>Each application represents our commitment to quality and user experience.</p>
                    </div>
                    <div className="portfolio-preview">
                        {portfolioItems.map((item) => (
                            <Link key={item.name} to={item.path} className="portfolio-item card">
                                <div className="portfolio-item__icon">{item.icon}</div>
                                <div>
                                    <div className="portfolio-item__category">{item.category}</div>
                                    <h4 className="portfolio-item__name">{item.name}</h4>
                                    <p className="portfolio-item__desc">{item.desc}</p>
                                </div>
                                <span className="portfolio-item__arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section service-cta-section">
                <div className="container">
                    <div className="service-cta-banner">
                        <h2>Ready to Build Something Great?</h2>
                        <p>Tell us about your project — no commitment required for initial consultation.</p>
                        <a
                            href="#contact"
                            className="btn btn--primary btn--large"
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Get a Free Quote <span className="btn__icon">→</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default CustomSolutionPage
