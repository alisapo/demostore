import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BasketHidden extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.serverCart === nextProps.serverCart) return false;

    return true;
  }

  deleteFromCart = ({ id, size }) => (event) => {
    const obj = {
      id,
      size: size,
      amount: 0
    };
    this.props.updateCart(obj);
  }

  setCartItems = () => {
    const { serverCart, items } = this.props;
    if (!serverCart.length) return null;

    return serverCart.map(({ id, amount, size }) => {
      const cartItem = items.find((it) => it.id === id);
      const sum = cartItem.price * amount;
      
      return (
        <div key={id} className="product-list__item">
          <a className="product-list__pic">
            <img src={cartItem.image} alt="product" /></a>
          <Link to={`/product_card_desktop/${id}`} className="product-list__product">{cartItem.title}, </Link>
          <div className="product-list__size">{size}</div>
          <div className="product-list__fill"></div>
          <div className="product-list__price"> {amount} шт, {sum}
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <button className="product-list__delete"
            onClick={this.deleteFromCart({ id, size })}> X <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      );
    });
  }

  render() {
    if (!this.props.serverCart.length) {
      return (
        <div className="hidden-panel__basket basket-dropped">
          <div className="basket-dropped__title">В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!</div>
        </div>);
    } else {
      return (
        <div className="hidden-panel__basket basket-dropped">
          <div className="basket-dropped__title">В вашей корзине:</div>
          <div className="basket-dropped__product-list product-list">
            {this.setCartItems()}
          </div>
          <Link className="basket-dropped__order-button" to="/order">Оформить заказ</Link>
        </div>
      );
    }
  }
}

export default BasketHidden;
