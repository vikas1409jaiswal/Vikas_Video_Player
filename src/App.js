import React from 'react';
import './App.css';
import MaterialUiDemo from './Components/MaterialUiDemo';
import PageBodyContainer from './Components/PageBodyContainer';
import ReactVideoPlayer from './Components/ReactVideoPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>React Video Player</h1>
       <marquee>Welcome to our player, you will be better experiencing video watch now</marquee>
       {/* <MaterialUiDemo/>
       <ReactVideoPlayer/> */}
       <PageBodyContainer/>
      </header>
    </div>
  );
}

export default App;
