import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import FAQ from './pages/faq/FAQ'; 
import Arr from './shared/icon/arr.png';
import CookieBanner from './components/CookieBanner';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import OurServices from './pages/OurServices/OurServices';

// Компонент для главной страницы
function HomePage() {
  const [showButton, setShowButton] = useState(false);

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
    <>
      <Header />
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
        <img src={Arr} alt="arr" />
      </button>

      <CookieBanner />
    </>
  );
}

function App() {
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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} /> 
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/services" element={<OurServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;