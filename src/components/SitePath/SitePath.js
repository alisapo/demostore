import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SitePath extends React.Component {
  setCategory() {
    if (!this.props.category && !this.props.product) return 'Акции';

    const category = this.props.category ? +this.props.category : this.props.product.categoryId;

    switch (category) {
      case 12:
        return ' Мужская обувь';
      case 13:
        return ' Женская обувь';
      case 14:
        return ' Обувь унисекс';
      case 15:
        return ' Детская обувь';
      case 16:
        return <li className="site-path__item">Избранное</li>;
      case 17:
        return (
          <div>
            <li className="site-path__item">Корзина</li>
            <li className="site-path__item">Оформление заказа</li>
          </div>
        );
      case 18:
        return (
          <ul className="site-path__items">
            <li className="site-path__item">Корзина</li>
            <li className="site-path__item">Оформление заказа</li>
            <li className="site-path__item">Заказ принят</li>
          </ul>
        );
      default:
        return ' Акции';
    }
  };

  render() {
    const { product } = this.props;

    if (!product) {
      return (
        <div className="site-path">
          <ul className="site-path__items">
            <Link className="site-path__item" to="/">Главная > </Link>
            {this.setCategory()}
          </ul>
        </div>
      )
    } else {
      return (
        <div className="site-path">
          <ul className="site-path__items">
            <Link className="site-path__item" to="/">Главная</Link>
            <Link
              className="site-path__item"
              to={`/catalogue/categoryId=${product.categoryId}`}
            >
              {this.setCategory()}
            </Link>
            <Link className="site-path__item" to={{
              pathname: `/catalogue/categoryId=${product.categoryId}`,
              search: `?type=${product.type}`
            }}>
              {product.type}
            </Link>
            <li className="site-path__item">{product.title}</li>
          </ul>
        </div>
      )
    }
  }
}

export default SitePath;
