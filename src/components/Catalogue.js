import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar.js';
import SitePath from './SitePath/SitePath.js';
import SortBy from './SortBy/SortBy.js';
import Pagination from './Pagination/Pagination.js';
import { Favs } from './Favs.js';
import '../css/style-catalogue.css';

class Catalogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      products: [],
      goods: 0,
      pages: 0,
      page: 1,
      discount: false,
      search: this.props.match.params.searchParam
    };
  }

  componentDidMount() {
    this.updateProducts();
  }

  updateType = (name, value) => {
    if (name === 'reset') {
      this.setState({
        type: '',
        color: '',
        size: '', 
        reason: '',
        season: '',
        brand: '',
        discount: false,
        heelSize: '', 
        sortBy: '',
        page: 1,
        price: '',
        search: ''
      })
    } else if (name === 'page') {
      this.setState({ [name]: value });
    } else {
      this.setState({
        [name]: value,
        page: 1
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.cat !== this.props.match.params.cat) {
      this.setState({
        type: '',
        color: '',
        size: '', 
        reason: '',
        season: '',
        brand: '',
        discount: false,
        heelSize: '', 
        sortBy: '',
        page: 1,
        price: '',
        search: ''
      })
    }
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.type !== prevState.type
      || this.state.color !== prevState.color
      || this.state.reason !== prevState.reason
      || this.state.size !== prevState.size
      || this.state.season !== prevState.season
      || this.state.brand !== prevState.brand
      || this.state.discount !== prevState.discount
      || this.state.heelSize !== prevState.heelSize
      || this.state.sortBy !== prevState.sortBy
      || this.state.page !== prevState.page
      || this.state.price !== prevState.price
      || this.state.search !== prevState.search
      ) 
      
      this.updateProducts();
  }

  updateProducts() {
    let type, color, category, size, reason, season, brand, discount, price, heelSize, sortBy, search, page;
    const cat = this.props.match.params.cat;
    const searchParam = this.props.match.params.searchParam;

    if (cat !== undefined) category = `categoryId=${cat}`;
    category = 'discounted=1';

    if (searchParam !== undefined) {
      category = '';
      search = `search=${searchParam}`;
    } else {
      search = ''
    };

    if (
      this.state.type !== undefined
      && this.state.type !== ''
    ) {
      type = `&type=${this.state.type}`;
    } else {
      type = '';
    };

    if (
      this.state.color !== undefined
      && this.state.color !== ''
    ) {
      color = `&color=${this.state.color}`;
    } else {
      color = '';
    };

    if (
      this.state.size !== undefined
      && this.state.size !== ''
    ) {
      size = `&size=${this.state.size}`;
    } else {
      size = '';
    };

    if (
      this.state.reason !== undefined
      && this.state.reason !== ''
    ) {
      reason = `&reason=${this.state.reason}`;
    } else {
      reason = '';
    };

    if (
      this.state.season !== undefined
      && this.state.season !== ''
    ) {
      season = `&season=${this.state.season}`;
    } else {
      season = ''
    };

    if (
      this.state.brand !== undefined
      && this.state.brand !== ''
    ) {
      brand = `&brand=${this.state.brand}`;
    } else {
      brand = '';
    };

    if (
      this.state.discount !== false
      && this.state.discount !== ''
      && this.state.discount !== undefined
    ) {
      discount = '&discounted=1';
    } else {
      discount = '';
    };

    if (
      this.state.price !== undefined
      && this.state.price !== ''
    ) {
      price = `&price=${this.state.price}`;
    } else {
      price = '';
    };

    if (
      this.state.heelSize !== undefined
      && this.state.heelSize !== ''
    ) {
      heelSize = `&heelSize=${this.state.heelSize}`;
    } else {
      heelSize = '';
    };

    if (
      this.state.sortBy !== undefined
      && this.state.sortBy !== ''
    ) {
      sortBy = `&sortBy=${this.state.sortBy}`;
    } else {
      sortBy = '';
    };

    if (
      this.state.page !== undefined
      && this.state.page !== ''
    ) {
      page = `&page=${this.state.page}`;
    } else {
      page = '';
    };

    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${category}${type}${color}${size}${reason}${season}${brand}${price}${heelSize}${discount}${sortBy}${search}${page}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(res => this.setState({
        status: res.status,
        products: res.data,
        goods: res.goods,
        pages: res.pages
      })
    );
  }

  render() {
    const cat = this.props.match.params.cat;

    return (
      <div>
        <SitePath category={cat} />
        <main className="product-catalogue">
          <SideBar
            updateType={this.updateType}
            cat={cat}
            type={this.state.type}
            color={this.state.color}
            size={this.state.size}
            reason={this.state.reason}
            season={this.state.season}
            brand={this.state.brand}
            discount={this.state.discount}
            price={this.state.price}
            heelSize={this.state.heelSize}
            sortBy={this.state.sortBy}
          />
          <section className="product-catalogue-content">
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">Женская обувь </h2>
                <span className="amount">{this.state.goods} товара</span>
              </div>
              <SortBy updateType={this.updateType} />
            </section>
            <section className="product-catalogue__item-list">
              {this.state.products.map(product =>
                <Link key={product.id} className="item-list__item-card item"
                  to={`/catalogue/product_card_desktop=${product.id}`}>
                  <div className="item-pic">
                    <img className="item-pic-1" src={product.images[0]} alt={product.title} />
                    <div className="product-catalogue__product_favorite"
                    onClick={(e) => Favs(e, product)}>
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">{product.title}</h4>
                    <p className="item-producer">
                      Производитель: <span className="producer">{product.brand}</span>
                    </p>
                    <p className="item-price">{product.price}</p>
                  </div>
                </Link>)}
            </section>
            <Pagination
              pages={this.state.pages}
              updateType={this.updateType}
              cat={cat}
            />
          </section>
        </main>
      </div>
    )
  }
}
export default Catalogue;
