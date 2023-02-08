import React, { useState } from "react";
import "./SearchBar.scss";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter City Name..."
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
};

export default SearchBar;
