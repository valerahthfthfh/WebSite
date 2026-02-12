import React, { useEffect } from 'react';
import './App.css';
import Header from '../src/layout/header/header'
import MainForm from '../src/layout/form/main-form'
import MapKit from './layout/mapKit/MapKit'
import InfiniteSlider from './layout/infiniteSlider/InfiniteSlider'
import Why from './layout/why/Why'
import Service from './layout/servic/Service'
import TimeBlock from './layout/timeBlock/TimeBlock'
import Data from './layout/сardSlider/Data'
import Footer from './layout/footer/Footer'
import SectionGlobal from './layout/sectionGlobal/SectionGlobal'

function App() {
  useEffect(() => {
    var widget_id = 'NhrSDE7n5m';
    var d = document;
    var w = window;
    
    function loadJivo() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//code.jivo.ru/widget/' + widget_id;
      var ss = document.getElementsByTagName('script')[0];
      ss.parentNode.insertBefore(s, ss);
    }

    if (d.readyState === 'complete') {
      loadJivo();
    } else {
      if (w.attachEvent) {
        w.attachEvent('onload', loadJivo);
      } else {
        w.addEventListener('load', loadJivo, false);
      }
    }

    // Cleanup function (опционально)
    return () => {
      // Удаляем скрипт при размонтировании компонента
      const jivoScript = document.querySelector('script[src*="jivo"]');
      if (jivoScript) {
        jivoScript.remove();
      }
      // Также удаляем глобальный объект Jivo
      delete window.jivo_onload;
      delete window.jivo_init;
    };
  }, []);

  return (
    <div className="App">

      <Header />
      <MainForm />
      <InfiniteSlider />
      <Why />
      <TimeBlock />
      <Service />
      <Data />
      <MapKit />
      <SectionGlobal />
      <Footer />
    </div>
  );
}

export default App;