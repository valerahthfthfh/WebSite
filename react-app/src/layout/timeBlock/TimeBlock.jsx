import React from 'react';
import './TimeBlock.css';
import Pig from '../../shared/img/свинка.png';
import TimeIcon from '../../shared/img/время.png';
import StarIcon from '../../shared/img/звезда.png';
import ShieldIcon from '../../shared/img/щит.png';

function TimeBlock() {
  return (
    <div className="time-block-wrapper">
      <div className="time-block-container">
        <main className="main-content">
          <section className="time-section">
            <div className="advantages-grid">
              <div className="advantage-item">
                <div className="advantage-icon">
                  <img src={Pig} alt="Бесплатная диагностика" className="icon-image" />
                </div>
                <h3 className="advantage-title">Бесплатная диагностика</h3>
                <p className="advantage-text">
                  Мастер диагностирует в месте поломки
                </p>
              </div>
              
              <div className="advantage-item">
                <div className="advantage-icon">
                  <img src={ShieldIcon} alt="Гарантия качества" className="icon-image" />
                </div>
                <h3 className="advantage-title">Гарантия качества</h3>
                <p className="advantage-text">
                  Выдаем гарантию на все виды работ от 60 дней
                </p>
              </div>
              
              <div className="advantage-item">
                <div className="advantage-icon">
                  <img src={TimeIcon} alt="Срочность ремонта" className="icon-image" />
                </div>
                <h3 className="advantage-title">Срочность ремонта</h3>
                <p className="advantage-text">
                  Среднее время ремонта не больше 60 минут
                </p>
              </div>
              
              <div className="advantage-item">
                <div className="advantage-icon">
                  <img src={StarIcon} alt="Сертификат инженера" className="icon-image" />
                </div>
                <h3 className="advantage-title">Сертификат инженера</h3>
                <p className="advantage-text">
                  Каждому нашему мастеру выдаётся сертификат
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TimeBlock;