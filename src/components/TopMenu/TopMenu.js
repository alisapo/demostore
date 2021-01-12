import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

export function TopMenu() {
  return (
    <BrowserRouter>
      <div className="top-menu">
        <div className="wrapper">
          <nav className="top-menu__items">
            <NavLink className="top-menu__item" to="#">Возврат</NavLink>
            <NavLink className="top-menu__item" to="#">Доставка и оплата</NavLink>
            <NavLink className="top-menu__item" to="#">О магазине</NavLink>
            <NavLink className="top-menu__item" to="#">Контакты</NavLink>
            <NavLink className="top-menu__item" to="#">Новости</NavLink>
          </nav>
        </div>
      </div>
    </BrowserRouter>
  )
}
