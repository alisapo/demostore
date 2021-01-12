import React, { Component } from 'react';

const emailPattern = /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      email: ''
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.chooseType = this.chooseType.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  handleEmail(el) {
    this.setState({ email: el.currentTarget.value });
  }

  submitEmail(e) {
    e.preventDefault();

    if (
      emailPattern.test(this.state.email)
      && this.state.type
    ) {
      const subForm = document.querySelector('.subscribe__radios');
      subForm.innerHTML = '<div>Подписка оформлена! Спасибо!</div>';
    }
    
    return;
  }

  chooseType(e) {this.setState({ type: e.target.value });}

  render() {
    return (
      <section className="subscribe">
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
          <form className="subscribe__radios" onSubmit={this.submitEmail}>
            <label className="subscribe__radio_label">
              <input onClick={this.chooseType}
                className="subscribe__radio"
                type="radio"
                name="subscribe"
                value="women"
              />
              <div className="subscribe__radio_text">Женское</div>
            </label>
            <label className="subscribe__radio_label">
              <input onClick={this.chooseType}
                className="subscribe__radio"
                type="radio"
                name="subscribe"
                value="men"
              />
              <div className="subscribe__radio_text">Мужское</div>
            </label>
            <label className="subscribe__radio_label">
              <input onClick={this.chooseType}
                className="subscribe__radio"
                type="radio"
                name="subscribe"
                value="both"
              />
              <div className="subscribe__radio_text">Всё</div>
            </label>
            <input className="subscribe__email" 
              onInput={this.handleEmail}
              value={this.state.email}
              type="email"
              placeholder="Ваш e-mail"
              required
            />
            <input className="subscribe__submit"
              type="submit"
              value="ПОДПИСАТЬСЯ"
            />
          </form>
        </div>
      </section>
    )
  }
}

export default Subscribe;
