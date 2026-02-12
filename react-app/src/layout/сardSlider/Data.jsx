// App.js
import React, { useState } from 'react';
import './Data.css';
import CardSlider from './CardSlider';

function Data() {
  const testimonials = [
    {
      id: 2,
      name: "Николай Юсов",
      image: "https://60.img.avito.st/image/1/1.r5vejrayFXIMSeXdgeFKcGolCRQMLQE._CpKhCWTNwlK1grrNUM248x6EgD8UayLA5xwN2MUjGA",
      content: "Газовая колонка, под замену. Образование льда в трубках. Разорвало на изгибе. Отремонтировал,заверил. Работает.",
      rating: 5
    },
    {
      id: 3,
      name: "Максим Семенов",
      image: "https://static.avito.ru/stub_avatars/М/0_48x48.png",
      content: "Мастер приехал, помог устранить проблему. Большое спасибо, моемся теплой водичкой )))",
      rating: 5
    },
    {
      id: 4,
      name: "Светлана Кузеванова",
      image: "https://40.img.avito.st/image/1/1.lQIH-LayL-vVP6tEEaNi6bNTM43VWzs.F-xMziQ_r-33588sgBHcUVNkAoFyBkY6CPVThUpwhLE",
      content: "Единственный мастер кто согласился и отремонтировал настенный навьен! Спасибо мастеру за качественный подход и хороший сервис!",
      rating: 5
    },
    {
      id: 5,
      name: "Иван",
      image: "https://static.avito.ru/stub_avatars/И/2_48x48.png",
      content: "Спасибо за ремонт газового котла! Всё работает. Сделано оперативно, качественно.",
      rating: 5
    },
    {
      id: 6,
      name: "Sdfg",
      image: "https://30.img.avito.st/image/1/1.Qf8V0Lax-xbHF1f6XagWFqNx5xzHF-8U.NEfvVfZlKyNVANCQmsLpwcRF0olyQ5Fur5dqLMXuzrY?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q==",
      content: "Заменили датчик температуры на котле. Котел снова работает. Приехал очень быстро. Все отлично.",
      rating: 5
    },
    {
      id: 8,
      name: "Дмитрий",
      image: "https://static.avito.ru/stub_avatars/Д/13_48x48.png",
      content: "Все нормально, колонку газовую отремонтировали. Все плгоавиллсь",
      rating: 5
    },
    {
      id: 9,
      name: "иван",
      image: "https://00.img.avito.st/image/1/1.t63267ayDUQkLM2jiLUBRkJAESIkSBk.Zj1Oq0awOGVXiL22SwIoZPwodSCj_wmIKVxRQTSRq4Q?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q==",
      content: "Мастер починил котел. Все качественно и быстро",
      rating: 5
    },
    {
      id: 11,
      name: "Мария",
      image: "https://80.img.avito.st/image/1/1.rLd26baxFl6kLuDhCfaMXsBIClSkLgJc.l21FHTcF3FuS8zlS2Gp8qy1EbpcRGAas_At4U2hsulU",
      content: "Все супер. Договорились о дне когда приедет чинить газовую колонку. Всегда был на связи. Приехал, быстро нашел в чем проблема, починил. Еще и гарантия полгода",
      rating: 5
    },
    {
      id: 13,
      name: "Светлана Кузеванова",
      image: "https://90.img.avito.st/image/1/1._04i77axRafwKJV5S-bpp5ROWa3wKFGl.BR_k0y48YYOZi6KuT_X_E52iULks2AZ8AvVUPmLxgHw",
      content: "Михаил приехал быстро. Быстро нашел причину, подсказал где купить и как заменить деталь самостоятельно. Работой доволен. Спасибо, Рекомендую.",
      rating: 5
    },
    {
      id: 14,
      name: "Олеся",
      image: "https://static.avito.ru/stub_avatars/О/12_48x48.png",
      content: "Спасибо огромное , даже выходной день приехал и сделал ... Огромное спасибо , маленькими детьми для меня такое горе колонка не работает когда . спасибо",
      rating: 5
    },
  ];

  return (
    <div className="Data">

      <div className="hero-text-data">
        <h1 className="hero-logo-data">Котл<span>OFF</span> service</h1>
        <h2 className="hero-title-data">Отзывы от наших <span>клиентов</span></h2>
      </div>

      <div className="Data-main">
      
        <CardSlider testimonials={testimonials} />
      </div>

      <div className='baga-hud'>
        <div className='baga-hud-title'>
          <h2>100<span>%</span></h2>
          <h2>100<span>+</span></h2>
          <h2>1<span>г</span></h2>
          <h2>800<span>+</span></h2>
        </div>
        <div className='baga-hud-text'>
          <p>Надежность</p>
          <p>Обращений</p>
          <p>Гарантия</p>
          <p>Довольных клиентов</p>
        </div>
      </div>
    </div>
  );
}

export default Data;