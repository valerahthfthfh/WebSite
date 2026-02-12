import React, { useState } from 'react';

function MainForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // URL нашего NestJS бэкенда
  const BACKEND_URL = 'http://localhost:5000/send-request';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccess(false);

    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const comment = form.comment.value.trim();

    // Базовая проверка
    if (!name || !phone) {
      alert('Пожалуйста, заполните имя и телефон');
      setIsLoading(false);
      return;
    }

    try {
      // Отправляем данные в наш бэкенд
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, comment }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        form.reset();
        
        // Скрываем сообщение об успехе через 5 секунд
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        
        console.log('Заявка успешно отправлена:', result);
      } else {
        alert(result.message || 'Ошибка отправки заявки');
      }
      
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Не удалось отправить заявку. Проверьте подключение к интернету.');
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

          <div className='button-rega'>
            <button className='button-1'>Узнать больше</button>
            <button className='button-2'>Отправить заявку</button>
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
      
      {/* Стили */}
      <style jsx>{`
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