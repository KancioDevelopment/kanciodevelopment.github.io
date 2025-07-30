import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  publicDir: 'public',
  envDir: '../', // Tells Vite to look for .env files in the parent directory (project root)
  base: '/', // GitHub Pages base path
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // Security: Remove console logs in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          router: ['react-router-dom']
        }
      }
    },
    // Ensure ads.txt files are copied to root of build
    copyPublicDir: true
  },
  // Security headers for development
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  }
})