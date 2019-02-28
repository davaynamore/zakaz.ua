import React, { Component } from 'react';
import ApiService from '../../apiservice';
import Wrapper from '../wrapper';
import './leftMenu.scss';

export default class LeftMenu extends Component {

  apiservice = new ApiService();

  state = {
    loading: false,
    error: null,
    categories: null,
    activeCategory: null
  }

  componentDidMount() {
    this.updateCategories();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.categories !== this.state.categories && !this.state.activeCategory) {
      this.initialActiveCategory();
    }
  }

  initialActiveCategory = () => {
    const id = this.state.categories[0].id;
    const title = this.state.categories[0].title;
    this.setState({
      activeCategory: id
    })
    this.props.setActive(id, title);
  }

  updateCategories = () => {
    this.onLoading();
    this.apiservice.getAllCategories()
      .then(res => {
        this.setState(
          {
            categories: res,
            loading: false
          }
        )
      })
      .catch(er => {
        this.onError(er);
      });
  }

  onCategoryClick = (id, title) => {
    this.setState({
      activeCategory: id
    });
    this.props.setActive(id, title);
  }

  onError = (er) => {
    this.setState({ error: er });
    console.error(er);
  }

  onLoading = () => {
    this.setState({ loading: true })
  }

  render() {

    const { categories, activeCategory, loading, error } = this.state;

    const categoryItems = categories && categories.map(({ id, title }) => {

      let className = "categories__item";
      if (activeCategory === id) {
        className += " active";
      }

      return (
        <li key={id} className={className}>
          <button
            type="button"
            className="categories__link"
            onClick={() => this.onCategoryClick(id, title)}>{title}
          </button>
        </li>
      )
    });

    const menuContent = (
      <React.Fragment>
        <h2 className="left-menu__title">Товари</h2>
        <ul className="categories">
          {categoryItems}
        </ul>
      </React.Fragment>
    );

    return (
      <div className="left-menu">
        <Wrapper loading={loading} error={error}>
          {menuContent}
        </Wrapper>
      </div>
    );
  }
}