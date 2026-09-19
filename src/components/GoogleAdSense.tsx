import React, { useEffect, useRef, useState } from 'react';
import {
    ADSENSE_CLIENT_ID,
    ADSENSE_SLOT_ID,
    ADSENSE_ARTICLE_SLOT_ID,
    ADSENSE_MULTIPLEX_SLOT_ID
} from '../hooks/useAds';
import './AdSense.css';

declare global {
    interface Window {
        adsbygoogle?: Array<Record<string, unknown>>;
    }
}

export type AdSenseUnitType = 'display' | 'in-article' | 'multiplex' | 'custom';

interface GoogleAdSenseProps {
    unitType?: AdSenseUnitType;
    adSlot?: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid' | 'autorelaxed';
    adLayout?: string;
    adLayoutKey?: string;
    minHeight?: number;
    style?: React.CSSProperties;
    className?: string;
    userConsent: boolean | null;
    adLabel?: string;
    variant?: 'default' | 'minimal' | 'premium' | 'featured';
    showLoadingAnimation?: boolean;
}

const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
    unitType = 'display',
    adSlot,
    adFormat,
    adLayout,
    adLayoutKey,
    minHeight,
    style = {},
    className = '',
    userConsent,
    adLabel = 'Advertisement',
    variant = 'default',
    showLoadingAnimation = true
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isPushed = useRef(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isUnfilled, setIsUnfilled] = useState(false);
    const [isAdLoaded, setIsAdLoaded] = useState(false);

    // Resolve slot & format configuration based on unitType preset
    let resolvedSlot = adSlot;
    let resolvedFormat = adFormat;
    let resolvedLayout = adLayout;
    let defaultMinHeight = 250;

    if (unitType === 'in-article') {
        resolvedSlot = adSlot || ADSENSE_ARTICLE_SLOT_ID;
        resolvedFormat = adFormat || 'fluid';
        resolvedLayout = adLayout || 'in-article';
        defaultMinHeight = 280;
    } else if (unitType === 'multiplex') {
        resolvedSlot = adSlot || ADSENSE_MULTIPLEX_SLOT_ID;
        resolvedFormat = adFormat || 'autorelaxed';
        defaultMinHeight = 280;
    } else if (unitType === 'display') {
        resolvedSlot = adSlot || ADSENSE_SLOT_ID;
        resolvedFormat = adFormat || 'auto';
        defaultMinHeight = 250;
    } else {
        resolvedSlot = adSlot || ADSENSE_SLOT_ID;
        resolvedFormat = adFormat || 'auto';
    }

    const resolvedMinHeight = minHeight || defaultMinHeight;

    // Phase 1: Viewport Intersection Observer (Lazy Loading)
    useEffect(() => {
        if (!userConsent) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.05,
                rootMargin: '150px 0px' // Preload 150px before entering viewport for zero CLS
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [userConsent, isVisible]);

    // Phase 2: Safe Script Injection & Ad Push (SPA Safe)
    useEffect(() => {
        if (userConsent === null || !userConsent || !isVisible) return;

        // Ensure AdSense script is present without duplicate loads
        const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }

        // Initialize ad once visible and not yet pushed
        const initTimer = setTimeout(() => {
            if (!containerRef.current || isPushed.current) return;

            const adElement = containerRef.current.querySelector('.adsbygoogle');
            if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
                try {
                    window.adsbygoogle = window.adsbygoogle || [];
                    window.adsbygoogle.push({});
                    isPushed.current = true;
                } catch (error) {
                    console.warn('AdSense push handled safely:', error);
                }
            }
        }, 100);

        return () => clearTimeout(initTimer);
    }, [userConsent, isVisible]);

    // Phase 3: Observe Unfilled status or successful render
    useEffect(() => {
        if (!containerRef.current) return;

        const adElement = containerRef.current.querySelector('.adsbygoogle');
        if (!adElement) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                    const status = (adElement as HTMLElement).getAttribute('data-ad-status');
                    if (status === 'unfilled') {
                        setIsUnfilled(true);
                    } else if (status === 'filled') {
                        setIsAdLoaded(true);
                    }
                }
            });
        });

        observer.observe(adElement, { attributes: true });

        return () => observer.disconnect();
    }, [isVisible]);

    // Do not render anything if user has explicitly denied or not yet accepted consent
    if (userConsent === null || !userConsent || isUnfilled) {
        return null;
    }

    // Determine ad unit styles
    const adStyle: React.CSSProperties = {
        display: 'block',
        minHeight: `${resolvedMinHeight}px`,
        width: '100%',
        ...(unitType === 'in-article' ? { textAlign: 'center' } : {}),
        ...style
    };

    const containerClasses = [
        'adsense-container',
        `variant-${variant}`,
        `ad-unit-${unitType}`,
        isAdLoaded ? 'ad-loaded' : 'is-loading',
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            style={{
                minHeight: `${resolvedMinHeight}px`,
                margin: '36px auto',
                ...style
            }}
            data-ad-label={adLabel}
            aria-label="Advertisement Container"
        >
            <div className="ad-label-overlay">{adLabel}</div>

            {/* Subtle placeholder while waiting for ad content */}
            {!isAdLoaded && showLoadingAnimation && (
                <div className="ad-skeleton-placeholder" aria-hidden="true" />
            )}

            {isVisible && (
                <ins
                    className="adsbygoogle"
                    style={adStyle}
                    data-ad-client={ADSENSE_CLIENT_ID}
                    data-ad-slot={resolvedSlot}
                    data-ad-format={resolvedFormat}
                    {...(resolvedLayout ? { 'data-ad-layout': resolvedLayout } : {})}
                    {...(adLayoutKey ? { 'data-ad-layout-key': adLayoutKey } : {})}
                    {...(resolvedFormat !== 'fluid' && resolvedFormat !== 'autorelaxed'
                        ? { 'data-full-width-responsive': 'true' }
                        : {})}
                />
            )}
        </div>
    );
};

export default GoogleAdSense;
