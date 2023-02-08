import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  const city = "Denver"
  return (
    <div className='NavBar-container'>
      <div className='title-text'>
          <h1>DiscoverIt</h1>
      </div>
      <nav className='links-container'>
          <NavLink className='nav-link' activeclassname="active" exact="true" to={`/${city}/dashboard`}>Dashboard</NavLink>
          <NavLink className='nav-link' activeclassname="active" exact="true" to="/search-page">Choose Locations</NavLink>
          <NavLink className='nav-link' activeclassname="active" exact="true" to="/saved-places">Saved Places</NavLink>
      </nav>
    </div>
  )
}

export default NavBar