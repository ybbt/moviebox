import React from 'react';

import style from './style.module.css'

import MenuRegion from '../MenuRegion';

function Header() {
  return (
    <div className={style.header} >
      <h1 className={style.title}>
        THEMOVIE<span className={style.bold}>BOX</span>
      </h1>
      <MenuRegion></MenuRegion>
    </ div>
  );
}

export default Header;