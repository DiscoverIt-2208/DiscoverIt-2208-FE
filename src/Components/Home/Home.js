import React from "react";
import Logo from '../../assets/DiscoverItLogo.svg';

import Loader from "react-loaders";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container home-page">
        <img src={Logo} alt="logo" />
        <button className="pick-button">Pick A City</button>
      </div>
      <Loader type="ball-scale-multiple" />
    </>
  );
};

export default Home;
