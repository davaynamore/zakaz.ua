import React, { Component } from 'react';
import ApiService from '../../apiservice';
import Wrapper from '../wrapper';
import './productsGrid.scss';
import OrderForm from '../order-form';

export default class ProductsGrid extends Component {

  apiservice = new ApiService();

  state = {
    products: null,
    loading: false,
    error: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeCategory !== this.props.activeCategory) {
      this.updateProducts(this.props.activeCategory);
    }
  }

  componentDidMount() {
    this.updateProducts(this.props.activeCategory);
  }

  updateProducts = (id) => {
    this.onLoading();
    if (!this.props.activeCategory) return;
    this.apiservice.getCategoryProducts(id)
      .then(res => {
        this.setState({
          products: res,
          loading: false
        })
      })
      .catch(er => {
        this.onError(er);
      })
  }

  onError = (er) => {
    this.setState({ error: er });
    console.error(er);
  }

  onLoading = () => {
    this.setState({ loading: true })
  }

  render() {
    const { products, loading, error } = this.state;
    const { title, addToCart } = this.props;

    const productItems = products && products.map(product => {
      const { ean, img, weight, title, price } = product;
      return (
        <div className="product-item" key={ean}>
          <div className="product-item__img">
            <img src={img} alt={title} />
          </div>
          <p className="product-item__price">
            {price}
            <span className="product-item__currency">грн</span>
          </p>
          <p className="product-item__title">{title}</p>
          <span className="product-item__weight">{`${weight}г`}</span>

          <OrderForm ean={ean} price={price} addToCart={addToCart} />
        </div>
      )
    });

    const productsGrid = (
      <React.Fragment>
        <h2 className="product__title">{title}</h2>
        <div className="product__grid">
          {productItems}
        </div>
      </React.Fragment>
    );

    return (
      <div className="product">
        <Wrapper loading={loading} error={error}>
          {productsGrid}
        </Wrapper>
      </div>
    )
  }
}