import React, { useState, useEffect } from 'react';
import './CookieBanner.css';
import YandexMetrika from './YandexMetrika';

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const consentGivenCookie = document.cookie.split('; ').find(row => row.startsWith('userConsent='));
      
      if (consentGivenCookie) {
        setConsentGiven(true);
        setIsVisible(false);
      } else {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const acceptCookies = () => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `userConsent=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    setConsentGiven(true);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <p className="cookie-text">
              <span className="cookie-icon">🍪</span>
              Мы используем файлы cookie, чтобы улучшить вашу работу с сайтом. 
              Продолжая просмотр, вы соглашаетесь с нашей{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>.
            </p>
            <button className="cookie-button" onClick={acceptCookies}>
              Принять
            </button>
          </div>
        </div>
      )}
      
      {consentGiven && <YandexMetrika />}
    </>
  );
}

export default CookieBanner;