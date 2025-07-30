import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './AdminLogin.css'

interface AdminLoginProps {
  onClose: () => void
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const { login, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(email, password)
      onClose() // Close login modal on success
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      await resetPassword(email)
      setResetEmailSent(true)
      setShowForgotPassword(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="admin-login-overlay" onClick={handleOverlayClick}>
      <div className="admin-login-container">
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>
        
        <div className="admin-login-header">
          <h2>Admin Login</h2>
          <p>Secure access to blog management</p>
        </div>

        {resetEmailSent ? (
          <div className="reset-success">
            <div className="success-icon">✓</div>
            <h3>Password Reset Email Sent</h3>
            <p>Check your email for password reset instructions.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setResetEmailSent(false)
                setShowForgotPassword(false)
              }}
            >
              Back to Login
            </button>
          </div>
        ) : showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="admin-login-form">
            <h3>Reset Password</h3>
            <p>Enter your email to receive reset instructions</p>
            
            <div className="form-group">
              <label htmlFor="reset-email">Email Address</label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yourdomain.com"
                required
                autoComplete="email"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowForgotPassword(false)}
                disabled={loading}
              >
                Back to Login
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="admin-email">Email Address</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yourdomain.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                minLength={6}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="btn btn-primary btn-full-width" 
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="forgot-password">
              <button 
                type="button" 
                className="link-button" 
                onClick={() => setShowForgotPassword(true)}
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        )}

        <div className="security-notice">
          <p>🔒 This is a secure admin area. All login attempts are monitored.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin