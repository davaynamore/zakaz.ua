import React from 'react';

import './cart.scss';

function Cart({ price, counter }) {
  return (
    <button type="button" className="cart">
      <span className="cart__icon">
        <span className="goods__count">{counter}</span>
      </span>
      <span className="total_price">{price}</span>
    </button>
  )
}

export default Cart;