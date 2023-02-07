import React from 'react';
import './SearchPage.scss';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../assets/DiscoverItLogo.svg';
import NavBar from '../NavBar/NavBar';

const SearchPage = () => {
  return (
    <>
      <NavBar />
      <div className="container search-page">
        <img src={Logo} alt="logo" />
        <SearchBar/>
      </div>
    </>
  
  )
}

export default SearchPage