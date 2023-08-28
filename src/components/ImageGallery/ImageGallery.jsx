import React from 'react';
import { Gallery, GalleryImg, GalleryBar } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onSelect, clickForShowModal }) => {
  return (
    <Gallery>
      {images.map(image => (
        <GalleryBar
          key={image.id}
          onClick={() => onSelect(image.largeImageURL)}
        >
          <GalleryImg
            src={image.webformatURL}
            alt="Image"
            onClick={clickForShowModal}
          />
        </GalleryBar>
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  apiImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
