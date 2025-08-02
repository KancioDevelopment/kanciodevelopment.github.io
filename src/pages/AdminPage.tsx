import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPage.css'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'
import { useAuth } from '../contexts/AuthContext'

const AdminPage: React.FC = () => {
  const navigate = useNavigate()
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false)
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false)
  const { isAdmin, logout } = useAuth()

  useEffect(() => {
    if (isAdmin) {
      setShowAdminDashboard(true)
      setShowAdminLogin(false)
    } else {
      setShowAdminLogin(true)
      setShowAdminDashboard(false)
    }
  }, [isAdmin])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleBackHome = () => {
    navigate('/')
  }

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="container">
          <div className="admin-hero-content">
            {/* Breadcrumb */}
            <nav className="admin-breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb-list">
                <li className="breadcrumb-item">
                  <button onClick={handleBackHome} className="breadcrumb-link" title="Go to homepage">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9,22 9,12 15,12 15,22"></polyline>
                    </svg>
                    Home
                  </button>
                </li>
                <li className="breadcrumb-separator" aria-hidden="true">›</li>
                <li className="breadcrumb-item">
                  <span className="breadcrumb-current" aria-current="page">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Admin Panel
                  </span>
                </li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="admin-header">
              <div className="admin-badge">
                <span className="badge-icon">🔐</span>
                <span>Admin Area</span>
              </div>

              <h1>Content Management System</h1>
              <p>Manage your blog posts, content, and website settings from this centralized dashboard</p>

              {/* Admin Status */}
              {isAdmin ? (
                <div className="admin-status">
                  <div className="status-card authenticated">
                    <div className="status-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                        <path d="M13 12h3a2 2 0 0 1 2 2v1"></path>
                        <path d="M11 12H8a2 2 0 0 0-2 2v1"></path>
                      </svg>
                    </div>
                    <div className="status-content">
                      <h3>Authenticated</h3>
                      <p>You are logged in as administrator</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn" title="Logout">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="admin-status">
                  <div className="status-card unauthenticated">
                    <div className="status-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div className="status-content">
                      <h3>Authentication Required</h3>
                      <p>Please login to access the admin dashboard</p>
                    </div>
                    <button onClick={() => setShowAdminLogin(true)} className="login-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10,17 15,12 10,7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      Login
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {isAdmin && (
                <div className="quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="actions-grid">
                    <button 
                      onClick={() => setShowAdminDashboard(true)} 
                      className="action-btn primary"
                      title="Manage blog posts"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      <div>
                        <span className="action-title">Manage Posts</span>
                        <span className="action-desc">Create, edit, and publish blog posts</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => navigate('/blogs')} 
                      className="action-btn secondary"
                      title="View public blog"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <div>
                        <span className="action-title">View Blog</span>
                        <span className="action-desc">See how your content appears to visitors</span>
                      </div>
                    </button>

                    <button className="action-btn secondary" title="Site analytics">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                      <div>
                        <span className="action-title">Analytics</span>
                        <span className="action-desc">View site performance and statistics</span>
                      </div>
                    </button>

                    <button className="action-btn secondary" title="Site settings">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      <div>
                        <span className="action-title">Settings</span>
                        <span className="action-desc">Configure site preferences</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showAdminLogin && (
        <AdminLogin
          onClose={() => {
            setShowAdminLogin(false)
            if (!isAdmin) navigate('/')
          }}
        />
      )}

      {/* Dashboard Modal */}
      {showAdminDashboard && (
        <AdminDashboard
          onClose={() => setShowAdminDashboard(false)}
        />
      )}
    </div>
  )
}

export default AdminPage