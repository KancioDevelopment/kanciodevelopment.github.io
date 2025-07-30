import { useEffect } from 'react';
import { FBS_SCRIPT_ID } from '../hooks/useAds';

interface FBSPartnerProps {
    userConsent: boolean | null;
}

const FBSPartner: React.FC<FBSPartnerProps> = ({ userConsent }) => {
    useEffect(() => {
        if (userConsent === null || !userConsent) return;

        // Load FBS Partner script
        const script = document.createElement('script');
        script.id = FBS_SCRIPT_ID;
        script.async = true;
        script.src = `https://fbs.partners/banner/${FBS_SCRIPT_ID}/8007/script.js?ibp=12923725`;
        script.onerror = () => {
            console.warn('FBS Partner script failed to load');
        };

        document.head.appendChild(script);

        return () => {
            // Clean up script on unmount
            const existingScript = document.getElementById(FBS_SCRIPT_ID);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [userConsent]);

    return null; // This component doesn't render anything
};

export default FBSPartner;
