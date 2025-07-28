import React from 'react'
import './AIIntegrationShowcase.css'

const AIIntegrationShowcase: React.FC = () => {
  const aiCapabilities = [
    {
      icon: '🧠',
      title: 'Machine Learning Models',
      description: 'Custom ML models for your specific business needs',
      examples: [
        'Predictive analytics for sales forecasting',
        'Customer behavior analysis',
        'Fraud detection systems',
        'Recommendation engines'
      ],
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      icon: '💬',
      title: 'Natural Language Processing',
      description: 'Understanding and processing human language',
      examples: [
        'Intelligent chatbots and virtual assistants',
        'Sentiment analysis for customer feedback',
        'Automatic content summarization',
        'Multi-language translation'
      ],
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
      icon: '👁️',
      title: 'Computer Vision',
      description: 'Analyzing and understanding visual content',
      examples: [
        'Object detection and recognition',
        'Document scanning and OCR',
        'Quality control automation',
        'Medical image analysis'
      ],
      gradient: 'linear-gradient(135deg, #ef4444, #ec4899)'
    },
    {
      icon: '⚡',
      title: 'Intelligent Automation',
      description: 'Automating complex business processes',
      examples: [
        'Smart workflow optimization',
        'Automated decision making',
        'Process mining and improvement',
        'Intelligent data processing'
      ],
      gradient: 'linear-gradient(135deg, #eab308, #ea580c)'
    }
  ]

  const integrationExamples = [
    {
      app: 'E-commerce Platform',
      aiFeatures: [
        'Product recommendation engine',
        'Price optimization algorithm',
        'Inventory demand forecasting',
        'Customer service chatbot'
      ],
      impact: '40% increase in sales conversion'
    },
    {
      app: 'Healthcare Management',
      aiFeatures: [
        'Medical image analysis',
        'Patient diagnosis assistance',
        'Drug interaction checker',
        'Appointment scheduling AI'
      ],
      impact: '60% reduction in diagnosis time'
    },
    {
      app: 'Financial Services',
      aiFeatures: [
        'Fraud detection system',
        'Credit risk assessment',
        'Trading algorithm optimization',
        'Regulatory compliance checker'
      ],
      impact: '95% fraud detection accuracy'
    }
  ]

  const implementationSteps = [
    {
      step: '1',
      title: 'Analysis & Assessment',
      description: 'Evaluate your existing application and identify AI integration opportunities',
      icon: '🔍'
    },
    {
      step: '2',
      title: 'AI Strategy Design',
      description: 'Design custom AI solutions tailored to your specific business requirements',
      icon: '📋'
    },
    {
      step: '3',
      title: 'Model Development',
      description: 'Develop and train AI models using your data and industry best practices',
      icon: '🔧'
    },
    {
      step: '4',
      title: 'Seamless Integration',
      description: 'Integrate AI capabilities into your existing app with minimal disruption',
      icon: '🔗'
    },
    {
      step: '5',
      title: 'Testing & Optimization',
      description: 'Thoroughly test and optimize AI performance for maximum effectiveness',
      icon: '⚡'
    },
    {
      step: '6',
      title: 'Deployment & Support',
      description: 'Deploy AI features and provide ongoing monitoring and maintenance',
      icon: '🚀'
    }
  ]

  return (
    <section className="ai-integration-showcase">
      <div className="container">
        <div className="showcase__header">
          <div className="showcase__badge">AI Integration</div>
          <h2 className="showcase__title">
            Transform Your Existing Apps
            <span className="showcase__title-highlight"> with AI Power</span>
          </h2>
          <p className="showcase__subtitle">
            Enhance your current applications with cutting-edge artificial intelligence capabilities. 
            No need to rebuild from scratch – we seamlessly integrate AI features that drive real business value.
          </p>
        </div>

        <div className="showcase__content">
          {/* AI Capabilities Section */}
          <div className="showcase__capabilities">
            <h3>AI Capabilities We Integrate</h3>
            <div className="capabilities-grid">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className="capability-card">
                  <div className="capability-card__header">
                    <div className="capability-card__icon" style={{ background: capability.gradient }}>
                      {capability.icon}
                    </div>
                  </div>
                  <div className="capability-card__content">
                    <h4 className="capability-card__title">{capability.title}</h4>
                    <p className="capability-card__description">{capability.description}</p>
                    <ul className="capability-card__examples">
                      {capability.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="capability-example">
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

          {/* Real Integration Examples */}
          <div className="showcase__examples">
            <h3>Real-World Integration Examples</h3>
            <div className="examples-grid">
              {integrationExamples.map((example, index) => (
                <div key={index} className="example-card">
                  <div className="example-card__header">
                    <h4 className="example-card__title">{example.app}</h4>
                    <div className="example-card__impact">{example.impact}</div>
                  </div>
                  <div className="example-card__features">
                    <h5>AI Features Added:</h5>
                    <ul>
                      {example.aiFeatures.map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Process */}
          <div className="showcase__process">
            <h3>Our AI Integration Process</h3>
            <div className="process-timeline">
              {implementationSteps.map((step, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-item__marker">
                    <div className="timeline-item__step">{step.step}</div>
                    <div className="timeline-item__icon">{step.icon}</div>
                  </div>
                  <div className="timeline-item__content">
                    <h4 className="timeline-item__title">{step.title}</h4>
                    <p className="timeline-item__description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="showcase__metrics">
            <h3>AI Integration Success Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-item__number">85%</div>
                <div className="metric-item__label">Average Performance Improvement</div>
              </div>
              <div className="metric-item">
                <div className="metric-item__number">3-6</div>
                <div className="metric-item__label">Weeks Integration Time</div>
              </div>
              <div className="metric-item">
                <div className="metric-item__number">95%</div>
                <div className="metric-item__label">Client Satisfaction Rate</div>
              </div>
              <div className="metric-item">
                <div className="metric-item__number">24/7</div>
                <div className="metric-item__label">AI Monitoring & Support</div>
              </div>
            </div>
          </div>

          {/* Technologies We Use */}
          <div className="showcase__technologies">
            <h3>AI Technologies & Frameworks</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-item__icon">🐍</div>
                <span>Python & TensorFlow</span>
              </div>
              <div className="tech-item">
                <div className="tech-item__icon">🔥</div>
                <span>PyTorch & Scikit-learn</span>
              </div>
              <div className="tech-item">
                <div className="tech-item__icon">☁️</div>
                <span>AWS AI Services</span>
              </div>
              <div className="tech-item">
                <div className="tech-item__icon">🧮</div>
                <span>Google AI Platform</span>
              </div>
              <div className="tech-item">
                <div className="tech-item__icon">💙</div>
                <span>Azure Cognitive Services</span>
              </div>
              <div className="tech-item">
                <div className="tech-item__icon">🤖</div>
                <span>OpenAI GPT Integration</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="showcase__cta">
            <div className="cta-content">
              <h3>Ready to Add AI to Your Application?</h3>
              <p>
                Let's discuss how AI can transform your existing application and drive real business results. 
                Get a free consultation and AI readiness assessment.
              </p>
              <div className="cta-buttons">
                <a href="mailto:kancio.indonesia@gmail.com" className="cta-button cta-button--primary">
                  Get Free AI Consultation
                  <span className="cta-arrow">→</span>
                </a>
                <a href="tel:+6282325600996" className="cta-button cta-button--secondary">
                  Schedule a Call
                </a>
              </div>
              <div className="cta-note">
                Free consultation • AI readiness assessment • Custom integration plan
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIIntegrationShowcase