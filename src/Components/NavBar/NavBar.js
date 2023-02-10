import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  const city = "Denver";
  return (
    <div className="NavBar-container">
      <div className="title-text">
        <NavLink className="nav-link" exact="true" to="/">
          <h1 className="discoverIt-title">DiscoverIt</h1>
        </NavLink>
      </div>
      <nav className="links-container">
        <NavLink
          className="nav-link"
          activeclassname="active"
          exact="true"
          to={`/${city}/dashboard`}
        >
          <h4>Dashboard</h4>
        </NavLink>
        <NavLink
          className="nav-link"
          activeclassname="active"
          exact="true"
          to="/search-page"
        >
          <h4>Pick A City</h4>
        </NavLink>
        <NavLink
          className="nav-link"
          activeclassname="active"
          exact="true"
          to={`/${city}/saved-places`}
        >
          <h4>Saved Places</h4>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
