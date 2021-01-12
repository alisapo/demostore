import React from 'react';
import {headerHiddenPanelBasketVisibility} from '../../js/script.js';

export function Basket() {
  return (
    <div
      className="header-main__pic header-main__pic_basket"
      onClick={headerHiddenPanelBasketVisibility}
    >
      <div className="header-main__pic_basket_full">1</div>
      <div className="header-main__pic_basket_menu"></div>
    </div>
  )
}
