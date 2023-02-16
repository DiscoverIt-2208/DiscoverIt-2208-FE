import React from "react";
import "./SearchPage.scss";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../assets/DiscoverItLogo.svg";
import { Link } from "react-router-dom";

const SearchPage = ({ city, setCity }) => {
  const cityKeys = Object.keys(city);
  const exploreCity =
    cityKeys.length !== 0 ? (
      <Link to={`/dashboard`} className="exploreCity">
        GO!
      </Link>
    ) : null;

  return (
    <>
      <div className="container search-page">
        <img className="searchPage-logo" src={Logo} alt="logo" />
        <SearchBar setCity={setCity} city={city} />
        {exploreCity}
      </div>
    </>
  );
};

export default SearchPage;
