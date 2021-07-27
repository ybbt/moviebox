import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import style from './App.module.css'

function App() {
  return (
    <div className={style.App}>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
