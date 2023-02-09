import React, { useState, useEffect } from "react";
import "./SearchBar.scss";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [foundPlaces, setFoundPlaces] = useState([]);

  const getLive = () => {
    if (searchInput) {
      const requestOptions = {
        method: "GET",
      };

      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?type=city&text=${searchInput}&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setFoundPlaces(result.features);
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    getLive();
    console.log(foundPlaces);
  }, [searchInput]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const showFound = foundPlaces.map((place, index) => {
    return (
      <p className='search-result' key={index} id={index}>
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
          placeholder="🔍 Enter City Name..."
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
