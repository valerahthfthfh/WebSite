import React, { useState } from 'react';

function MainForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const BACKEND_URL = 'http://localhost:5000/send-request';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccess(false);

    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const comment = form.comment.value.trim();

    if (!name || !phone) {
      alert('Пожалуйста, заполните имя и телефон');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        form.reset();
        setTimeout(() => setShowSuccess(false), 5000);
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
            <p>
              C 2012 года Устанавливаем, обслуживаем и<br /> ремонтируем оборудование. <br /> Работаем честно —
              как для себя.
            </p>
          </div>

          <div className="button-rega">
            <button className="button-1">Узнать больше</button>
            <button className="button-2">Отправить заявку</button>
          </div>
        </section>

        <section className="form-section">
          <form
            onSubmit={handleSubmit}
            className="login-form"
            name="submit-to-google-sheet"
            id="dataForm"
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

            {showSuccess && (
              <div className="success-overlay">
                <div className="success-content">
                  <div className="checkmark">✓</div>
                  <p className="success-text">
                    Заявка успешно отправлена!<br />
                    Мастер свяжется с вами в течение 7 минут.
                  </p>
                </div>
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

      <style jsx>{`
        .login-form {
          position: relative; /* для позиционирования оверлея */
        }

        .success-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          z-index: 10;
          animation: fadeIn 0.3s ease;
        }

        .success-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          max-width: 90%;
        }

        .checkmark {
          width: 100px;
          height: 100px;
          background-color: #4caf50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 60px;
          font-weight: bold;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
          animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .success-text {
          text-align: center;
          color: #2f3542;
          font-size: 18px;
          line-height: 1.5;
          font-weight: 500;
          margin: 0;
          animation: fadeInUp 0.3s ease 0.1s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          0% { transform: scale(0); }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .checkmark {
            width: 70px;
            height: 70px;
            font-size: 45px;
          }
          .success-text {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .checkmark {
            width: 60px;
            height: 60px;
            font-size: 38px;
          }
          .success-text {
            font-size: 14px;
          }
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