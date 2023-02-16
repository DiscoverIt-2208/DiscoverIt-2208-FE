import React, { useState, useEffect } from "react";
import "./SearchBar.scss";

const SearchBar = ({ setCity, city }) => {
  const [searchInput, setSearchInput] = useState("");
  const [foundPlaces, setFoundPlaces] = useState([]);

  useEffect(() => {
    const getLiveSearch = async () => {
      if (searchInput) {
        const requestOptions = {
          method: "GET",
        };
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=${searchInput}&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d`,
          requestOptions
        );
        const data = await response.json();
        setFoundPlaces(data.features);
      }
    };

    getLiveSearch();
    if (searchInput === "") {
      setFoundPlaces([]);
    }
  }, [searchInput]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCity(foundPlaces[e.target.id]);
    setFoundPlaces([]);
    setSearchInput("");
  };

  const showFound = foundPlaces.map((place, index) => {
    return (
      <p className="search-result" key={index} id={index} onClick={handleClick}>
        {place.properties.formatted},{" "}
      </p>
    );
  });

  return (
    <div>
      <div className="searchBar">
        <input
          className="search-input"
          type="text"
          placeholder="Enter City Name..."
          value={searchInput}
          onChange={handleChange}
          onKeyUp={handleChange}
        />
      </div>
      <div className="auto-complete-items">{showFound}</div>
    </div>
  );
};

export default SearchBar;
