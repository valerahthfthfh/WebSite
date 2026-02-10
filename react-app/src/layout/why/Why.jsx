import React from 'react';
import './Why.css';
import Lightning from '../../shared/img/молния.png';
import House from '../../shared/img/дома.png';
import Tool from '../../shared/img/инструменты.png';

function Why() {
  return (
    <div className="container">
        <main className="main-content">
            <section className="hero">
                <div className="hero-text">
                    <h1 className="hero-logo">Котл<span>OFF</span> service</h1>
                    <h2 className="hero-title">Почему стоит выбрать нас?</h2>
                </div>

                <div className="hero-button">
                    <div className="space"></div>
                    <a href="#" className="cta-button">Узнать подробнее</a>
                </div>
                
                <div className="features">
                    <div className="feature-block">
                        <div className="icon-container">
                            <img src={Tool} alt="Профессиональный ремонт" className="icon-image-st" />
                        </div>
                        <div className="feature-content">
                            <h4>Профессиональный ремонт</h4>
                            <p>Ремонт под ключ от проекта до отделки. Надёжные материалы, чёткие сроки. Создадим для вас современное и уютное пространство.</p>
                            <div className="feature-link">
                                <a href="">Заказать</a>
                                <p>→</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="feature-block">
                        <div className="icon-container">
                            <img src={House} alt="Сантехнические работы" className="icon-image-st" />
                        </div>
                        <div className="feature-content">
                            <h4>Сантехнические работы</h4>
                            <p>Безопасный монтаж газового оборудования. Установка и ремонт всей сантехники. Гарантия на работы.</p>
                            <div className="feature-link">
                                <a href="">Заказать</a>
                                <p>→</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="feature-block">
                        <div className="icon-container">
                            <img src={Lightning} alt="Электромонтаж и электрика" className="icon-image-st" />
                        </div>
                        <div className="feature-content">
                            <h4>Электромонтаж и электрика</h4>
                            <p>Полный спектр услуг: от розетки до проводки. Устраняем неисправности, обеспечиваем безопасность и надёжность.</p>
                            <div className="feature-link">
                                <a href="">Заказать</a>
                                <p>→</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
}

export default Why;