// components/CardSlider.jsx
import React, { useState, useEffect } from 'react';
import './CardSlider.css';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const CardSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Минимальная дистанция для свайпа
  const minSwipeDistance = 50;

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Обработчики для touch events
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Автопрокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Рендеринг звезд рейтинга
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        size={20} 
        className={`star ${index < rating ? 'filled' : 'empty'}`}
        fill={index < rating ? '#FFD700' : 'none'}
      />
    ));
  };

  return (
    <div className="card-slider-container">
      <div className="cards-container-wrapper">
        <div 
          className="cards-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {testimonials.map((testimonial, index) => {
            // Вычисляем позицию карточки
            let position = 'next';
            if (index === currentIndex) {
              position = 'active';
            } else if (
              index === currentIndex - 1 ||
              (currentIndex === 0 && index === testimonials.length - 1)
            ) {
              position = 'prev';
            }

            return (
              <div 
                key={testimonial.id}
                className={`card ${position}`}
                data-index={index}
              >

                <div className="card-header">
                  <div className="quote-icon">
                    <Quote size={28} />
                  </div>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <div className="card-content">
                  <p className="testimonial-text">"{testimonial.content}"</p>
                </div>
                
                <div className="card-footer">
                  <div className="author-info">
                    <div className="author-image">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`;
                        }}
                      />
                    </div>
                    <div className="author-details">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="slider-controls">
        <button 
          className="slider-nav-btn prev-btn" 
          onClick={handlePrev}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft size={32} />
        </button>  
        <button 
          className="slider-nav-btn next-btn" 
          onClick={handleNext}
          aria-label="Следующий отзыв"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;