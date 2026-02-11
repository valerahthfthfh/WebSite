import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './MapKit.css';

function MapKit() {
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
        <div className="right-section">
          <div className="contact-info">
            <div className="section-title">
              <h2>Мы приедем очень<br /><span>быстро вам на помощь</span></h2>
            </div>
            
            <div className="address-block">
              <div className="address-row">
                <div className="address-item">
                  <div className="icon-wrapper">
                    <i className="icon-location">📍</i>
                  </div>
                  <div className="text-content">
                    <p className="address-text">
                      <strong>г.Чебоксары р-н Ленинский,</strong>
                      ул. П.В. Дементьева, 18к4
                    </p>
                  </div>
                </div>
                
                <div className="hours-item">
                  <div className="icon-wrapper">
                    <i className="icon-time">🕒</i>
                  </div>
                  <div className="text-content">
                    <p className="working-hours">
                      <strong>пн-пт 09:00–21:00</strong>
                      сб 09:00–18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-title">
              <h3>Связаться с нами</h3>
            </div>
            
            <div className="contacts-row">
              <div className="contact-item">
                <div className="icon-wrapper">
                  <i className="icon-phone">📞</i>
                </div>
                <div className="text-content">
                  <a href="tel:+78001234567" className="phone-link">
                    +7 (800) 123-45-67
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon-wrapper">
                  <i className="icon-email">✉️</i>
                </div>
                <div className="text-content">
                  <a href="mailto:kotloff30@gmail.com" className="email-link">
                    kotloff30@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="action-row">
              <button className="callback-button">
                Заказать звонок
              </button>
              
              <div className="social-icons">
                <a href="#" className="social-link">
                  <i className="icon-social">📱</i>
                </a>
                <a href="#" className="social-link">
                  <i className="icon-social">💬</i>
                </a>
              </div>
            </div>

            <div className="footer-note">
              <p>Все права защищены</p>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default MapKit;