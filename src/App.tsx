import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductsSection from './components/ProductsSection'
import About from './components/About'
import Services from './components/Services'
import Blogs from './components/Blogs'
import BlogPost from './components/BlogPost'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import AdManager from './components/AdManager'

// Product Pages
import PulsaAppPage from './pages/PulsaAppPage'
import QuranMindPage from './pages/QuranMindPage'
import ApotekAppPage from './pages/ApotekAppPage'
import ApotekAppBpjsGuidePage from './pages/docs/apotekapp/ApotekAppBpjsGuidePage'
import ApotekAppPresensiGuidePage from './pages/docs/apotekapp/ApotekAppPresensiGuidePage'

import CatetUangPage from './pages/CatetUangPage'
import CustomAppsPage from './pages/CustomAppsPage'
import AIIntegrationPage from './pages/AIIntegrationPage'

// Service Pages
import CustomSolutionPage from './pages/services/CustomSolutionPage'
import AIServicePage from './pages/services/AIServicePage'
import ConsultingPage from './pages/services/ConsultingPage'

// Admin / Editor
import AdminPage from './pages/AdminPage'
import NewsEditorPage from './pages/NewsEditorPage'

import './App.css'
import GoogleAdSense from './components/GoogleAdSense'
import { useAds } from './hooks/useAds'
import { useSEO } from './hooks/useSEO'

const HomePage: React.FC = () => {
  const { userConsent } = useAds()

  useSEO({
    title: 'Kancio Development - Digital Solutions & AI Integration',
    description: 'Kancio Development menyediakan layanan pembuatan aplikasi kustom, website profesional, dan integrasi kecerdasan buatan (AI) tingkat lanjut untuk mengotomatisasi operasional bisnis Anda.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://kancio.com/#organization",
          "name": "Kancio Development",
          "url": "https://kancio.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://kancio.com/favicon.ico"
          },
          "sameAs": [
            "https://github.com/kanciodevelopment"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://kancio.com/#website",
          "url": "https://kancio.com",
          "name": "Kancio Development",
          "description": "Digital Solutions & AI Integration Services",
          "publisher": {
            "@id": "https://kancio.com/#organization"
          }
        }
      ]
    }
  })

  return (
    <>
      <Hero />
      <ProductsSection />

      {/* Strategic ad placement */}
      <div className="content-break-ad">
        <div className="ad-wrapper">
          <GoogleAdSense
            userConsent={userConsent}
            adFormat="horizontal"
            style={{ margin: '40px 0' }}
            className="home-middle-ad"
            variant="premium"
            adLabel="Partnership"
            showLoadingAnimation={true}
          />
        </div>
      </div>

      <About />
      <Services />
    </>
  )
}

function App() {
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.card, .product-card, .service-highlight-card, .hero__app-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AdManager />
          <Header />
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Blog */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Product Pages */}
            <Route path="/products/pulsaapp" element={<PulsaAppPage />} />
            <Route path="/products/quranmind" element={<QuranMindPage />} />
            <Route path="/products/apotekapp" element={<ApotekAppPage />} />
            <Route path="/products/apotekapp/bpjs-guide" element={<ApotekAppBpjsGuidePage />} />
            <Route path="/products/apotekapp/presensi-guide" element={<ApotekAppPresensiGuidePage />} />

            <Route path="/products/catetUang" element={<CatetUangPage />} />
            <Route path="/products/custom-apps" element={<CustomAppsPage />} />
            <Route path="/products/ai-integration" element={<AIIntegrationPage />} />

            {/* Service Pages */}
            <Route path="/services/custom-solution" element={<CustomSolutionPage />} />
            <Route path="/services/ai-integration" element={<AIServicePage />} />
            <Route path="/services/consulting" element={<ConsultingPage />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/news-editor" element={<NewsEditorPage />} />

            {/* Legal */}
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