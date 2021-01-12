import React, { Component } from 'react';
import {TopMenu} from '../TopMenu/TopMenu.js';
import HeaderMain from '../HeaderMain/HeaderMain.js';
import DroppedMenu from '../DroppedMenu/DroppedMenu.js';
import SubHeader from './SubHeader.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      types: [],
      brands: [],
      reasons: [],
      seasons: [],
    };
  }

  componentDidMount() {
    fetch('https://api-neto.herokuapp.com/bosa-noga/filters',
      {
        method: "GET",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(res => this.setState({
        status: res.status,
        types: res.data.type,
        brands: res.data.brand,
        reasons: res.data.reason,
        seasons: res.data.season,
      }));
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <TopMenu />
          <HeaderMain
            items={this.props.items}
            serverCart={this.props.serverCart}
            updateCart={this.props.updateCart}
          />
          <div className="main-menu">
            <SubHeader />
          </div>
          <DroppedMenu
            types={this.state.types}
            brands={this.state.brands}
            reasons={this.state.reasons}
            seasons={this.state.seasons}
            {...this.state}
            {...this.props}
          />
        </header>
      </div>
    )
  }
}

export default Header;
