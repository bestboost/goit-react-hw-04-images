import React, { useState, useEffect } from 'react';
import { Box } from '../components/Box';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoderButton from './Button/Button';
import ModalWindow from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImagesAPI from './services/fetchImages-api';

const App = () => {
  const [apiImages, setApiImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setLoading(true);

    fetchImagesAPI
      .fetchImages(inputValue, page)
      .then(response => {
        setApiImages(prevApiImages => [...prevApiImages, ...response.hits]);
        setShowBtn(page < Math.ceil(response.totalHits / 12));
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [inputValue, page]);

  const formSubmit = inputValue => {
    setInputValue(inputValue);

    setApiImages([]);
    setLoading(false);
    setShowModal(false);
    setError(null);
    setSelectedImage(null);
    setPage(1);
    setShowBtn(false);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const selectImage = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16',
        paddingBottom: '24',
      }}
    >
      <Searchbar onSearch={formSubmit} />
      {apiImages && (
        <ImageGallery
          images={apiImages}
          onClick={toggleModal}
          onSelect={selectImage}
        />
      )}
      {showBtn && <LoderButton onClick={loadMore} />}
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      {showModal && <ModalWindow onClose={toggleModal} src={selectedImage} />}
      <ToastContainer autoClose={3000} position="top-center" />
    </Box>
  );
};

export default App;
