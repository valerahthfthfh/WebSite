import React from 'react';
import './Footer.css';
import Av1 from '../../shared/icon/av1.png';
import Tel1 from '../../shared/icon/tel1.png';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <h2>Котл<span>OFF</span></h2>
          <p>Сервис профисиональных услуг, в помоще <br /> починки бытовой техники, а также отопления</p>
          <img src={Av1} alt="a" className='button-lsd'/>
          <img src={Tel1} alt="t" className='button-lsd'/>
          <div className="icons">
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
        </div>

        <div className="footer-content">
          <h4>Компания</h4>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Наши работы</a></li>
            <li><a href="#">Отзывы</a></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Информация</h4>
          <ul>
            <li><a href="#">Пользовательское соглашение</a></li>
            <li><a href="#">Обработка персональных данных</a></li>
            <li><a href="#">Cookie</a></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Помощь</h4>
          <ul>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Разработчики</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;