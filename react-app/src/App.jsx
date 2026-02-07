import React, { useEffect } from 'react';
import './App.css';

function App() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwlNH38uZ50j_nHIAL1eZy6zrfiX19v56UBB3n2J0VuK_sPxZg2Pg8Dx1lD9AxaZxpd/exec';
  
  useEffect(() => {
    const form = document.forms['submit-to-google-sheet'];
    
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, {
          method: 'POST', 
          body: new FormData(form)
        })
        .then(response => console.log('Success!', response))
        .catch(error => console.log('Error!', error.message));
      });
    }
    
    // Очистка компонента
    return () => {
      if (form) {
        const formClone = form.cloneNode(true);
        form.parentNode.replaceChild(formClone, form);
      }
    };
  }, []);

  return (
    <div className="App">

      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-main">
              Котл<span>OFF</span>
            </div>
            <div className="logo-tagline">
              Профессиональная работа
            </div>
          </div>
          <div className="header-phone">
            <a href="tel:+78001234567" className="phone-number">
              8 (800) 123-45-67
            </a>
            <div className="phone-hours">
              Круглосуточно
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-container">
          {/* Левая часть */}
          <section className="info-section">
            <h1 className="main-title">Профессиональный ремонт</h1>
            <div className="services-list">
              <div className="service-item">
                <h1 className="main-title">Газовых работ</h1>
              </div>
              <div className="service-item">
                <h1 className="main-title">Сантехнических работ</h1>
              </div>
              <div className="service-item">
                <h1 className="main-title">Электромонтаж и электрика</h1>
              </div>
            </div>
            <div className="experience-text">
              <p>C 2012 года Устанавливаем, обслуживаем и<br /> ремонтируем оборудование. <br /> Работаем честно - как для себя.</p>
        
            </div>
          </section>

          {/* Правая часть */}
          <section className="form-section">
            <form action="#" className="login-form" name="submit-to-google-sheet">
              <h2>Вызвать мастера</h2>
              <p>Мастер перезвонит в течение 7 минут*</p>
              <div>
                <p>Как вас зовут?</p>
                <input type="text" name="name" id="name" autoComplete="off" placeholder="Например, Александр"/>
              </div>
              <div>
                <p>Ваш телефон</p>
                <input type="text" name="phone" id="phone" autoComplete="off" placeholder="+7 (__) __-__-__"/>
              </div>
              <div>
                <p>Опишите проблему</p>
                <textarea 
                  name="comment" 
                  id="comment" 
                  autoComplete="off" 
                  placeholder="Например: не включается котел, течет, нет горячей воды"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit">Вызвать мастера бесплатно</button>
            </form>
          </section>
        </div>
      </main>

      
    </div>
  );
}

export default App;