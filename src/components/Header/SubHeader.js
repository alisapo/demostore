import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      categories: [],
      discount: 1
    };
  }

  componentDidMount() {
    fetch('https://api-neto.herokuapp.com/bosa-noga/categories',
      {
        method: "GET",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
       })
       .then(res => res.json())
       .then(res => this.setState({
         status: res.status,
         categories: res.data
       }));
  }

  mainSubmenuVisibility(e) {
    if (e.target.className.split(' ')[e.target.className.split(' ').length - 1] === ('main-menu__item_active')) {
      document.querySelector('.dropped-menu').classList.remove('dropped-menu_visible')
      e.target.classList.remove('main-menu__item_active');
    } else {
      if (document.querySelector('.main-menu__item_active')) {
        document.querySelector('.main-menu__item_active').classList.toggle('main-menu__item_active');
      }

      document.querySelector('.dropped-menu').classList.add('dropped-menu_visible');
      e.target.classList.toggle('main-menu__item_active');
    }
  }

  render() {
    return (
      <div className="wrapper">
        <ul className="main-menu__items">
          {this.state.categories.map(obj =>
            <li
              key={obj.id}
              onMouseLeave={this.mainSubmenuVisibility}
              className="main-menu__item main-menu__item_"
            >
              <Link
                to={`/catalogue/categoryId=${obj.id}`}
                onMouseEnter={this.mainSubmenuVisibility}
              >
                {obj.title}
              </Link>
            </li>
           )}
           <li
             onMouseLeave={this.mainSubmenuVisibility}
             className="main-menu__item main-menu__item_"
            >
             <Link
               to={`/catalogue/discounted=${this.state.discount}`}
               onMouseEnter={this.mainSubmenuVisibility}
             >
               Акции
             </Link>
           </li>
        </ul>
      </div>
    )
  }
}

export default SubHeader;
