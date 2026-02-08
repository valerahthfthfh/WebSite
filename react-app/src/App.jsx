import React, { useEffect } from 'react';
import './App.css';
import Header from '../src/layout/header/header'
import MainForm from '../src/layout/form/main-form'
import MapKit from './layout/mapKit/MapKit'
import InfiniteSlider from './layout/infiniteSlider/InfiniteSlider'
function App() {
  return (
    <div className="App">

      <Header>
      </Header>
      
      <MainForm> 
      </MainForm>

      <InfiniteSlider>
      </InfiniteSlider>

      {/* <MapKit>
      </MapKit> */}

      

    </div>
  );
}

export default App;