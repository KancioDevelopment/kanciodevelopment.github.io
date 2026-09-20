import React, { useState, useEffect } from 'react'

import GoogleAdSense from '../components/GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import { useTheme } from '../contexts/ThemeContext'
import './ProductPage.css'
import './PulsaAppPage.css'

interface ProductBrand {
  name: string
  color: string
  sub: string
}

interface ProductCategory {
  id: string
  name: string
  tag: string
  badgeColor: string
  description: string
  brands: ProductBrand[]
  features: string[]
}

const categories: ProductCategory[] = [
  {
    id: 'pulsa',
    name: 'Pulsa & Paket Data',
    tag: 'Semua Operator',
    badgeColor: '#0284c7',
    description:
      'Isi ulang pulsa reguler, paket kuota data internet cepat, paket nelpon & SMS, perpanjangan masa aktif, serta pulsa transfer.',
    brands: [
      { name: 'Telkomsel', color: '#e11d48', sub: 'SimPATI, By.U, Halo' },
      { name: 'Indosat Ooredoo', color: '#eab308', sub: 'IM3, Freedom Data' },
      { name: 'XL Axiata', color: '#2563eb', sub: 'Xtra Combo, Akrab' },
      { name: 'Axis', color: '#9333ea', sub: 'Bronet, Warnet' },
      { name: 'Tri (3)', color: '#ea580c', sub: 'AlwaysOn, Happy' },
      { name: 'Smartfren', color: '#dc2626', sub: 'Kuota Nonstop, Unlimited' },
    ],
    features: [
      'Harga grosir langsung distributor server 1',
      'Auto-detect provider dari 4 digit nomor HP',
      'Tersedia denom mikro Rp 1.000 hingga Rp 1.000.000',
      'Kecepatan kirim 1-5 detik ke penerima',
    ],
  },
  {
    id: 'pln',
    name: 'Token Listrik & PLN',
    tag: '24 Jam Nonstop',
    badgeColor: '#eab308',
    description:
      'Beli token listrik prabayar instan tengah malam, bayar tagihan listrik bulanan, dan proses pembayaran PLN Non-Taglis.',
    brands: [
      { name: 'PLN Prabayar', color: '#eab308', sub: 'Token Listrik 24 Jam' },
      { name: 'PLN Pascabayar', color: '#3b82f6', sub: 'Cek & Bayar Tagihan Bulanan' },
      { name: 'PLN Non-Taglis', color: '#10b981', sub: 'Pasang Baru & Tambah Daya' },
    ],
    features: [
      'Nomor token 20 digit muncul instan di layar',
      'Tersedia tombol copy token & struk PDF',
      'Biaya admin termurah se-Indonesia',
      'Transaksi tetap lancar di jam malam',
    ],
  },
  {
    id: 'emoney',
    name: 'E-Money & Dompet Digital',
    tag: 'Top Up Instan',
    badgeColor: '#10b981',
    description:
      'Top-up saldo dompet digital konsumen dan mitra driver transportasi online terlengkap tanpa biaya admin memberatkan.',
    brands: [
      { name: 'DANA', color: '#0284c7', sub: 'Dompet Digital DANA' },
      { name: 'GoPay & Driver', color: '#10b981', sub: 'Saldo Customer & Mitra' },
      { name: 'OVO Cash', color: '#7c3aed', sub: 'OVO Premier' },
      { name: 'ShopeePay', color: '#ea580c', sub: 'ShopeePay Instant' },
      { name: 'E-Toll & TapCash', color: '#0284c7', sub: 'Mandiri, BRI Brizzi, BNI' },
    ],
    features: [
      'Verifikasi nama akun tujuan otomatis sebelum bayar',
      'Saldo masuk 1-3 detik setelah diverifikasi',
      'Support top up nominal bebas (custom denom)',
      'Cocok untuk layanan loket top-up warung',
    ],
  },
  {
    id: 'game',
    name: 'Voucher & Top-up Game',
    tag: 'Gamer Choice',
    badgeColor: '#ec4899',
    description:
      'Top up diamond, UC, token, dan voucher game favorit dengan harga grosir langsung masuk ke User ID pemain.',
    brands: [
      { name: 'Mobile Legends', color: '#2563eb', sub: 'Diamonds & Twilight Pass' },
      { name: 'Free Fire', color: '#ea580c', sub: 'Diamonds FF & Membership' },
      { name: 'PUBG Mobile', color: '#eab308', sub: 'UC Global & Indo' },
      { name: 'Roblox & Steam', color: '#475569', sub: 'Voucher Digital IDR' },
    ],
    features: [
      'Auto-validasi User ID + Zone ID game',
      'Tersedia paket mingguan & membership pass',
      '100% Legal & aman langsung dari publisher',
      'Server proses 24 jam nonstop',
    ],
  },
]

const denomCatalog = [
  { id: 't1', name: 'Pulsa Telkomsel 5.000', category: 'pulsa', provider: 'Telkomsel', basePrice: 5250, sellPrice: 7000, speed: '1.1s', popular: false },
  { id: 't2', name: 'Pulsa Telkomsel 10.000', category: 'pulsa', provider: 'Telkomsel', basePrice: 10200, sellPrice: 12000, speed: '1.2s', popular: true },
  { id: 't3', name: 'Pulsa Telkomsel 25.000', category: 'pulsa', provider: 'Telkomsel', basePrice: 24850, sellPrice: 27000, speed: '1.2s', popular: false },
  { id: 't4', name: 'Pulsa Telkomsel 50.000', category: 'pulsa', provider: 'Telkomsel', basePrice: 49650, sellPrice: 52000, speed: '1.4s', popular: true },
  { id: 't5', name: 'Pulsa Telkomsel 100.000', category: 'pulsa', provider: 'Telkomsel', basePrice: 98900, sellPrice: 102000, speed: '1.5s', popular: false },

  { id: 'i1', name: 'Indosat Freedom 3GB (5 Hari)', category: 'pulsa', provider: 'Indosat Ooredoo', basePrice: 14500, sellPrice: 17000, speed: '1.3s', popular: false },
  { id: 'i2', name: 'Indosat Pulsa 25.000 Reguler', category: 'pulsa', provider: 'Indosat Ooredoo', basePrice: 24900, sellPrice: 27000, speed: '1.1s', popular: true },

  { id: 'p1', name: 'Token Listrik PLN Rp 20.000', category: 'pln', provider: 'PLN Prabayar', basePrice: 20100, sellPrice: 22500, speed: '1.2s', popular: false },
  { id: 'p2', name: 'Token Listrik PLN Rp 50.000', category: 'pln', provider: 'PLN Prabayar', basePrice: 50150, sellPrice: 52500, speed: '1.3s', popular: true },
  { id: 'p3', name: 'Token Listrik PLN Rp 100.000', category: 'pln', provider: 'PLN Prabayar', basePrice: 100200, sellPrice: 102500, speed: '1.2s', popular: true },
  { id: 'p4', name: 'Token Listrik PLN Rp 200.000', category: 'pln', provider: 'PLN Prabayar', basePrice: 200250, sellPrice: 203000, speed: '1.5s', popular: false },

  { id: 'd1', name: 'Top Up DANA Saldo Rp 20.000', category: 'emoney', provider: 'DANA', basePrice: 20100, sellPrice: 22000, speed: '1.2s', popular: false },
  { id: 'd2', name: 'Top Up DANA Saldo Rp 50.000', category: 'emoney', provider: 'DANA', basePrice: 50100, sellPrice: 52000, speed: '1.3s', popular: true },
  { id: 'd3', name: 'Top Up GoPay Driver/Customer 50rb', category: 'emoney', provider: 'GoPay', basePrice: 50150, sellPrice: 52000, speed: '1.2s', popular: true },
  { id: 'd4', name: 'Top Up ShopeePay Saldo Rp 50.000', category: 'emoney', provider: 'ShopeePay', basePrice: 50100, sellPrice: 52000, speed: '1.4s', popular: false },

  { id: 'g1', name: 'Mobile Legends 86 Diamonds', category: 'game', provider: 'Mobile Legends', basePrice: 19800, sellPrice: 23000, speed: '1.5s', popular: true },
  { id: 'g2', name: 'Mobile Legends 172 Diamonds', category: 'game', provider: 'Mobile Legends', basePrice: 39500, sellPrice: 45000, speed: '1.6s', popular: false },
  { id: 'g3', name: 'Free Fire 140 Diamonds', category: 'game', provider: 'Free Fire', basePrice: 18500, sellPrice: 22000, speed: '1.4s', popular: true },
  { id: 'g4', name: 'Weekly Diamond Pass MLBB', category: 'game', provider: 'Mobile Legends', basePrice: 27500, sellPrice: 32000, speed: '1.2s', popular: true },
]

const depositChannels = [
  { name: 'QRIS 24 Jam Instan', desc: 'Scan dari GoPay, OVO, DANA, BCA, Mandiri dll.', fee: 'Bebas Admin', status: 'Online 24/7' },
  { name: 'Virtual Account BCA', desc: 'Verifikasi instan tanpa perlu unggah bukti struk.', fee: 'Otomatis', status: 'Online 24/7' },
  { name: 'Virtual Account Mandiri / BRI / BNI', desc: 'Dukungan seluruh bank nasional & ATM Bersama.', fee: 'Otomatis', status: 'Online 24/7' },
  { name: 'Saldo Kancio Terpadu', desc: 'Integrasi saldo instan antar layanan Kancio.', fee: '0% Biaya', status: 'Instant Sync' },
]

const faqs = [
  {
    question: 'Berapa lama waktu yang dibutuhkan untuk transaksi pulsa atau token?',
    answer:
      'Transaksi diproses secara otomatis oleh server super cepat kami dalam 1 hingga 5 detik setelah pembayaran terverifikasi.',
  },
  {
    question: 'Metode pembayaran apa saja yang didukung untuk deposit saldo?',
    answer:
      'Mendukung QRIS 24 Jam (GoPay, OVO, DANA, ShopeePay, LinkAja, BCA, Mandiri), Saldo Dompet Kancio bebas biaya admin, serta Virtual Account Bank Nasional (BCA, Mandiri, BRI, BNI, Permata).',
  },
  {
    question: 'Apakah saya bisa mencetak struk transaksi dengan printer Bluetooth kasir?',
    answer:
      'Ya! PulsaApp mendukung cetak struk via Thermal Printer Bluetooth 58mm & 80mm, serta ekspor file struk digital format PDF dan kirim langsung ke WhatsApp pelanggan.',
  },
  {
    question: 'Bagaimana jika transaksi mengalami gangguan dari pihak provider?',
    answer:
      'Sistem dilengkapi fitur Auto-Fallback dan Auto-Refund instan. Jika provider induk sedang gangguan, saldo akun Anda akan dikembalikan secara otomatis 100% tanpa potongan.',
  },
]

const PulsaAppPage: React.FC = () => {
  const { userConsent } = useAds()
  const { isDarkMode, toggleTheme } = useTheme()
  const [activeCategory, setActiveCategory] = useState('pulsa')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Interactive Margin Calculator State
  const [simProduct, setSimProduct] = useState('Pulsa Telkomsel 50.000')
  const [basePrice, setBasePrice] = useState(49650)
  const [sellPrice, setSellPrice] = useState(52000)
  const [dailyTrx, setDailyTrx] = useState(35)
  const [simCheckoutDone, setSimCheckoutDone] = useState(false)
  const [copiedProfit, setCopiedProfit] = useState(false)

  // Thermal Struk 58mm Generator State
  const [strukStore, setStrukStore] = useState('BERKAH CELLULAR PPOB')
  const [strukPhone, setStrukPhone] = useState('0812-9876-5432')
  const [strukProductType, setStrukProductType] = useState<'PLN' | 'PULSA' | 'DANA'>('PLN')
  const [strukAdmin, setStrukAdmin] = useState(2500)
  const [strukCopied, setStrukCopied] = useState(false)
  const [strukPrinted, setStrukPrinted] = useState(false)

  // Live Denom Catalog Filter State
  const [denomCategory, setDenomCategory] = useState<string>('all')
  const [denomSearch, setDenomSearch] = useState<string>('')

  // Lead / Partnership Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    businessType: 'Konter Pulsa / Toko',
    serviceInterest: 'Pulsa & Paket Data',
    notes: '',
  })
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  // Calculations
  const profitPerTrx = Math.max(0, sellPrice - basePrice)
  const monthlyEstimatedProfit = profitPerTrx * dailyTrx * 30

  const getProfitTier = (monthly: number) => {
    if (monthly >= 6000000) {
      return { label: 'Level 4: Master PPOB Super', color: '#ec4899', desc: 'Volume transaksi tinggi dengan margin bulanan kuat. Sangat potensial untuk rekrut kasir atau buka gerai tambahan.' }
    }
    if (monthly >= 3500000) {
      return { label: 'Level 3: Juragan Pulsa & Token', color: '#f59e0b', desc: 'Perputaran kas stabil setiap hari, mampu menjadi pilar penghasilan utama toko / warung Anda.' }
    }
    if (monthly >= 1500000) {
      return { label: 'Level 2: Agen Berkembang', color: '#06b6d4', desc: 'Tambahan omzet toko yang menarik untuk menutup biaya operasional dan listrik bulanan.' }
    }
    return { label: 'Level 1: Konter Pemula', color: '#10b981', desc: 'Awal langkah bisnis yang menjanjikan dengan modal sangat terjangkau.' }
  }

  const currentTier = getProfitTier(monthlyEstimatedProfit)

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSimProduct(val)
    if (val.includes('Pulsa Telkomsel 50.000')) {
      setBasePrice(49650)
      setSellPrice(52000)
    } else if (val.includes('Token PLN 100.000')) {
      setBasePrice(100200)
      setSellPrice(103000)
    } else if (val.includes('Topup DANA 50.000')) {
      setBasePrice(50100)
      setSellPrice(52000)
    } else if (val.includes('Mobile Legends 86 Diamonds')) {
      setBasePrice(19800)
      setSellPrice(23000)
    }
  }

  const handleCopyProfit = () => {
    const text = `Proyeksi Keuntungan PulsaApp:\n- Produk: ${simProduct}\n- Transaksi: ${dailyTrx} trx/hari (~${(dailyTrx * 30).toLocaleString('id-ID')} trx/bulan)\n- Margin/trx: Rp ${profitPerTrx.toLocaleString('id-ID')}\n- Estimasi Laba Bersih: Rp ${monthlyEstimatedProfit.toLocaleString('id-ID')}/bulan\n\nCek server pulsa murah 24 jam di https://ppob.kancio.com/`
    navigator.clipboard?.writeText(text)
    setCopiedProfit(true)
    setTimeout(() => setCopiedProfit(false), 3000)
  }

  const handleCopyStruk = () => {
    const dateStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    let text = `================================\n       ${strukStore}\n  Jl. Niaga Utama No. 88, Indo\n================================\nTanggal : ${dateStr} ${timeStr}\nNo. Trx : TRX-89127391\nNo. HP  : ${strukPhone}\n`
    if (strukProductType === 'PLN') {
      text += `Produk  : TOKEN LISTRIK 100.000\nIDPEL   : 5312-8819-2041\nNama    : BPK. SUTRISNO\nTarif/D : R1M / 900 VA\n--------------------------------\nTOKEN : 3819-4820-9182-0471\n--------------------------------\nNominal : Rp 100.000\nAdmin   : Rp ${strukAdmin.toLocaleString('id-ID')}\nTOTAL   : Rp ${(100000 + strukAdmin).toLocaleString('id-ID')}\n`
    } else if (strukProductType === 'PULSA') {
      text += `Produk  : TELKOMSEL 50.000 REG\nSN      : 48192019481029481\n--------------------------------\nNominal : Rp 50.000\nAdmin   : Rp ${strukAdmin.toLocaleString('id-ID')}\nTOTAL   : Rp ${(52000 + strukAdmin).toLocaleString('id-ID')}\n`
    } else {
      text += `Produk  : TOP UP SALDO DANA 50.000\nRef     : DANA-77182930\n--------------------------------\nNominal : Rp 50.000\nAdmin   : Rp ${strukAdmin.toLocaleString('id-ID')}\nTOTAL   : Rp ${(52000 + strukAdmin).toLocaleString('id-ID')}\n`
    }
    text += `Status  : LUNAS / SUKSES\n================================\n Terima kasih telah bertransaksi!\n   Struk ini adalah bukti sah\n================================`
    navigator.clipboard?.writeText(text)
    setStrukCopied(true)
    setTimeout(() => setStrukCopied(false), 3000)
  }

  const handlePrintSimulation = () => {
    setStrukPrinted(true)
    setTimeout(() => setStrukPrinted(false), 3500)
  }

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name) return

    const waMsg = encodeURIComponent(
      `Halo Tim PulsaApp Kancio,\n\nSaya ingin mendaftar kemitraan agen / integrasi PPOB:\n- Nama: ${leadForm.name}\n- Bisnis: ${leadForm.businessType}\n- Layanan Diminati: ${leadForm.serviceInterest}\n- Catatan: ${leadForm.notes || 'Mohon info aktivasi saldo & harga modal.'}`
    )
    window.open(`https://wa.me/6282325600996?text=${waMsg}`, '_blank')
    setLeadSubmitted(true)
  }

  const filteredDenoms = denomCatalog.filter((item) => {
    const matchCat = denomCategory === 'all' || item.category === denomCategory
    const matchSearch =
      item.name.toLowerCase().includes(denomSearch.toLowerCase()) ||
      item.provider.toLowerCase().includes(denomSearch.toLowerCase())
    return matchCat && matchSearch
  })

  useSEO({
    title: 'PulsaApp SaaS - Distributor Agen Pulsa Murah 24 Jam & PPOB Terlengkap',
    description:
      'Platform distributor agen pulsa termurah dan server PPOB 24 jam nonstop: token PLN, paket data kuota, e-money, voucher game, dan eSIM global dengan kecepatan transaksi 1-5 detik.',
    keywords:
      'pulsa murah, agen pulsa murah, server pulsa termurah, token listrik 24 jam, aplikasi ppob terbaik, distributor pulsa h2h, pulsaapp, kancio ppob',
    canonicalUrl: 'https://kancio.com/products/pulsaapp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'PulsaApp',
          operatingSystem: 'Android, Web Browser, iOS',
          applicationCategory: 'FinanceApplication',
          url: 'https://ppob.kancio.com',
          description: 'Aplikasi Agen Pulsa Termurah & Server PPOB Terlengkap 24 Jam',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'IDR',
            lowPrice: '0',
            highPrice: '399000',
            offerCount: '3',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Kancio Development',
            url: 'https://kancio.com',
          },
        },
      ],
    },
  })

  return (
    <div className={`product-page pulsa-page ${isDarkMode ? 'pulsa-theme-dark' : 'pulsa-theme-light'}`}>
      {/* ===== HERO SECTION ===== */}
      <section className="pulsa-hero" id="overview">
        <div className="pulsa-bg-glow" />
        <div className="pulsa-grid-pattern" />

        <div className="container">
          <div className="pulsa-hero__content">
            <div className="pulsa-eyebrow">
              <span className="pulsa-badge-pulse">
                <span className="pulse-cyan" /> 24/7 TRANSACTION ENGINE
              </span>
              <span className="pulsa-tag-pill">Server Pulsa &amp; PPOB Terlengkap</span>

              {/* Adaptive Light/Dark Theme Switch */}
              <button
                className="pulsa-theme-btn"
                onClick={toggleTheme}
                title={`Ganti ke ${isDarkMode ? 'Mode Terang' : 'Mode Gelap'}`}
                aria-label={`Beralih ke ${isDarkMode ? 'Mode Terang' : 'Mode Gelap'}`}
              >
                {isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
              </button>
            </div>

            <h1 className="pulsa-hero__title">
              Pusat Pulsa Murah &amp; PPOB <br />
              <span className="text-gradient-cyan">Kecepatan Transaksi 1-5 Detik</span>
            </h1>

            <p className="pulsa-hero__desc">
              Solusi bisnis pembayaran digital terlengkap untuk konter pulsa, warung, loket PPOB, hingga integrasi API H2H developer. Dapatkan harga modal distributor langsung dengan jaminan uptime 99.9%.
            </p>

            <div className="pulsa-hero__stats glass-card">
              <div className="stat-item">
                <strong>1-5 Detik</strong>
                <span>Auto Transaksi Kilat</span>
              </div>
              <div className="stat-item">
                <strong>1.000+</strong>
                <span>Produk Digital Aktif</span>
              </div>
              <div className="stat-item">
                <strong>Auto QRIS</strong>
                <span>Deposit Instan 24 Jam</span>
              </div>
              <div className="stat-item">
                <strong>Struk Custom</strong>
                <span>Support Bluetooth Print</span>
              </div>
            </div>

            <div className="pulsa-hero__cta">
              <a
                href="https://ppob.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary pulsa-btn-primary"
              >
                Pelajari Lebih Lanjut di Web App PulsaApp <span className="btn__icon">↗</span>
              </a>
              <a href="#simulator" className="btn btn--secondary pulsa-btn-secondary">
                Simulasi Keuntungan
              </a>
              <a href="#struk-printer" className="btn btn--outline pulsa-btn-outline">
                Simulator Struk Kasir
              </a>
            </div>
          </div>

          {/* Hero Visual Live Transaction Frame */}
          <div className="pulsa-hero__visual">
            <div className="pulsa-mockup-frame glass-card">
              <div className="mockup-top-bar">
                <div className="window-dots">
                  <span className="w-dot dot-red" />
                  <span className="w-dot dot-yellow" />
                  <span className="w-dot dot-green" />
                </div>
                <a
                  href="https://ppob.kancio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-title-text"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  title="Pelajari lebih lanjut & buka portal https://ppob.kancio.com/"
                >
                  PulsaApp Engine — ppob.kancio.com ↗
                </a>
                <span className="live-status-tag">● 24 Jam Aktif</span>
              </div>

              <div className="mockup-body-pulsa">
                <div className="live-trx-stream-card">
                  <div className="stream-header-pulsa">
                    <span>Live Transaction Stream</span>
                    <span className="speed-badge">Avg 1.8s</span>
                  </div>

                  <div className="trx-stream-item">
                    <span className="trx-prov-badge prov-tsel">TSEL</span>
                    <div className="trx-stream-info">
                      <strong>Pulsa Reguler 25.000</strong>
                      <span>0812-4912-XXXX • Selesai 1.2s</span>
                    </div>
                    <span className="trx-status-ok">✓ Sukses</span>
                  </div>

                  <div className="trx-stream-item">
                    <span className="trx-prov-badge prov-pln">PLN</span>
                    <div className="trx-stream-info">
                      <strong>Token Listrik Rp 100.000</strong>
                      <span>IDPEL: 53120984XXXX • Token Generated</span>
                    </div>
                    <span className="trx-status-ok">✓ Sukses</span>
                  </div>

                  <div className="trx-stream-item">
                    <span className="trx-prov-badge prov-dana">DANA</span>
                    <div className="trx-stream-info">
                      <strong>Top Up DANA Rp 50.000</strong>
                      <span>0857-9021-XXXX • Auto Validated</span>
                    </div>
                    <span className="trx-status-ok">✓ Sukses</span>
                  </div>
                </div>

                <div className="qris-instant-box">
                  <div className="qris-icon-badge">QRIS</div>
                  <div className="qris-text">
                    <strong>QRIS Dynamic &amp; VA Otomatis</strong>
                    <span>Deposit saldo langsung masuk tanpa perlu konfirmasi manual admin.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STICKY IN-PAGE NAVIGATION BAR ===== */}
      <nav className="pulsa-inpage-nav" aria-label="Navigasi Halaman PulsaApp">
        <div className="container pulsa-inpage-nav__inner">
          <a href="#overview" className="inpage-nav-pill">Ringkasan</a>
          <a href="#simulator" className="inpage-nav-pill">Hitung Margin</a>
          <a href="#struk-printer" className="inpage-nav-pill">Cetak Struk</a>
          <a href="#katalog-harga" className="inpage-nav-pill">Cek Harga Denom</a>
          <a href="#kategori" className="inpage-nav-pill">Katalog Produk</a>
          <a href="#deposit-metode" className="inpage-nav-pill">Jalur Deposit</a>
          <a href="#lead-form" className="inpage-nav-pill">Kemitraan</a>
          <a href="#faq" className="inpage-nav-pill">FAQ</a>
        </div>
      </nav>

      {/* ===== ADVERTISEMENT ===== */}
      <div className="content-break-ad">
        <GoogleAdSense
          userConsent={userConsent}
          unitType="display"
          variant="minimal"
          adLabel="Advertisement"
          showLoadingAnimation={true}
          className="product-page-ad"
        />
      </div>

      {/* ===== INTERACTIVE PROFIT MARGIN CALCULATOR SIMULATOR ===== */}
      <section className="section pulsa-simulator-section" id="simulator">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Live Profit Simulator</div>
            <h2>
              Hitung Potensi Keuntungan <br />
              <span className="text-gradient-cyan">Bisnis Konter &amp; Agen PPOB Anda</span>
            </h2>
            <p>
              Sesuaikan harga jual dan estimasi volume transaksi harian untuk melihat proyeksi keuntungan bulanan Anda bersama PulsaApp.
            </p>
          </div>

          <div className="simulator-box-pulsa glass-card">
            <div className="sim-pulsa-grid">
              {/* Left Column: Product Selection & Controls */}
              <div className="sim-pulsa-controls">
                <h3 className="sim-title">Parameter Simulasi Margin</h3>

                <div className="form-group">
                  <label>Pilih Produk Contoh</label>
                  <select value={simProduct} onChange={handleProductChange}>
                    <option value="Pulsa Telkomsel 50.000">Pulsa Telkomsel 50.000</option>
                    <option value="Token PLN 100.000">Token PLN 100.000</option>
                    <option value="Topup DANA 50.000">Top Up DANA 50.000</option>
                    <option value="Mobile Legends 86 Diamonds">Mobile Legends 86 Diamonds</option>
                  </select>
                </div>

                <div className="price-inputs-row">
                  <div className="form-group">
                    <label>Harga Modal Distributor (Rp)</label>
                    <input type="number" readOnly value={basePrice} className="readonly-input" />
                  </div>

                  <div className="form-group">
                    <label>Harga Jual ke Konsumen (Rp)</label>
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="slider-label-row">
                    <label>
                      Estimasi Transaksi Harian: <strong>{dailyTrx} Trx / Hari</strong>
                    </label>
                    <span className="sub-calc-hint">~{(dailyTrx * 30).toLocaleString('id-ID')} trx / bulan</span>
                  </div>

                  <input
                    type="range"
                    min={5}
                    max={150}
                    step={5}
                    value={dailyTrx}
                    onChange={(e) => setDailyTrx(Number(e.target.value))}
                    className="slider-input"
                    aria-label="Estimasi transaksi harian"
                  />
                  <div className="slider-labels">
                    <span>5 Trx</span>
                    <span>50 Trx</span>
                    <span>100 Trx</span>
                    <span>150 Trx</span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="preset-buttons-row">
                    <span className="preset-title">Pilihan Cepat:</span>
                    {[15, 35, 75, 120].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`preset-chip ${dailyTrx === num ? 'preset-chip--active' : ''}`}
                        onClick={() => setDailyTrx(num)}
                      >
                        {num} trx/hari
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn--primary pulsa-btn-primary btn-block"
                  onClick={() => setSimCheckoutDone(!simCheckoutDone)}
                >
                  {simCheckoutDone ? 'Reset Simulasi Transaksi' : 'Uji Simulasi Transaksi 1-Detik'}
                </button>

                {simCheckoutDone && (
                  <div className="mock-receipt-card animate-fade-in">
                    <div className="receipt-header">
                      <span>✓ Transaksi Sukses #TRX-88219</span>
                      <span className="text-cyan">1.4 detik</span>
                    </div>
                    <div className="receipt-details">
                      <span>Produk: <strong>{simProduct}</strong></span>
                      <span>Harga Modal: Rp {basePrice.toLocaleString('id-ID')}</span>
                      <span>Harga Jual: Rp {sellPrice.toLocaleString('id-ID')}</span>
                      <span className="text-emerald">Laba Bersih Transaksi: <strong>+Rp {profitPerTrx.toLocaleString('id-ID')}</strong></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Profit Overview Display */}
              <div className="sim-pulsa-results">
                <div className="profit-spotlight-card">
                  <div className="tier-badge-pill" style={{ borderColor: currentTier.color, color: currentTier.color }}>
                    {currentTier.label}
                  </div>
                  <span className="profit-title">Proyeksi Keuntungan Bersih Bulanan</span>
                  <div className="profit-big-number">
                    Rp {monthlyEstimatedProfit.toLocaleString('id-ID')}
                    <span className="per-month">/ bulan</span>
                  </div>
                  <p className="profit-note">
                    {currentTier.desc}
                  </p>

                  <div className="profit-action-buttons">
                    <button
                      type="button"
                      className="btn btn--outline copy-profit-btn"
                      onClick={handleCopyProfit}
                    >
                      {copiedProfit ? '✓ Rangkuman Berhasil Disalin!' : 'Salin Rangkuman Proyeksi'}
                    </button>
                  </div>
                </div>

                <div className="profit-breakdown-grid">
                  <div className="break-card">
                    <span className="b-lbl">Margin Keuntungan Per Transaksi</span>
                    <strong className="text-emerald">Rp {profitPerTrx.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="break-card">
                    <span className="b-lbl">Estimasi Transaksi Per Bulan</span>
                    <strong className="text-cyan">{(dailyTrx * 30).toLocaleString('id-ID')} Trx</strong>
                  </div>
                  <div className="break-card">
                    <span className="b-lbl">Potensi Tambahan Bonus Pasif</span>
                    <strong className="text-amber">+ Rp {(dailyTrx * 30 * 50).toLocaleString('id-ID')}</strong>
                  </div>
                </div>

                <div className="sim-callout-box">
                  <em>Semakin banyak variasi produk yang Anda jual (Token PLN, Pulsa, E-Money, Game), semakin tinggi perputaran laba harian Anda.</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE THERMAL RECEIPT 58MM GENERATOR ===== */}
      <section className="section pulsa-receipt-section" id="struk-printer">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Fitur Favorit Konter &amp; Toko</div>
            <h2>
              Simulator Cetak Struk Kasir Bluetooth <br />
              <span className="text-gradient-cyan">Thermal 58mm &amp; Struk WhatsApp Digital</span>
            </h2>
            <p>
              Uji langsung fleksibilitas cetak struk PulsaApp. Anda bebas menentukan nama konter, alamat toko, nomor kontak, serta margin biaya admin pelanggan.
            </p>
          </div>

          <div className="struk-simulator-container glass-card">
            <div className="struk-sim-grid">
              {/* Controls Column */}
              <div className="struk-sim-controls">
                <h3 className="sim-title">Kustomisasi Format Struk</h3>

                <div className="form-group">
                  <label htmlFor="strukStoreInput">Nama Konter / Toko Anda</label>
                  <input
                    id="strukStoreInput"
                    type="text"
                    value={strukStore}
                    onChange={(e) => setStrukStore(e.target.value.toUpperCase())}
                    placeholder="Contoh: BERKAH CELLULAR PPOB"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="strukPhoneInput">Nomor Tujuan / ID Pelanggan</label>
                  <input
                    id="strukPhoneInput"
                    type="text"
                    value={strukPhone}
                    onChange={(e) => setStrukPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Pilihan Produk Struk</label>
                    <select
                      value={strukProductType}
                      onChange={(e) => setStrukProductType(e.target.value as 'PLN' | 'PULSA' | 'DANA')}
                    >
                      <option value="PLN">Token PLN Rp 100.000</option>
                      <option value="PULSA">Pulsa Telkomsel 50.000</option>
                      <option value="DANA">Top Up DANA 50.000</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Biaya Admin Kasir</label>
                    <select
                      value={strukAdmin}
                      onChange={(e) => setStrukAdmin(Number(e.target.value))}
                    >
                      <option value={1500}>Rp 1.500</option>
                      <option value={2000}>Rp 2.000</option>
                      <option value={2500}>Rp 2.500</option>
                      <option value={3000}>Rp 3.000</option>
                    </select>
                  </div>
                </div>

                <div className="struk-actions-row">
                  <button
                    type="button"
                    className="btn btn--primary pulsa-btn-primary"
                    onClick={handlePrintSimulation}
                  >
                    {strukPrinted ? 'Sedang Mencetak...' : 'Simulasi Cetak Struk 58mm'}
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary pulsa-btn-secondary"
                    onClick={handleCopyStruk}
                  >
                    {strukCopied ? '✓ Teks Struk Berhasil Disalin!' : 'Salin Format Struk WA'}
                  </button>
                </div>

                <div className="struk-printer-compat">
                  <span>Dukungan Printer Kasir:</span>
                  <div className="printer-tags">
                    <span className="p-tag">Mini Bluetooth 58mm</span>
                    <span className="p-tag">Thermal 80mm</span>
                    <span className="p-tag">PDF Share WhatsApp</span>
                    <span className="p-tag">ESC/POS Standard</span>
                  </div>
                </div>
              </div>

              {/* Visual Thermal Paper Mockup Column */}
              <div className="struk-sim-preview">
                <div className={`thermal-paper-wrapper ${strukPrinted ? 'printing-animation' : ''}`}>
                  <div className="paper-tear-top" />
                  <div className="thermal-paper">
                    <div className="paper-header">
                      <div className="paper-store-name">{strukStore || 'NAMA KONTER ANDA'}</div>
                      <div className="paper-store-sub">LAYANAN PEMBAYARAN ELEKTRONIK &amp; PPOB</div>
                      <div className="paper-store-sub">JL. NIAGA UTAMA NO. 88, INDONESIA</div>
                      <div className="paper-divider">================================</div>
                    </div>

                    <div className="paper-body">
                      <div className="paper-row">
                        <span>WAKTU</span>
                        <span>20/09/2026 06:30</span>
                      </div>
                      <div className="paper-row">
                        <span>NO. TRX</span>
                        <span>TRX-948102</span>
                      </div>
                      <div className="paper-row">
                        <span>NO. TUJUAN</span>
                        <span>{strukPhone || '0812-XXXX-XXXX'}</span>
                      </div>

                      {strukProductType === 'PLN' && (
                        <>
                          <div className="paper-row">
                            <span>PRODUK</span>
                            <span>TOKEN PLN 100K</span>
                          </div>
                          <div className="paper-row">
                            <span>IDPEL</span>
                            <span>5312-8819-2041</span>
                          </div>
                          <div className="paper-row">
                            <span>NAMA</span>
                            <span>BPK. SUTRISNO</span>
                          </div>
                          <div className="paper-row">
                            <span>TARIF/DAYA</span>
                            <span>R1M / 900 VA</span>
                          </div>
                          <div className="paper-divider">--------------------------------</div>
                          <div className="paper-token-box">
                            <span className="token-lbl">NOMOR TOKEN LISTRIK 20 DIGIT:</span>
                            <strong className="token-num">3819 - 4820 - 9182 - 0471</strong>
                          </div>
                          <div className="paper-divider">--------------------------------</div>
                          <div className="paper-row">
                            <span>NOMINAL</span>
                            <span>Rp 100.000</span>
                          </div>
                          <div className="paper-row">
                            <span>ADMIN KASIR</span>
                            <span>Rp {strukAdmin.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="paper-row paper-total">
                            <span>TOTAL BAYAR</span>
                            <span>Rp {(100000 + strukAdmin).toLocaleString('id-ID')}</span>
                          </div>
                        </>
                      )}

                      {strukProductType === 'PULSA' && (
                        <>
                          <div className="paper-row">
                            <span>PRODUK</span>
                            <span>TELKOMSEL 50.000</span>
                          </div>
                          <div className="paper-row">
                            <span>SN NUMBER</span>
                            <span>48192019481029</span>
                          </div>
                          <div className="paper-divider">--------------------------------</div>
                          <div className="paper-row">
                            <span>HARGA PULSA</span>
                            <span>Rp 52.000</span>
                          </div>
                          <div className="paper-row">
                            <span>ADMIN KASIR</span>
                            <span>Rp {strukAdmin.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="paper-row paper-total">
                            <span>TOTAL BAYAR</span>
                            <span>Rp {(52000 + strukAdmin).toLocaleString('id-ID')}</span>
                          </div>
                        </>
                      )}

                      {strukProductType === 'DANA' && (
                        <>
                          <div className="paper-row">
                            <span>PRODUK</span>
                            <span>TOP UP DANA 50.000</span>
                          </div>
                          <div className="paper-row">
                            <span>REF BANK</span>
                            <span>DANA-77182930</span>
                          </div>
                          <div className="paper-divider">--------------------------------</div>
                          <div className="paper-row">
                            <span>SALDO MASUK</span>
                            <span>Rp 50.000</span>
                          </div>
                          <div className="paper-row">
                            <span>ADMIN KASIR</span>
                            <span>Rp {strukAdmin.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="paper-row paper-total">
                            <span>TOTAL BAYAR</span>
                            <span>Rp {(52000 + strukAdmin).toLocaleString('id-ID')}</span>
                          </div>
                        </>
                      )}

                      <div className="paper-divider">================================</div>
                      <div className="paper-status">STATUS : SUKSES / LUNAS</div>
                      <div className="paper-barcode-sim">||||| | |||| || |||||| | |||||</div>
                      <div className="paper-footer-msg">
                        TERIMA KASIH ATAS KUNJUNGAN ANDA<br />
                        STRUK INI MERUPAKAN BUKTI TRANSAKSI SAH
                      </div>
                    </div>
                  </div>
                  <div className="paper-tear-bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REAL-TIME DENOM PRICE CHECKER ===== */}
      <section className="section pulsa-denom-section" id="katalog-harga">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Transparansi Modal Distributor</div>
            <h2>
              Cek Harga Modal Real-Time <br />
              <span className="text-gradient-cyan">Bandingkan Potensi Margin Penjualan</span>
            </h2>
            <p>
              Dapatkan harga langsung dari server distributor tingkat satu tanpa perantara. Margin tebal untuk keuntungan maksimal usaha Anda.
            </p>
          </div>

          <div className="denom-checker-box glass-card">
            {/* Filter & Search Bar */}
            <div className="denom-toolbar">
              <div className="denom-cat-pills">
                <button
                  type="button"
                  className={`denom-pill ${denomCategory === 'all' ? 'denom-pill--active' : ''}`}
                  onClick={() => setDenomCategory('all')}
                >
                  Semua Produk
                </button>
                <button
                  type="button"
                  className={`denom-pill ${denomCategory === 'pulsa' ? 'denom-pill--active' : ''}`}
                  onClick={() => setDenomCategory('pulsa')}
                >
                  Pulsa &amp; Data
                </button>
                <button
                  type="button"
                  className={`denom-pill ${denomCategory === 'pln' ? 'denom-pill--active' : ''}`}
                  onClick={() => setDenomCategory('pln')}
                >
                  Token PLN
                </button>
                <button
                  type="button"
                  className={`denom-pill ${denomCategory === 'emoney' ? 'denom-pill--active' : ''}`}
                  onClick={() => setDenomCategory('emoney')}
                >
                  E-Money
                </button>
                <button
                  type="button"
                  className={`denom-pill ${denomCategory === 'game' ? 'denom-pill--active' : ''}`}
                  onClick={() => setDenomCategory('game')}
                >
                  Voucher Game
                </button>
              </div>

              <div className="denom-search-input">
                <input
                  type="text"
                  placeholder="Cari produk (misal: Telkomsel, PLN, DANA)..."
                  value={denomSearch}
                  onChange={(e) => setDenomSearch(e.target.value)}
                  aria-label="Cari produk denom"
                />
              </div>
            </div>

            {/* Denom Table Grid */}
            <div className="denom-table-wrapper">
              <table className="denom-table">
                <thead>
                  <tr>
                    <th>Nama Produk &amp; Provider</th>
                    <th>Harga Modal</th>
                    <th>Rekomendasi Jual</th>
                    <th>Potensi Margin</th>
                    <th>Kecepatan</th>
                    <th>Status Server</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDenoms.map((item) => {
                    const margin = item.sellPrice - item.basePrice
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="denom-prod-cell">
                            <strong>{item.name}</strong>
                            <span className="denom-provider-tag">{item.provider}</span>
                            {item.popular && <span className="denom-popular-badge">Populer</span>}
                          </div>
                        </td>
                        <td className="denom-price-base">Rp {item.basePrice.toLocaleString('id-ID')}</td>
                        <td className="denom-price-sell">Rp {item.sellPrice.toLocaleString('id-ID')}</td>
                        <td>
                          <span className="denom-margin-badge">+Rp {margin.toLocaleString('id-ID')}</span>
                        </td>
                        <td>
                          <span className="denom-speed">{item.speed}</span>
                        </td>
                        <td>
                          <span className="denom-status-badge">● Aktif 24 Jam</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES SHOWCASE ===== */}
      <section className="section pulsa-categories-section" id="kategori">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">1.000+ Produk Digital</div>
            <h2>
              Semua Kategori Produk,{' '}
              <span className="text-gradient-cyan">Harga Grosir Paling Bersaing</span>
            </h2>
            <p>Pilih kategori produk digital untuk melihat daftar provider dan fitur unggulannya.</p>
          </div>

          {/* Category Tabs */}
          <div className="pulsa-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-tab-btn ${activeCategory === cat.id ? 'cat-tab-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Active Category Details */}
          {categories
            .filter((cat) => cat.id === activeCategory)
            .map((cat) => (
              <div key={cat.id} className="category-detail-card glass-card animate-fade-in">
                <div className="cat-detail-header">
                  <div className="cat-title-wrap">
                    <div>
                      <h3>{cat.name}</h3>
                      <p>{cat.description}</p>
                    </div>
                  </div>
                  <span className="cat-tag-badge">{cat.tag}</span>
                </div>

                <div className="cat-brands-grid">
                  {cat.brands.map((brand, idx) => (
                    <div key={idx} className="brand-chip">
                      <div className="brand-info">
                        <strong>{brand.name}</strong>
                        <span>{brand.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cat-features-list">
                  <span className="feat-title">Keunggulan Transaksi:</span>
                  <div className="feat-chips-wrap">
                    {cat.features.map((feat, idx) => (
                      <span key={idx} className="feat-chip-item">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ===== DEPOSIT CHANNELS & PAYMENT GATEWAY SHOWCASE ===== */}
      <section className="section pulsa-deposit-section" id="deposit-metode">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Kemudahan Pengisian Saldo</div>
            <h2>
              Deposit Saldo Instan 24 Jam <br />
              <span className="text-gradient-cyan">Tanpa Perlu Konfirmasi Manual</span>
            </h2>
            <p>
              Saldo masuk secara otomatis dalam 1-3 detik setelah pembayaran berhasil. Mendukung QRIS seluruh dompet digital dan Virtual Account Bank Nasional.
            </p>
          </div>

          <div className="deposit-channels-grid">
            {depositChannels.map((channel, idx) => (
              <div key={idx} className="deposit-card glass-card">
                <div className="deposit-card__header">
                  <span className="deposit-fee-tag">{channel.fee}</span>
                </div>
                <h4>{channel.name}</h4>
                <p>{channel.desc}</p>
                <div className="deposit-card__status">
                  <span className="status-dot-green" /> {channel.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEAD CAPTURE & PARTNERSHIP FORM ===== */}
      <section className="section pulsa-lead-section" id="lead-form">
        <div className="container">
          <div className="lead-card glass-card">
            <div className="lead-grid">
              <div className="lead-intro">
                <div className="pulsa-badge-pulse">Kemitraan Resmi</div>
                <h2>Daftar Jadi Agen &amp; Mitra PulsaApp</h2>
                <p>
                  Dapatkan bimbingan setup, aktivasi deposit kilat, dan harga modal terendah langsung dari distributor server 1 Kancio.
                </p>

                <div className="lead-benefits">
                  <div className="benefit-row">
                    <span className="b-check">✓</span>
                    <div>
                      <strong>Aktivasi Akun Instan</strong>
                      <span>Langsung bisa transaksi dalam 5 menit setelah registrasi.</span>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <span className="b-check">✓</span>
                    <div>
                      <strong>Bebas Biaya Pendaftaran</strong>
                      <span>Tidak ada biaya keanggotaan tersembunyi untuk paket Basic.</span>
                    </div>
                  </div>
                  <div className="benefit-row">
                    <span className="b-check">✓</span>
                    <div>
                      <strong>Customer Support WhatsApp 24 Jam</strong>
                      <span>Bantuan kendala transaksi &amp; deposit dipandu ramah.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lead-form-wrap">
                {leadSubmitted ? (
                  <div className="lead-success-card animate-fade-in">
                    <div className="success-badge">✓</div>
                    <h3>Pendaftaran Diterima!</h3>
                    <p>
                      Terima kasih! Kami telah mengarahkan Anda ke WhatsApp Customer Support PulsaApp. Tim kami siap mengaktifkan akun dan memandu pengisian saldo awal Anda.
                    </p>
                    <button
                      className="btn btn--secondary pulsa-btn-secondary"
                      onClick={() => setLeadSubmitted(false)}
                    >
                      Kirim Data Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="lead-form-inner">
                    <h3 className="form-head">Formulir Kemitraan Agen</h3>

                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Hendra Wijaya"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Tipe Usaha</label>
                        <select
                          value={leadForm.businessType}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, businessType: e.target.value })
                          }
                        >
                          <option value="Konter Pulsa / Toko HP">Konter Pulsa / Toko HP</option>
                          <option value="Warung / Toko Kelontong">Warung / Toko Kelontong</option>
                          <option value="Loket PPOB / Agen Tagihan">Loket PPOB / Tagihan</option>
                          <option value="Pengguna Pribadi">Pengguna Pribadi</option>
                          <option value="Developer / Platform H2H">Developer / Platform H2H</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Layanan Diminati</label>
                        <select
                          value={leadForm.serviceInterest}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, serviceInterest: e.target.value })
                          }
                        >
                          <option value="Pulsa & Paket Data">Pulsa &amp; Paket Data</option>
                          <option value="Token Listrik PLN">Token Listrik PLN</option>
                          <option value="Top Up E-Money & Games">Top Up E-Money &amp; Games</option>
                          <option value="Integrasi API H2H">Integrasi API H2H</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Catatan Tambahan (Opsional)</label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Ingin integrasi API H2H untuk website saya..."
                        value={leadForm.notes}
                        onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary pulsa-btn-primary btn-block"
                    >
                      Hubungkan ke WhatsApp &amp; Mulai Jualan
                    </button>
                    <span className="privacy-text">Data Anda aman dan terenkripsi.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section pulsa-faq-section">
        <div className="container">
          <div className="section-header">
            <div className="pulsa-badge-pulse">Tanya Jawab</div>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <p>Pelajari lebih lanjut tentang kecepatan, deposit, dan transaksi di PulsaApp.</p>
          </div>

          <div className="faq-accordion-box">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i
              return (
                <div
                  key={i}
                  className={`faq-item-card glass-card ${isOpen ? 'faq-item-card--open' : ''}`}
                >
                  <button
                    className="faq-q-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className="chevron-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="faq-a-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA BANNER ===== */}
      <section className="section">
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: '44px 32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(16, 185, 129, 0.12))',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="pulsa-badge-pulse" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
              Mulai Sekarang
            </div>
            <h2 style={{ fontSize: '2.1rem', marginBottom: '16px' }}>
              Akses Web App PulsaApp &amp; Transaksi Kilat 24 Jam
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto 28px', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Buka platform web PulsaApp sekarang untuk menikmati harga pulsa murah, token PLN instan tengah malam, top up e-money terlengkap, dan voucher game grosir.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="https://ppob.kancio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary pulsa-btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Pelajari Lebih Lanjut di Web App PulsaApp</span>
                <span style={{ fontSize: '1.1em' }}>↗</span>
              </a>
              <a
                href="#lead-form"
                className="btn btn--secondary pulsa-btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem', textDecoration: 'none' }}
              >
                Daftar Kemitraan Agen
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PulsaAppPage