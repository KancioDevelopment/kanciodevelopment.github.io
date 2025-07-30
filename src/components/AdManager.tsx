import React from 'react';
import { useAds } from '../hooks/useAds';
import GoogleAnalytics from './GoogleAnalytics';
import FBSPartner from './FBSPartner';
import CookieConsent from './CookieConsent';

const AdManager: React.FC = () => {
    const { userConsent, giveConsent, denyConsent } = useAds();

    return (
        <>
            {/* Cookie Consent Banner */}
            <CookieConsent
                isVisible={userConsent === null}
                onAccept={giveConsent}
                onDecline={denyConsent}
            />

            {/* Analytics and Partner Scripts */}
            <GoogleAnalytics userConsent={userConsent} />
            <FBSPartner userConsent={userConsent} />
        </>
    );
};

export default AdManager;
