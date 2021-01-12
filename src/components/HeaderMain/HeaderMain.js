import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm.js';
import BasketHidden from '../BasketHidden/BasketHidden.js';
import { Search } from '../Search/Search.js';
import { Profile } from '../Profile/Profile.js';
import { ProfileHidden } from '../ProfileHidden/ProfileHidden.js';
import { Basket } from '../Basket/Basket.js';
import logo from '../../img/header-logo.png';

export default class HeaderMain extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.serverCart === nextProps.serverCart) return false;

    return true;
  }

  render() {
    return (
      <div className="header-main">
        <div className="header-main__wrapper wrapper">
          <div className="header-main__phone">
            <Link to="tel:+7-495-790-35-03">+7 495 79 03 5 03</Link>
            <p>Ежедневно: с 09-00 до 21-00</p>
          </div>
          <div className="header-main__logo">
            <Link to="/"><h1><img src={logo} alt="logotype" /></h1></Link>
            <p>Обувь и аксессуары для всей семьи</p>
          </div>
          <div className="header-main__profile">
            <div className="header-main__pics">
              <Search />
              <div className="header-main__pic_border"></div>
              <Profile />
              <div className="header-main__pic_border"></div>
              <Basket />
            </div>
            <SearchForm />
          </div>
        </div>
        <div className="header-main__hidden-panel hidden-panel">
          <ProfileHidden />
          <BasketHidden
            items={this.props.items}
            updateCart={this.props.updateCart}
            serverCart={this.props.serverCart}
          />
        </div>
      </div>
    )
  }
};
