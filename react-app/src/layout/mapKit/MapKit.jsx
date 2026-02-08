import React from 'react';
import './MapKit.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function MapKit() {
  const location = [56.117703, 47.222953];
  
  return (
    <div className="map-section">
      <div className="map-section-inner">
        <div className="map-half-container">
          <div className="map-wrapper">
            <YMaps query={{apikey: 'eab4348a-d22b-45bc-bb1d-1b4714735796'}}>
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
                        <strong>Адрес:</strong> р-н ЛенинскийЧебоксары, ул. П.В. Дементьева, 18к4<br/>
                        <strong>Телефон:</strong> +7 (800) 123-45-67<br/>
                        <strong>Часы работы:</strong> 9:00 - 21:00
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
      </div>
    </div>
  );
}

export default MapKit;