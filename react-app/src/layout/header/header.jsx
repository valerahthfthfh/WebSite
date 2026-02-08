import React, { useEffect } from 'react';

function Header() {

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
          <div className="header-phone">
            <a href="tel:+78001234567" className="phone-number">
              8 (800) 123-45-67
            </a>
            <div className="phone-hours">
              Круглосуточно
            </div>
          </div>
        </div>
      </header>
  );
}

export default Header;