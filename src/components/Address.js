import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import { History } from 'history';
import '../css/style-order.css';

const namePattern = /^[А-Яа-я\s]{3,50}$/;
const phonePattern = /^\+?(\d{1,3})?[-.]?\(?(?:\d{2,3})\)?[-.]?\d\d\d[-.]?\d\d\d\d$/;
const order = 'https://api-neto.herokuapp.com/bosa-noga/order/';

class Address extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      customerName: '',
      cnValid: true,
      customerAddress: '',
      caValid: true,
      customerPhone: '',
      isValid: true,
      paymentType: ''
    };

    this.confirmOrder = this.confirmOrder.bind(this);
    this.setPT = this.setPT.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  confirmOrder(e) {
    e.preventDefault();

    if (
      namePattern.test(this.state.customerName)
      && this.state.customerAddress
      && phonePattern.test(this.state.customerPhone)
      && this.state.paymentType
    ) {
      fetch(order, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.customerName,
          phone: this.state.customerPhone,
          address: this.state.customerAddress,
          paymentType: this.state.paymentType,
          cart: localStorage.getItem('cartId')
        })
      })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('order', JSON.stringify(res));
        localStorage.removeItem("cartId");
        this.props.upOrder();
        this.props.history.push('/order_done/');
      }) //ответ от сервера
      .catch(function (error) { console.log(error); });
    } 
    
    return;        
  }

  setPT(e) {
    this.setState({ paymentType: e.target.value });
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="order-process__confirmed">
        <form onSubmit={this.confirmOrder.bind(this)}>
          <div className="order-process__delivery">
            <h3 className="h3" > кому и куда доставить ? </h3>
            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text"> Имя </div>
                <input
                  onInput={this.handleInput.bind(this)}
                  value={this.state.customerName}
                  className="order-process__delivery-input"
                  type="text"
                  name="customerName"
                  placeholder="Представьтесь, пожалуйста"
                  required
                />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text"> Телефон </div>
                <input
                  onInput={this.handleInput.bind(this)}
                  value={this.state.customerPhone}
                  className="order-process__delivery-input"
                  type="tel"
                  name="customerPhone"
                  placeholder="Номер в любом формате"
                  required
                />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text"> Адрес </div>
                <input
                  onInput={this.handleInput.bind(this)}
                  value={this.state.customerAddress}
                  className="order-process__delivery-input order-process__delivery-input_adress"
                  type="text"
                  name="customerAddress"
                  placeholder='Ваша покупка будет доставлена по этому адресу'
                  required
                />
              </label>
            </div>
            <p> Все поля обязательны для заполнения.Наш оператор свяжется с вами для уточнения деталей заказа. </p>
          </div>
          <div className="order-process__paid">
            <h3 className="h3"> хотите оплатить онлайн или курьеру при получении ? </h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input
                  onClick={this.setPT}
                  className="order-process__paid-radio"
                  type="radio"
                  name="paymentType"
                  value="onlineCard"
                />
                <span className="order-process__paid-text"> Картой онлайн </span>
              </label>
              <label className="order-process__paid-label">
                <input
                  onClick={this.setPT}
                  className="order-process__paid-radio"
                  type="radio"
                  name="paymentType"
                  value="offlineCard"
                />
                <span className="order-process__paid-text"> Картой курьеру </span>
              </label>
              <label className="order-process__paid-label">
                <input
                  onClick={this.setPT}
                  className="order-process__paid-radio"
                  type="radio"
                  name="paymentType"
                  value="offlineCash"
                />
                <span className="order-process__paid-text"> Наличными курьеру </span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="order-process__form-submit order-process__form-submit_click"
          >
            Подтвердить заказ
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(Address);
