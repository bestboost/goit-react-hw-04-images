import React from 'react';
import { Gallery, GalleryImg, GalleryBar } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, selectImage, toggleModal }) => {
  return (
    <Gallery>
      {images.map(image => (
        <GalleryBar
          key={image.id}
          onClick={() => selectImage(image.largeImageURL)}
        >
          <GalleryImg
            src={image.webformatURL}
            alt="Image"
            onClick={toggleModal}
          />
        </GalleryBar>
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  apiImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
