# 🚀 GitHub Pages Deployment Guide

## 🔒 Security-First Deployment

This guide ensures secure deployment to GitHub Pages while protecting Firebase credentials.

## 📋 Prerequisites

1. **Node.js 18+** installed
2. **Git** configured with your GitHub account
3. **Firebase project** set up with valid credentials
4. **GitHub repository** with Pages enabled

## 🛡️ Security Setup

### 1. Environment Variables Protection

Your `.env` file contains sensitive Firebase credentials and is already properly gitignored:

```bash
# ✅ Already protected in .gitignore
.env
firestore.rules
FIREBASE_SETUP.md
```

### 2. Firebase Security Rules

Your Firestore security rules are already deployed with admin-only access:
- Only `jihar.algifari@gmail.com` can create/edit blog posts
- Public users can only read published content
- All operations require email verification

## 🏗️ Build Process

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Verify Environment Variables

Ensure your `.env` file exists with all required variables:

```bash
# Check if .env file exists and contains required variables
cat .env | grep -E "VITE_FIREBASE_|VITE_ADMIN_EMAIL"
```

### Step 3: Build for Production

```bash
# Build the React application
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Step 4: Test Build Locally

```bash
# Preview the production build locally
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## 📦 Manual Deployment to GitHub Pages

### Option A: Using gh-pages (Recommended)

```bash
# Deploy to GitHub Pages
npm run deploy
```

This command:
1. Builds the project (`npm run build`)
2. Deploys the `dist/` folder to the `gh-pages` branch
3. GitHub Pages automatically serves from this branch

### Option B: Manual Branch Deployment

```bash
# Create gh-pages branch manually
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
git checkout main
```

## ⚙️ GitHub Pages Configuration

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set source to **Deploy from a branch**
4. Select branch: `gh-pages`
5. Folder: `/ (root)`

## 🔐 Firebase Security Checklist

- ✅ `.env` file is gitignored
- ✅ Firebase API keys are client-safe (not secret)
- ✅ Firestore security rules deployed
- ✅ Admin access restricted to verified email
- ✅ Content sanitization with DOMPurify
- ✅ Email verification required for admin

## 🌐 Domain Configuration

### Custom Domain (Optional)

1. Add `CNAME` file to `public/` directory:
```
kancio.com
```

2. Configure DNS records:
```
Type: CNAME
Name: www
Value: kanciodevelopment.github.io
```

3. Enable HTTPS in GitHub Pages settings

## 🔄 Update Process

To update the deployed site:

```bash
# 1. Make your changes
git add .
git commit -m "Update: your changes"
git push origin main

# 2. Deploy updated version
npm run deploy
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Loading

```bash
# Verify .env file location (should be in project root)
ls -la .env

# Check Vite config
cat vite.config.ts
```

### Firebase Connection Issues

```bash
# Test Firebase connection
npm run dev
# Check browser console for Firebase errors
```

### GitHub Pages Not Updating

1. Check GitHub Actions (if any are running)
2. Verify `gh-pages` branch was updated
3. Clear browser cache
4. Check Pages settings in repository

## 📊 Performance Monitoring

After deployment, monitor:

- **Core Web Vitals** using Lighthouse
- **Firebase usage** in Firebase Console
- **GitHub Pages** analytics in repository insights

## 🔒 Security Best Practices

1. **Never commit credentials** - Always use environment variables
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Monitor Firebase usage** - Set up billing alerts
4. **Review access logs** - Check Firebase Authentication logs
5. **Backup data** - Export Firestore data regularly

## 🎯 Production URLs

- **Main Site**: https://kanciodevelopment.github.io
- **Custom Domain**: https://kancio.com (if configured)
- **Firebase Console**: https://console.firebase.google.com/project/kancio-blog-system

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review browser console errors
3. Check Firebase Console for errors
4. Verify GitHub Pages settings

---

**🔐 Security Note**: This deployment method keeps your Firebase credentials secure while allowing public access to your compiled application. The Firebase API keys are safe to expose in client-side code as they're protected by Firestore security rules.