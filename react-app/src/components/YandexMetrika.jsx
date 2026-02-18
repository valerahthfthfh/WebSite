import React, { useState, useEffect } from 'react';
import './CookieBanner.css';
import YandexMetrika from './YandexMetrika';

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли в cookie метка о согласии
    const consentGivenCookie = document.cookie.split('; ').find(row => row.startsWith('userConsent='));
    
    if (consentGivenCookie) {
      // Если согласие уже было, не показываем баннер и включаем аналитику
      setIsVisible(false);
      setConsentGiven(true);
    } else {
      // Если согласия нет, показываем баннер через небольшую задержку
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // Устанавливаем куку с сроком действия на 1 год
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `userConsent=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    // Включаем аналитику
    setConsentGiven(true);
    // Скрываем баннер
    setIsVisible(false);
  };

  return (
    <>
      {/* Баннер показывается, только если видимость включена */}
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
      
      {/* Аналитика рендерится, только если согласие получено */}
      {consentGiven && <YandexMetrika />}
    </>
  );
}

export default CookieBanner;