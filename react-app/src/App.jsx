import React, { useEffect } from 'react';
import './App.css';
import Header from '../src/layout/header/header'
import MainForm from '../src/layout/form/main-form'
import MapKit from './layout/mapKit/MapKit'
import InfiniteSlider from './layout/infiniteSlider/InfiniteSlider'
import Why from './layout/why/Why'
import Service from './layout/servic/Service'
import TimeBlock from './layout/timeBlock/TimeBlock'
function App() {
  return (
    <div className="App">

      <Header>
      </Header>
      
      <MainForm> 
      </MainForm>

      <InfiniteSlider>
      </InfiniteSlider>

      <Why>
      </Why>

      <TimeBlock>
      </TimeBlock>

      <Service>
      </Service>

      <MapKit>
      </MapKit>

      

    </div>
  );
}

export default App;