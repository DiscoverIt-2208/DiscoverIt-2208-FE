import React from "react";
import "./SearchPage.scss";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../assets/DiscoverItLogo.svg";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

const SearchPage = ({ city, setCity }) => {
  const exploreCity =
    city != "Unknown" ? (
      <Link to={`/${city}/dashboard`} className="exploreCity">
        GO!
      </Link>
    ) : null;

  return (
    <>
      {/* <NavBar city={city} /> */}
      <div className="container search-page">
        <img className="searchPage-logo" src={Logo} alt="logo" />
        <SearchBar setCity={setCity} city={city} />
        {exploreCity}
      </div>
    </>
  );
};

export default SearchPage;
