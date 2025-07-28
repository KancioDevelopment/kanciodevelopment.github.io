import React from 'react'
import './TermsOfService.css'

const TermsOfService: React.FC = () => {
  return (
    <section className="terms-of-service">
      <div className="container">
        <div className="terms-of-service__header">
          <h1 className="terms-of-service__title">Terms of Service</h1>
          <p className="terms-of-service__subtitle">
            Last updated: January 27, 2025
          </p>
        </div>

        <div className="terms-of-service__content">
          <section className="terms-section">
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

          <section className="terms-section">
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

          <section className="terms-section">
            <h2>User Responsibilities</h2>
            <div className="responsibility-grid">
              <div className="responsibility-item">
                <h4>Account Security</h4>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account.
                </p>
              </div>
              <div className="responsibility-item">
                <h4>Accurate Information</h4>
                <p>
                  You agree to provide accurate, current, and complete information when using our services 
                  and to update such information as needed.
                </p>
              </div>
              <div className="responsibility-item">
                <h4>Lawful Use</h4>
                <p>
                  You agree to use our services only for lawful purposes and in accordance with applicable 
                  laws and regulations.
                </p>
              </div>
              <div className="responsibility-item">
                <h4>Prohibited Activities</h4>
                <p>
                  You shall not engage in any activity that could harm, disable, or impair our services 
                  or interfere with other users' access.
                </p>
              </div>
            </div>
          </section>

          <section className="terms-section">
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

          <section className="terms-section">
            <h2>Payment Terms</h2>
            <div className="payment-terms">
              <div className="payment-item">
                <h4>Free Services</h4>
                <p>
                  Our applications are provided free of charge for basic functionality. Some premium 
                  features may require payment.
                </p>
              </div>
              <div className="payment-item">
                <h4>Transaction Processing</h4>
                <p>
                  For payment-related services (such as PulsaApp), transactions are processed through 
                  secure third-party payment providers.
                </p>
              </div>
              <div className="payment-item">
                <h4>Refund Policy</h4>
                <p>
                  Refunds for digital transactions are subject to our refund policy and applicable 
                  third-party provider terms.
                </p>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>Intellectual Property</h2>
            <p>
              All content, features, and functionality of our applications, including but not limited to 
              text, graphics, logos, icons, images, audio clips, and software, are the exclusive property 
              of Kancio Development or its licensors and are protected by copyright, trademark, and other 
              intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to use our applications 
              for personal, non-commercial purposes in accordance with these terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed 
              by our Privacy Policy, which is incorporated into these Terms of Service by reference.
            </p>
            <p>
              By using our services, you consent to the collection, use, and sharing of your information 
              as described in our Privacy Policy.
            </p>
          </section>

          <section className="terms-section">
            <h2>Service Availability</h2>
            <div className="availability-info">
              <div className="availability-item">
                <h4>Uptime</h4>
                <p>
                  We strive to maintain high service availability but do not guarantee uninterrupted 
                  access to our applications.
                </p>
              </div>
              <div className="availability-item">
                <h4>Maintenance</h4>
                <p>
                  We may temporarily suspend service for maintenance, updates, or improvements with 
                  or without notice.
                </p>
              </div>
              <div className="availability-item">
                <h4>Technical Issues</h4>
                <p>
                  We are not liable for any loss or damage resulting from service interruptions or 
                  technical difficulties.
                </p>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Kancio Development shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including but not 
              limited to loss of profits, data, or other intangible losses.
            </p>
            <p>
              Our total liability for any claims arising from your use of our services shall not exceed 
              the amount you have paid to us in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="terms-section">
            <h2>Disclaimers</h2>
            <div className="disclaimer-grid">
              <div className="disclaimer-item">
                <h4>"As Is" Basis</h4>
                <p>
                  Our services are provided on an "as is" and "as available" basis without warranties 
                  of any kind, either express or implied.
                </p>
              </div>
              <div className="disclaimer-item">
                <h4>No Warranties</h4>
                <p>
                  We disclaim all warranties, including but not limited to merchantability, fitness 
                  for a particular purpose, and non-infringement.
                </p>
              </div>
              <div className="disclaimer-item">
                <h4>Third-Party Content</h4>
                <p>
                  We are not responsible for any third-party content, services, or products accessed 
                  through our applications.
                </p>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services immediately, 
              without prior notice or liability, for any reason whatsoever, including but not limited 
              to a breach of these Terms of Service.
            </p>
            <p>
              You may terminate your use of our services at any time by discontinuing use of our 
              applications and deleting your account if applicable.
            </p>
          </section>

          <section className="terms-section">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms of Service at any time. If a revision 
              is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p>
              Your continued use of our services after any such changes constitutes your consent to such changes.
            </p>
          </section>

          <section className="terms-section">
            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of 
              the Republic of Indonesia, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising under these terms shall be subject to the exclusive jurisdiction of 
              the courts of Indonesia.
            </p>
          </section>

          <section className="terms-section contact-section">
            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                📧 kancio.indonesia@gmail.com
              </a>
              <a href="tel:+6282325600996" className="contact-link">
                📞 +62 823-2560-0996
              </a>
              <div className="contact-address">
                🏢 Kancio Development<br />
                Indonesia
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default TermsOfService