import React from 'react';
import './CookieConsent.css';

interface CookieConsentProps {
    isVisible: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
    isVisible,
    onAccept,
    onDecline
}) => {
    if (!isVisible) return null;

    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-consent-banner">
                <div className="cookie-consent-content">
                    <h3>🍪 Cookie & Ads Consent</h3>
                    <p>
                        We use cookies and display ads to improve your experience and support our services.
                        By accepting, you agree to our use of analytics cookies and advertising content.
                    </p>
                    <div className="cookie-consent-buttons">
                        <button
                            className="cookie-btn cookie-btn-accept"
                            onClick={onAccept}
                        >
                            Accept All
                        </button>
                        <button
                            className="cookie-btn cookie-btn-decline"
                            onClick={onDecline}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
