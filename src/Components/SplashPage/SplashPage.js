import React from "react";
import Logo from '../assets/DiscoverItLogo.svg';
import { Link } from "react-router-dom";
import Loader from "react-loaders";
import "./SplashPage.scss";

const SplashPage = () => {
  return (
    <>
      <div className="container SplashPage-page">
        <img className='splash-logo' src={Logo} alt="logo" />
        <Link exact="true" to="/search-page">
          <button className="pick-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Pick A City
          </button>
        </Link>
      </div>
      <Loader type="ball-scale-multiple" />
    </>
  );
};

export default SplashPage;
