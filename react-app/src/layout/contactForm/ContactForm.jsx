import React, { useState } from 'react';
import './ContactForm.css';
import People from '../../shared/img/people.png';

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccess(false);

    if (!phone.trim()) {
      alert('Введите номер телефона');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://kotloff-backend.onrender.com/send-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setPhone('');
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert(result.message || 'Ошибка отправки');
      }
    } catch (error) {
      alert('Не удалось отправить номер');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='contact-form-main' id="contact-form-section"> 
      <div className='input-number-phone'>
        <div className="hero-text">
          <h1 className="hero-logo">Котл<span>OFF</span> service</h1>
          <h2 className="hero-title-g">Мы свяжемся <span>с вами!</span></h2>
        </div>
        <p>Отправьте номер телефона сейчас, чтобы мастер смог вам помочь уже сегодня</p>
        
        {showSuccess && (
          <div className="success-message">
            Номер отправлен! Мастер перезвонит вам
          </div>
        )}
        
        <form onSubmit={handleSubmit} className='fff'>
          <input 
            type="tel" 
            placeholder="+7 (___) __-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      </div>
      <div className='people'>
        <img src={People} alt="a" className='people'/>
      </div>
    </div>
  );
}

export default ContactForm;