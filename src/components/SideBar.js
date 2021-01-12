import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/style-catalogue.css';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      types: [],
      brands: [],
      colors: [],
      reasons: [],
      seasons: [],
      heelsizes: [],
      sizes: []
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
        colors: res.data.color,
        reasons: res.data.reason,
        seasons: res.data.season,
        heelsizes: res.data.heelSize,
        sizes: res.data.sizes
      })
    );
  }

  checkType = (e) => {
    if (e.target.name == 'discount') {
      this.props.updateType(e.target.name, e.target.checked);
    } else {
      this.props.updateType(e.target.name, e.target.textContent);
    }
  }

  render() {
    let type, color, category, size, reason, season, brand, discount, price, heelSize, sortBy;
    if (this.props.cat != undefined) { category = `categoryId=${this.props.cat}` } else { category = 'discounted=1' };
    if (this.props.type !== undefined && this.props.type !== '') { type = `&type=${this.props.type}`; } else { type = '' };
    if (this.props.color !== undefined && this.props.color !== '') { color = `&color=${this.props.color}`; } else { color = '' };
    if (this.props.size !== undefined && this.props.size !== '') { size = `&size=${this.props.size}`; } else { size = '' };
    if (this.props.reason !== undefined && this.props.reason !== '') { reason = `&reason=${this.props.reason}`; } else { reason = '' };
    if (this.props.season !== undefined && this.props.season !== '') { season = `&season=${this.props.season}`; } else { season = '' };
    if (this.props.brand !== undefined && this.props.brand !== '') { brand = `&brand=${this.props.brand}`; } else { brand = '' };
    if (this.props.discount !== false && this.props.discount !== '' && this.props.discount !== undefined) { discount = `&discounted=1`; } else { discount = '' };
    if (this.props.price !== undefined && this.props.price !== '') { price = `&price=${this.props.price}`; } else { price = '' };
    if (this.props.heelSize !== undefined && this.props.heelSize !== '') { heelSize = `&heelSize=${this.props.heelSize}`; } else { heelSize = '' };
    if (this.props.sortBy !== undefined && this.props.sortBy !== '') { sortBy = `&sortBy=${this.props.sortBy}`; } else { sortBy = '' };

    return (
      <section className="sidebar">
        <section className="sidebar__division">
          <div className="sidebar__catalogue-list">
            <div className="sidebar__division-title">
              <h3>Каталог</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {this.state.types.map(type =>
                <li><Link onClick={this.checkType.bind(this)}
                  name='type'
                  to={{
                    pathname: `/catalogue/${category}`,
                    search: `?type=${type}${color}${size}${reason}${season}${brand}${discount}${price}${heelSize}${sortBy}`
                  }}>
                    {type}
                </Link></li>
               )}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-1"></div>
        <section className="sidebar__division">
          <div className="sidebar__price">
            <div className="sidebar__division-title">
              <h3>Цена</h3>
              <div className="opener-down"></div>
            </div>
            <div className="price-slider">
              <div className="circle-container">
                <div className="circle-1"></div>
                <div className="line-white"></div>
                <div className="line-colored"></div>
                <div className="circle-2"></div>
              </div>
              <div className="counter">
                <input type="text" className="input-1" value="1000" />
                  <div className="input-separator"></div>
                  <input type="text" className="input-2" value="30 000" />
              </div>
            </div>
          </div>
        </section>
        <div className="separator-150 separator-150-2"></div>
        <section className="sidebar__division">
          <div className="sidebar__color">
            <div className="sidebar__division-title">
              <h3>Цвет</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {this.state.colors.map(color =>
                <div>
                  <li>
                    <div className="color beige"></div>
                    <Link
                      onClick={this.checkType}
                      name='color'
                      to={{
                        pathname: `/catalogue/${category}`,
                        search: `?color=${color}${type}${size}${reason}${season}${brand}${discount}${price}${heelSize}${sortBy}`
                      }}>
                        {color}
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-3"></div>
        <section className="sidebar__division">
          <div className="sidebar__size">
            <div className="sidebar__division-title">
              <h3>Размер</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {this.state.sizes.map(size =>
                <li>
                  <div className="list-1">
                    <div>
                      <label>
                        <input type="checkbox" className="checkbox" name="checkbox-31" />
                        <span className="checkbox-custom"></span> <Link className="label"
                          onClick={this.checkType.bind(this)}
                          name='size'
                          to={{
                            pathname: `/catalogue/${category}`,
                            search: `?size=${size}${type}${color}${reason}${season}${brand}${discount}${price}${heelSize}${sortBy}`
                          }}>
                            {size}
                          </Link>
                      </label>
                    </div>
                  </div>
                </li>)}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-4"></div>
        <section className="sidebar__division">
          <div className="sidebar__heel-height">
            <div className="sidebar__division-title">
              <h3>Размер каблука</h3>
              <div className="opener-down"></div>
            </div>
            <ul>{this.state.heelsizes.map(heelSize =>
              <div className="list-1">
                <li>
                  <label><input type="checkbox" className="checkbox" name="checkbox-31" />
                    <span className="checkbox-custom"></span> <Link className="label"
                      onClick={this.checkType.bind(this)}
                      name='heelSize'
                      to={{
                        pathname: `/catalogue/${category}`,
                        search: `?heelSize=${heelSize}${type}${color}${size}${reason}${season}${brand}${discount}${price}${sortBy}`
                      }}>
                        {heelSize}
                      </Link>
                  </label>
                </li>
              </div>)}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-5"></div>
        <section className="sidebar__division">
          <div className="sidebar__occasion">
            <div className="sidebar__division-title">
              <h3>Повод</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {this.state.reasons.map(reason =>
                <li><Link className="label" onClick={this.checkType.bind(this)}
                  name='reason'
                  to={{
                    pathname: `/catalogue/${category}`,
                    search: `?reason=${reason}${type}${color}${size}${season}${brand}${discount}${price}${heelSize}${sortBy}`
                  }}>
                    {reason}
                </Link></li>
              )}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-6"></div>
        <section className="sidebar__division">
          <div className="sidebar__season">
            <div className="sidebar__division-title">
              <h3>Сезон</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {this.state.seasons.map(season =>
                <li><Link className="label" onClick={this.checkType.bind(this)}
                  name='season'
                  to={{
                    pathname: `/catalogue/${category}`,
                    search: `?season=${season}${type}${color}${size}${reason}${brand}${discount}${price}${heelSize}${sortBy}`
                  }}>
                    {season}
                </Link></li>
              )}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-7"></div>
        <section className="sidebar__division">
          <div className="sidebar__brand">
            <div className="sidebar__division-brand">
              <h3>Бренд</h3>
              <div className="opener-down"></div>
            </div>
            <ul>
              {this.state.brands.map(brand =>
                <li><Link className="label" onClick={this.checkType.bind(this)}
                  name='brand'
                  to={{
                    pathname: `/catalogue/${category}`,
                    search: `?brand=${brand}${type}${color}${size}${reason}${season}${discount}${price}${heelSize}${sortBy}`
                  }}>
                    {brand}
                </Link></li>
              )}
            </ul>
          </div>
          <label>
            <input type="checkbox" className="checkbox" name='discount' onChange={this.checkType.bind(this)} />
            <span className="checkbox-discount"></span>
            <span className="text-discount">Со скидкой</span>
          </label>
          <div className="separator-240"></div>
        </section>
        <section className="sidebar__division">
          <div className="drop-down">
            <Link
              onClick={this.checkType.bind(this)}
              name='reset'
              to={`/catalogue/${category}`}>
              <span className="drop-down-icon"></span>Сбросить
            </Link>
          </div>
        </section>
      </section>
    )
  }
}

// <Link
// to={{pathname: `/catalogue/${category}`, search: `?discounted=${e.target.checked}`}}></Link>
// <Link to={{pathname: `/catalogue/${category}`,
//   search: `?discount=${discount}${type}${color}${size}${reason}${season}${brand}${price}${heelSize}${sortBy}${page}`}}>


export default SideBar;
