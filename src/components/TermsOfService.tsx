import React from 'react'
import './TermsOfService.css'

const TermsOfService: React.FC = () => {
  return (
    <section className="terms-of-service">
      <div className="container">
        <div className="terms-of-service__header animate-fadeInUp">
          <h1 className="terms-of-service__title">Terms of Service</h1>
          <p className="terms-of-service__subtitle">
            Last updated: January 27, 2025
          </p>
        </div>

        <div className="terms-layout">
          {/* Sticky Sidebar TOC */}
          <aside className="legal-sidebar animate-fadeInUp">
            <h3>Navigation</h3>
            <a href="#agreement" className="toc-link">1. Agreement</a>
            <a href="#services" className="toc-link">2. Services</a>
            <a href="#responsibilities" className="toc-link">3. Responsibilities</a>
            <a href="#acceptable-use" className="toc-link">4. Acceptable Use</a>
            <a href="#payment" className="toc-link">5. Payment</a>
            <a href="#intellectual-property" className="toc-link">6. Intellectual Property</a>
            <a href="#liability" className="toc-link">7. Liability</a>
            <a href="#termination" className="toc-link">8. Termination</a>
            <a href="#contact" className="toc-link">9. Contact</a>
          </aside>

          <div className="terms-of-service__content">
            <section id="agreement" className="terms-section animate-fadeInUp animate-delay-1">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using any of our applications (PulsaApp, QuranMind, ApotekApp, Catet Uang)
                or services provided by Kancio Development, you accept and agree to be bound by the terms
                and provision of this agreement.
              </p>
              <p>
                If you do not agree to abide by the above, please do not use our services. These Terms of
                Service govern your use of our applications and services.
              </p>
            </section>

            <section id="services" className="terms-section animate-fadeInUp">
              <h2>Description of Service</h2>
              <p>
                Kancio Development provides mobile applications and digital services including but not limited to:
              </p>
              <div className="service-grid">
                <div className="service-item">
                  <h4>PulsaApp</h4>
                  <p>Digital payment and mobile credit top-up services</p>
                </div>
                <div className="service-item">
                  <h4>QuranMind</h4>
                  <p>AI-powered Quran learning and Islamic educational platform</p>
                </div>
                <div className="service-item">
                  <h4>ApotekApp</h4>
                  <p>Pharmacy management system for healthcare businesses</p>
                </div>
                <div className="service-item">
                  <h4>Catet Uang</h4>
                  <p>Personal finance management and expense tracking application</p>
                </div>
              </div>
            </section>

            <section id="responsibilities" className="terms-section animate-fadeInUp">
              <h2>User Responsibilities</h2>
              <div className="responsibility-grid">
                <div className="responsibility-item">
                  <h4>Account Security</h4>
                  <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                </div>
                <div className="responsibility-item">
                  <h4>Accurate Information</h4>
                  <p>You agree to provide accurate, current, and complete information when using our services and to update such information as needed.</p>
                </div>
                <div className="responsibility-item">
                  <h4>Lawful Use</h4>
                  <p>You agree to use our services only for lawful purposes and in accordance with applicable laws and regulations.</p>
                </div>
                <div className="responsibility-item">
                  <h4>Prohibited Activities</h4>
                  <p>You shall not engage in any activity that could harm, disable, or impair our services or interfere with other users' access.</p>
                </div>
              </div>
            </section>

            <section id="acceptable-use" className="terms-section animate-fadeInUp">
              <h2>Acceptable Use Policy</h2>
              <p>When using our services, you agree NOT to:</p>
              <ul className="prohibited-list">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit harmful code, viruses, or malware</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for fraudulent activities</li>
                <li>Spam or send unsolicited communications</li>
                <li>Reverse engineer our applications</li>
                <li>Share account credentials with unauthorized parties</li>
              </ul>
            </section>

            <section id="payment" className="terms-section animate-fadeInUp">
              <h2>Payment Terms</h2>
              <div className="payment-terms">
                <div className="payment-item">
                  <h4>Free Services</h4>
                  <p>Our applications are provided free of charge for basic functionality. Some premium features may require payment.</p>
                </div>
                <div className="payment-item">
                  <h4>Transaction Processing</h4>
                  <p>For payment-related services (such as PulsaApp), transactions are processed through secure third-party payment providers.</p>
                </div>
                <div className="payment-item">
                  <h4>Refund Policy</h4>
                  <p>Refunds for digital transactions are subject to our refund policy and applicable third-party provider terms.</p>
                </div>
              </div>
            </section>

            <section id="intellectual-property" className="terms-section animate-fadeInUp">
              <h2>Intellectual Property</h2>
              <p>
                All content, features, and functionality of our applications, including text, graphics, logos, and software,
                are the exclusive property of Kancio Development or its licensors.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to use our applications
                for personal, non-commercial purposes in accordance with these terms.
              </p>
            </section>

            <section id="liability" className="terms-section animate-fadeInUp">
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Kancio Development shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages.
              </p>
              <div className="disclaimer-grid">
                <div className="disclaimer-item">
                  <h4>"As Is" Basis</h4>
                  <p>Our services are provided on an "as is" basis without warranties of any kind.</p>
                </div>
                <div className="disclaimer-item">
                  <h4>No Warranties</h4>
                  <p>We disclaim all warranties, including but not limited to merchantability and fitness.</p>
                </div>
                <div className="disclaimer-item">
                  <h4>Third-Party</h4>
                  <p>We are not responsible for any third-party content accessed through our apps.</p>
                </div>
              </div>
            </section>

            <section id="termination" className="terms-section animate-fadeInUp">
              <h2>Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our services immediately,
                without prior notice or liability, for any breach of these Terms of Service.
              </p>
            </section>

            <section id="contact" className="terms-section contact-section animate-fadeInUp">
              <h2>Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please reach out to us:</p>
              <div className="contact-info">
                <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                  <span>📧 kancio.indonesia@gmail.com</span>
                </a>
                <a href="tel:+6282325600996" className="contact-link">
                  <span>📞 +62 823-2560-0996</span>
                </a>
                <div className="contact-address">
                  🏢 <strong>Kancio Development</strong><br />
                  Digital Solutions & AI Integration<br />
                  Indonesia
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsOfService