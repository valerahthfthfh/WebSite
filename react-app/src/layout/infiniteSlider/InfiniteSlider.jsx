// InfiniteSlider.jsx
import React from 'react';
import './InfiniteSlider.css';

function InfiniteSlider() {
  const services = [
    "Ремонт газовых котлов",
    "Ремонт водонагревателей", 
    "Монтаж системного отопления",
    "Ремонт стиральных машин",
    "Ремонт холодильников",
    "Ремонт духовых шкафов",
    "Ремонт бытовой техники"
  ];
  
  const duplicatedServices = [...services, ...services];
  
  return (
    <div className="slider">
      <div className='list'>
        {duplicatedServices.map((service, index) => (
          <div key={index} className='item'>
            <p>{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteSlider;