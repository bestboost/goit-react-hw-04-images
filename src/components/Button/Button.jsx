import React from 'react';
import PropTypes from 'prop-types';
import {LoadButtonBox, LoadButton} from './Button.styled'; 

const LoderButton = ({onClick}) => {
    return (
      <LoadButtonBox>
        <LoadButton type="button" onClick={onClick}>Load more</LoadButton>
      </LoadButtonBox> 
    );
 };

 LoderButton.propTypes = { 
      onClick: PropTypes.func
 };

export default LoderButton;