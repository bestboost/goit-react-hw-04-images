import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Search, Form, SearchButton, SearchLabel, SearchInput} from './Searchbar.styled'
import {ReactComponent as SearchIcon} from '../icons/serch.svg';
import { toast } from 'react-toastify';


const Searchbar = ({onSearch, children = null}) => {
  
//  deafultProps = {
//   onClick: () => null,
//   children: null,
// }
const [inputValue, setIputValue] = useState('');

const inputChange = e => {
  setIputValue(e.currentTarget.value.trim().toLowerCase());
}

const handleSubmit = e => {
  e.preventDefault();

  if (inputValue.trim() === ''){
    toast.info('Input search word, please');
    return;
  };

  onSearch(inputValue);
  setIputValue('');
};

    return (
      <Search>
         <Form onSubmit={handleSubmit}>
            <SearchButton type="submit"  
            aria-label="Find images">
              {children}
              <SearchIcon width="20" 
              height="20" fill="#5b5b5b"/>
                <SearchLabel >Search</SearchLabel>
            </SearchButton>

            <SearchInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={inputValue}
              onChange={inputChange}
            />
        </Form>
     </Search>
    )
  };

 Search.propTypes = {
    children: PropTypes.node,
};

export default Searchbar;