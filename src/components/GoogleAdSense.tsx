import React, { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT_ID } from '../hooks/useAds';
import './AdSense.css';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface GoogleAdSenseProps {
    adSlot?: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    style?: React.CSSProperties;
    className?: string;
    userConsent: boolean | null;
}

const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
    adSlot = 'auto',
    adFormat = 'auto',
    style = {},
    className = '',
    userConsent
}) => {
    const adRef = useRef<HTMLDivElement>(null);
    const isScriptLoaded = useRef(false);
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!userConsent) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px 0px' // Load ad 100px before it comes into view
            }
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [userConsent, isVisible]);

    useEffect(() => {
        if (userConsent === null || !userConsent || !isVisible) return;

        // Load AdSense script only once and when needed
        if (!isScriptLoaded.current) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
            script.crossOrigin = 'anonymous';
            script.onerror = () => {
                console.warn('AdSense script failed to load');
                setHasError(true);
            };
            document.head.appendChild(script);
            isScriptLoaded.current = true;
        }

        // Initialize ad when script is loaded
        const initAd = () => {
            try {
                if (window.adsbygoogle && isVisible) {
                    const adElement = adRef.current?.querySelector('.adsbygoogle');
                    if (adElement) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    }
                }
            } catch (error) {
                console.warn('AdSense initialization error:', error);
                setHasError(true);
            }
        };

        // Wait a bit for script to load, then initialize
        const timer = setTimeout(initAd, 300);

        return () => clearTimeout(timer);
    }, [userConsent, isVisible]);

    // Don't render if no consent
    if (userConsent === null || !userConsent) {
        return null;
    }

    // Show error state gracefully
    if (hasError) {
        return (
            <div className={`adsense-container adsense-error ${className}`} style={style}>
                <div className="ad-placeholder">
                    <p>Content loading...</p>
                </div>
            </div>
        );
    }

    // Show loading placeholder until visible
    if (!isVisible) {
        return (
            <div
                ref={adRef}
                className={`adsense-container adsense-loading ${className}`}
                style={style}
            >
                <div className="ad-placeholder">
                    <div className="loading-animation"></div>
                </div>
            </div>
        );
    }

    const adStyle: React.CSSProperties = {
        display: 'block',
        minHeight: '100px',
        width: '100%',
        ...style
    };

    return (
        <div
            ref={adRef}
            className={`adsense-container ${className}`}
            style={{ textAlign: 'center', margin: '20px 0', ...style }}
        >
            <ins
                className="adsbygoogle"
                style={adStyle}
                data-ad-client={ADSENSE_CLIENT_ID}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default GoogleAdSense;
