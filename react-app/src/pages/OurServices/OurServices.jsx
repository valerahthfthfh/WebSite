import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './OurServices.css';

// Импортируем изображения (пути нужно будет скорректировать под вашу структуру)
import Image1 from '../../shared/img/5233247801859314977.jpg';
import Image2 from '../../shared/img/5233247801859314979.jpg';
import Image3 from '../../shared/img/5233247801859314987.jpg';
import Image4 from '../../shared/img/5233247801859314989.jpg';
import Image5 from '../../shared/img/5233247801859314975.jpg';

function OurServices() {
  const navigate = useNavigate();

  // Функция для возврата на предыдущую страницу
  const goBack = () => {
    navigate(-1);
  };

  // Функция для перехода на главную и прокрутки к форме
  const goToHomeAndScrollToForm = () => {
    navigate('/');
    // Даем время на загрузку страницы, затем прокручиваем к форме
    setTimeout(() => {
      const mainForm = document.querySelector('.login-form');
      if (mainForm) {
        mainForm.scrollIntoView({ behavior: 'smooth' });
        mainForm.classList.add('form-highlighted');
        setTimeout(() => {
          mainForm.classList.remove('form-highlighted');
        }, 2000);
      }
    }, 100);
  };

  // Эффект для прокрутки страницы вверх при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Кнопка "Назад" */}
      <button onClick={goBack} className="go-back" aria-label="Назад">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      <div className="wrapper">
        <div className="services-container">
          <h1 className="page-title">Наши услуги</h1>
          <p className="page-subtitle">Профессиональный ремонт бытовой техники</p>

          <div className="services-grid">
            {/* Верхний ряд - 3 карточки */}
            <div className="top-row">
              {/* Карточка 1 */}
              <div className="service-card">
                <div className="service-image">
                  <img src={Image1} alt="Ремонт варочных поверхностей" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">Ремонт варочных поверхностей и духовых шкафов</h3>
                </div>
                <div className="service-footer">
                  <span className="service-price">от 1 001 ₽ за услугу</span>
                </div>
              </div>

              {/* Карточка 2 */}
              <div className="service-card">
                <div className="service-image">
                  <img src={Image2} alt="Ремонт стиральных машин" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">Ремонт стиральных машин</h3>
                </div>
                <div className="service-footer">
                  <span className="service-price">Цена договорная</span>
                </div>
              </div>

              {/* Карточка 3 */}
              <div className="service-card">
                <div className="service-image">
                  <img src={Image3} alt="Ремонт электронных плат" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">Ремонт электронных плат управления, телевизоров</h3>
                </div>
                <div className="service-footer">
                  <span className="service-price">Цена договорная</span>
                </div>
              </div>
            </div>

            {/* Нижний ряд - 2 карточки по центру */}
            <div className="bottom-row">
              {/* Карточка 4 */}
              <div className="service-card">
                <div className="service-image">
                  <img src={Image4} alt="Ремонт газовых котлов" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">Ремонт газовых котлов и газовых колонок</h3>
                </div>
                <div className="service-footer">
                  <span className="service-price">от 999 ₽ за услугу</span>

                </div>
              </div>

              {/* Карточка 5 */}
              <div className="service-card">
                <div className="service-image">
                  <img src={Image5} alt="Ремонт холодильников" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">Ремонт холодильников</h3>
                </div>
                <div className="service-footer">
                  <span className="service-price">Цена договорная</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServices;