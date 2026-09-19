import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductsSection.css'

interface Product {
  id: string
  name: string
  shortDesc: string
  category: string
  businessType: 'pharmacy' | 'ppob' | 'all'
  icon: string
  gradient: string
  features: string[]
  path: string
  liveUrl?: string
  tag?: string
  tagColor?: string
}

const products: Product[] = [
  {
    id: 'apotekapp',
    name: 'ApotekApp ERP',
    shortDesc:
      'Sistem ERP farmasi terpadu #1 — kasir POS FEFO otomatis, rekonsiliasi klaim BPJS Kapitasi & PRB kronis, deteksi markup HPP AI, dan reservasi obat online Click & Collect.',
    category: 'Healthcare ERP',
    businessType: 'pharmacy',
    icon: '💊',
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1)',
    features: ['Alokasi Stok FEFO / FIFO Otomatis', 'Klaim BPJS PRB & Kapitasi 100% Cocok', 'Deteksi Anomali HPP Supplier AI', 'Toko Online Click & Collect'],
    path: '/products/apotekapp',
    liveUrl: 'https://apotek.kancio.com/',
    tag: 'B2B & Public Store',
    tagColor: 'cyan',
  },
  {
    id: 'pulsaapp',
    name: 'PulsaApp SaaS',
    shortDesc:
      'Distributor pulsa termurah dan server PPOB 24 jam nonstop — transaksi 1-5 detik, 1.000+ produk digital, token PLN, e-money, voucher game, dan eSIM global 50+ negara.',
    category: 'FinTech & PPOB',
    businessType: 'ppob',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #0284c7, #e6007e)',
    features: ['Auto-Routing Kilat 1-5 Detik', '1.000+ Produk Digital & Game', 'QRIS & Virtual Account Otomatis', 'Cetak Struk Bluetooth & PDF'],
    path: '/products/pulsaapp',
    liveUrl: 'https://ppob.kancio.com/',
    tag: 'Server 24 Jam',
    tagColor: 'pink',
  },
]

const ProductsSection: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pharmacy' | 'ppob'>('all')
  const sectionRef = useRef<HTMLElement>(null)

  // Lead Form
  const [globalLead, setGlobalLead] = useState({
    name: '',
    businessType: 'Apotek & Faskes',
    interestedProduct: 'ApotekApp ERP',
    notes: '',
  })
  const [leadSent, setLeadSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredProducts =
    selectedFilter === 'all'
      ? products
      : products.filter((p) => p.businessType === selectedFilter)

  const handleGlobalLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!globalLead.name) return

    const waMsg = encodeURIComponent(
      `Halo Tim Kancio Development,\n\nSaya ingin konsultasi kebutuhan produk digital untuk bisnis saya:\n- Nama: ${globalLead.name}\n- Tipe Bisnis: ${globalLead.businessType}\n- Produk Diminati: ${globalLead.interestedProduct}\n- Catatan: ${globalLead.notes || 'Mohon info setup & penawaran paket.'}`
    )
    window.open(`https://wa.me/6282325600996?text=${waMsg}`, '_blank')
    setLeadSent(true)
  }

  return (
    <section
      id="products"
      className={`products-section section ${visible ? 'products-section--visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" id="solution-finder">
          <div className="badge cyber-pulse-badge">
            <span className="pulse-dot" /> Solusi Ekosistem Digital Kancio
          </div>
          <h2>
            Pilih Solusi Terbaik <br />
            <span className="text-gradient">Sesuai Kebutuhan Industri Bisnis Anda</span>
          </h2>
          <p>
            Produk unggulan Kancio dirancang spesifik untuk memecahkan tantangan operasional — mulai dari apotek, klinik, faskes BPJS, hingga konter pulsa dan loket PPOB 24 jam.
          </p>

          {/* Interactive Business Type Switcher */}
          <div className="solution-filter-tabs glass-panel">
            <button
              className={`filter-tab ${selectedFilter === 'all' ? 'filter-tab--active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              🌐 Semua Produk ({products.length})
            </button>
            <button
              className={`filter-tab ${selectedFilter === 'pharmacy' ? 'filter-tab--active' : ''}`}
              onClick={() => setSelectedFilter('pharmacy')}
            >
              💊 Farmasi &amp; Apotek ERP
            </button>
            <button
              className={`filter-tab ${selectedFilter === 'ppob' ? 'filter-tab--active' : ''}`}
              onClick={() => setSelectedFilter('ppob')}
            >
              ⚡ Konter &amp; Server PPOB 24 Jam
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '960px', margin: '0 auto 50px' }}>
          {filteredProducts.map((product, i) => (
            <div
              key={product.name}
              className="product-card card glass-panel"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="product-card__header">
                <div className="product-card__icon" style={{ background: product.gradient }}>
                  {product.icon}
                </div>
                <div className="product-card__meta">
                  <span className="product-card__category">{product.category}</span>
                  {product.tag && (
                    <span className={`product-card__tag product-card__tag--${product.tagColor}`}>
                      {product.tag}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__desc">{product.shortDesc}</p>

              <ul className="product-card__features">
                {product.features.map((f) => (
                  <li key={f}>
                    <span className="product-card__feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="product-card__actions">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-card__cta btn btn--primary btn--sm"
                    title={`Pelajari Lebih Lanjut & Buka Portal ${product.name}`}
                  >
                    Pelajari Selengkapnya
                    <span className="btn__icon">↗</span>
                  </a>
                ) : (
                  <Link to={product.path} className="product-card__cta btn btn--primary btn--sm">
                    Pelajari Selengkapnya
                    <span className="btn__icon">→</span>
                  </Link>
                )}
                <Link
                  to={product.path}
                  className="btn btn--outline btn--sm"
                  title="Lihat Spesifikasi & Dokumentasi Lengkap"
                >
                  Panduan &amp; Fitur
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Demo Request & Lead Form */}
        <div className="home-lead-section glass-panel" style={{ marginTop: '60px' }}>
          <div className="home-lead-grid">
            <div className="home-lead-text">
              <div className="badge cyber-pulse-badge">🚀 Konsultasi Gratis</div>
              <h3>Belum Yakin Solusi Mana yang Tepat?</h3>
              <p>
                Diskusikan alur operasional dan target bisnis Anda bersama tim konsultan teknologi Kancio. Kami siap memberikan rekomendasi produk dan simulasi implementasi terbaik.
              </p>
              <div className="home-lead-points">
                <div className="point-row">✓ Konsultasi Onboarding &amp; Setup Database Gratis</div>
                <div className="point-row">✓ Panduan Integrasi WhatsApp &amp; Rekonsiliasi Real-Time</div>
                <div className="point-row">✓ Demo Interaktif Langsung via Google Meet / WhatsApp</div>
              </div>
            </div>

            <div className="home-lead-form-wrap">
              {leadSent ? (
                <div className="lead-success-state animate-fade-in">
                  <div className="success-icon">🎉</div>
                  <h4>Permintaan Terkirim!</h4>
                  <p>
                    Anda telah dialihkan ke WhatsApp Customer Service Kancio. Kami akan segera menghubungi Anda untuk penjadwalan demo.
                  </p>
                  <button
                    className="btn btn--secondary btn--sm"
                    onClick={() => setLeadSent(false)}
                  >
                    Kirim Form Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGlobalLeadSubmit} className="home-lead-form">
                  <h4 className="form-title">Ajukan Konsultasi Bisnis</h4>

                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Pratama"
                      value={globalLead.name}
                      onChange={(e) => setGlobalLead({ ...globalLead, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Jenis Bisnis</label>
                      <select
                        value={globalLead.businessType}
                        onChange={(e) =>
                          setGlobalLead({ ...globalLead, businessType: e.target.value })
                        }
                      >
                        <option value="Apotek & Faskes">Apotek &amp; Faskes</option>
                        <option value="Konter Pulsa & PPOB">Konter Pulsa &amp; PPOB</option>
                        <option value="Custom Enterprise">Custom Enterprise</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Produk Diminati</label>
                      <select
                        value={globalLead.interestedProduct}
                        onChange={(e) =>
                          setGlobalLead({ ...globalLead, interestedProduct: e.target.value })
                        }
                      >
                        <option value="ApotekApp ERP">ApotekApp ERP</option>
                        <option value="PulsaApp SaaS">PulsaApp SaaS</option>
                        <option value="Custom Application">Jasa Pembuatan Aplikasi</option>
                        <option value="AI Integration">Integrasi AI Bisnis</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary btn-block">
                    ⚡ Hubungkan ke WhatsApp Kancio
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
