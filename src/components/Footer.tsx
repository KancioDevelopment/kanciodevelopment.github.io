import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Simulate newsletter subscription
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const products = [
    {
      name: 'PulsaApp',
      description: 'Digital Payment Solution',
      icon: '📱',
      link: 'https://play.google.com/store/apps/details?id=com.kancio.indonesia',
      category: 'FinTech'
    },
    {
      name: 'QuranMind',
      description: 'AI-Powered Quran Learning',
      icon: '📖',
      link: 'https://play.google.com/store/apps/details?id=com.kancio.quranapp',
      category: 'Education'
    },
    {
      name: 'ApotekApp',
      description: 'Pharmacy Management',
      icon: '💊',
      link: 'https://play.google.com/store/apps/details?id=com.kancio.apotikapp',
      category: 'Healthcare'
    },
    {
      name: 'Catet Uang',
      description: 'Personal Finance Manager',
      icon: '💰',
      link: 'https://play.google.com/store/apps/details?id=com.kancio.cashflow',
      category: 'Finance'
    }
  ]

  const socialLinks = [
    {
      name: 'Facebook', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0"
          />
        </svg>
      ), url: 'https://web.facebook.com/kancioapp/?_rdc=1&_rdr#', label: 'Follow us on Facebook'
    },
    {
      name: 'Instagram', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      ), url: 'https://www.instagram.com/pulsaapp.kancio/', label: 'Foll</svg>ow us on Instagram'
    },
    {
      name: 'LinkedIn', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z" />
        </svg>
      ), url: 'https://www.linkedin.com/company/kancio-bima-indon</svg>esia?originalSubdomain=id', label: 'Connect on LinkedIn'
    },
    { name: 'GitHub', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.012c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.652 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.025 2.747-1.025.546 1.38.202 2.399.1 2.652.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.751 0 .268.18.579.688.481C19.138 20.192 22 16.44 22 12.012 22 6.484 17.523 2 12 2z" /></svg>, url: 'https://github.com/KancioDevelopment', label: 'View our repositories' }
  ]

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <footer className="footer">
      {/* Background Elements */}
      <div className="footer__background">
        <div className="footer__gradient"></div>
        <div className="footer__pattern"></div>
      </div>

      <div className="container">
        {/* Hero Section - Brand & CTA */}
        <div className="footer__hero">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🚀</span>
              <h3 className="footer__brand-name">Kancio Development</h3>
            </div>
            <p className="footer__brand-description">
              Transforming ideas into powerful digital solutions. We create innovative mobile applications
              and web platforms that drive business growth.
            </p>

            {/* Newsletter Subscription - Primary CTA */}
            {/* <div className="footer__newsletter">
              <h4 className="footer__newsletter-title">Stay Updated</h4>
              <p className="footer__newsletter-subtitle">
                Get the latest updates on our products and tech insights
              </p>
              <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="footer__input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="footer__email-input"
                    required
                  />
                  <button
                    type="submit"
                    className="footer__subscribe-btn"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div> */}
          </div>

          {/* Social Links */}
          <div className="footer__social">
            <h4 className="footer__social-title">Connect With Us</h4>
            <div className="footer__social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer__social-icon">{social.icon}</span>
                  <span className="footer__social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid - Products & Navigation */}
        <div className="footer__content-grid">
          {/* Products Section */}
          <div className="footer__section footer__section--products">
            <h4 className="footer__section-title">Our Products</h4>
            <div className="footer__products-grid">
              {products.map((product, index) => (
                <a
                  key={index}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__product-item"
                >
                  <div className="footer__product-icon">{product.icon}</div>
                  <div className="footer__product-info">
                    <h5 className="footer__product-name">{product.name}</h5>
                    <span className="footer__product-category">{product.category}</span>
                  </div>
                  <span className="footer__product-arrow">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div className="footer__section footer__section--navigation">
            <h4 className="footer__section-title">Navigation</h4>
            <div className="footer__nav-grid">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="footer__nav-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer__section footer__section--contact">
            <h4 className="footer__section-title">Get In Touch</h4>
            <div className="footer__contact-list">
              <a href="mailto:kancio.indonesia@gmail.com" className="footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                <div className="footer__contact-details">
                  <span className="footer__contact-label">Email</span>
                  <span className="footer__contact-value">kancio.indonesia@gmail.com</span>
                </div>
              </a>

              <a href="tel:+6282325600996" className="footer__contact-item">
                <span className="footer__contact-icon">📱</span>
                <div className="footer__contact-details">
                  <span className="footer__contact-label">Phone</span>
                  <span className="footer__contact-value">+62 823-2560-0996</span>
                </div>
              </a>

              <div className="footer__contact-item">
                <span className="footer__contact-icon">🌐</span>
                <div className="footer__contact-details">
                  <span className="footer__contact-label">Website</span>
                  <span className="footer__contact-value">kancio.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} Kancio Development. All rights reserved.
            </p>
            <div className="footer__legal-links">
              <Link to="/privacy-policy" className="footer__legal-link">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="footer__legal-link">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="footer__legal-link">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Back to Top */}
          <button
            className="footer__back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <span className="footer__back-to-top-icon">↑</span>
            <span className="footer__back-to-top-text">Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer