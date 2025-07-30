import { useEffect } from 'react';
import { ANALYTICS_ID } from '../hooks/useAds';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

interface GoogleAnalyticsProps {
    userConsent: boolean | null;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ userConsent }) => {
    useEffect(() => {
        if (userConsent === null) return;

        if (userConsent) {
            // Load Google Analytics script
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
            document.head.appendChild(script);

            // Initialize gtag
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', ANALYTICS_ID, {
                anonymize_ip: true, // GDPR compliance
                send_page_view: true
            });

            // Track page views for SPA
            const handleRouteChange = () => {
                gtag('config', ANALYTICS_ID, {
                    page_path: window.location.pathname + window.location.search
                });
            };

            // Listen for route changes
            window.addEventListener('popstate', handleRouteChange);

            return () => {
                window.removeEventListener('popstate', handleRouteChange);
            };
        }
    }, [userConsent]);

    // Track page view when component mounts or route changes
    useEffect(() => {
        if (userConsent && window.gtag) {
            window.gtag('config', ANALYTICS_ID, {
                page_path: window.location.pathname + window.location.search
            });
        }
    }, [userConsent, window.location.pathname]);

    return null; // This component doesn't render anything
};

export default GoogleAnalytics;
