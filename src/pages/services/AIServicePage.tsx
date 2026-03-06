import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import '../ProductPage.css'
import './ServicePage.css'

const useCases = [
    { icon: '💬', title: 'AI Chatbot & Assistant', desc: 'Deploy intelligent chatbots powered by LLMs to handle customer queries 24/7 without human intervention.' },
    { icon: '👁️', title: 'Computer Vision', desc: 'Automate visual inspection, product recognition, and document scanning with computer vision pipelines.' },
    { icon: '📊', title: 'Predictive Analytics', desc: 'Use machine learning to forecast demand, detect anomalies, and drive data-driven decisions.' },
    { icon: '📝', title: 'NLP & Text Processing', desc: 'Extract insights from unstructured text — sentiment analysis, summarization, and classification.' },
    { icon: '⚙️', title: 'Process Automation', desc: 'Automate repetitive workflows with intelligent RPA combined with AI decision-making.' },
    { icon: '🔍', title: 'Search & Recommendation', desc: 'Build smart search engines and personalized recommendation systems for better user engagement.' },
]

const techStack = [
    'OpenAI / GPT-4', 'Google Gemini', 'LangChain', 'Python FastAPI',
    'TensorFlow', 'PyTorch', 'Hugging Face', 'Vector Databases',
]

const benefits = [
    { icon: '⚡', title: 'Reduce Costs', desc: 'Automate repetitive tasks and cut operational costs by up to 60%.' },
    { icon: '📈', title: 'Scale Fast', desc: 'AI systems handle growing workloads without proportional cost increases.' },
    { icon: '🎯', title: 'Better Decisions', desc: 'Data-driven AI insights give you a competitive edge in your industry.' },
]

const AIServicePage: React.FC = () => {
    return (
        <div className="service-page">
            {/* Hero */}
            <section className="service-hero service-hero--ai">
                <div className="service-hero__bg" />
                <div className="container">
                    <div className="service-hero__content">
                        <div className="badge badge--accent">AI Integration</div>
                        <h1 className="service-hero__title">
                            Make Your Systems <br />
                            <span className="text-gradient">Intelligently Smarter</span>
                        </h1>
                        <p className="service-hero__desc">
                            We integrate state-of-the-art AI — LLMs, computer vision, NLP, and ML models —
                            directly into your existing applications, transforming them into intelligent,
                            automated powerhouses.
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
                                Discuss Your AI Needs <span className="btn__icon">→</span>
                            </a>
                            <Link to="/services/custom-solution" className="btn btn--secondary btn--large">
                                View Custom Solutions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge badge--accent">Use Cases</div>
                        <h2>What AI Can Do <span className="text-gradient">for Your Business</span></h2>
                        <p>Practical AI applications that deliver measurable results — not just experiments.</p>
                    </div>
                    <div className="use-cases-grid">
                        {useCases.map((uc) => (
                            <div key={uc.title} className="use-case-card card">
                                <div className="use-case-card__icon">{uc.icon}</div>
                                <h4 className="use-case-card__title">{uc.title}</h4>
                                <p className="use-case-card__desc">{uc.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section" style={{ background: 'rgba(6,182,212,0.03)' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="badge badge--accent">Why AI?</div>
                        <h2>Business Benefits of <span className="text-gradient">AI Integration</span></h2>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((b) => (
                            <div key={b.title} className="benefit-card card">
                                <div className="benefit-card__icon">{b.icon}</div>
                                <h3 className="benefit-card__title">{b.title}</h3>
                                <p className="benefit-card__desc">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="badge">Tech Stack</div>
                        <h2>AI Technologies <span className="text-gradient">We Use</span></h2>
                        <p>We work with the best-in-class AI frameworks and models to deliver production-ready solutions.</p>
                    </div>
                    <div className="tech-stack-grid">
                        {techStack.map((tech) => (
                            <div key={tech} className="tech-chip">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section service-cta-section">
                <div className="container">
                    <div className="service-cta-banner service-cta-banner--ai">
                        <h2>Ready to Add AI to Your System?</h2>
                        <p>Let's identify the best AI opportunities in your existing workflow.</p>
                        <a
                            href="#contact"
                            className="btn btn--primary btn--large"
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Book a Free Consultation <span className="btn__icon">→</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default AIServicePage
