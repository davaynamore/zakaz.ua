import React, { Component } from 'react';
import './wrapper.scss';

export default class Wrapper extends Component {

  render() {
    const { loading, error } = this.props;

    const loader = (
      <div className="spinner-wrapper">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

    const errorMsg = (
      <p className="error">
        "Что то пошло не так,  пожалуйста перезагрузите страницу!";
      </p>
    )

    const content = loading ? loader : error ? errorMsg : this.props.children;


    return content;
  }
}