import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <BrowserRouter>
      <div className="footer__bottom">
        <div className="wrapper">
          <div className="footer__menus">
            <div className="footer__menu footer__menu_about"> О магазине
              <ul>
                <nav>
                  <li><NavLink to="#">BosaNoga</NavLink></li>
                  <li><NavLink to="#">Новости</NavLink></li>
                  <li><NavLink to="#">Пресса</NavLink></li>
                </nav>
              </ul>
            </div>
            <div className="footer__menu footer__menu_collection"> Коллекции
              <ul>
                <nav>
                  <li><NavLink to="#">Обувь</NavLink></li>
                  <li><NavLink to="#">Аксессуары</NavLink></li>
                  <li><NavLink to="#">Для дома</NavLink></li>
                </nav>
              </ul>
            </div>
            <div className="footer__menu footer__menu_help"> Помощь
              <ul>
                <nav>
                  <li><NavLink to="#">Как купить?</NavLink></li>
                  <li><NavLink to="#">Возврат</NavLink></li>
                  <li><NavLink to="#">Контакты</NavLink></li>
                </nav>
              </ul>
            </div>
          </div>
          <div className="footer__info">
            <h3 className="footer__info_title">Принимаем к оплате:</h3>
            <div className="footer__paid-systems">
            <div className="ps_1">
              <div className="footer__paid footer__paid_paypal"></div>
              <div className="footer__paid footer__paid_master-card"></div>
              <div className="footer__paid footer__paid_visa"></div>
            </div>
            <div className="ps_2">
              <div className="footer__paid footer__paid_yandex"></div>
              <div className="footer__paid footer__paid_webmoney"></div>
              <div className="footer__paid footer__paid_qiwi"></div>
            </div>
          </div>
        </div>
        <div className="footer__social-links">
          <h3 className="footer__social-links_title">Мы в соц.сетях:</h3>
          <div className="social_links">
            <div className="footer__social-link footer__social-link_twitter"></div>
            <div className="footer__social-link footer__social-link_vk"></div>
          </div>
        </div>
        <div className="footer__contacts">
           <a className="footer__phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
           <p className="footer__phone_text"> Ежедневно: с 09-00 до 21-00</p>
           <a className="footer__email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
        </div>
      </div>
      <div className="footer__copyright">2009-2018 ©
        <br />BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. 
        <br /> Все права защищены. Доставка по всей России!</div>
      </div>
    </BrowserRouter>
  )
}