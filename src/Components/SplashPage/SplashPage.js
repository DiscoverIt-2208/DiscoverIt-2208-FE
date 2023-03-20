import React from "react";
import Logo from "../assets/DiscoverItLogo.svg";
import { Link } from "react-router-dom";
import Loader from "react-loaders";
import "./SplashPage.scss";

const SplashPage = ({ setUserId, userId }) => {
  return (
    <>
      <div className="container SplashPage-page">
        <img className="splash-logo" src={Logo} alt="logo" />
        <input
          className="user-input"
          type="text"
          placeholder="User"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Link exact="true" to={`/${userId}/search-page`}>
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
