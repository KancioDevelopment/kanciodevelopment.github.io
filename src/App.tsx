import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import './App.css'

const HomePage: React.FC = () => (
  <>
    <Hero />
    <PulsaAppShowcase />
    <QuranMindShowcase />
    <ApotekAppShowcase />
    <CatetUangShowcase />
    <CustomAppsShowcase />
    <AIIntegrationShowcase />
    <About />
    <Services />
  </>
)

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App