import React, { Component } from 'react';
import Header from '../header';
import LeftMenu from '../left-menu';
import ProductsGrid from '../products-grid';

import './app.scss';

export default class App extends Component {

  state = {
    activeCategory: null,
    activeTitle: null,
    cart: {},
    totalPrice: 0,
    productsCounter: 0
  }

  onAddToCart = (ean, price) => {
    const { cart } = this.state
    const newCart = cart;
    if (!newCart[ean]) newCart[ean] = 0;
    newCart[ean] += +price;
    let totalPrice = 0;
    let productsCounter = 0;
    for (let prop in newCart) {
      productsCounter++;
      totalPrice += +newCart[prop];
    }
    this.setState({
      cart: newCart,
      totalPrice,
      productsCounter
    });
  }

  setActiveCategory = (id, title) => {
    this.setState({
      activeCategory: id,
      activeTitle: title
    })
  }

  render() {
    const { activeCategory, activeTitle, totalPrice, productsCounter } = this.state;

    return (
      <div className="App">
        <Header price={totalPrice} counter={productsCounter} />
        <div className="flex">
          <LeftMenu setActive={this.setActiveCategory} initialActive={activeCategory} />
          <ProductsGrid activeCategory={activeCategory} title={activeTitle} addToCart={this.onAddToCart} />
        </div>
      </div>
    );
  }
}