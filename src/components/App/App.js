import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Header from '../Header/Header.js';
import {MainPage} from '../MainPage/MainPage.js';
import Catalogue from '../Catalogue.js';
import ProductCard from '../ProductCardDesktop';
import Favorite from '../Favorite/Favorite.js';
import Order from '../Order.js';
import OrderDone from '../OrderDone/OrderDone.js';
import {Footer} from '../Footer/Footer.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      items: [],
      serverCart: [],
      cartId: '',
      total: '',
    };
  }

  componentWillMount() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;

    try {
      fetch('https://api-neto.herokuapp.com/bosa-noga/cart/',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 'ok') {
            this.setState({ serverCart: res.data.products });
          }
          throw new Error('ошибка!');
        })
        .catch(err => { console.log(err); });
    } catch(err) {
      console.log(err);
    }
    
  }

  itemToCart = (item) => (event) => {
    const filtered = this.state.serverCart.filter(({ id, size }) => (id === item.id && size === item.size));

    if (filtered.length) {
      const tAmount = filtered[0].amount + item.amount;
      item.amount = tAmount;
    } else {
      const clientItems = this.state.items;
      const body2 = {
        id: item.id,
        size: item.size,
        amount: item.amount,
        image: item.image,
        title: item.title,
        brand: item.brand,
        price: item.price,
        color: item.color,
      };

      clientItems.push(body2);
      localStorage.setItem('cartData', JSON.stringify(clientItems));
      this.setState({ items: clientItems });
    };

    this.updateCart(item);
  }

  updateCart = (item) => {
    const cartId = localStorage.getItem('cartId');    
    let cartLink = cartId ? `https://api-neto.herokuapp.com/bosa-noga/cart/${cartId}`
      : 'https://api-neto.herokuapp.com/bosa-noga/cart/';
    const body = {
      id: item.id,
      size: item.size,
      amount: item.amount
    };

    fetch(cartLink,
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => {
        if (!res.data.products) {
          res.data.products = [body];
          this.setState({ serverCart: res.data.products });
          localStorage.setItem('cartId', res.data.id);
        } else {
          this.setState({ serverCart: res.data.products });
        }
      })
      .catch((err) => { 
        if (
          item.amount === 0
          && this.state.serverCart.length === 1
          && this.state.serverCart[0].id === item.id
        ) {
          localStorage.removeItem('cartId');
          localStorage.removeItem('cartData');
          this.setState({
            serverCart: [],
            items: []
          });
        }
       });  /*когда пустая корзина*/
  }

  upOrder = () => {
    const total = this.state.serverCart.map(({ id, size, amount }) => {
      const fItems = this.state.items.filter((item) => item.id === id && item.size === size);

      return fItems.reduce((total, item) => total + amount * item.price, 0);
    });
    let totalCost = total.reduce((total, item) => total + item, 0);
    
    this.setState({
      total: totalCost,
      serverCart: [],
      items: [],
    });
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Header handleToSitePath={this.handleToSitePath} updateCart={this.updateCart} {...this.props} {...this.state} />
          <Route path="/" exact component={MainPage} />
          <Switch>
            <Route path="/catalogue/categoryId=:cat([0-9]+)" exact component={Catalogue} />
            <Route path="/catalogue/discounted=:1" exact component={Catalogue} />
            <Route path="/catalogue/search=:searchParam([a-z]+)" exact component={Catalogue} />
            <Route path="/catalogue/product_card_desktop=:id([0-9]+)" render={(props) => (
              <ProductCard itemToCart={this.itemToCart} {...this.props} {...props} {...this.state} />
            )} />
          </Switch>
          <Route path="/favorite" exact component={Favorite} />
          <Route path="/order" render={(props) => (
            <Order updateCart={this.updateCart} upOrder={this.upOrder} {...props} {...this.props} {...this.state} />
          )} />
          <Route path="/order_done" render={(props) => (
            <OrderDone total={this.state.total} {...props} {...this.props} {...this.state} />
          )} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
