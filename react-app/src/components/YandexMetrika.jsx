import React, { useEffect, useRef } from 'react';

const YandexMetrika = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    
    if (!document.querySelector('script[src*="metrika/tag.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://mc.yandex.ru/metrika/tag.js?id=106884792';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (typeof window.ym === 'function') {
          window.ym(106884792, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        }
      };
    }

    const noscriptImg = document.createElement('noscript');
    const div = document.createElement('div');
    const img = document.createElement('img');
    
    img.src = 'https://mc.yandex.ru/watch/106884792';
    img.style.position = 'absolute';
    img.style.left = '-9999px';
    img.alt = '';
    
    div.appendChild(img);
    noscriptImg.appendChild(div);
    document.body.appendChild(noscriptImg);
    
    isInitialized.current = true;

    return () => {
     
      const noscriptElements = document.querySelectorAll('noscript');
      noscriptElements.forEach(el => {
        if (el.innerHTML && el.innerHTML.includes('mc.yandex.ru/watch/106884792')) {
          el.remove();
        }
      });
    };
  }, []);

  return null;
};

export default YandexMetrika;