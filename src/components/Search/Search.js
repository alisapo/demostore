import React from 'react';
import { headerMainSearchVisibility } from '../../js/script.js';

export function Search() {
  return (
    <div
      className="header-main__pic header-main__pic_search"
      onClick={headerMainSearchVisibility}
    ></div>
  )
}
