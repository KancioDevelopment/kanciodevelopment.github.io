import { useEffect, useState } from 'react';

// Google AdSense configuration
export const ADSENSE_CLIENT_ID = 'ca-pub-6469211032618440';
export const ANALYTICS_ID = 'G-EEVT7MW5MC';
export const FBS_SCRIPT_ID = '16877ddb93aa3967ed413ac6c4c849e9c4131f50a597b2e1b5535b6deeb5172a';

// Hook to manage ad loading and user experience
export const useAds = () => {
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [userConsent, setUserConsent] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if user has previously given consent
        const consent = localStorage.getItem('ads-consent');
        if (consent !== null) {
            setUserConsent(consent === 'true');
        }
    }, []);

    const giveConsent = () => {
        setUserConsent(true);
        localStorage.setItem('ads-consent', 'true');
    };

    const denyConsent = () => {
        setUserConsent(false);
        localStorage.setItem('ads-consent', 'false');
    };

    return {
        adsLoaded,
        setAdsLoaded,
        userConsent,
        giveConsent,
        denyConsent
    };
};
