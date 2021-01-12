import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Favs } from './Favs.js';
import SitePath from './SitePath/SitePath.js';
import '../css/style-product-card.css';

class ProductCardDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      product: [],
      images: [],
      sizes: [],
      checkedSize: 0,
      amount: 1,
      num: 0,
    };
  }

  static get propTypes() {
    return {
      items: PropTypes.object.isRequired,
      itemToCart: PropTypes.func.isRequired
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id}`,
      {
        method: "GET",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(res => this.setState({
        status: res.status,
        product: res.data,
        images: res.data.images,
        sizes: res.data.sizes
      }));
  }

  chngImg() {
    this.state.num == 0 ? this.setState({ num: 1 }) : this.setState({ num: 0 })
  }

  toCart = (event) => {
    if (this.state.checkedSize === 0) return;

    const item = JSON.parse(JSON.stringify(this.props.items));
    
    item.amount = this.state.amount; /*если количества нет, выпадает в ошибку*/
    item.size = this.state.checkedSize; /*если у товара нет размера, выводит ошибку*/
    item.id = this.state.product.id; /*если не знает ИД товара, выводит ошибку*/
    item.title = this.state.product.title;
    item.image = this.state.images[0];
    item.brand = this.state.product.brand;
    item.color = this.state.product.color;
    item.price = this.state.product.price;

    this.props.itemToCart(item)(event);
  }

  changeAmount = (click) => (event) => {
    const amount = +this.state.amount + click;
    if (amount < 1) return;

    this.setState({ amount: amount });
  }

  render() {
    const { items } = this.props;
    const product = this.state.product;
    const images = this.state.images;
    const sizes = this.state.sizes;

    return (
      <div>
        <SitePath product={product} />
        <main className="product-card" key={product.id}>
          <section className="product-card-content">
            <h2 className="section-name">{product.title}</h2>
            <section className="product-card-content__main-screen">
              <section className="main-screen__favourite-product-slider">
                <div className="favourite-product-slider">
                  <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                  {images.map(img =>
                    <div className="favourite-product-slider__item favourite-product-slider__item-1">
                      <img
                        onClick={this.chngImg.bind(this)}
                        src={img}
                        alt={product.title}
                      />
                    </div>)}
                  <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
                </div>
              </section>
              <div className="main-screen__favourite-product-pic">
                <img src={images[this.state.num]} alt={product.title} />
                <Link to='#' className="main-screen__favourite-product-pic__zoom"></Link>
              </div>
              <div className="main-screen__product-info">
                <div className="product-info-title">
                  <h2>{product.title}</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tbody>
                      <tr>
                        <td className="left-col">Артикул:</td>
                        <td className="right-col">{product.sku}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Производитель:</td>
                        <td className="right-col">
                          <Link to="#">
                            <span className="producer">{product.brand}</span>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-col">Цвет:</td>
                        <td className="right-col">{product.color}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Материалы:</td>
                        <td className="right-col">{product.material}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Сезон:</td>
                        <td className="right-col">{product.season}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Повод:</td>
                        <td className="right-col">{product.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {sizes.map(num => num.available
                  ? (
                      <li
                        className={this.state.clName}
                        key={num.size}
                        onClick={(e) => {
                          this.setState({
                            checkedSize: num.size,
                            clName: "active"
                          })
                        }}
                      >
                        {num.size}</li>
                  ) : (null)
                  )}
                </ul>
                <div className="size-wrapper">
                  <span className="size-rule"></span>
                  <p className="size-table">Таблица размеров</p>
                </div>
                <div className="in-favourites-wrapper" onClick={(e) => Favs(e, product)}>
                  <div className="favourite"></div>
                  <p className="in-favourites">В избранное</p>
                </div>
                <div className="basket-item__quantity">
                  <div
                    onClick={this.changeAmount(-1)}
                    className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                    >-</div>
                  {this.state.amount}
                  <div
                    onClick={this.changeAmount(+1)}
                    className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                  >+</div>
                </div>
                <div className="price">{product.price} ₽</div>
                <button className="in-basket in-basket-click" onClick={this.toCart}
                >В корзину</button>
              </div>
            </section>
          </section>
        </main>
      </div>
    )
  }
}
export default ProductCardDesktop;
