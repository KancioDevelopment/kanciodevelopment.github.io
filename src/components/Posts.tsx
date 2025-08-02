import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Posts.css'
import GoogleAdSense from './GoogleAdSense'
import { useAds } from '../hooks/useAds'
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

const Posts: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { userConsent } = useAds()

  // Create slug from post ID or title
  const createSlug = useCallback((post: PostData): string => {
    return post.id
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50)
  }, [])

  // Navigate to individual post page
  const handlePostClick = useCallback((post: PostData) => {
    const slug = createSlug(post)
    navigate(`/blog/${slug}`)
  }, [navigate, createSlug])

  // Load posts from Firestore
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const firestorePosts = await BlogService.getPublishedPosts()
        setPosts(firestorePosts)
      } catch (error) {
        console.error('Error loading posts:', error)
        // Show empty state or error message
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))]

  // Memoized filter and sort posts for performance
  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter(post => {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch = !searchTerm || 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        } else {
          return a.title.localeCompare(b.title)
        }
      })
  }, [posts, searchTerm, selectedCategory, sortBy])

  return (
    <section id="blog" className="posts">
      <div className="container">
        {/* Modern Header with Glassmorphism Effect */}
        <div className="posts-header">
          <div className="posts-header-content">
            <div className="header-badge">
              <span className="badge-icon">📚</span>
              <span>Our Blog</span>
            </div>
            <h2>Latest Insights & Stories</h2>
            <p>Discover cutting-edge insights about digital transformation, AI innovation, and technology trends that shape the future</p>
          </div>

          {/* Enhanced Admin Controls */}
          <div className="admin-controls" style={{ display: 'none' }}>
            {isAdmin ? (
              <div className="admin-actions">
                <div className="admin-badge">
                  <span className="admin-icon">�‍💼</span>
                  <span>Admin</span>
                </div>
                <button
                  onClick={() => setShowAdminDashboard(true)}
                  className="btn btn-admin"
                  title="Manage Posts"
                >
                  <span className="btn-icon">⚙️</span>
                  <span>Manage</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="admin-login-btn"
                title="Admin Login"
              >
                <span className="login-icon">🔐</span>
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="posts-controls">
          <div className="controls-wrapper">
            <div className="search-section">
              <div className="search-container">
                <div className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Search blog posts"
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    className="search-clear"
                    onClick={() => setSearchTerm('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
                
                {/* Search suggestions */}
                {searchTerm.length > 0 && (
                  <div className="search-suggestions">
                    <div className="search-suggestion-item">
                      <span className="suggestion-icon">🔍</span>
                      <span>Search for "{searchTerm}"</span>
                    </div>
                    {/* Show matching tags */}
                    {Array.from(new Set(posts.flatMap(p => p.tags)))
                      .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                      .slice(0, 3)
                      .map(tag => (
                        <div 
                          key={tag} 
                          className="search-suggestion-item clickable"
                          onClick={() => setSearchTerm(tag)}
                        >
                          <span className="suggestion-icon">🏷️</span>
                          <span>Tag: {tag}</span>
                        </div>
                      ))
                    }
                    {/* Show matching categories */}
                    {categories
                      .filter(cat => cat !== 'All' && cat.toLowerCase().includes(searchTerm.toLowerCase()))
                      .slice(0, 2)
                      .map(category => (
                        <div 
                          key={category} 
                          className="search-suggestion-item clickable"
                          onClick={() => {
                            setSearchTerm('')
                            setSelectedCategory(category)
                          }}
                        >
                          <span className="suggestion-icon">📁</span>
                          <span>Category: {category}</span>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>

              {/* Search Results Counter */}
              {searchTerm && (
                <div className="search-results-info">
                  <span className="results-count">
                    {filteredAndSortedPosts.length} result{filteredAndSortedPosts.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              )}
            </div>

            <div className="filter-section">
              <div className="filter-group">
                <div className="filter-item">
                  <label htmlFor="category" className="filter-label">
                    <span className="filter-icon">📁</span>
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-item">
                  <label htmlFor="sort" className="filter-label">
                    <span className="filter-icon">⚡</span>
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                    className="filter-select"
                  >
                    <option value="date">Latest First</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <h3>Loading amazing content...</h3>
              <p>Fetching the latest insights for you</p>
            </div>
          </div>
        ) : filteredAndSortedPosts.length === 0 ? (
          <div className="no-results">
            <div className="no-results-content">
              <div className="no-results-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or explore different categories</p>
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : null}

        {!loading && filteredAndSortedPosts.length > 0 && (
          <>
            {/* Results Summary */}
            <div className="results-summary">
              <span className="results-text">
                Showing {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
            </div>

            {/* Enhanced Posts Grid */}
            <div className="posts-grid" role="main" aria-label="Blog posts">{filteredAndSortedPosts.map((post, index) => (
              <React.Fragment key={post.id}>
                <article className="post-card" data-index={index} role="article">
                  <div className="post-card-inner">
                    <div className="post-image-container">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="post-image"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="post-overlay"></div>
                      <div className="post-category-badge">{post.category}</div>
                      <button
                        className="post-quick-read"
                        onClick={() => handlePostClick(post)}
                        title="Quick read"
                        aria-label={`Quick read ${post.title}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>

                    <div className="post-content">
                      <div className="post-meta">
                        <div className="post-date">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="post-read-time">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.excerpt}</p>

                      <div className="post-tags">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="post-tag">
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="post-tag-more">+{post.tags.length - 3}</span>
                        )}
                      </div>

                      <div className="post-footer">
                        <div className="post-author">
                          <div className="author-avatar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <span className="author-name">{post.author}</span>
                        </div>
                        <button
                          onClick={() => handlePostClick(post)}
                          className="read-more-btn"
                          aria-label={`Read full article: ${post.title}`}
                        >
                          <span>Read Article</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7,7 17,7 17,17"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Optimized ad placement: After every 6th post and only if there are more posts remaining */}
                {(index + 1) % 6 === 0 && index < filteredAndSortedPosts.length - 3 && (
                  <div className="ad-in-grid-wrapper">
                    <div className="ad-separator">
                      <div className="ad-separator-line"></div>
                      <span className="ad-label">Advertisement</span>
                      <div className="ad-separator-line"></div>
                    </div>
                    <GoogleAdSense
                      userConsent={userConsent}
                      adFormat="horizontal"
                      style={{ margin: '20px 0' }}
                      className="blog-grid-ad optimized-grid-ad"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
            </div>

            {/* Optimized Footer Section */}
            <div className="posts-footer">
              {/* Only show footer ad if there are enough posts */}
              {filteredAndSortedPosts.length >= 8 && (
                <div className="footer-ad-section">
                  <div className="content-separator">
                    <h3>Explore More Content</h3>
                    <p>Discover more insights and stay updated with our latest articles</p>
                  </div>
                  <GoogleAdSense
                    userConsent={userConsent}
                    adFormat="rectangle"
                    style={{ margin: '40px 0' }}
                    className="blog-footer-ad optimized-footer-ad"
                  />
                </div>
              )}

              <div className="posts-footer-info">
                <p>Want to stay updated with our latest insights?</p>
                <div className="footer-actions">
                  <button className="newsletter-btn">
                    <span>📧</span>
                    Subscribe to Newsletter
                  </button>
                  <button className="rss-btn">
                    <span>📡</span>
                    RSS Feed
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>


    </section>
  )
}

export default Posts