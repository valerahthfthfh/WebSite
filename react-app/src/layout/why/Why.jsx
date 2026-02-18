import React from 'react';
import './Why.css';
import Lightning from '../../shared/img/молния.png';
import House from '../../shared/img/дома.png';
import Tool from '../../shared/img/инструменты.png';

function Why() {
  // Функция для прокрутки к форме и её подсветки
  const scrollToFormAndHighlight = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    
    const mainForm = document.querySelector('.login-form');
    if (mainForm) {
      mainForm.scrollIntoView({ behavior: 'smooth' });
      mainForm.classList.add('form-highlighted');
      setTimeout(() => {
        mainForm.classList.remove('form-highlighted');
      }, 2000);
    }
  };

  return (
    <div className="container" id="why-section">
        <main className="main-content">
            <section className="hero">
                <div className="hero-text">
                    <h1 className="hero-logo">Котл<span>OFF</span> service</h1>
                    <h2 className="hero-title">Почему стоит выбрать нас?</h2>
                </div>

                <div className="hero-button">
                    <div className="space"></div>
                    <a href="#" className="cta-button" onClick={scrollToFormAndHighlight}>Узнать подробнее</a>
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
                                <a href="#" onClick={scrollToFormAndHighlight}>Заказать</a>
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
                                <a href="#" onClick={scrollToFormAndHighlight}>Заказать</a>
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
                                <a href="#" onClick={scrollToFormAndHighlight}>Заказать</a>
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