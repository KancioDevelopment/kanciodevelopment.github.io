import React from 'react'
import './PrivacyPolicy.css'

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="privacy-policy">
      <div className="container">
        <div className="privacy-policy__header">
          <h1 className="privacy-policy__title">Privacy Policy</h1>
          <p className="privacy-policy__subtitle">
            Last updated: April 2, 2023
          </p>
        </div>

        <div className="privacy-policy__content">
          <section className="policy-section">
            <h2>Privacy Policy</h2>
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
            <p>
              The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, 
              which are accessible at Kancio unless otherwise defined in this Privacy Policy.
            </p>
          </section>

          <section className="policy-section">
            <h2>Information Collection and Use</h2>
            <p>
              For a better experience, while using our Service, we may require you to provide us with certain 
              personally identifiable information, including but not limited to email and name. The information 
              that we request will be retained by us and used as described in this privacy policy.
            </p>
            <p>
              Our applications use third-party services that may collect information used to identify you, 
              including:
            </p>
            <ul>
              <li>Google Analytics</li>
            </ul>
            <p>
              Link to the privacy policy of third-party service providers used by our applications:
            </p>
            <ul>
              <li>
                <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">
                  Google Play Services
                </a>
              </li>
            </ul>

            <div className="info-collection">
              <h3>Our applications may collect the following information from users:</h3>
              
              <div className="info-item">
                <h4>Personal Identification Information</h4>
                <p>
                  Such as name, email address, phone number, which you may provide when contacting support 
                  or registering for certain services.
                </p>
              </div>

              <div className="info-item">
                <h4>Device Data</h4>
                <p>
                  Including information about your device such as device type, operating system, software 
                  version, network information, and unique device identifiers.
                </p>
              </div>

              <div className="info-item">
                <h4>Location Data</h4>
                <p>
                  We may collect information about your physical location if you give us permission to do so. 
                  This location information may be used for features that require location information.
                </p>
              </div>

              <div className="info-item">
                <h4>Usage Data</h4>
                <p>
                  We may collect information about how you use our applications, including interactions with 
                  features, search history, and your preferences.
                </p>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Data Usage</h2>
            <p>We use the collected data for:</p>
            
            <div className="usage-grid">
              <div className="usage-item">
                <h4>Providing Services</h4>
                <p>
                  User data is used to operate and provide application services, including processing 
                  transactions, sending updates, and responding to user requests.
                </p>
              </div>

              <div className="usage-item">
                <h4>Personalization</h4>
                <p>
                  We may use data to understand your preferences and interests, so we can provide more 
                  relevant content and customized experiences.
                </p>
              </div>

              <div className="usage-item">
                <h4>Analytics</h4>
                <p>
                  User data may be used to analyze application performance, understand usage trends, 
                  and improve features and functionality.
                </p>
              </div>

              <div className="usage-item">
                <h4>Security</h4>
                <p>
                  Information is collected to maintain application security, protect data, and prevent 
                  illegal activities.
                </p>
              </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>Log Data</h2>
            <p>
              We want to inform you that whenever you use our Service, in case of an error in the app we 
              collect data and information (through third-party products) on your phone called Log Data. 
              This Log Data may include information such as your device Internet Protocol ("IP") address, 
              device name, operating system version, the configuration of the app when utilizing our Service, 
              the time and date of your use of the Service, and other statistics.
            </p>
          </section>

          <section className="policy-section">
            <h2>Cookies</h2>
            <p>
              Cookies are files with a small amount of data that are commonly used as anonymous unique 
              identifiers. These are sent to your browser from the websites that you visit and are stored 
              on your device's internal memory.
            </p>
            <p>
              This Service does not use these "cookies" explicitly. However, the app may use third-party 
              code and libraries that use "cookies" to collect information and improve their services. 
              You have the option to either accept or refuse these cookies and know when a cookie is being 
              sent to your device. If you choose to refuse our cookies, you may not be able to use some 
              portions of this Service.
            </p>
          </section>

          <section className="policy-section">
            <h2>Service Providers</h2>
            <p>We may employ third-party companies and individuals due to the following reasons:</p>
            <ul>
              <li>To facilitate our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To perform Service-related services; or</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>
            <p>
              We want to inform users of this Service that these third parties have access to their 
              Personal Information. The reason is to perform the tasks assigned to them on our behalf. 
              However, they are obligated not to disclose or use the information for any other purpose.
            </p>
          </section>

          <section className="policy-section">
            <h2>Data Sharing</h2>
            <p>
              We will not sell, rent, or trade user data with third parties without your permission, 
              except in situations described in this policy or if required by law.
            </p>
          </section>

          <section className="policy-section">
            <h2>Security</h2>
            <p>
              We value your trust in providing us your Personal Information, thus we are striving to use 
              commercially acceptable means of protecting it. But remember that no method of transmission 
              over the internet, or method of electronic storage is 100% secure and reliable, and we cannot 
              guarantee its absolute security.
            </p>
          </section>

          <section className="policy-section">
            <h2>Links to Other Sites</h2>
            <p>
              This Service may contain links to other sites. If you click on a third-party link, you will 
              be directed to that site. Note that these external sites are not operated by us. Therefore, 
              we strongly advise you to review the Privacy Policy of these websites. We have no control over 
              and assume no responsibility for the content, privacy policies, or practices of any third-party 
              sites or services.
            </p>
          </section>

          <section className="policy-section">
            <h2>Children's Privacy</h2>
            <p>
              These Services do not address anyone under the age of 13. We do not knowingly collect 
              personally identifiable information from children under 13 years of age. In the case we 
              discover that a child under 13 has provided us with personal information, we immediately 
              delete this from our servers. If you are a parent or guardian and you are aware that your 
              child has provided us with personal information, please contact us so that we will be able 
              to do the necessary actions.
            </p>
          </section>

          <section className="policy-section">
            <h2>User Privacy Rights</h2>
            <p>
              Users have the right to access, update, or delete their personal information from our 
              applications. If you want to access or delete your data, please contact us through the 
              information provided at the end of this policy.
            </p>
          </section>

          <section className="policy-section">
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, you are advised to review this 
              page periodically for any changes. We will notify you of any changes by posting the new 
              Privacy Policy on this page.
            </p>
            <p>
              <strong>This policy is effective as of 2022-09-02</strong>
            </p>
          </section>

          <section className="policy-section contact-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to 
              contact us at:
            </p>
            <div className="contact-info">
              <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                📧 kancio.indonesia@gmail.com
              </a>
              <a href="tel:+6282325600996" className="contact-link">
                📞 +62 823-2560-0996
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy