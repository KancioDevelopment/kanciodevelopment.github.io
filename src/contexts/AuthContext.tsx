import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, ADMIN_EMAIL } from '../config/firebase'

interface AuthContextType {
  currentUser: User | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if current user is admin (email verification temporarily disabled for setup)
  const isAdmin = currentUser?.email === ADMIN_EMAIL

  const login = async (email: string, password: string): Promise<void> => {
    // Security: Only allow admin email to login
    if (email !== ADMIN_EMAIL) {
      throw new Error('Unauthorized: Invalid credentials')
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Additional security check: Ensure user is admin
      if (userCredential.user.email !== ADMIN_EMAIL) {
        await signOut(auth)
        throw new Error('Unauthorized: Access denied')
      }

      // Note: Email verification temporarily disabled for initial setup
      // TODO: Re-enable email verification after admin account is created and verified

    } catch (error: any) {
      // Enhanced error handling for security
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid credentials')
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.')
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Account has been disabled')
      } else if (error.message.includes('Unauthorized')) {
        throw error
      } else {
        console.error('Login error:', error)
        throw new Error('Login failed. Please try again.')
      }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
      throw new Error('Logout failed')
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    // Security: Only allow password reset for admin email
    if (email !== ADMIN_EMAIL) {
      throw new Error('Unauthorized: Invalid email address')
    }

    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address')
      } else {
        console.error('Password reset error:', error)
        throw new Error('Password reset failed. Please try again.')
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Security: Additional validation when auth state changes
      if (user && user.email === ADMIN_EMAIL) {
        setCurrentUser(user)
      } else if (user && user.email !== ADMIN_EMAIL) {
        // If somehow a non-admin user is authenticated, sign them out
        signOut(auth)
        setCurrentUser(null)
      } else {
        setCurrentUser(user)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    isAdmin,
    login,
    logout,
    resetPassword,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext