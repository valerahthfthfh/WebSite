import React, { useState } from 'react';
import './ContactForm.css';

import People from '../../shared/img/people.png'

function ContactForm() {
  return (
    <div className='contact-form-main'>
        <div className='input-number-phone'>
            <div className="hero-text">
                <h1 className="hero-logo">Котл<span>OFF</span> service</h1>
                <h2 className="hero-title-g">Мы свяжемся <span>с вами!</span></h2>
            </div>
            <p>
                Отправте номер телефона сегодня, чтобы <br /> мастер смог вам помочь уже сейчас.
            </p>
            <div className='fff'>
                <input 
                type="tel" 
                name="phone" 
                id="phone" 
                autoComplete="off" 
                placeholder="+7 (___) __-__-__"
                required/>
                <button>Отправить</button>
            </div>
        </div>
        <div className='people'>
            <img src={People} alt="a" className='people'/>
        </div>
    </div>
  );
}

export default ContactForm;