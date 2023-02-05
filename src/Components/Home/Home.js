import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../assets/DiscoverItLogo.svg";
import Loader from "react-loaders";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container home-page">
        <img src={Logo} alt="logo" />
        <SearchBar />
        <div className="search-results">
          maybe we can display the cards here?
        </div>
      </div>
      <Loader type="ball-scale-multiple" />
    </>
  );
};

export default Home;
