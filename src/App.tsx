import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import PulsaAppShowcase from './components/PulsaAppShowcase'
import QuranMindShowcase from './components/QuranMindShowcase'
import ApotekAppShowcase from './components/ApotekAppShowcase'
import CatetUangShowcase from './components/CatetUangShowcase'
import CustomAppsShowcase from './components/CustomAppsShowcase'
import AIIntegrationShowcase from './components/AIIntegrationShowcase'
import About from './components/About'
import Services from './components/Services'
import Posts from './components/Posts'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import AdManager from './components/AdManager'
import './App.css'

import GoogleAdSense from './components/GoogleAdSense'
import { useAds } from './hooks/useAds'

const HomePage: React.FC = () => {
  const { userConsent } = useAds();

  return (
    <>
      <Hero />
      <PulsaAppShowcase />
      <QuranMindShowcase />

      {/* Strategic ad placement: After user engagement with showcases */}
      <div className="content-break-ad">
        <div className="ad-wrapper">
          <GoogleAdSense
            userConsent={userConsent}
            adFormat="horizontal"
            style={{ margin: '50px 0' }}
            className="home-middle-ad optimized-home-ad"
          />
        </div>
      </div>

      <ApotekAppShowcase />
      <CatetUangShowcase />
      <CustomAppsShowcase />
      <AIIntegrationShowcase />

      <About />
      <Services />
      <Posts />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AdManager />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App