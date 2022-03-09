import React from 'react';
import './App.css';
import MaterialUiDemo from './Components/MaterialUiDemo';
import PageBodyContainer from './Components/PageBodyContainer';
import ReactVideoPlayer from './Components/ReactVideoPlayer';
import { SoccerHomePage } from './SoccerManagement/SoccerHomePage';
import {QueryClient, QueryClientProvider} from 'react-query';
import { HomePage } from './EntertainmentManagement/HomePage';

const client = new QueryClient();

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
       <h1 className="App-name">React Video Player</h1>
       <marquee className="moving-subheader">Welcome to our player, you will be better experiencing video watch now</marquee>
       <MaterialUiDemo/>
       <ReactVideoPlayer/>
      </header>      
      {/* <PageBodyContainer/> */}
         <QueryClientProvider client={client}>
      <SoccerHomePage/>
      </QueryClientProvider>
       {/*  <HomePage/>  */}
    </div>
  );
}

export default App;
