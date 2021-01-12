import React from 'react';
import '../../css/style-favorite.css';
import {Link} from 'react-router-dom';
import SitePath from '../SitePath/SitePath.js';
import SortBy from '../SortBy/SortBy.js';
import Pagination from '../Pagination/Pagination.js';

class Favorite extends React.Component {
  updateType = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const favList = Object.keys(localStorage).map(key => {
      if (key.length == 2) {
        const favItem = JSON.parse(localStorage.getItem(key));

        return (
          <Link
            key={key}
            className="item-list__item-card item"
            to={`/catalogue/product_card_desktop=${key}`}
          >
            <div className="item-pic">
              <img className="item-pic-1" src={favItem.images[0]} alt="item" />
              <div
                className="product-catalogue__product_favorite"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem(key);
                  console.log(localStorage)
                }}
              >
                <p></p>
              </div>
              <div className="arrow arrow_left"></div>
              <div className="arrow arrow_right"></div>
            </div>
            <div className="item-desc">
              <h4 className="item-name">{favItem.title}</h4>
              <p className="item-producer">Производитель: <span className="producer">{favItem.brand}</span></p>
              <p className="item-price">{favItem.price}</p>
            </div>
          </Link>);
      }
    }
  );

    return (
      <div className="wrapper wrapper_favorite">
        <SitePath category={16} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2><span className="amount amount_favorite"> {localStorage.length} товаров</span>
            </div>
            <SortBy updateType={this.updateType} />
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">{favList}</section>
          <Pagination updateFilters={this.updateFilters} />
        </main>
      </div>
    )
  }
}

export default Favorite;
