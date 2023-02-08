import React, { useState, useEffect } from "react";
import "./SearchBar.scss";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {

  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

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
