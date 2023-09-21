import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerEscape);
  }

  handlerEscape = e => {
    if (e.code === 'Escape') {
      //   console.log('e.code', e.code);
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { handleBackdropClick } = this;
    const { largeImageURL, tags } = this.props;
    // console.log(largeImageURL);
    return createPortal(
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
