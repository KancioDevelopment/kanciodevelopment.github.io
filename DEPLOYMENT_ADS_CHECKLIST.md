# Deployment Checklist - Ads.txt Files

## ✅ Completed Setup

### 1. **ads.txt Files Included**
- ✅ `ads.txt` copied to `src/public/ads.txt`
- ✅ `app-ads.txt` copied to `src/public/app-ads.txt`
- ✅ Both files contain: `google.com, pub-6469211032618440, DIRECT, f08c47fec0942fa0`

### 2. **Build Configuration**
- ✅ Vite configured to copy public directory (`copyPublicDir: true`)
- ✅ Build script includes verification: `vite build && npm run verify-ads`
- ✅ Verification script checks for files in dist folder

### 3. **Build Verification**
Build successfully creates:
- `dist/ads.txt` ✅
- `dist/app-ads.txt` ✅

## 🚀 Deployment Process

When you deploy:

```bash
npm run build    # This will build AND verify ads.txt files
npm run deploy   # This deploys to GitHub Pages
```

## 📋 Post-Deployment Verification

After deployment, verify these URLs work:
- `https://kancio.com/ads.txt`
- `https://kancio.com/app-ads.txt`

Both should return:
```
google.com, pub-6469211032618440, DIRECT, f08c47fec0942fa0
```

## 🔧 Maintenance

### To Update ads.txt:
1. Edit `src/public/ads.txt` and `src/public/app-ads.txt`
2. Run `npm run build` to verify
3. Run `npm run deploy` to update live site

### Troubleshooting:
- If ads.txt is missing after deploy, run `npm run verify-ads` to check build output
- Files should be in the root of your deployed site (not in a subdirectory)
- Ensure your AdSense account uses publisher ID: `pub-6469211032618440`

## 🎯 AdSense Requirements Met

✅ **ads.txt file location**: Root domain  
✅ **Publisher ID**: `pub-6469211032618440`  
✅ **Relationship**: `DIRECT`  
✅ **Certification Authority ID**: `f08c47fec0942fa0`  
✅ **File accessibility**: Public, no authentication required  

Your ads.txt files are properly configured and will be included in every deployment automatically!
