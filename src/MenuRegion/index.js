import React from 'react';

import { NavLink } from 'react-router-dom';

import style from './style.module.css'

function MenuRegion() {
  return (
    <div className={style.regionNav}>
      <NavLink className={style.navItem} activeClassName={style.active} to="/ALL">All regions</NavLink>
      <NavLink className={style.navItem} activeClassName={style.active} to="/UA">Ukraine</NavLink>
    </div>
  );
}

export default MenuRegion;