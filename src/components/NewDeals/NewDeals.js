import React from 'react';
import { Favs } from '../Favs.js';
import { Link } from 'react-router-dom';
import '../../css/style.css';

class NewDeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
      prevIndex: 0,
      nextIndex: 2,
      cycleMood: false
    };

    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  goToNextSlide() {
    let newIndex = this.state.currentIndex,
      newNextIndex = this.state.nextIndex,
      newPrevIndex = this.state.prevIndex,
      neww = this.state.newFeatured;

    if (this.state.currentIndex == neww.length - 1) newIndex = 0;
    newIndex = this.state.currentIndex + 1;

    if (this.state.nextIndex == neww.length - 1) newNextIndex = 0;
    newNextIndex = this.state.nextIndex + 1;

    if (this.state.prevIndex == neww.length - 1) newPrevIndex = 0;
    newPrevIndex = this.state.prevIndex + 1;

    this.setState({
      currentIndex: newIndex,
      nextIndex: newNextIndex,
      prevIndex: newPrevIndex
    });
  }

  goToPrevSlide() {
    let newIndex = this.state.currentIndex,
      newNextIndex = this.state.nextIndex,
      newPrevIndex = this.state.prevIndex,
      neww = this.state.newFeatured;

    if (this.state.currentIndex == 0) newIndex = neww.length - 1;
    newIndex = this.state.currentIndex - 1;

    if (this.state.nextIndex == 0) newNextIndex = neww.length - 1;
    newNextIndex = this.state.nextIndex - 1;

    if (this.state.prevIndex == 0) newPrevIndex = neww.length - 1;
    newPrevIndex = this.state.prevIndex - 1;

    this.setState({
      currentIndex: newIndex,
      nextIndex: newNextIndex,
      prevIndex: newPrevIndex
    });
  }

  componentWillMount() {
    fetch('https://api-neto.herokuapp.com/bosa-noga/featured',
      {
        method: "GET",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(res => this.setState({
        status: res.status,
        featured: res.data,
        newFeatured: res.data.filter(nf => nf.categoryId === 13)
      }));
  }

  changeCategory(e) {
    this.setState({
      newFeatured: this.state.featured.filter(item => item.categoryId == e.target.id),
      currentIndex: 1,
      prevIndex: 0,
      nextIndex: 2
    })
  }

  render() {
    if (!this.state.featured) {return <div>Загрузка...</div>;}

    const newFeatured = this.state.newFeatured;
    const currentIndex = this.state.currentIndex;
    const prevIndex = this.state.prevIndex;
    const nextIndex = this.state.nextIndex;
    const product = newFeatured[currentIndex];

    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            <Link onClick={this.changeCategory} id="13" className="new-deals__menu-item new-deals__menu-item_active" to="#">Женская обувь</Link>
            <Link onClick={this.changeCategory} id="14" className="new-deals__menu-item" to="#">Унисекс</Link>
            <Link onClick={this.changeCategory} id="15" className="new-deals__menu-item" to="#">Детская обувь</Link>
          </ul>
        </div>
        <div className="new-deals__slider">
          <div onClick={this.goToPrevSlide.bind(this)} direction='next' className="new-deals__arrow new-deals__arrow_left arrow"></div>
          <div key={newFeatured[prevIndex].id} className="new-deals__product new-deals__product_first">
            <img src={newFeatured[prevIndex].images[0]} alt='prev' />
          </div>
          <div key={newFeatured[currentIndex].id} className="new-deals__product new-deals__product_active" >
            <img src={newFeatured[currentIndex].images[0]} alt='pic' />
            <Link to={`/catalogue/product_card_desktop=${newFeatured[currentIndex].id}`}></Link>
            <div className="new-deals__product_favorite" onClick={(e) => Favs(e, product)}></div>
          </div>
          <div
            key={newFeatured[nextIndex].id}
            className="new-deals__product new-deals__product_last"
          >
            <img src={newFeatured[nextIndex].images[0]} alt='next' />
          </div>
          <div
            className="new-deals__arrow new-deals__arrow_right arrow"
            onClick={this.goToNextSlide.bind(this)}
            direction='prev'
          ></div>
        </div>
        <div key={newFeatured[currentIndex].id} className="new-deals__product-info">
          <a
            href={`/product_card_desktop/${newFeatured[currentIndex].id}`}
            className="h3"
          >
            {newFeatured[currentIndex].title}
          </a>
          <p>Производитель: <span>{newFeatured[currentIndex].brand}</span></p>
          <h3 className="h3">{newFeatured[currentIndex].price} ₽</h3>
        </div>
      </section>
    )
  }
}

export default NewDeals;
