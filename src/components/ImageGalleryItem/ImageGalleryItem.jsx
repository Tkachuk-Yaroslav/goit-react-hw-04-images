import Modal from 'components/Modal/Modal';
import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { image } = this.props;
    const { id, largeImageURL, webformatURL, tags } = image;
    const { toggleModal } = this;

    return (
      <li key={id} className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={largeImageURL}
          onClick={toggleModal}
        />

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={toggleModal}
          />
        )}
      </li>
    );
  }
}
