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
import SyaratLayanan from './components/SyaratLayanan'
import KebijakanPrivasi from './components/KebijakanPrivasi'
import AdManager from './components/AdManager'
import FloatingConcierge from './components/FloatingConcierge'

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
import ServicesPage from './pages/ServicesPage'
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
    title: 'Kancio Development - Pulsa Murah, Stok Obat & Aplikasi Apotek Terbaik',
    description: 'Kancio Development menyediakan ekosistem digital terpercaya: PulsaApp (agen pulsa murah 24 jam & PPOB), ApotekApp (aplikasi apotek & cek stok obat online), serta jasa pembuatan aplikasi kustom dan integrasi AI bisnis.',
    keywords: 'pulsa murah, stok obat, aplikasi apotek, software apotek terbaik, aplikasi kasir apotek, agen pulsa murah, token listrik murah, ppob terlengkap, kancio development, kancio ppob, apotekapp',
    canonicalUrl: 'https://kancio.com/',
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
            "https://github.com/kanciodevelopment",
            "https://ppob.kancio.com",
            "https://apotek.kancio.com"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://kancio.com/#website",
          "url": "https://kancio.com",
          "name": "Kancio Development",
          "description": "Platform Solusi Digital: Pulsa Murah, Stok Obat, & Aplikasi Apotek Terbaik",
          "publisher": {
            "@id": "https://kancio.com/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://kancio.com/blogs?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
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
            unitType="display"
            adFormat="auto"
            style={{ margin: '40px 0' }}
            className="home-middle-ad"
            variant="premium"
            adLabel="Advertisement"
            showLoadingAnimation={true}
          />
        </div>
      </div>

      <About />
      <Services />
    </>
  )
}

import { ThemeProvider } from './contexts/ThemeContext'

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
    <ThemeProvider>
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
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/custom-solution" element={<CustomSolutionPage />} />
              <Route path="/services/ai-integration" element={<AIServicePage />} />
              <Route path="/services/consulting" element={<ConsultingPage />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/news-editor" element={<NewsEditorPage />} />

              {/* Legal */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/syarat-layanan" element={<SyaratLayanan />} />
              <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
            </Routes>
            <Footer />
            <FloatingConcierge />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App