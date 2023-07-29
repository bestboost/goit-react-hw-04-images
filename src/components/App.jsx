import React, {useState, useEffect} from 'react';
import { Box } from '../components/Box';
import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoderButton from './Button/Button';
import ModalWindow from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
   const [apiImages, setApiImages] = useState(null);
  //  const [searchField, setSearchField] = useState('');
   const [loading, setLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [inputValue, setInputValue] = useState('');
   const [error, setError] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null);
   const [page, setPage] = useState(1);

//  state = {
//       apiImages: null,
//       searchField: '',
//       loading: false,
//       showModal: false,
//       inputValue: '',
//       error: null,
//       selectedImage: null,
//       page: 1,
//  };
    useEffect(() => {
        setLoading(true);
        setApiImages(null);
   console.log(inputValue)
      fetch(`https://pixabay.com/api/?q=${inputValue}&page=${page}&key=29692752-5f9a27c26e6deec7970509d3f&image_type=photo&orientation=horizontal&per_page=15`)
        .then(response => {
          if(response.ok) {
            return response.json();
          } 
   
            return Promise.reject(
              new Error(`Upsss, no image ${inputValue}!`),
            );        
          })

      .then(apiImages => 
        setApiImages(apiImages.hits)) 
      .catch(error => setError(error)) 
      .finally(() => setLoading(false));
    
    },[page, inputValue])
  // componentDidUpdate(_, prevState) {

  //    const prevValue = prevState.inputValue;
  //    const nextValue = this.state.inputValue;
  //    const prevPage = prevState.page;
  //    const nextPage = this.state.page;

  //   if (prevValue !== nextValue ||
  //     prevPage !== nextPage ) {
  //     this.setState({loading: true, apiImages: null})
      
  //     fetch(`https://pixabay.com/api/?q=${nextValue}&page=${nextPage}&key=29692752-5f9a27c26e6deec7970509d3f&image_type=photo&orientation=horizontal&per_page=15`)
  //     .then(response => {
  //       if(response.ok) {
  //         return response.json();
  //       } 
   
  //       return Promise.reject(
  //         new Error(`Upsss, no image ${nextValue}!`),
  //       );
     
  //     })

  //     .then(apiImages => this.setState({apiImages: apiImages.hits})) 
  //     .catch(error => this.setState({error})) 
  //     .finally(() => this.setState({loading: false}));
    
  //   } 
  // }

 const formSubmit =  inputValue => {
    setInputValue(inputValue);
  }
 
 const toggleModal = () => {
    setShowModal(showModal => (!showModal));
   }; 

const selectImage = largeImageURL => {
  setSelectedImage(largeImageURL);
}

const loadMore = () => {
  setPage(page + 1);
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
      <Searchbar onSearch={formSubmit}/>
      {apiImages && 
           <ImageGalleryItem images={apiImages} onClick={toggleModal} 
              onSelect={selectImage}/>}
       {apiImages && 
        <LoderButton onClick={loadMore}/>}
       {error && <h1>{error.message}</h1>}
      {loading && <Loader/>} 
      {showModal && <ModalWindow onClose={toggleModal} 
                                 src={selectedImage}/>}
      <ToastContainer autoClose={3000} position="top-center"/>
    </Box>
  ); 
 };

export default App;
