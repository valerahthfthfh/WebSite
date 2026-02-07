import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

function MainForm() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwlNH38uZ50j_nHIAL1eZy6zrfiX19v56UBB3n2J0VuK_sPxZg2Pg8Dx1lD9AxaZxpd/exec';
  const [isLoading, setIsLoading] = useState(false);
  
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2X7jtYJ9NvTG-KNryGPbP1eW2FNEXsEM",
    authDomain: "dataform-a57ff.firebaseapp.com",
    databaseURL: "https://dataform-a57ff-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dataform-a57ff",
    storageBucket: "dataform-a57ff.firebasestorage.app",
    messagingSenderId: "720392117686",
    appId: "1:720392117686:web:90506fad3007fbc103f517"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Function to save data to Firebase
  const saveToFirebase = async (name, phone, comment) => {
    try {
      const dataFormRef = ref(database, 'dataForm');
      const newDataRef = push(dataFormRef);
      
      await set(newDataRef, {
        name: name,
        phone: phone,
        comment: comment,
        timestamp: new Date().toISOString()
      });
      
      console.log('Данные сохранены в Firebase:', { name, phone, comment });
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении в Firebase:', error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const comment = form.comment.value.trim();

    // Basic validation
    if (!name || !phone) {
      alert('Пожалуйста, заполните обязательные поля: Имя и Телефон');
      setIsLoading(false);
      return;
    }

    try {
      // Save to Firebase
      const firebaseSuccess = await saveToFirebase(name, phone, comment);

      // Save to Google Sheets
      const formData = new FormData(form);
      const sheetsResponse = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });

      console.log('Google Sheets success!', sheetsResponse);
      
    } catch (error) {
      console.error('Error!', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <form 
            onSubmit={handleSubmit}
            className="login-form" 
            name="submit-to-google-sheet" 
            id='dataForm'
          >
            <h2>Вызвать мастера</h2>
            <p>Мастер перезвонит в течение 7 минут*</p>
            <div>
              <p>Как вас зовут?</p>
              <input 
                type="text" 
                name="name" 
                id="name" 
                autoComplete="off" 
                placeholder="Например, Александр"
                required
              />
            </div>
            <div>
              <p>Ваш телефон</p>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                autoComplete="off" 
                placeholder="+7 (___) __-__-__"
                required
              />
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
            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? 'Отправка...' : 'Вызвать мастера бесплатно'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default MainForm;