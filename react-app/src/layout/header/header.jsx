import React, { useState } from 'react';

function Header() {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    // Номер телефона для копирования (только цифры)
    const phoneNumber = '88001234567';
    
    // Копируем в буфер обмена
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopySuccess(true);
      // Сбрасываем сообщение через 2 секунды
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(err => {
      console.error('Ошибка копирования:', err);
    });
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-main">
            Котл<span>OFF</span>
          </div>
          <div className="logo-tagline">
            Профессиональная работа
          </div>
        </div>
        <div className="header-phone" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
          <a href="tel:+78001234567" className="phone-number">
            8 (800) 123-45-67
          </a>
          <div className="phone-hours">
            {copySuccess ? 'Скопировано!' : 'Круглосуточно'}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;