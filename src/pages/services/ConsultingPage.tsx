import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import '../ProductPage.css'
import './ServicePage.css'

const consultingAreas = [
    { icon: '🔍', title: 'Technology Audit', desc: 'Deep assessment of your current tech stack, identifying bottlenecks, security risks, and upgrade opportunities.' },
    { icon: '🗺️', title: 'Digital Roadmap', desc: 'A clear, actionable roadmap prioritizing digital initiatives that align with your business goals.' },
    { icon: '🏗️', title: 'Architecture Design', desc: 'System architecture planning for scalable, maintainable, and cost-effective digital infrastructure.' },
    { icon: '📋', title: 'Process Analysis', desc: 'Identify inefficiencies in your current workflows and design digital solutions to eliminate them.' },
    { icon: '🎓', title: 'Team Training', desc: 'Empower your team with workshops on modern technologies, best practices, and Agile methodologies.' },
    { icon: '🤝', title: 'Vendor Selection', desc: 'Unbiased guidance on choosing the right technology vendors, platforms, and tools for your needs.' },
]

const processSteps = [
    { step: '01', title: 'Initial Assessment', desc: 'Free consultation to understand your current state and strategic objectives.' },
    { step: '02', title: 'Deep Analysis', desc: 'Thorough review of your systems, processes, and competitive landscape.' },
    { step: '03', title: 'Strategic Recommendations', desc: 'Clear, prioritized action plan with ROI estimates and timelines.' },
    { step: '04', title: 'Implementation Support', desc: 'Optional hands-on support to execute the roadmap with your team.' },
]

const ConsultingPage: React.FC = () => {
    return (
        <div className="service-page">
            {/* Hero */}
            <section className="service-hero service-hero--consulting">
                <div className="service-hero__bg" />
                <div className="container">
                    <div className="service-hero__content">
                        <div className="badge" style={{ background: 'rgba(236,72,153,0.12)', borderColor: 'rgba(236,72,153,0.3)', color: '#f472b6' }}>
                            Digital Consulting
                        </div>
                        <h1 className="service-hero__title">
                            Strategy for Your <br />
                            <span className="text-gradient">Digital Success</span>
                        </h1>
                        <p className="service-hero__desc">
                            Not sure where to start with digital transformation? Our consultants bring
                            real-world experience building digital products across industries to help you
                            make the right technology choices and build a winning roadmap.
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
                                Book Free Consultation <span className="btn__icon">→</span>
                            </a>
                            <Link to="/services/custom-solution" className="btn btn--secondary btn--large">
                                Our Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consulting Areas */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Expertise</div>
                        <h2>Consulting <span className="text-gradient">Areas</span></h2>
                        <p>Comprehensive digital consulting services tailored to your specific business challenges.</p>
                    </div>
                    <div className="use-cases-grid">
                        {consultingAreas.map((area) => (
                            <div key={area.title} className="use-case-card card">
                                <div className="use-case-card__icon">{area.icon}</div>
                                <h4 className="use-case-card__title">{area.title}</h4>
                                <p className="use-case-card__desc">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section" style={{ background: 'rgba(236,72,153,0.03)' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Our Approach</div>
                        <h2>How We <span className="text-gradient">Consult</span></h2>
                        <p>A proven consulting methodology that delivers actionable results, not just reports.</p>
                    </div>
                    <div className="process-steps">
                        {processSteps.map((p) => (
                            <div key={p.step} className="process-step card">
                                <div className="process-step__number">{p.step}</div>
                                <h3 className="process-step__title">{p.title}</h3>
                                <p className="process-step__desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Services */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Related</div>
                        <h2>From Strategy to <span className="text-gradient">Execution</span></h2>
                        <p>After consulting, we can also build and integrate the solutions we recommend.</p>
                    </div>
                    <div className="related-services">
                        <Link to="/services/custom-solution" className="related-service-card card">
                            <div className="related-service-card__icon" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>🚀</div>
                            <div>
                                <h4>Custom Solution</h4>
                                <p>We build the applications your roadmap calls for.</p>
                            </div>
                            <span className="service-highlight-card__arrow">→</span>
                        </Link>
                        <Link to="/services/ai-integration" className="related-service-card card">
                            <div className="related-service-card__icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)' }}>🤖</div>
                            <div>
                                <h4>AI Integration</h4>
                                <p>Bring intelligent automation to your existing systems.</p>
                            </div>
                            <span className="service-highlight-card__arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section service-cta-section">
                <div className="container">
                    <div className="service-cta-banner service-cta-banner--consulting">
                        <h2>Start With a Free Consultation</h2>
                        <p>30-minute call to discuss your digital challenges — zero obligation.</p>
                        <a
                            href="#contact"
                            className="btn btn--primary btn--large"
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Schedule a Call <span className="btn__icon">→</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ConsultingPage
