import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Kancio Development</h3>
            <p>Building digital solutions that empower businesses and simplify everyday life</p>
          </div>
          <div className="footer-section">
            <h4>Our Products</h4>
            <ul>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.kancio.indonesia" target="_blank" rel="noopener noreferrer">
                  PulsaApp
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.kancio.quranapp" target="_blank" rel="noopener noreferrer">
                  QuranMind
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.kancio.apotikapp" target="_blank" rel="noopener noreferrer">
                  ApotekApp
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.kancio.cashflow" target="_blank" rel="noopener noreferrer">
                  Catet Uang
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                  kancio.indonesia@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+6282325600996" className="contact-link">
                  +62 823-2560-0996
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <span className="contact-text">kancio.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2020-2025 Kancio Development. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer