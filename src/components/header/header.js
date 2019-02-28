import React from 'react';

import Cart from '../cart';

import './header.scss';

function Header(props) {
  return (
    <header className="top-header">
      <div className="top-header__logo">
        <a className="top-header__logo-link" href="/">zakaz.ua</a>
      </div>
      <Cart {...props} />
    </header>
  )
}

export default Header;