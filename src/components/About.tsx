import React, { useEffect, useRef, useState } from 'react'
import './About.css'

const stats = [
  { number: '50+', label: 'Projects Delivered', icon: '✅' },
  { number: '5K+', label: 'Active Users', icon: '👥' },
  { number: '4.8★', label: 'Average Rating', icon: '⭐' },
  { number: '24/7', label: 'Support', icon: '🛡️' },
]

const values = [
  {
    icon: '🚀',
    title: 'Innovation First',
    description: 'We adopt cutting-edge technology to deliver solutions that stay ahead of the curve.',
  },
  {
    icon: '🎯',
    title: 'User-Centric',
    description: 'Every design decision is guided by real user needs and continuous feedback.',
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Fast, reliable, and scalable applications built to grow with your business.',
  },
  {
    icon: '🔒',
    title: 'Security First',
    description: 'Data privacy and security are non-negotiable priorities in every product we ship.',
  },
]

const About: React.FC = () => {
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
      id="about"
      className={`about section ${visible ? 'about--visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge badge--accent">About Kancio</div>
          <h2>
            Empowering Businesses Through{' '}
            <span className="text-gradient">Digital Innovation</span>
          </h2>
          <p>
            Founded in 2020, Kancio Development has grown from a startup to a trusted digital
            partner — delivering premium applications and AI solutions across Indonesia.
          </p>
        </div>

        {/* Stats */}
        <div className="about__stats">
          {stats.map((stat, i) => (
            <div key={i} className="about__stat-card">
              <span className="about__stat-icon">{stat.icon}</span>
              <div className="about__stat-number">{stat.number}</div>
              <div className="about__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="about__values">
          <h3 className="about__values-title">Why Choose Kancio?</h3>
          <div className="about__values-grid">
            {values.map((val, i) => (
              <div key={i} className="about__value-card card">
                <div className="about__value-icon">{val.icon}</div>
                <h4 className="about__value-title">{val.title}</h4>
                <p className="about__value-desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About