import React, { useState, useEffect } from 'react'
import './PostDetail.css'
import GoogleAdSense from './GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { BlogService } from '../services/blogService'

interface PostDetailProps {
  postId: string
  onClose: () => void
}

interface PostContent {
  id: string
  title: string
  date: string
  content: string
  image: string
  category: string
  readTime: string
  author: string
  tags: string[]
  relatedPosts: string[]
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<PostContent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { userConsent } = useAds()

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)

        // Try to get published post from Firestore
        const firestorePost = await BlogService.getPublishedPostBySlug(postId) || await BlogService.getPostById(postId)

        if (firestorePost && firestorePost.status === 'published') {
          // Convert Firestore post to expected format
          setPost({
            id: firestorePost.id,
            title: firestorePost.title,
            date: firestorePost.publishedAt ? firestorePost.publishedAt.toDate().toISOString().split('T')[0] :
              firestorePost.createdAt.toDate().toISOString().split('T')[0],
            content: firestorePost.content,
            image: firestorePost.image || `/assets/images/${firestorePost.category.toLowerCase().replace(' ', '')}.png`,
            category: firestorePost.category,
            readTime: firestorePost.readTime,
            author: firestorePost.author,
            tags: firestorePost.tags,
            relatedPosts: [] // We'll implement related posts later
          })
        } else {
          // Fallback to mock data if Firestore post not found
          setPost(getMockPostContent(postId))
        }
      } catch (error) {
        console.error('Error loading post:', error)
        setPost(getMockPostContent(postId))
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [postId])

  // Fallback mock data for posts not in Jekyll
  const getMockPostContent = (id: string): PostContent => {
    const posts: { [key: string]: PostContent } = {
      "pulsa-app-solution": {
        id: "pulsa-app-solution",
        title: "Solusi Praktis Isi Pulsa dan Bayar Tagihan dengan Mudah",
        date: "April 5, 2023",
        content: `
          <h2>Mengapa Memilih PulsaApp?</h2>
          <p>Di era digital saat ini, kemudahan dalam melakukan transaksi digital menjadi kebutuhan utama. PulsaApp hadir sebagai solusi terdepan untuk memenuhi berbagai kebutuhan digital Anda dengan cara yang praktis dan efisien.</p>
          
          <h3>Fitur Unggulan PulsaApp</h3>
          <ul>
            <li><strong>Isi Pulsa & Paket Data</strong> - Tersedia untuk semua operator dengan harga terjangkau</li>
            <li><strong>Pembayaran Tagihan</strong> - PLN, PDAM, Internet, TV berlangganan</li>
            <li><strong>Top Up E-Money</strong> - OVO, GoPay, DANA, LinkAja, dan lainnya</li>
            <li><strong>Voucher Game</strong> - Mobile Legends, Free Fire, PUBG, dan game populer lainnya</li>
          </ul>
          
          <h3>Keunggulan yang Membedakan</h3>
          <p>PulsaApp tidak hanya menawarkan layanan lengkap, tetapi juga memberikan pengalaman terbaik melalui:</p>
          
          <blockquote>
            "Harga kompetitif, proses cepat, dan layanan 24/7 membuat PulsaApp menjadi pilihan utama untuk semua kebutuhan digital Anda."
          </blockquote>
          
          <h3>Cara Mudah Memulai</h3>
          <ol>
            <li>Download aplikasi PulsaApp di Play Store atau App Store</li>
            <li>Daftar dengan nomor telepon Anda</li>
            <li>Verifikasi akun melalui SMS</li>
            <li>Mulai bertransaksi dengan deposit saldo</li>
          </ol>
          
          <p>Dengan PulsaApp, semua kebutuhan digital Anda dapat diselesaikan dalam satu aplikasi. Hemat waktu, hemat biaya, dan dapatkan kemudahan maksimal dalam setiap transaksi.</p>
        `,
        image: "/assets/images/pulsapp.png",
        category: "Mobile App",
        readTime: "3 min read",
        author: "Kancio Team",
        tags: ["PulsaApp", "Digital Payment", "Mobile"],
        relatedPosts: ["kasir-app-umkm", "quiz-learning-platform"]
      },
      "kasir-app-umkm": {
        id: "kasir-app-umkm",
        title: "Aplikasi Kasir untuk UMKM",
        date: "April 18, 2023",
        content: `
          <h2>Revolusi Digital untuk UMKM</h2>
          <p>KasirApp hadir sebagai solusi digital yang mengubah cara UMKM mengelola bisnis mereka. Dengan teknologi modern dan antarmuka yang user-friendly, KasirApp membantu meningkatkan efisiensi operasional bisnis Anda.</p>
          
          <h3>Fitur Lengkap untuk Bisnis Modern</h3>
          <ul>
            <li><strong>Point of Sale (POS)</strong> - Sistem kasir digital yang mudah digunakan</li>
            <li><strong>Inventory Management</strong> - Kelola stok barang secara real-time</li>
            <li><strong>Laporan Penjualan</strong> - Analisis lengkap performa bisnis</li>
            <li><strong>Multi Payment</strong> - Terima berbagai metode pembayaran</li>
          </ul>
          
          <h3>Manfaat untuk UMKM</h3>
          <p>KasirApp dirancang khusus untuk memahami kebutuhan UMKM Indonesia:</p>
          
          <ul>
            <li>Meningkatkan akurasi transaksi</li>
            <li>Menghemat waktu proses penjualan</li>
            <li>Memberikan insight bisnis yang berharga</li>
            <li>Memudahkan pelaporan keuangan</li>
          </ul>
          
          <h3>Testimoni Pengguna</h3>
          <blockquote>
            "Sejak menggunakan KasirApp, penjualan toko saya meningkat 30% karena proses yang lebih cepat dan data yang akurat."
            <cite>- Ibu Sari, Pemilik Toko Sembako</cite>
          </blockquote>
          
          <p>Bergabunglah dengan ribuan UMKM yang telah merasakan manfaat KasirApp dalam mengembangkan bisnis mereka.</p>
        `,
        image: "/assets/images/kasirapp.png",
        category: "Business Solution",
        readTime: "4 min read",
        author: "Kancio Team",
        tags: ["KasirApp", "UMKM", "POS System"],
        relatedPosts: ["pulsa-app-solution", "quiz-learning-platform"]
      },
      "quiz-learning-platform": {
        id: "quiz-learning-platform",
        title: "Platform Quiz dan Learning",
        date: "May 2, 2023",
        content: `
          <h2>Belajar dengan Cara yang Menyenangkan</h2>
          <p>QuizApp menghadirkan pengalaman belajar yang interaktif dan menyenangkan melalui sistem quiz yang komprehensif. Platform ini dirancang untuk meningkatkan pengetahuan pengguna di berbagai bidang.</p>
          
          <h3>Kategori Pembelajaran</h3>
          <ul>
            <li><strong>Pengetahuan Umum</strong> - Wawasan dan informasi terkini</li>
            <li><strong>Bahasa</strong> - Bahasa Indonesia, Inggris, dan bahasa asing lainnya</li>
            <li><strong>Matematika</strong> - Dari dasar hingga tingkat lanjut</li>
            <li><strong>Sains</strong> - Fisika, Kimia, Biologi</li>
            <li><strong>Sejarah</strong> - Sejarah Indonesia dan dunia</li>
          </ul>
          
          <h3>Fitur Pembelajaran Interaktif</h3>
          <p>QuizApp menawarkan berbagai fitur yang membuat belajar menjadi lebih efektif:</p>
          
          <ul>
            <li>Quiz adaptif yang menyesuaikan tingkat kesulitan</li>
            <li>Sistem poin dan leaderboard</li>
            <li>Progress tracking dan analisis kemajuan</li>
            <li>Mode kompetisi dengan pengguna lain</li>
          </ul>
          
          <h3>Manfaat untuk Pendidikan</h3>
          <blockquote>
            "QuizApp terbukti meningkatkan motivasi belajar siswa hingga 40% melalui gamifikasi yang menarik."
            <cite>- Pak Budi, Guru SMA</cite>
          </blockquote>
          
          <h3>Teknologi di Balik QuizApp</h3>
          <p>Platform ini dibangun dengan teknologi terdepan untuk memberikan pengalaman belajar yang optimal:</p>
          
          <ul>
            <li>Algoritma machine learning untuk personalisasi</li>
            <li>Real-time synchronization</li>
            <li>Responsive design untuk semua perangkat</li>
            <li>Offline capability untuk belajar tanpa internet</li>
          </ul>
          
          <p>Mulai perjalanan belajar Anda bersama QuizApp dan rasakan perbedaan cara belajar yang lebih efektif dan menyenangkan.</p>
        `,
        image: "/assets/images/quizapp.png",
        category: "Education",
        readTime: "5 min read",
        author: "Kancio Team",
        tags: ["QuizApp", "Learning", "Education"],
        relatedPosts: ["pulsa-app-solution", "kasir-app-umkm"]
      }
    }

    return posts[id] || posts["pulsa-app-solution"]
  }

  if (loading) {
    return (
      <div className="post-detail-overlay" onClick={onClose}>
        <div className="post-detail-container" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="post-detail-overlay" onClick={onClose}>
        <div className="post-detail-container" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>
          <div className="no-results">
            <h3>Post not found</h3>
            <p>The requested post could not be loaded.</p>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post.title)

    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="post-detail-overlay" onClick={onClose}>
      <div className="post-detail-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <article className="post-detail">
          <header className="post-header">
            <div className="post-hero-image">
              <img src={post.image} alt={post.title} />
              <div className="post-category-badge">{post.category}</div>
            </div>

            <div className="post-header-content">
              <h1 className="post-title">{post.title}</h1>

              <div className="post-meta-detail">
                <div className="post-author-info">
                  <div className="author-details">
                    <span className="author-name">By {post.author}</span>
                    <span className="post-date">{formatDate(post.date)}</span>
                  </div>
                </div>

                <div className="post-stats">
                  <span className="read-time">{post.readTime}</span>
                </div>
              </div>

              <div className="post-tags-detail">
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag">{tag}</span>
                ))}
              </div>
            </div>
          </header>

          <div className="post-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Optimized ad placement: After user finishes reading content */}
          <div className="post-end-ad-section">
            <div className="content-separator">
              <div className="separator-line"></div>
              <span className="separator-text">Continue Reading</span>
              <div className="separator-line"></div>
            </div>
            <GoogleAdSense
              userConsent={userConsent}
              adFormat="rectangle"
              style={{ margin: '30px 0' }}
              className="post-content-ad optimized-post-ad"
            />
          </div>

          <footer className="post-footer">
            <div className="social-share">
              <h3>Share this post</h3>
              <div className="share-buttons">
                <button onClick={() => handleShare('twitter')} className="share-btn twitter">
                  Twitter
                </button>
                <button onClick={() => handleShare('facebook')} className="share-btn facebook">
                  Facebook
                </button>
                <button onClick={() => handleShare('linkedin')} className="share-btn linkedin">
                  LinkedIn
                </button>
                <button onClick={() => handleShare('whatsapp')} className="share-btn whatsapp">
                  WhatsApp
                </button>
                <button onClick={copyToClipboard} className="share-btn copy">
                  Copy Link
                </button>
              </div>
            </div>

            <div className="related-posts">
              <h3>Related Posts</h3>
              <div className="related-posts-grid">
                {post.relatedPosts.length > 0 ? post.relatedPosts.map((relatedId) => {
                  const relatedPost = getMockPostContent(relatedId)
                  return (
                    <div key={relatedId} className="related-post-card">
                      <img src={relatedPost.image} alt={relatedPost.title} />
                      <div className="related-post-content">
                        <h4>{relatedPost.title}</h4>
                        <span className="related-post-date">{formatDate(relatedPost.date)}</span>
                      </div>
                    </div>
                  )
                }) : (
                  <p>No related posts available.</p>
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default PostDetail