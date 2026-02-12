import React, { useState } from 'react';
import './SectionGlobal.css';
import Hooo from '../../shared/icon/hooo.png'
import Reee from '../../shared/icon/reee.png'

function SectionGlobal() {
  return (
    <div className='sec-w'>
        <div className='section-global'>
            <h1>Ремонт</h1>
            <img src={Hooo} alt="te" className='button-lsde'/>
            <h1>Работы</h1>
            <img src={Reee} alt="te" className='button-lsde'/>
            <h1>Помощь</h1>
        </div>
    </div>
  );
}

export default SectionGlobal;