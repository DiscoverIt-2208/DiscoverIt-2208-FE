import React from 'react';
import './SearchPage.scss';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../assets/DiscoverItLogo.svg';

const SearchPage = () => {
  return (
    <div className="container search-page">
      <img src={Logo} alt="logo" />
      <SearchBar/>
    </div>
  )
}

export default SearchPage