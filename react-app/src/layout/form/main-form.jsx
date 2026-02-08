import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

function MainForm() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwlNH38uZ50j_nHIAL1eZy6zrfiX19v56UBB3n2J0VuK_sPxZg2Pg8Dx1lD9AxaZxpd/exec';
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [botStatus, setBotStatus] = useState('unknown');
  
 
  const BOT_TOKEN = '8033399130:AAGI_89YLNq-FBrD5CacJK0bBSqtC7hwSdc';
  
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

  // Проверка доступности бота
  useEffect(() => {
    checkBotStatus();
  }, []);

  const checkBotStatus = async () => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
      if (response.ok) {
        setBotStatus('online');
      } else {
        setBotStatus('offline');
      }
    } catch (error) {
      setBotStatus('offline');
    }
  };

  // Function to save data to Firebase
  const saveToFirebase = async (name, phone, comment) => {
    try {
      const dataFormRef = ref(database, 'dataForm');
      const newDataRef = push(dataFormRef);
      
      await set(newDataRef, {
        name: name,
        phone: phone,
        comment: comment,
        timestamp: new Date().toISOString(),
        source: 'website_form'
      });
      
      console.log('Данные сохранены в Firebase:', { name, phone, comment });
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении в Firebase:', error);
      return false;
    }
  };

  // Function to send data to Telegram via direct method
  const sendToTelegramDirect = async (name, phone, comment) => {
    try {
      // Получаем список админов из вашего бота
      // ВАЖНО: Вам нужно будет добавить в бота функцию для возврата списка админов
      // Пока используем статический список или другой метод
      
      const admins = [804822685]; // Главный админ
      // Можно расширить список, если нужно
      
      let sentCount = 0;
      const errors = [];
      
      // Форматируем сообщение
      const timeNow = new Date().toLocaleTimeString('ru-RU');
      const dateNow = new Date().toLocaleDateString('ru-RU');
      const appId = new Date().getTime();
      
      const message = `🚨 <b>НОВАЯ ЗАЯВКА С САЙТА!</b>

👤 <b>ФИО:</b> ${name}
📞 <b>Телефон:</b> ${phone}
💬 <b>Комментарий:</b> ${comment || 'Не указан'}
📅 <b>Дата:</b> ${dateNow}
⏰ <b>Время:</b> ${timeNow}
🌐 <b>Источник:</b> Веб-сайт

🆔 <b>ID заявки:</b> <code>${appId}</code>`;
      
      // Отправляем каждому админу
      for (const adminId of admins) {
        try {
          const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: adminId,
              text: message,
              parse_mode: 'HTML'
            })
          });
          
          const result = await response.json();
          
          if (result.ok) {
            sentCount++;
            console.log(`✅ Отправлено админу ${adminId}`);
          } else {
            errors.push(`Админ ${adminId}: ${result.description}`);
          }
        } catch (error) {
          errors.push(`Админ ${adminId}: ${error.message}`);
        }
      }
      
      if (sentCount > 0) {
        console.log(`📊 Отправлено ${sentCount}/${admins.length} админам`);
        return { success: true, sentCount, errors };
      } else {
        console.error('❌ Не удалось отправить ни одному админу:', errors);
        return { success: false, sentCount: 0, errors };
      }
      
    } catch (error) {
      console.error('❌ Ошибка отправки в Telegram:', error);
      return { success: false, sentCount: 0, errors: [error.message] };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccess(false);

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

    // Валидация телефона
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      alert('Пожалуйста, введите корректный номер телефона');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Сохраняем в Firebase
      const firebaseSuccess = await saveToFirebase(name, phone, comment);
      
      // 2. Отправляем в Google Sheets
      const formData = new FormData(form);
      const sheetsResponse = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });
      console.log('✅ Данные отправлены в Google Sheets');
      
      // 3. Отправляем в Telegram
      const telegramResult = await sendToTelegramDirect(name, phone, comment);
      
      if (telegramResult.success) { 
        setShowSuccess(true);
        form.reset();
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        
      }
      
    } catch (error) {
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
            
            {/* Сообщение об успехе */}
            {showSuccess && (
              <div className="success-message">
                Заявка успешно отправлена! Мастер свяжется с вами в течение 7 минут.
              </div>
            )}
            
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
      
      {/* Стили для статуса */}
      <style jsx>{`
        .bot-status {
          margin-bottom: 15px;
          padding: 8px 12px;
          background: #f5f5f5;
          border-radius: 6px;
          font-size: 14px;
          color: #666;
        }
        .status-dot {
          margin-left: 8px;
          font-weight: bold;
        }
        .status-dot.online {
          color: #28a745;
        }
        .status-dot.offline {
          color: #dc3545;
        }
        .success-message {
          margin: 15px 0;
          padding: 12px;
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 6px;
          text-align: center;
          font-weight: bold;
        }
        .form-footer {
          margin-top: 15px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
}

export default MainForm;