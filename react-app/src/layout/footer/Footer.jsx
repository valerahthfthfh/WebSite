import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link вместо useNavigate
import './Footer.css';
import Av1 from '../../shared/icon/av1.png';
import Tel1 from '../../shared/icon/tel1.png';

function Footer() {
  // Функция для прокрутки к блоку Why (О нас)
  const scrollToWhy = () => {
    const whySection = document.getElementById('why-section');
    if (whySection) {
      whySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Функция для прокрутки к блоку Service (Наши работы)
  const scrollToService = () => {
    const serviceSection = document.getElementById('services-section');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Функция для прокрутки к блоку Data (Отзывы)
  const scrollToData = () => {
    const dataSection = document.getElementById('data-section');
    if (dataSection) {
      dataSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Функция для прокрутки к блоку ContactForm (Контакты)
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <h2>Котл<span>OFF</span></h2>
          <p>Сервис по ремонту бытовой техники <br /> и систем отопления.</p>
          
          <div className="footer-social">
            <a 
              href="https://www.avito.ru/brands/4dee9d7057af26f1f76d19be9bf29d58/all/bytovaya_tehnika?src=sharing&sellerId=7b28bfe8dc5c22181eaf9486ca056e5e" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src={Av1} alt="Avito" className='footer-social-icon'/>
            </a>
            
            <a  
              href="https://t.me/kotloffgazsupportbot?start=MTkuNHB1NWdJS1NOOVY" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src={Tel1} alt="Telegram" className='footer-social-icon'/>
            </a>
          </div>
        </div>

        <div className="footer-content">
          <h4>Компания</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToWhy(); }}>О нас</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToService(); }}>Наши работы</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToData(); }}>Отзывы</a></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Информация</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Пользовательское соглашение</a></li>
            <li><Link to="/privacy-policy">Обработка персональных данных</Link></li>
            <li><Link to="/privacy-policy">Cooke</Link></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Помощь</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>Контакты</a></li>
            <li><a href="https://github.com/valerahthfthfh/WebSite"
              target="_blank" 
              rel="noopener noreferrer">Разработчики</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>FAQ</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;