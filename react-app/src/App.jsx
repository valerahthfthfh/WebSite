import React, { useEffect } from 'react';
import './App.css';
import Header from '../src/layout/header/header'
import MainForm from '../src/layout/form/main-form'
import MapKit from './layout/mapKit/MapKit'
function App() {
  return (
    <div className="App">

      <Header>
      </Header>
      
      <MainForm> 
      </MainForm>

      {/* <MapKit>
      </MapKit> */}

    </div>
  );
}

export default App;