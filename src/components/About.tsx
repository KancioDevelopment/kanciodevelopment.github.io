import React from 'react'
import './About.css'

const About: React.FC = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '10k+', label: 'Active Users' },
    { number: '4.8', label: 'Average Rating' },
    { number: '24/7', label: 'Support Available' }
  ]

  const features = [
    {
      icon: '🚀',
      title: 'Innovation First',
      description: 'We leverage cutting-edge technology to build solutions that are ahead of the curve.'
    },
    {
      icon: '👥',
      title: 'User-Centric Design',
      description: 'Every decision we make is guided by our users\' needs and feedback.'
    },
    {
      icon: '⚡',
      title: 'Performance Focused',
      description: 'Fast, reliable, and scalable solutions that grow with your business.'
    },
    {
      icon: '🔒',
      title: 'Security & Privacy',
      description: 'Your data security and privacy are our top priorities in every application.'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__header">
          <div className="about__badge">About Kancio</div>
          <h2 className="about__title">
            Empowering Businesses Through
            <span className="about__title-highlight"> Digital Innovation</span>
          </h2>
          <p className="about__subtitle">
            We are a passionate team of developers and designers dedicated to creating 
            digital solutions that make a real difference in people's lives and businesses.
          </p>
        </div>

        <div className="about__content">
          <div className="about__story">
            <div className="about__story-text">
              <h3>Our Story</h3>
              <p>
                Founded with a vision to bridge the gap between technology and everyday needs, 
                Kancio Development has grown from a small startup to a trusted partner for 
                businesses seeking digital transformation.
              </p>
              <p>
                Our flagship products demonstrate our versatility across diverse industries and user needs. 
                PulsaApp revolutionizes digital payments with cheaper prices and secure transactions, 
                QuranMind combines AI technology with traditional Islamic scholarship for deeper understanding, 
                ApotekApp streamlines pharmacy operations with comprehensive management tools trusted by 10+ clients, 
                and Catet Uang empowers personal financial management with intelligent tracking and planning tools. 
                Each application addresses specific market needs with user-centric design, advanced functionality, 
                and industry expertise at its core.
              </p>
            </div>
            <div className="about__story-visual">
              <div className="about__journey">
                <div className="journey-item">
                  <div className="journey-year">2020</div>
                  <div className="journey-title">Founded</div>
                  <div className="journey-desc">Started with a vision</div>
                </div>
                <div className="journey-item">
                  <div className="journey-year">2021</div>
                  <div className="journey-title">First App</div>
                  <div className="journey-desc">PulsaApp launched</div>
                </div>
                <div className="journey-item">
                  <div className="journey-year">2022</div>
                  <div className="journey-title">Expansion</div>
                  <div className="journey-desc">Multiple apps released</div>
                </div>
                <div className="journey-item">
                  <div className="journey-year">2023</div>
                  <div className="journey-title">Growth</div>
                  <div className="journey-desc">10k+ active users</div>
                </div>
              </div>
            </div>
          </div>

          <div className="about__stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card__number">{stat.number}</div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="about__features">
            <h3>Why Choose Kancio Development?</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-card__icon">{feature.icon}</div>
                  <h4 className="feature-card__title">{feature.title}</h4>
                  <p className="feature-card__description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About