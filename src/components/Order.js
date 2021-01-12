import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SitePath from './SitePath/SitePath.js';
import Address from './Address.js';
import '../css/style-order.css';

class Order extends React.Component {
  changeAmount = ({ id, size, amount, clicks }) => (event) => {
    const obj = {
      id,
      size: size,
      amount: +amount + clicks
    };
    
    this.props.updateCart(obj);
  }

  setOrderItems = () => {
    const { items, serverCart } = this.props;

    if (!serverCart.length) return null;

    return serverCart.map(({ id, amount, size }) => {
      const currentItem = items.find((item) => item.id === id);

      return (
        <div key={id} className="basket-item">
          <div className="basket-item__pic"><img src={currentItem.image} alt="product_1" /></div>
          <div className="basket-item__product">
            <Link
              className="basket-item__product-name"
              to={`/product_card_desktop/${currentItem.id}`}
            >
              {currentItem.title}
            </Link>
            <div className="basket-item__product-features">
              <div className="basket-item__size">Размер: <span>{size}</span></div>
              <div className="basket-item__producer">Производитель: <span>{currentItem.brand}</span></div>
              <div className="basket-item__color">Цвет: <span>{currentItem.color}</span></div>
              <div className="basket-item__color">Цена: <span>{currentItem.price}</span></div>
            </div>
          </div>
          <div className="basket-item__quantity">
            <div
              onClick={this.changeAmount({ id, amount, size, clicks: -1 })}
              className="basket-item__quantity-change basket-item-list__quantity-change_minus"
            >-</div>
            {amount}
            <div
              onClick={this.changeAmount({ id, amount, size, clicks: +1 })}
              className="basket-item__quantity-change basket-item-list__quantity-change_plus"
            >+</div>
          </div>
          <div className="basket-item__price">{amount * currentItem.price} <i className="fa fa-rub" aria-hidden="true"></i></div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.serverCart.length) {
      return (
        <div className="wrapper order-wrapper">
          <SitePath category={17} />
          <section className="order-process">
            <h2 className="order-process__title">Оформление заказа</h2>
            <div className="order-process__basket order-basket">
              <div className="order-basket__title">В вашей корзине пока ничего нет.
                Не знаете, с чего начать? Посмотрите наши новинки!</div>
            </div>
          </section>
        </div>
      )
    } else {
      const { items, serverCart } = this.props;
      const total = serverCart.map(({ id, size, amount }) => {
        const fItems = items.filter((item) => item.id === id && item.size === size);

        return fItems.reduce((total, item) => total + amount * item.price, 0);
      });
      let totalCost = total.reduce((total, item) => total + item, 0);

      return (
        <div className="wrapper order-wrapper">
          <div className="site-path">
            <ul className="site-path__items">
              <Link className="site-path__item" to="/">Главная</Link>
              <Link className="site-path__item" to="/order">Оформление заказа</Link>
            </ul>
          </div>
          <section className="order-process">
            <h2 className="order-process__title">Оформление заказа</h2>
            <div className="order-process__basket order-basket">
              <div className="order-basket__title">в вашей корзине:</div>
              <div className="order-basket__item-list">
                {this.setOrderItems()}
              </div>
              <div className="order-basket__summ">Итого: <span>{totalCost} ₽<i className="fa fa-rub" aria-hidden="true"></i></span></div>
            </div>
            <Address upOrder={this.props.upOrder} />
          </section>
        </div>
      )
    }
  }
}

export default Order;
