import React from 'react';
import './Service.css';
import TV from '../../shared/icon/тв.png'
import Battery from '../../shared/icon/батарея.png'
import Heating from '../../shared/icon/Отопление.png'
import Washing from '../../shared/icon/Стиралка.png'
import Fridge from '../../shared/icon/Холодильник.png'
import Hat from '../../shared/icon/шляпа.png'
function Service() {
  return (
    <div class="container" id="services-section">
        <main class="main-content">
            <section class="hero">

                <div className="hero-text">
                        <h1 className="hero-logo">Котл<span>OFF</span> service</h1>
                        <h2 className="hero-title-g">Наши <span>услуги</span></h2>
                </div>

                <div class="hero-button-gg">
                    
                <div class="space-gg">
                    
                </div>
                    <div className='button-sec'>
                        <a href="#" class="cta-button-sec">Отправить заявку </a>
                        <div className='ol'>→</div>
                    </div>
                    
                </div>
                
                <div class="features">
                    <div class="feature">
                        <img src={Heating} alt="Монтаж системы отопления" className="icon-image-stok" />
                        <div>
                            <h4>Монтаж системы <br /> отопления</h4>
                        </div>
                        <div>
                            <p>Надежное тепло для вашего дома. Проект, установка, гарантия.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <img src={Fridge} alt="Ремонт холодильников" className="icon-image-stok" />
                        <div>
                            <h4>Ремонт <br /> холодильников</h4>
                        </div>
                        <div>
                            <p>Срочно вернем холод. Выезд в день обращения. Оригинальные запчасти.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <img src={Washing} alt="Ремонт стиральных машин" className="icon-image-stok" />
                        <div>
                            <h4>Ремонт стиральных <br /> машин</h4>
                        </div>
                        <div>
                            <p>Исправим любую поломку. Не сливает, не крутит, течет? Чиним быстро.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <img src={TV} alt="Ремонт телевизоров" className="icon-image-stok" />
                        <div>
                            <h4>Ремонт <br /> телевизоров</h4>
                        </div>
                        <div>
                            <p>Реставрация изображения и звука. Нет картинки, нет сигнала? Вернем к жизни.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <img src={Battery} alt="Ремонт газовых котлов и колонок" className="icon-image-stok" />
                        <div>
                            <h4>Ремонт газовых <br /> котлов и колонок</h4>
                        </div>
                        <div>
                            <p>Безопасность и горячая вода. Чиним котлы, колонки. Срочный выезд.</p>
                        </div>
                    </div>
                    <div class="feature">
                        <img src={Hat} alt="Ремонт бытовой техники" className="icon-image-stok" />
                        <div>
                            <h4>Ремонт бытовой <br /> техники</h4>
                        </div>
                        <div>
                            <p>Мастер на все руки. Починим любую технику в доме по одному звонку.</p>
                        </div>
                    </div>
                </div>
                
            </section>
        </main>
    </div>
  );
}

export default Service;