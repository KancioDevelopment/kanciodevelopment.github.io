import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Blogs.css'
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

const Blogs: React.FC = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 9

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

  // Sort posts by date (latest first)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Memoized pagination logic for performance
  const { totalPages, currentPosts } = useMemo(() => {
    const total = Math.ceil(sortedPosts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const current = sortedPosts.slice(startIndex, startIndex + postsPerPage)
    return { totalPages: total, currentPosts: current }
  }, [sortedPosts, currentPage, postsPerPage])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Our Blog</span>
            </div>
            <h1>Insights & Innovation</h1>
            <p>Discover the latest trends in technology, AI integration, and digital transformation that are shaping the future of business</p>

            {/* Blog Stats */}
            {/* <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{Array.from(new Set(posts.map(p => p.category))).length}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{Array.from(new Set(posts.flatMap(p => p.tags))).length}</span>
                <span className="stat-label">Topics</span>
              </div>
            </div> */}

          </div>
        </div>
      </div>

      <div className="blogs-content">
        <div className="container">
          {/* Content Header */}
          <div className="content-header">
            <h2>Latest Articles</h2>
            <p>Stay updated with our newest insights and discoveries</p>
          </div>

          {/* Content */}
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
          ) : sortedPosts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <h3>No articles available</h3>
                <p>Check back soon for new content and insights</p>
              </div>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className="blogs-grid" role="main" aria-label="Blog posts">
                {currentPosts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <article
                      className="blog-card"
                      data-index={index}
                      role="article"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="blog-card-inner">
                        <div className="blog-image-container">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="blog-image"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="blog-overlay"></div>
                          <div className="blog-category-badge">{post.category}</div>
                          <button
                            className="blog-quick-read"
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

                        <div className="blog-content">
                          <div className="blog-meta">
                            <div className="blog-date">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="blog-read-time">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                              </svg>
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="blog-title">{post.title}</h3>
                          <p className="blog-excerpt">{post.excerpt}</p>

                          <div className="blog-tags">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="blog-tag">
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="blog-tag-more">+{post.tags.length - 3}</span>
                            )}
                          </div>

                          <div className="blog-footer">
                            <div className="blog-author">
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
                              <span>Read More</span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7,7 17,7 17,17"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Strategic ad placement */}
                    {(index + 1) % 6 === 0 && index < currentPosts.length - 3 && (
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
                          variant="featured"
                          adLabel="Sponsored Content"
                          showLoadingAnimation={true}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <div className="pagination-info">
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  <div className="pagination-controls">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn prev"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                      </svg>
                      Previous
                    </button>

                    <div className="pagination-numbers">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn next"
                    >
                      Next
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Ad */}
              {currentPosts.length >= 6 && (
                <div className="blogs-footer-ad">
                  <div className="content-separator">
                    <h3>Explore More Content</h3>
                    <p>Discover more insights and stay updated with our latest articles</p>
                  </div>
                  <GoogleAdSense
                    userConsent={userConsent}
                    adFormat="rectangle"
                    style={{ margin: '40px 0' }}
                    className="blog-footer-ad optimized-footer-ad"
                    variant="premium"
                    adLabel="Recommended"
                    showLoadingAnimation={true}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>


    </div>
  )
}

export default Blogs