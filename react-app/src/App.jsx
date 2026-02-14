import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../src/layout/header/header';
import MainForm from '../src/layout/form/main-form';
import MapKit from './layout/mapKit/MapKit';
import InfiniteSlider from './layout/infiniteSlider/InfiniteSlider';
import Why from './layout/why/Why';
import Service from './layout/servic/Service';
import TimeBlock from './layout/timeBlock/TimeBlock';
import Data from './layout/сardSlider/Data';
import Footer from './layout/footer/Footer';
import SectionGlobal from './layout/sectionGlobal/SectionGlobal';
import ContactForm from './layout/contactForm/ContactForm';

function App() {
  const [showButton, setShowButton] = useState(false);

  // Jivo Widget
  useEffect(() => {
    const widget_id = 'NhrSDE7n5m';
    const d = document;
    const w = window;

    function loadJivo() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//code.jivo.ru/widget/' + widget_id;
      const ss = document.getElementsByTagName('script')[0];
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

    return () => {
      const jivoScript = document.querySelector('script[src*="jivo"]');
      if (jivoScript) jivoScript.remove();
      delete window.jivo_onload;
      delete window.jivo_init;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
      <div className="App">     
      <Header 
      />
      <MainForm />
      <InfiniteSlider />
      <Why />
      <TimeBlock />
      <Service />
      <Data />
      <MapKit />
      <ContactForm />
      <SectionGlobal />
      <Footer />
      <button
        className={`to-top-btn ${showButton ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}

export default App;