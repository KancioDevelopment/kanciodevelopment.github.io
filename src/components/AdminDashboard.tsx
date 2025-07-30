import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BlogService, BlogPost, BlogPostInput } from '../services/blogService'
import BlogEditor from './BlogEditor'
import './AdminDashboard.css'

interface AdminDashboardProps {
  onClose: () => void
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'posts' | 'create' | 'edit'>('posts')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [error, setError] = useState('')

  const { logout, currentUser } = useAuth()

  // Load all posts on component mount
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const allPosts = await BlogService.getAllPosts()
      setPosts(allPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (input: BlogPostInput) => {
    try {
      if (!currentUser?.email) throw new Error('User not authenticated')
      
      await BlogService.createPost(input, currentUser.email)
      await loadPosts() // Refresh posts list
      setActiveTab('posts')
      setError('')
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const handleUpdatePost = async (postId: string, input: BlogPostInput) => {
    try {
      if (!currentUser?.email) throw new Error('User not authenticated')
      
      await BlogService.updatePost(postId, input, currentUser.email)
      await loadPosts() // Refresh posts list
      setActiveTab('posts')
      setEditingPost(null)
      setError('')
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const handleDeletePost = async (postId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      await BlogService.deletePost(postId)
      await loadPosts() // Refresh posts list
      setError('')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setActiveTab('edit')
  }

  const handleLogout = async () => {
    try {
      await logout()
      onClose()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Never'
    return timestamp.toDate().toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    return (
      <span className={`status-badge status-${status}`}>
        {status === 'published' ? '🟢 Published' : '🟡 Draft'}
      </span>
    )
  }

  return (
    <div className="admin-dashboard-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="admin-dashboard-container">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1>Blog Admin Dashboard</h1>
            <p>Manage your blog content securely</p>
          </div>
          <div className="admin-header-right">
            <span className="admin-user">👤 {currentUser?.email}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
            <button onClick={onClose} className="close-button">×</button>
          </div>
        </header>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError('')}>×</button>
          </div>
        )}

        <nav className="admin-nav">
          <button 
            className={`nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            📋 All Posts ({posts.length})
          </button>
          <button 
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            ➕ Create New Post
          </button>
        </nav>

        <main className="admin-content">
          {activeTab === 'posts' && (
            <div className="posts-list">
              <div className="posts-list-header">
                <h2>All Blog Posts</h2>
                <div className="posts-stats">
                  <span>Published: {posts.filter(p => p.status === 'published').length}</span>
                  <span>Drafts: {posts.filter(p => p.status === 'draft').length}</span>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="empty-state">
                  <h3>No posts yet</h3>
                  <p>Create your first blog post to get started.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('create')}
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                <div className="posts-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td>
                            <div className="post-title-cell">
                              <strong>{post.title}</strong>
                              <small>{post.excerpt.substring(0, 100)}...</small>
                            </div>
                          </td>
                          <td>{getStatusBadge(post.status)}</td>
                          <td>
                            <span className="category-badge">{post.category}</span>
                          </td>
                          <td>
                            <small>{formatDate(post.updatedAt)}</small>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                onClick={() => handleEditPost(post)}
                                className="btn btn-small btn-primary"
                                title="Edit post"
                              >
                                ✏️
                              </button>
                              <button 
                                onClick={() => handleDeletePost(post.id, post.title)}
                                className="btn btn-small btn-danger"
                                title="Delete post"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="editor-section">
              <h2>Create New Post</h2>
              <BlogEditor
                onSave={handleCreatePost}
                onCancel={() => setActiveTab('posts')}
              />
            </div>
          )}

          {activeTab === 'edit' && editingPost && (
            <div className="editor-section">
              <h2>Edit Post</h2>
              <BlogEditor
                initialData={editingPost}
                onSave={(input) => handleUpdatePost(editingPost.id, input)}
                onCancel={() => {
                  setActiveTab('posts')
                  setEditingPost(null)
                }}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard