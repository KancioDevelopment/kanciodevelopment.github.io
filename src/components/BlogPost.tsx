import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './BlogPost.css'
import GoogleAdSense from './GoogleAdSense'
import { useAds } from '../hooks/useAds'
import { BlogService, BlogPost as BlogPostType } from '../services/blogService'
import { PostData } from './Blogs'

interface BlogPostContent extends BlogPostType {
  // content is already string in BlogPostType
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPostContent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [relatedPosts, setRelatedPosts] = useState<PostData[]>([])
  const { userConsent } = useAds()

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return

      try {
        setLoading(true)

        // Try to get published post from local file system
        const filePost = await BlogService.getPublishedPostBySlug(slug)

        if (filePost) {
          setPost(filePost as BlogPostContent) // Type assertion safe here

          // Load related posts
          const allPosts = await BlogService.getPublishedPosts()
          const related = allPosts
            .filter(p => p.id !== filePost.id && p.category === filePost.category)
            .slice(0, 3)
          setRelatedPosts(related)

        } else {
          // Handle 404 or fallback
          setPost(null)
        }
      } catch (error) {
        console.error('Error loading post:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // Update document title and meta tags for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Kancio Development Blog`

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt)
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = post.excerpt
        document.head.appendChild(meta)
      }

      // Update Open Graph tags
      const updateOrCreateMeta = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`)
        if (meta) {
          meta.setAttribute('content', content)
        } else {
          const meta = document.createElement('meta')
          meta.setAttribute('property', property)
          meta.setAttribute('content', content)
          document.head.appendChild(meta)
        }
      }

      updateOrCreateMeta('og:title', post.title)
      updateOrCreateMeta('og:description', post.excerpt)
      updateOrCreateMeta('og:image', post.image)
      updateOrCreateMeta('og:url', window.location.href)
      updateOrCreateMeta('og:type', 'article')

      // Twitter Card tags
      const updateOrCreateTwitterMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`)
        if (meta) {
          meta.setAttribute('content', content)
        } else {
          const meta = document.createElement('meta')
          meta.setAttribute('name', name)
          meta.setAttribute('content', content)
          document.head.appendChild(meta)
        }
      }

      updateOrCreateTwitterMeta('twitter:card', 'summary_large_image')
      updateOrCreateTwitterMeta('twitter:title', post.title)
      updateOrCreateTwitterMeta('twitter:description', post.excerpt)
      updateOrCreateTwitterMeta('twitter:image', post.image)

      // JSON-LD structured data
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "author": {
          "@type": "Organization",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Kancio Development",
          "logo": {
            "@type": "ImageObject",
            "url": "/favicon.ico"
          }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      }

      // Remove existing JSON-LD script if any
      const existingJsonLd = document.querySelector('#json-ld-blog-post')
      if (existingJsonLd) {
        existingJsonLd.remove()
      }

      // Add new JSON-LD script
      const script = document.createElement('script')
      script.id = 'json-ld-blog-post'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup on unmount
      document.title = 'Kancio Development'
      const jsonLdScript = document.querySelector('#json-ld-blog-post')
      if (jsonLdScript) {
        jsonLdScript.remove()
      }
    }
  }, [post])

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
    const title = encodeURIComponent(post?.title || '')

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

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <h3>Loading article...</h3>
              <p>Please wait while we fetch the content</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-container">
            <div className="error-content">
              <div className="error-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3>Article not found</h3>
              <p>The article you're looking for doesn't exist or has been removed.</p>
              <button onClick={() => navigate('/blogs')} className="back-to-blogs-btn">
                Back to Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <button onClick={() => navigate('/')} className="breadcrumb-link" title="Go to homepage">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                Home
              </button>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">›</li>
            <li className="breadcrumb-item">
              <button onClick={() => navigate('/blogs')} className="breadcrumb-link" title="Go to blog listing">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                Blog
              </button>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">›</li>
            <li className="breadcrumb-item">
              <span className="breadcrumb-current" aria-current="page" title={post?.title}>
                {post?.category && (
                  <span style={{ marginRight: '8px', fontSize: '12px', opacity: 0.7 }}>
                    {post.category}
                  </span>
                )}
                {post?.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Back Navigation */}
        <div className="blog-nav">
          <button onClick={() => navigate('/blogs')} className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            <span>Back to Blog</span>
          </button>
        </div>

        {/* Article Header */}
        <article className="blog-post">
          <header className="post-header">
            <div className="post-hero">
              <div className="post-hero-image">
                <img src={post.image} alt={post.title} loading="eager" />
                <div className="post-overlay"></div>
                <div className="post-category-badge">{post.category}</div>
              </div>

              <div className="post-header-content">
                <h1 className="post-title">{post.title}</h1>

                <div className="post-meta">
                  <div className="post-author-info">
                    <div className="author-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="author-details">
                      <span className="author-name">By {post.author}</span>
                      <span className="post-date">{formatDate(post.date)}</span>
                    </div>
                  </div>

                  <div className="post-stats">
                    <span className="read-time">{post.readTime}</span>
                  </div>
                </div>

                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="post-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="post-content">
            <div className="content-wrapper markdown-body">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Mid-content Ad */}
            <div className="post-ad-section">
              <div className="ad-separator">
                <div className="separator-line"></div>
                <span className="separator-text">Advertisement</span>
                <div className="separator-line"></div>
              </div>
              <GoogleAdSense
                userConsent={userConsent}
                adFormat="rectangle"
                style={{ margin: '30px 0' }}
                className="post-content-ad"
              />
            </div>
          </div>

          {/* Article Footer */}
          <footer className="post-footer">
            <div className="social-share">
              <h3>Share this article</h3>
              <div className="share-buttons">
                <button onClick={() => handleShare('twitter')} className="share-btn twitter">
                  <span>Twitter</span>
                </button>
                <button onClick={() => handleShare('facebook')} className="share-btn facebook">
                  <span>Facebook</span>
                </button>
                <button onClick={() => handleShare('linkedin')} className="share-btn linkedin">
                  <span>LinkedIn</span>
                </button>
                <button onClick={() => handleShare('whatsapp')} className="share-btn whatsapp">
                  <span>WhatsApp</span>
                </button>
                <button onClick={copyToClipboard} className="share-btn copy">
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="related-posts">
            <div className="section-header">
              <h2>Related Articles</h2>
              <p>Discover more insights on similar topics</p>
            </div>
            <div className="related-posts-grid">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="related-post-card">
                  <div className="related-post-image">
                    <img src={relatedPost.image} alt={relatedPost.title} loading="lazy" />
                    <div className="related-post-overlay"></div>
                    <div className="related-post-category">{relatedPost.category}</div>
                  </div>
                  <div className="related-post-content">
                    <h3
                      className="related-post-title"
                      onClick={() => navigate(`/blog/${relatedPost.id}`)}
                    >
                      {relatedPost.title}
                    </h3>
                    <p className="related-post-excerpt">{relatedPost.excerpt}</p>
                    <div className="related-post-meta">
                      <span className="related-post-date">{formatDate(relatedPost.date)}</span>
                      <span className="related-post-read-time">{relatedPost.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default BlogPost