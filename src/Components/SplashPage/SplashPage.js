import React from "react";
import Logo from '../../assets/DiscoverItLogo.svg';

import Loader from "react-loaders";
import "./SplashPage.scss";

const SplashPage = () => {
  return (
    <>
      <div className="container SplashPage-page">
        <img src={Logo} alt="logo" />
        <button className="pick-button">Pick A City</button>
      </div>
      <Loader type="ball-scale-multiple" />
    </>
  );
};

export default SplashPage;
