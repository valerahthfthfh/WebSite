import React, { useEffect } from 'react';
import './App.css';
import Header from '../src/layout/header/header'
import MainForm from '../src/layout/form/main-form'
import MapKit from './layout/mapKit/MapKit'
import InfiniteSlider from './layout/infiniteSlider/InfiniteSlider'
import Why from './layout/why/Why'
import Service from './layout/servic/Service'
import TimeBlock from './layout/timeBlock/TimeBlock'
import Data from './layout/сardSlider/Data'
function App() {

  useEffect(() => {
    (function(){ var widget_id = 'ВАШ_ID_ВИДЖЕТА';
      var d=document;var w=window;
      function l(){
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivo.ru/widget/'+widget_id;
        var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);
      }
      if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}
    })();
  }, []);
  
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

      <Data>
      </Data>

      <MapKit>
      </MapKit>

      
    <script src="//code.jivo.ru/widget/ot50c6swaQ" async></script>

    </div>
  );
}

export default App;