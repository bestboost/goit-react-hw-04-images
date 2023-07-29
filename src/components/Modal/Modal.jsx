import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Overlay, Modal, ModalImage} from './Modal.styled';
import {createPortal} from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const ModalWindow = ({src, children, onClose}) => {
 
 useEffect(() => {
  const handleKeyDown = event => {
    if(event.code === 'Escape') {
       onClose();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
 
    return(() => {
      window.removeEventListener('keydown', handleKeyDown);
    })
}, [onClose])

  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    };
  }
 
  return createPortal(
        <Overlay onClick={handleBackdropClick}>
        <Modal> {children}
       {src &&  <ModalImage src={src} alt="image"/>}
        </Modal>
      </Overlay>, modalRoot,     
    );
 };

ModalWindow.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default ModalWindow;