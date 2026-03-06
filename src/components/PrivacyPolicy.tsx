import React from 'react'
import './PrivacyPolicy.css'

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="privacy-policy">
      <div className="container">
        <div className="privacy-policy__header animate-fadeInUp">
          <h1 className="privacy-policy__title">Privacy Policy</h1>
          <p className="privacy-policy__subtitle">
            Effective: September 2, 2022 | Last updated: April 2, 2023
          </p>
        </div>

        <div className="privacy-layout">
          {/* Sticky Sidebar TOC */}
          <aside className="legal-sidebar animate-fadeInUp">
            <h3>Contents</h3>
            <a href="#introduction" className="toc-link">Introduction</a>
            <a href="#collection" className="toc-link">Collection & Use</a>
            <a href="#data-usage" className="toc-link">Data Usage</a>
            <a href="#log-data" className="toc-link">Log Data</a>
            <a href="#cookies" className="toc-link">Cookies</a>
            <a href="#providers" className="toc-link">Service Providers</a>
            <a href="#security" className="toc-link">Security</a>
            <a href="#contact" className="toc-link">Contact Us</a>
          </aside>

          <div className="privacy-policy__content">
            <section id="introduction" className="policy-section animate-fadeInUp animate-delay-1">
              <h2>Overview</h2>
              <p>
                Kancio.com builds PulsaApp, Catet Uang, ApotekApp and QuranMind as Free applications.
                These SERVICES are provided by kancio.com at no cost and are intended for use as is.
              </p>
              <p>
                This page is used to inform visitors regarding our policies with the collection, use, and
                disclosure of Personal Information if anyone decided to use our Service.
              </p>
              <p>
                If you choose to use our Service, then you agree to the collection and use of information
                in relation to this policy. The Personal Information that we collect is used for providing
                and improving the Service. We will not use or share your information with anyone except as
                described in this Privacy Policy.
              </p>
            </section>

            <section id="collection" className="policy-section animate-fadeInUp animate-delay-2">
              <h2>Information Collection</h2>
              <p>
                For a better experience, while using our Service, we may require you to provide us with certain
                personally identifiable information, including but not limited to email and name.
              </p>

              <div className="info-item">
                <h4>Personal Identification</h4>
                <p>Name, email address, and phone number provided during support or registration.</p>
              </div>

              <div className="info-item">
                <h4>Device & Usage Data</h4>
                <p>Device type, OS version, unique identifiers, and how you interact with our application features.</p>
              </div>

              <p>
                Our applications use third-party services like <strong>Google Play Services</strong> and <strong>Google Analytics</strong> that may collect information used to identify you.
              </p>
            </section>

            <section id="data-usage" className="policy-section animate-fadeInUp">
              <h2>How We Use Data</h2>
              <p>We prioritize your privacy and use data strictly for the following purposes:</p>

              <div className="usage-grid">
                <div className="usage-item">
                  <h4>Providing Services</h4>
                  <p>Processing transactions, sending updates, and responding to your requests.</p>
                </div>

                <div className="usage-item">
                  <h4>Personalization</h4>
                  <p>Customizing your experience based on your specific preferences and interests.</p>
                </div>

                <div className="usage-item">
                  <h4>Analytics</h4>
                  <p>Understanding usage trends to improve our features and application performance.</p>
                </div>

                <div className="usage-item">
                  <h4>Security</h4>
                  <p>Protecting data and maintaining application integrity against illegal activities.</p>
                </div>
              </div>
            </section>

            <section id="log-data" className="policy-section animate-fadeInUp">
              <h2>Log Data</h2>
              <p>
                In case of application errors, we collect Log Data (through third-party products) which may
                include your IP address, device name, OS version, and the configuration of the app at the time of the error.
              </p>
            </section>

            <section id="cookies" className="policy-section animate-fadeInUp">
              <h2>Cookies</h2>
              <p>
                This Service does not use "cookies" explicitly. However, third-party libraries used within
                the app may use cookies to improve their services. You have the option to refuse these cookies
                within your device settings.
              </p>
            </section>

            <section id="providers" className="policy-section animate-fadeInUp">
              <h2>Service Providers</h2>
              <p>Third-party companies may be employed to facilitate, represent, or analyze our Service. These parties have limited access to Personal Information only to perform specific tasks on our behalf and are strictly obligated to confidentiality.</p>
            </section>

            <section id="security" className="policy-section animate-fadeInUp">
              <h2>Data Security</h2>
              <p>
                We strive to use commercially acceptable means of protecting your personal information.
                However, please remember that no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section id="contact" className="policy-section contact-section animate-fadeInUp">
              <h2>Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy Policy, please reach out to our dedicated support team.
              </p>
              <div className="contact-info">
                <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                  <span>📧 kancio.indonesia@gmail.com</span>
                </a>
                <a href="tel:+6282325600996" className="contact-link">
                  <span>📞 +62 823-2560-0996</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy