import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Blogs.css'
import GoogleAdSense from './GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { useSEO } from '../hooks/useSEO'
import { BlogService } from '../services/blogService'

export interface PostData {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  category: string
  readTime: string
  author: string
  tags: string[]
}

const Blogs: React.FC = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const postsPerPage = 6

  const { userConsent } = useAds()

  useSEO({
    title: 'Blog & Wawasan Teknologi - Kancio Development',
    description:
      'Artikel terkini seputar transformasi digital, otomatisasi AI, ERP Apotek, sistem PPOB, dan arsitektur software enterprise.',
    keywords: 'blog kancio, artikel teknologi, sistem erp apotek, integrasi ai, software house indonesia',
    canonicalUrl: 'https://kancio.com/blogs',
  })

  // Create slug from post ID or title
  const createSlug = useCallback((post: PostData): string => {
    return (post.slug || post.id)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }, [])

  // Navigate to individual post page
  const handlePostClick = useCallback(
    (post: PostData) => {
      const slug = createSlug(post)
      navigate(`/blog/${slug}`)
    },
    [navigate, createSlug]
  )

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const firestorePosts = await BlogService.getPublishedPosts()
        setPosts(firestorePosts)
      } catch (error) {
        console.error('Error loading posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))
    return ['all', ...unique]
  }, [posts])

  // Sort and filter posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesCategory =
          selectedCategory === 'all' ||
          post.category?.toLowerCase() === selectedCategory.toLowerCase()
        const q = searchQuery.toLowerCase().trim()
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags?.some((t) => t.toLowerCase().includes(q)) ||
          post.author.toLowerCase().includes(q)
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [posts, selectedCategory, searchQuery])

  // Featured Post (first post when no active search)
  const featuredPost = useMemo(() => {
    if (searchQuery || selectedCategory !== 'all' || filteredPosts.length === 0) return null
    return filteredPosts[0]
  }, [filteredPosts, searchQuery, selectedCategory])

  // Grid posts (exclude featured if shown)
  const gridSourcePosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.slice(1)
    }
    return filteredPosts
  }, [filteredPosts, featuredPost])

  // Pagination logic
  const { totalPages, currentPosts } = useMemo(() => {
    const total = Math.ceil(gridSourcePosts.length / postsPerPage) || 1
    const startIndex = (currentPage - 1) * postsPerPage
    const current = gridSourcePosts.slice(startIndex, startIndex + postsPerPage)
    return { totalPages: total, currentPosts: current }
  }, [gridSourcePosts, currentPage, postsPerPage])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    const el = document.querySelector('.blogs-content')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="blogs-page">
      {/* Background Ambience */}
      <div className="blogs-ambient-glow" />

      {/* ===== HERO SECTION ===== */}
      <section className="blogs-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">📚</span>
              <span>Wawasan &amp; Inovasi Digital</span>
            </div>
            <h1>Artikel &amp; Riset Teknologi Terkini</h1>
            <p>
              Temukan tren teknologi mutakhir, strategi otomatisasi AI, manajemen sistem apotek ERP,
              hingga solusi digitalisasi bisnis skala enterprise.
            </p>

            {/* Search & Filter Bar */}
            <div className="search-container">
              <div className="search-input-wrapper">
                <svg
                  className="search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Cari artikel, topik, atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
                {searchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Hapus pencarian"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="blog-category-tabs" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-tab-btn ${selectedCategory === cat ? 'category-tab-btn--active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setCurrentPage(1)
                  }}
                >
                  {cat === 'all' ? 'Semua Topik' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE SPOTLIGHT ===== */}
      {featuredPost && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-card" onClick={() => handlePostClick(featuredPost)}>
              <div className="featured-card__image-wrap">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="featured-card__img"
                  loading="eager"
                />
                <div className="featured-card__badge-wrap">
                  <span className="featured-pill">⭐ Featured Story</span>
                  <span className="category-pill">{featuredPost.category}</span>
                </div>
              </div>
              <div className="featured-card__body">
                <div className="featured-meta">
                  <span className="featured-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="featured-meta-divider">•</span>
                  <span className="featured-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-footer">
                  <div className="featured-author">
                    <div className="author-avatar-badge">✍️</div>
                    <span className="author-name">{featuredPost.author}</span>
                  </div>
                  <span className="featured-cta">
                    Baca Selengkapnya
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== BLOGS CONTENT / GRID ===== */}
      <section className="blogs-content">
        <div className="container">
          {/* Section Header */}
          <div className="content-header">
            <div className="content-header__left">
              <h2>{searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Semua Publikasi'}</h2>
              <p>Menampilkan {filteredPosts.length} artikel bermanfaat</p>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-spinner">
                  <div className="spinner-ring" />
                  <div className="spinner-ring" />
                </div>
                <h3>Memuat artikel...</h3>
                <p>Mengambil wawasan terbaru untuk Anda</p>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">🔍</div>
                <h3>Tidak Ada Artikel Ditemukan</h3>
                <p>Coba kata kunci lain atau pilih kategori yang berbeda.</p>
                <button
                  className="btn btn--secondary btn--sm"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                >
                  Reset Filter
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className="blogs-grid" role="main" aria-label="Blog posts">
                {currentPosts.map((post) => (
                  <article
                    key={post.id}
                    className="blog-card"
                    onClick={() => handlePostClick(post)}
                  >
                    <div className="blog-card-inner">
                      <div className="blog-image-container">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="blog-image"
                          loading="lazy"
                        />
                        <div className="blog-overlay" />
                        <span className="blog-category-badge">{post.category}</span>
                      </div>

                      <div className="blog-content">
                        <div className="blog-meta">
                          <span className="blog-date">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {formatDate(post.date)}
                          </span>
                          <span className="blog-read-time">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12,6 12,12 16,14" />
                            </svg>
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="blog-title">{post.title}</h3>
                        <p className="blog-excerpt">{post.excerpt}</p>

                        <div className="blog-tags">
                          {post.tags?.slice(0, 3).map((tag, tagIdx) => (
                            <span key={tagIdx} className="blog-tag">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="blog-footer">
                          <div className="blog-author">
                            <span className="author-name">👤 {post.author}</span>
                          </div>
                          <span className="read-more-btn">
                            Baca
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Display Ad \u2014 between blog grid and pagination */}
              <div className="blog-ad-wrapper">
                <GoogleAdSense
                  userConsent={userConsent}
                  unitType="display"
                  className="blog-grid-ad"
                  variant="minimal"
                  adLabel="Advertisement"
                />
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn prev"
                    aria-label="Halaman Sebelumnya"
                  >
                    ← Sebelumnya
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn next"
                    aria-label="Halaman Selanjutnya"
                  >
                    Selanjutnya →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blogs