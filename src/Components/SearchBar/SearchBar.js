import React, { useState, useEffect } from "react";
import "./SearchBar.scss";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
//bring in the data and set it to state?! unless we do the GSM
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    // handleFilter()
  };

  // const handleFilter = () => {
  //   let noCityMatch = false;

  // }

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="🔍 Enter City Name..."
        value={searchInput}
        onChange={handleChange}
        onKeyUp={handleChange}
      />
    </div>
  );
};

export default SearchBar;
