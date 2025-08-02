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
import Blogs from './components/Blogs'
import BlogPost from './components/BlogPost'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import AdManager from './components/AdManager'
import PulsaAppPage from './pages/PulsaAppPage'
import QuranMindPage from './pages/QuranMindPage'
import ApotekAppPage from './pages/ApotekAppPage'
import CatetUangPage from './pages/CatetUangPage'
import CustomAppsPage from './pages/CustomAppsPage'
import AIIntegrationPage from './pages/AIIntegrationPage'
import AdminPage from './pages/AdminPage'
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
            variant="premium"
            adLabel="Partnership"
            showLoadingAnimation={true}
          />
        </div>
      </div>

      <ApotekAppShowcase />
      <CatetUangShowcase />
      <CustomAppsShowcase />
      <AIIntegrationShowcase />

      <About />
      <Services />

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
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/products/pulsaapp" element={<PulsaAppPage />} />
            <Route path="/products/quranmind" element={<QuranMindPage />} />
            <Route path="/products/apotekapp" element={<ApotekAppPage />} />
            <Route path="/products/catetUang" element={<CatetUangPage />} />
            <Route path="/products/custom-apps" element={<CustomAppsPage />} />
            <Route path="/products/ai-integration" element={<AIIntegrationPage />} />
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