import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const AIIntegrationPage: React.FC = () => {
  const { userConsent } = useAds()

  const aiServices = [
    {
      icon: '🤖',
      title: 'Machine Learning Models',
      description: 'Custom ML models for prediction, classification, and pattern recognition tailored to your business data.'
    },
    {
      icon: '💬',
      title: 'Natural Language Processing',
      description: 'Chatbots, sentiment analysis, document processing, and language understanding capabilities.'
    },
    {
      icon: '👁️',
      title: 'Computer Vision',
      description: 'Image recognition, object detection, facial recognition, and visual quality inspection systems.'
    },
    {
      icon: '📊',
      title: 'Predictive Analytics',
      description: 'Forecast trends, predict customer behavior, and make data-driven decisions with AI insights.'
    },
    {
      icon: '🎯',
      title: 'Recommendation Systems',
      description: 'Personalized content, product recommendations, and user experience optimization.'
    },
    {
      icon: '⚡',
      title: 'Process Automation',
      description: 'Intelligent automation of repetitive tasks and business processes using AI algorithms.'
    }
  ]

  const aiTechnologies = [
    {
      category: 'Machine Learning',
      tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost'],
      icon: '🧠'
    },
    {
      category: 'Deep Learning',
      tools: ['Neural Networks', 'CNN', 'RNN', 'LSTM', 'Transformers'],
      icon: '🔬'
    },
    {
      category: 'NLP & Text',
      tools: ['BERT', 'GPT', 'spaCy', 'NLTK', 'Hugging Face'],
      icon: '📝'
    },
    {
      category: 'Cloud AI Services',
      tools: ['AWS AI', 'Google AI', 'Azure AI', 'OpenAI API', 'Anthropic'],
      icon: '☁️'
    }
  ]

  const useCases = [
    {
      title: 'Customer Service Automation',
      description: 'Intelligent chatbots that handle customer inquiries 24/7 with human-like responses',
      industry: 'E-commerce & Retail',
      icon: '🎧'
    },
    {
      title: 'Fraud Detection System',
      description: 'Real-time transaction monitoring and fraud prevention using ML algorithms',
      industry: 'Financial Services',
      icon: '🛡️'
    },
    {
      title: 'Quality Inspection AI',
      description: 'Automated visual inspection for manufacturing quality control',
      industry: 'Manufacturing',
      icon: '🔍'
    },
    {
      title: 'Predictive Maintenance',
      description: 'Predict equipment failures before they happen to minimize downtime',
      industry: 'Industrial & IoT',
      icon: '⚙️'
    }
  ]

  const benefits = [
    {
      title: 'Increased Efficiency',
      description: 'Automate complex tasks and processes to save time and reduce human error',
      icon: '⚡'
    },
    {
      title: 'Better Decision Making',
      description: 'Data-driven insights and predictions to guide business strategy',
      icon: '🎯'
    },
    {
      title: 'Enhanced Customer Experience',
      description: 'Personalized interactions and faster response times',
      icon: '😊'
    },
    {
      title: 'Competitive Advantage',
      description: 'Stay ahead with cutting-edge AI technology and innovation',
      icon: '🏆'
    }
  ]

  const implementation = [
    {
      step: '01',
      title: 'AI Strategy Consultation',
      description: 'Analyze your business needs and identify the best AI opportunities for maximum impact.',
      icon: '🎯'
    },
    {
      step: '02',
      title: 'Data Preparation',
      description: 'Clean, process, and prepare your data for training effective AI models.',
      icon: '📊'
    },
    {
      step: '03',
      title: 'Model Development',
      description: 'Build and train custom AI models using state-of-the-art algorithms and techniques.',
      icon: '🤖'
    },
    {
      step: '04',
      title: 'Integration & Deployment',
      description: 'Seamlessly integrate AI capabilities into your existing systems and workflows.',
      icon: '🚀'
    }
  ]

  const specifications = [
    { label: 'Implementation Time', value: '12-20 weeks (varies by complexity)' },
    { label: 'AI Expertise', value: '5+ years in ML/AI development' },
    { label: 'Model Accuracy', value: '85-95% (depends on use case)' },
    { label: 'Deployment Options', value: 'Cloud, On-premise, Hybrid' },
    { label: 'Performance Monitoring', value: 'Real-time metrics and alerts' },
    { label: 'Ongoing Support', value: 'Model retraining and optimization' }
  ]

  return (
    <div className="product-page">
      <Header />
      
      {/* Hero Section */}
      <section className="product-hero ai-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🤖</span>
              <span>AI Integration</span>
            </div>
            <h1>Intelligent Business Solutions</h1>
            <p className="hero-description">
              Harness the power of artificial intelligence to transform your business operations. 
              From machine learning models to intelligent automation, we help you implement AI solutions that drive real results.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">AI Projects</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Accuracy</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">40%</span>
                <span className="stat-label">Cost Reduction</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <span>Explore AI Solutions</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </button>
              <button className="btn btn-secondary">
                <span>Schedule Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <img src="/assets/images/ai-integration.png" alt="AI Integration" />
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

      {/* AI Services Section */}
      <section className="product-features">
        <div className="container">
          <div className="section-header">
            <h2>AI Services We Offer</h2>
            <p>Comprehensive artificial intelligence solutions for modern businesses</p>
          </div>
          <div className="features-grid">
            {aiServices.map((service, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technologies */}
      <section className="ai-features">
        <div className="container">
          <div className="section-header">
            <h2>AI Technologies & Frameworks</h2>
            <p>Cutting-edge tools and technologies we use to build intelligent solutions</p>
          </div>
          <div className="ai-features-grid">
            {aiTechnologies.map((tech, index) => (
              <div key={index} className="ai-feature-card">
                <div className="ai-feature-icon">{tech.icon}</div>
                <h3>{tech.category}</h3>
                <div className="tech-tools">
                  {tech.tools.map((tool, idx) => (
                    <span key={idx} className="tech-tool">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="product-categories">
        <div className="container">
          <div className="section-header">
            <h2>Real-World AI Applications</h2>
            <p>Success stories and use cases across different industries</p>
          </div>
          <div className="products-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{useCase.icon}</div>
                <h3>{useCase.title}</h3>
                <p className="product-providers">{useCase.industry}</p>
                <p className="product-description">{useCase.description}</p>
                <button className="btn btn-outline">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="product-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose AI Integration?</h2>
            <p>Transform your business with the power of artificial intelligence</p>
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

      {/* Implementation Process */}
      <section className="product-screenshots">
        <div className="container">
          <div className="section-header">
            <h2>Our AI Implementation Process</h2>
            <p>Systematic approach to successful AI integration</p>
          </div>
          <div className="screenshots-grid">
            {implementation.map((step, index) => (
              <div key={index} className="screenshot-card">
                <div className="screenshot-image">
                  <div className="process-number">{step.step}</div>
                  <div className="process-icon">{step.icon}</div>
                </div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="product-specs">
        <div className="container">
          <div className="section-header">
            <h2>AI Project Specifications</h2>
            <p>What to expect from our AI integration services</p>
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
            <h2>Ready to Embrace AI Innovation?</h2>
            <p>Let's discuss how artificial intelligence can revolutionize your business operations</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large">
                <span>Start AI Consultation</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
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

export default AIIntegrationPage