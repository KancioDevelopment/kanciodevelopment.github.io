import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import './ProductPage.css'

const CatetUangPage: React.FC = () => {
  const { userConsent } = useAds()
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const budgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: '💰',
      title: 'Income & Expense Tracking',
      badge: 'Core',
      badgeColor: 'blue',
      description: 'Catat setiap transaksi harian Anda secara manual atau otomatis dengan dukungan kategori kustom dan catatan detail untuk awareness finansial yang maksimal.',
      details: ['Kategori Kustom', 'Foto Struk/Nota', 'Multi-Mata Uang', 'Input Cepat & Mudah'],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
      icon: '📊',
      title: 'Automatic Financial Reports',
      badge: 'Analysis',
      badgeColor: 'indigo',
      description: 'Dapatkan ringkasan otomatis harian, mingguan, hingga bulanan yang komprehensif dengan grafik interaktif dan analisis tren pengeluaran.',
      details: ['Grafik Pie & Bar', 'Analisis Arus Kas', 'Laporan Mingguan', 'Trend Pengeluaran'],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
    },
    {
      icon: '🏷️',
      title: 'Custom Categories',
      badge: 'Flexible',
      badgeColor: 'cyan',
      description: 'Kebebasan penuh bagi Anda untuk membuat dan mengatur kategori pengeluaran serta pemasukan sesuai dengan kebutuhan dan gaya hidup unik Anda.',
      details: ['Icon Kustom', 'Grup Kategori', 'Warna Kustom', 'Sorting Cerdas'],
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    },
    {
      icon: '🩺',
      title: 'Financial Health Analysis',
      badge: 'Smart',
      badgeColor: 'violet',
      description: 'Gunakan alat bantu cerdas untuk mengevaluasi status keuangan Anda saat ini dan dapatkan saran praktis untuk meningkatkan kesehatan finansial.',
      details: ['Skor Kesehatan Finansial', 'Saran Menabung', 'Deteksi Pemborosan', 'Rencana Anggaran'],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    }
  ]

  const stats = [
    { label: 'Downloads', value: '10+', icon: '🚀' },
    { label: 'Rating', value: '3.9★', icon: '⭐' },
    { label: 'Size', value: '39MB', icon: '📦' },
    { label: 'Version', value: '1.0.18', icon: '✨' }
  ]

  return (
    <div className={`product-page catetuang-premium ${scrolled ? 'page-scrolled' : ''}`}>
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="product-hero catetuang-hero-v2">
        <div className="hero-bg-accent" />
        <div className="hero-pattern-overlay" />

        {/* Floating elements for premium feel */}
        <div className="floating-elements-tu">
          <div className="float-item coin-1">🪙</div>
          <div className="float-item coin-2">🪙</div>
          <div className="float-item wallet-tu">👛</div>
          <div className="float-item chart-tu">📈</div>
        </div>

        <div className="container hero-grid-v2">
          <div className="hero-content-v2">
            <div className="glass-badge-tu slide-up">
              <span className="live-indicator-tu" />
              FINANCE MANAGEMENT 2.0
            </div>

            <h1 className="catetuang-hero__title slide-up-delay-1">
              Catet Uang: <br />
              <span className="text-gradient-tu">Financial Awareness</span>
            </h1>

            <p className="catetuang-hero__desc slide-up-delay-2">
              Pencatat keuangan harian yang <strong>menyenangkan</strong> dan <strong>fungsional</strong>.
              Membentuk kebiasaan finansial yang sehat melalui antarmuka yang intuitif dan analisis cerdas.
            </p>

            <div className="hero-stats-glass-tu slide-up-delay-3">
              {stats.map((s, i) => (
                <div key={i} className="stat-glass-card-tu">
                  <span className="stat-icon-tu">{s.icon}</span>
                  <div className="stat-info-tu">
                    <span className="stat-value-tu">{s.value}</span>
                    <span className="stat-label-tu">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-actions-v2 slide-up-delay-4">
              <a href="https://play.google.com/store/apps/details?id=com.kancio.cashflow" className="glass-btn-primary-tu">
                Download Free ↓
              </a>
              <button className="glass-btn-secondary-tu" onClick={() => budgetRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Demo Analytics
              </button>
            </div>
          </div>

          <div className="hero-visual-v2 slide-up-delay-2">
            <div className="premium-dashboard-preview-tu glass-card-tu">
              <div className="preview-header-tu">
                <div className="window-controls-tu"><span /><span /><span /></div>
                <div className="preview-title-tu">Budget Overview</div>
              </div>
              <div className="preview-body-tu">
                <div className="chart-mockup-tu">
                  <div className="pie-chart-tu">
                    <div className="pie-slice food" />
                    <div className="pie-slice shop" />
                    <div className="pie-slice other" />
                  </div>
                  <div className="chart-legend-tu">
                    <div className="legend-item"><span className="dot food" /> Food (45%)</div>
                    <div className="legend-item"><span className="dot shop" /> Shop (30%)</div>
                    <div className="legend-item"><span className="dot other" /> Other (15%)</div>
                  </div>
                </div>
                <div className="recent-trans-tu">
                  <div className="trans-item-tu"><span>🛒 Groceries</span> <span className="neg">-Rp 150k</span></div>
                  <div className="trans-item-tu"><span>💰 Salary</span> <span className="pos">+Rp 5.2m</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="content-break-ad container">
        <GoogleAdSense userConsent={userConsent} adFormat="horizontal" variant="minimal" />
      </div>

      {/* ===== INTERACTIVE BUDGET PREVIEW ===== */}
      <section id="budget-preview" ref={budgetRef} className="section interactive-preview-section">
        <div className="container">
          <div className="section-header-v2">
            <div className="badge-v2">SMART ANALYTICS</div>
            <h2>Visualisasikan Keuangan Anda</h2>
            <p>Ubah angka membosankan menjadi insight visual yang mudah dipahami.</p>
          </div>

          <div className="interactive-budget-grid">
            <div className="budget-visual-card glass-card-dark-tu">
              <div className="card-accent-tu" />
              <div className="analytic-mesh-tu">
                <div className="mesh-node-tu" style={{ top: '20%', left: '30%' }} />
                <div className="mesh-node-tu" style={{ top: '50%', left: '70%' }} />
                <div className="mesh-node-tu" style={{ top: '80%', left: '40%' }} />
                <svg className="mesh-lines-tu"><line x1="30%" y1="20%" x2="70%" y2="50%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" /></svg>
              </div>

              <div className="mock-analytics-tu">
                <div className="budget-ring-tu">
                  <svg viewBox="0 0 36 36" className="circular-chart-tu">
                    <path className="circle-bg-tu" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle-tu" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="20.35" className="percentage-tu">65%</text>
                  </svg>
                </div>
                <div className="budget-info-tu">
                  <h4>Budget Kesehatan</h4>
                  <p>Anda telah menghabiskan 65% dari anggaran bulanan untuk kategori ini.</p>
                </div>
              </div>
            </div>

            <div className="budget-insight-stack-tu">
              <div className="insight-card-tu glass-card-tu">
                <div className="insight-icon-tu">💡</div>
                <div className="insight-text-tu">
                  <strong>Insight:</strong> Pengeluaran 'Makan Luar' meningkat 15% dibanding minggu lalu. Cobalah memasak di rumah!
                </div>
              </div>
              <div className="insight-card-tu glass-card-tu">
                <div className="insight-icon-tu">📉</div>
                <div className="insight-text-tu">
                  <strong>Trencash:</strong> Saldo Anda diprediksi aman hingga akhir bulan berdasarkan rata-rata harian.
                </div>
              </div>
              <div className="insight-card-tu glass-card-tu">
                <div className="insight-icon-tu">🎯</div>
                <div className="insight-text-tu">
                  <strong>Target:</strong> 80% dari target tabungan 'Liburan' telah tercapai. Sedikit lagi!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="section features-section-v2">
        <div className="container">
          <div className="section-header-v2">
            <div className="badge-v2">FITUR UNGGULAN</div>
            <h2>Didesain Untuk Kenyamanan</h2>
            <p>Setiap fitur dikembangkan dengan fokus pada kemudahan penggunaan dan akurasi data.</p>
          </div>

          <div className="product-tabs-tu scroll-hide">
            {features.map((f, i) => (
              <button
                key={i}
                className={`product-tab-tu ${activeTab === i ? 'tab-active-tu' : ''}`}
                onClick={() => setActiveTab(i)}
                style={activeTab === i ? { background: f.gradient } : {}}
              >
                <span>{f.icon}</span>
                <span className="tab-name-tu">{f.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="product-detail-card-tu glass-card-dark-tu">
            <div className="detail-left-tu">
              <div className="detail-header-tu">
                <div className="detail-icon-tu" style={{ background: features[activeTab].gradient }}>
                  {features[activeTab].icon}
                </div>
                <span className={`detail-badge-tu badge-${features[activeTab].badgeColor}`}>
                  {features[activeTab].badge}
                </span>
              </div>
              <h3 className="detail-title-tu">{features[activeTab].title}</h3>
              <p className="detail-desc-tu">{features[activeTab].description}</p>
              <ul className="detail-list-tu">
                {features[activeTab].details.map((d, i) => (
                  <li key={i}>
                    <span className="check-tu" style={{ color: '#3b82f6' }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="detail-right-tu">
              <div className="premium-window-tu">
                <div className="window-header-tu">
                  <span className="dot-tu" /><span className="dot-tu" /><span className="dot-tu" />
                </div>
                <div className="window-body-tu">
                  <div className="skeleton-tu" style={{ width: '85%' }} />
                  <div className="skeleton-tu" style={{ width: '65%' }} />
                  <div className="highlight-tu" style={{ background: features[activeTab].gradient + '22' }}>
                    {features[activeTab].title} PREVIEW
                  </div>
                  <div className="skeleton-tu" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECIFICATIONS SECTION ===== */}
      <section className="section specs-section-tu">
        <div className="container">
          <div className="section-header-v2">
            <div className="badge-v2">TECH SPECS</div>
            <h2>Spesifikasi Teknis</h2>
          </div>

          <div className="specs-grid-tu">
            <div className="spec-card-tu glass-card-tu">
              <div className="spec-icon-tu">📱</div>
              <div className="spec-info-tu">
                <strong>Platform</strong>
                <span>Android 7.0+ (Nougat)</span>
              </div>
            </div>
            <div className="spec-card-tu glass-card-tu">
              <div className="spec-icon-tu">📏</div>
              <div className="spec-info-tu">
                <strong>Ukuran</strong>
                <span>39 MB (Sangat Ringan)</span>
              </div>
            </div>
            <div className="spec-card-tu glass-card-tu">
              <div className="spec-icon-tu">🔄</div>
              <div className="spec-info-tu">
                <strong>Versi</strong>
                <span>1.0.18 (Latest)</span>
              </div>
            </div>
            <div className="spec-card-tu glass-card-tu">
              <div className="spec-icon-tu">🔒</div>
              <div className="spec-info-tu">
                <strong>Keamanan</strong>
                <span>Local Data & PIN Lock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section cta-premium-tu">
        <div className="cta-gradient-overlay" />
        <div className="container">
          <div className="cta-content-tu glass-card-tu">
            <h2>Mulai Langkah Finansial Lebih Sehat</h2>
            <p>Bergabunglah dengan penguna lain yang telah mengubah cara mereka memandang uang.</p>
            <div className="cta-btns-tu">
              <a href="https://play.google.com/store/apps/details?id=com.kancio.cashflow" className="glass-btn-primary-tu">Download Catet Uang</a>
              <Link to="/contact" className="glass-btn-secondary-tu">Hubungi Support</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Styles local to this page to avoid CSS pollution */}
      <style>{`
        .catetuang-premium {
          background: #f8fafc;
          color: #1e293b;
        }

        .catetuang-hero-v2 {
          position: relative;
          padding: 160px 0 100px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          overflow: hidden;
        }

        .hero-bg-accent {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 60%;
          height: 80%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          z-index: 1;
        }

        .hero-pattern-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image: radial-gradient(#3b82f6 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }

        .hero-grid-v2 {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .text-gradient-tu {
          background: linear-gradient(to right, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glass-badge-tu {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.2);
          margin-bottom: 24px;
        }

        .live-indicator-tu {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          animation: pulse-tu 2s infinite;
        }

        @keyframes pulse-tu {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        .catetuang-hero__title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }

        .catetuang-hero__desc {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 40px;
          max-width: 600px;
        }

        .hero-stats-glass-tu {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-glass-card-tu {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          padding: 20px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
        }

        .stat-icon-tu { font-size: 1.5rem; }
        .stat-value-tu { display: block; font-weight: 800; font-size: 1.2rem; color: #1e293b; }
        .stat-label-tu { font-size: 0.85rem; color: #64748b; font-weight: 600; }

        .glass-btn-primary-tu {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 36px;
          background: #2563eb;
          color: white;
          text-decoration: none;
          font-weight: 700;
          border-radius: 100px;
          transition: 0.3s;
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
          border: none;
        }

        .glass-btn-primary-tu:hover {
          transform: translateY(-3px);
          background: #1d4ed8;
          box-shadow: 0 25px 50px rgba(37, 99, 235, 0.3);
        }

        .glass-btn-secondary-tu {
          padding: 18px 36px;
          background: transparent;
          color: #2563eb;
          font-weight: 700;
          border-radius: 100px;
          border: 2px solid #2563eb;
          transition: 0.3s;
          margin-left: 15px;
        }

        .glass-btn-secondary-tu:hover {
          background: rgba(37, 99, 235, 0.05);
          transform: translateY(-3px);
        }

        /* Floating Elements Animations */
        .floating-elements-tu .float-item {
          position: absolute;
          font-size: 2.5rem;
          z-index: 3;
          animation: float-tu 4s ease-in-out infinite alternate;
        }

        .coin-1 { top: 15%; left: 5%; animation-delay: 0s; }
        .coin-2 { bottom: 20%; left: 15%; animation-delay: 1s; }
        .wallet-tu { top: 20%; right: 45%; animation-delay: 1.5s; }
        .chart-tu { bottom: 15%; right: 10%; animation-delay: 0.5s; }

        @keyframes float-tu {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-30px) rotate(10deg); }
        }

        /* Preview Card */
        .premium-dashboard-preview-tu {
          border-radius: 30px;
          overflow: hidden;
          background: white;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .preview-header-tu {
          background: #f1f5f9;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .window-controls-tu { display: flex; gap: 6px; }
        .window-controls-tu span { width: 10px; height: 10px; border-radius: 50%; background: #e2e8f0; }
        .preview-title-tu { font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }

        .preview-body-tu { padding: 30px; }

        .chart-mockup-tu {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 30px;
        }

        .pie-chart-tu {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: conic-gradient(#3b82f6 0% 45%, #6366f1 45% 75%, #e2e8f0 75% 100%);
        }

        .chart-legend-tu { display: flex; flex-direction: column; gap: 8px; }
        .legend-item { font-size: 0.85rem; font-weight: 600; color: #64748b; display: flex; align-items: center; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.food { background: #3b82f6; }
        .dot.shop { background: #6366f1; }
        .dot.other { background: #e2e8f0; }

        .recent-trans-tu { border-top: 1px solid #f1f5f9; padding-top: 20px; }
        .trans-item-tu { 
          display: flex; 
          justify-content: space-between; 
          padding: 10px 0; 
          font-size: 0.9rem; 
          font-weight: 600; 
        }
        .trans-item-tu .neg { color: #ef4444; }
        .trans-item-tu .pos { color: #10b981; }

        /* General Section Layouts */
        .section-header-v2 {
          text-align: center;
          margin-bottom: 60px;
        }

        .badge-v2 {
          display: inline-block;
          background: #dbeafe;
          color: #2563eb;
          padding: 6px 16px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .section-header-v2 h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
        }

        /* Budget Interactive Grid */
        .interactive-budget-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 30px;
        }

        .glass-card-dark-tu {
          background: #111827;
          border-radius: 40px;
          padding: 50px;
          position: relative;
          color: white;
          overflow: hidden;
        }

        .card-accent-tu {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
        }

        .circular-chart-tu { width: 140px; }
        .circle-bg-tu { fill: none; stroke: rgba(255, 255, 255, 0.05); stroke-width: 3.8; }
        .circle-tu { fill: none; stroke: #3b82f6; stroke-width: 3.8; stroke-linecap: round; }
        .percentage-tu { fill: white; font-size: 0.5rem; font-weight: 800; text-anchor: middle; }

        .mock-analytics-tu { display: flex; align-items: center; gap: 40px; }
        .budget-info-tu h4 { font-size: 1.5rem; margin-bottom: 10px; }
        .budget-info-tu p { color: #94a3b8; line-height: 1.6; }

        .budget-insight-stack-tu { display: flex; flex-direction: column; gap: 20px; }
        .insight-card-tu {
          background: white;
          padding: 24px;
          border-radius: 20px;
          display: flex;
          gap: 20px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .insight-icon-tu { font-size: 1.5rem; }
        .insight-text-tu { font-size: 0.95rem; line-height: 1.5; color: #475569; }

        /* Feature Tabs */
        .product-tabs-tu {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          overflow-x: auto;
          padding: 10px 0;
        }

        .product-tab-tu {
          padding: 14px 24px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 100px;
          color: #64748b;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
        }

        .tab-active-tu {
          color: white;
          border-color: transparent;
        }

        .product-detail-card-tu {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .detail-icon-tu {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin-bottom: 24px;
        }

        .detail-badge-tu {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          margin-left: 15px;
        }
        .badge-blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .badge-indigo { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
        .badge-cyan { background: rgba(6, 182, 212, 0.1); color: #06b6d4; }
        .badge-violet { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .detail-title-tu { font-size: 2rem; margin-bottom: 20px; color: white; }
        .detail-desc-tu { font-size: 1.1rem; color: #94a3b8; margin-bottom: 30px; line-height: 1.7; }
        .detail-list-tu { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .detail-list-tu li { color: #e2e8f0; font-size: 0.95rem; display: flex; gap: 10px; font-weight: 500; }

        /* Premium Window Mockup */
        .premium-window-tu {
          background: #1e293b;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .window-header-tu { background: #0f172a; padding: 12px; display: flex; gap: 8px; }
        .dot-tu { width: 8px; height: 8px; border-radius: 50%; background: #334155; }
        .window-body-tu { padding: 30px; display: flex; flex-direction: column; gap: 15px; }
        .skeleton-tu { height: 8px; background: #334155; border-radius: 4px; }
        .highlight-tu {
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          font-weight: 800;
          font-size: 0.8rem;
          color: white;
          letter-spacing: 0.1em;
        }

        /* CTA Premium */
        .cta-premium-tu {
          position: relative;
          padding: 100px 0;
          background: #2563eb;
          overflow: hidden;
          text-align: center;
        }

        .cta-gradient-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
        }

        .cta-content-tu {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 40px;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          color: white;
        }

        .cta-content-tu h2 { font-size: 3rem; margin-bottom: 24px; color: white !important; }
        .cta-content-tu p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 40px; }
        .cta-btns-tu { display: flex; justify-content: center; gap: 20px; }

        @media (max-width: 968px) {
          .hero-grid-v2, .interactive-budget-grid, .product-detail-card-tu { grid-template-columns: 1fr; }
          .specs-grid-tu { grid-template-columns: 1fr 1fr; }
          .catetuang-hero-v2 { padding-top: 120px; }
          .hero-visual-v2 { display: none; }
        }
      `}</style>
    </div>
  )
}

export default CatetUangPage