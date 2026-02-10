import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './MapKit.css';

function ContactSection() {
  const location = [56.117703, 47.222953];
  
  return (
    <div className="contact-container">
      <div className="content-wrapper">
        {/* Левая часть с картой */}
        <div className="left-section">
          <div className="map-wrapper">
            <YMaps query={{ apikey: 'eab4348a-d22b-45bc-bb1d-1b4714735796' }}>
              <Map
                defaultState={{ 
                  center: location, 
                  zoom: 14
                }}
                width="100%"
                height="100%"
                className="yandex-map"
              >
                <Placemark
                  geometry={location}
                  properties={{
                    balloonContentHeader: 'Наш офис',
                    balloonContentBody: `
                      <div style="padding: 10px;">
                        <strong>Адрес:</strong> г.Чебоксары р-н Ленинский, ул. П.В. Дементьева, 18к4<br/>
                        <strong>Телефон:</strong> +7 (800) 123-45-67<br/>
                        <strong>Часы работы:</strong> пн-пт 09:00–21:00, сб 09:00–18:00
                      </div>
                    `,
                    hintContent: 'Нажмите для информации'
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'https://cdn-icons-png.flaticon.com/512/8924/8924470.png',
                    iconImageSize: [60, 60],
                    iconImageOffset: [-40, -50],
                    balloonCloseButton: true,
                    hideIconOnBalloonOpen: false
                  }}
                  modules={[
                    'geoObject.addon.balloon',
                    'geoObject.addon.hint'
                  ]}
                />
              </Map>
            </YMaps>
          </div>
        </div>
        
        {/* Правая часть с контактной информацией */}
        {/* <div className="right-section">
          <div className="contact-info">
            <div className="address-block">
              <div className="header-section">
                <h1 className="main-title">Мы приедем очень быстро вам на помощь</h1>
              </div>
              <h3 className="section-title">Адрес</h3>
              <p className="address-text">
                <strong>г.Чебоксары р-н Ленинский,</strong><br />
                ул. П.В. Дементьева, 18к4
              </p>
              <div className="working-hours">
                <p><strong>📞 пн-пт 09:00–21:00</strong></p>
                <p><strong>сб 09:00–18:00</strong></p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="contacts-block">
              <h3 className="section-title">Связаться с нами</h3>
              <a href="tel:+78001234567" className="phone-link">
                <strong>+7 (800) 123-45-67</strong>
              </a>
              <a href="mailto:kotloff30@gmail.com" className="email-link">
                <span className="email-icon">✉️</span> kotloff30@gmail.com
              </a>
            </div>
            
            <div className="divider"></div>
            
            <div className="callback-block">
              <h3 className="section-title">Заказать звонок</h3>
              <button className="callback-button">
                Оставить заявку
              </button>
            </div>
            
            <div className="divider"></div>
            
            <div className="footer-note">
              <p>Все права защищены</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ContactSection;