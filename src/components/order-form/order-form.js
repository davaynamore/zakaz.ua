import React, { Component } from 'react';
import './order-form.scss';

export default class OrderForm extends Component {
  state = {
    counter: 1
  }

  decrementCounter = () => {
    this.setState((state) => {
      if (state.counter === 1) return;
      return {
        counter: state.counter - 1
      }
    })
  }

  incrementCounter = () => {
    this.setState((state) => {
      return {
        counter: state.counter + 1
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { counter } = this.state;
    const { addToCart } = this.props;
    const form = e.target;
    const ean = form.elements.ean.value;
    const price = +form.elements.price.value * counter;
    this.setState({ counter: 1 });
    addToCart(ean, price);
  }

  render() {
    const { ean, price } = this.props;
    const { counter } = this.state;
    return (
      <form className="order__form" onSubmit={this.onSubmit}>
        <div className="counter">
          <button
            type="button"
            className="counter__btn btn"
            onClick={this.decrementCounter}>-</button>
          <input className="counter__field" type="text" name="count" value={`${counter} шт`} readOnly />
          <button
            type="button"
            className="counter__btn btn"
            onClick={this.incrementCounter}>+</button>
        </div>
        <input type="hidden" name="ean" defaultValue={ean} />
        <input type="hidden" name="price" defaultValue={price} />
        <button
          type="submit"
          className="order__form-btn btn">
          Додати
            <span></span>
        </button>
      </form>
    )
  }
}