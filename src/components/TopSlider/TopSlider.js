import React from 'react';
import slider from '../../js/slider.js';
import img1 from '../../img/slider.jpg';
import img2 from '../../img/slider180deg.jpeg';

class TopSlider extends React.Component {
  componentDidMount() {
    const f = document.querySelector('.slider__pictures'),
        a = f.getElementsByClassName('slider__image'),
        button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
        arrows = f.getElementsByClassName('slider__arrow');
        slider(f, a, button, '4000', '1000', arrows);
    }

  render() {
    return (
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures">
            <a className="slider__image" href="/"><img src={img1} alt="slide pice" /></a>
            <a className="slider__image" href="/"><img src={img2} alt="slide pic" /></a>
            <a className="slider__image" href="/"><img src={img1} alt="slide pic" /></a>
            <a className="slider__image" href="/"><img src={img2} alt="slide pic" /></a>
            <div className="arrow slider__arrow slider__arrow_left"></div>
            <div className="arrow slider__arrow slider__arrow_right"></div>
            <div className="slider__circles">
              <button className="slider__circle" value="0"></button>
              <button className="slider__circle" value="1"></button>
              <button className="slider__circle" value="2"></button>
              <button className="slider__circle" value="3"></button>
            </div>
            <h2 className="h2">К весне готовы!</h2>
          </div>
        </div>
      </section>
    )
  }
}

export default TopSlider;
