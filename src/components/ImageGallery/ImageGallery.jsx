import React from 'react';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({children}) => {
      return (
         <Gallery>{children}
           </ Gallery> 
     )
};      

ImageGallery.propTypes = { 
  children: PropTypes.func
};

export default ImageGallery;