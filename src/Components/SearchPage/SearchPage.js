import React from "react";
import "./SearchPage.scss";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../assets/DiscoverItLogo.svg";
import NavBar from "../NavBar/NavBar";

const SearchPage = ({ city }) => {
  return (
    <>
      <NavBar city={city} />
      <div className="container search-page">
        <img className="searchPage-logo" src={Logo} alt="logo" />
        <SearchBar />
      </div>
    </>
  );
};

export default SearchPage;
