import React, { Component } from 'react';
import { headerHiddenPanelProfileVisibility } from '../../js/script.js';

export function Profile() {
  return (
    <div className="header-main__pic header-main__pic_profile"
      onClick = {headerHiddenPanelProfileVisibility}>
      <div className="header-main__pic_profile_menu"></div>
    </div>
  )
}
