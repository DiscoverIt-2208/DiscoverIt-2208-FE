import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

  return (
    <div className='searchBar'>
        <input type="text" placeholder="   🔍 Search here" onChange={handleChange} value={searchInput} />
    </div>
  )
}

export default SearchBar