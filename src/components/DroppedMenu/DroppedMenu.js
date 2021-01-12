import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

class DroppedMenu extends React.Component {
  render() {
    const {
      brands,
      types,
      reasons,
      seasons
    } = this.props;

    if (!types && !brands && !reasons && !seasons) return null;
    
    return (
      <BrowserRouter>
        <div className="dropped-menu">
          <div className="wrapper">
            <div className="dropped-menu__lists dropped-menu__lists_women">
              <h3 className="dropped-menu__list-title">Повод:</h3>
              <nav className="dropped-menu__list">
                {reasons.map(reason =>
                  <NavLink
                    key={reason}
                    className="dropped-menu__item"
                    to={`/catalogue?reason=${reason}`}
                  >
                    {reason}
                  </NavLink>
                )}
              </nav>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Сезон:</h3>
              <nav className="dropped-menu__list">
                {seasons.map(season =>
                  <NavLink
                    key={season}
                    className="dropped-menu__item"
                    to={`/catalogue?season=${season}`}
                  >
                    {season}
                  </NavLink>
                )}
              </nav>
            </div>
            <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
              <h3 className="dropped-menu__list-title">Бренды:</h3>
              <nav className="dropped-menu__list">
                {brands.map(brand =>
                  <NavLink 
                    key={brand}
                    className="dropped-menu__item"
                    to={`/catalogue?brand=${brand}`}
                  >
                    {brand}
                  </NavLink>
                )}
              </nav>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Категории:</h3>
              <nav className="dropped-menu__list">
                {types.map(type =>
                  <NavLink 
                    key={type}
                    className="dropped-menu__item"
                    to={`/catalogue?type=${type}`}
                  >
                    {type}
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default DroppedMenu;
