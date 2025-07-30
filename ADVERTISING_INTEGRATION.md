# Advertising Integration - React Implementation

This document describes the advertising integration migrated from Jekyll to React, implementing Google AdSense, Google Analytics, and FBS Partner scripts with user consent management.

## Components Overview

### 1. AdManager (`/src/components/AdManager.tsx`)
- Central manager for all advertising components
- Handles user consent flow
- Integrates with all ad providers

### 2. GoogleAnalytics (`/src/components/GoogleAnalytics.tsx`)
- Implements Google Analytics tracking
- GDPR compliant with anonymize_ip
- SPA-aware page tracking
- ID: `G-EEVT7MW5MC`

### 3. GoogleAdSense (`/src/components/GoogleAdSense.tsx`)
- Renders AdSense ads throughout the site
- Responsive ad formats
- Client ID: `ca-pub-6469211032618440`
- Only loads with user consent

### 4. FBSPartner (`/src/components/FBSPartner.tsx`)
- Loads FBS partner tracking script
- Script ID: `16877ddb93aa3967ed413ac6c4c849e9c4131f50a597b2e1b5535b6deeb5172a`
- Consent-based loading

### 5. CookieConsent (`/src/components/CookieConsent.tsx`)
- User-friendly consent banner
- GDPR compliant
- Persistent user choice storage

### 6. useAds Hook (`/src/hooks/useAds.ts`)
- Manages advertising state
- Handles user consent preferences
- LocalStorage persistence

## Ad Placement Strategy

### Homepage
- **Header Ad**: After Hero section (horizontal format)
- **Middle Ad**: Between showcases (rectangle format)
- **Footer Ad**: Before About section (horizontal format)

### Blog Section
- **Header Ad**: Before posts grid (horizontal format)
- **In-Grid Ads**: Every 4th post (horizontal format)
- **Footer Ad**: After posts grid (rectangle format)

### Post Detail
- **Header Ad**: After post header (horizontal format)
- **Content Ad**: After post content (rectangle format)

## User Experience Features

### 1. Consent Management
- Clear consent banner on first visit
- Accept/Decline options
- Persistent choice storage
- No ads loaded without consent

### 2. Non-Intrusive Design
- Ads marked as "Advertisement"
- Styled to blend with site design
- Responsive layouts
- Loading animations

### 3. Performance Optimized
- Lazy loading of ad scripts
- Error handling for failed loads
- No blocking of main content

## Technical Implementation

### Script Loading Strategy
```typescript
// Only load when user consents
if (userConsent) {
  const script = document.createElement('script');
  script.async = true;
  script.src = adScriptUrl;
  document.head.appendChild(script);
}
```

### Error Handling
- Graceful degradation if ad scripts fail
- Console warnings (not errors)
- No impact on site functionality

### GDPR Compliance
- Explicit user consent required
- Analytics IP anonymization
- Clear data usage disclosure
- User choice persistence

## Configuration

All advertising configuration is centralized in `/src/hooks/useAds.ts`:

```typescript
export const ADSENSE_CLIENT_ID = 'ca-pub-6469211032618440';
export const ANALYTICS_ID = 'G-EEVT7MW5MC';
export const FBS_SCRIPT_ID = '16877ddb93aa3967ed413ac6c4c849e9c4131f50a597b2e1b5535b6deeb5172a';
```

## Styling

Ad-specific styles are in `/src/components/AdSense.css`:
- Responsive design
- Loading animations
- Hover effects
- Mobile optimization

## Testing

To test the implementation:

1. **Consent Flow**: Visit site and verify consent banner appears
2. **Ad Loading**: Accept consent and verify ads load properly
3. **Analytics**: Check Google Analytics for tracking data
4. **Responsive**: Test on various device sizes
5. **Performance**: Verify no blocking of main content

## Maintenance

### Adding New Ad Positions
1. Import `GoogleAdSense` component
2. Import `useAds` hook
3. Add component with appropriate props:
```jsx
<GoogleAdSense 
  userConsent={userConsent}
  adFormat="horizontal"
  className="my-ad-class"
/>
```

### Updating Ad Configuration
- Modify constants in `/src/hooks/useAds.ts`
- Update component imports if needed
- Test in development environment

## Migration Notes

Successfully migrated from Jekyll's `_includes/head/custom.html`:
- ✅ Google AdSense integration
- ✅ Google Analytics tracking  
- ✅ FBS Partner script
- ✅ User consent management
- ✅ GDPR compliance
- ✅ Mobile responsiveness
- ✅ Performance optimization

The React implementation provides better user control, performance, and maintainability compared to the previous Jekyll implementation.
