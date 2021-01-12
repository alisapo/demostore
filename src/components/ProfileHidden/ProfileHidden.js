import React from 'react';
import { Link } from 'react-router-dom';

//скрытая панель
export function ProfileHidden() {
  return (
    <div className="hidden-panel__profile">
      <Link to="/">Личный кабинет</Link>
      <Link to="/favorite">
        <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
      </Link>
      <Link to="/">Выйти</Link>
    </div>
  )
}
