import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  return (
    <div className='NavBar-container'>
      <div className='title-text'>
          <h1>DiscoverIt</h1>
      </div>
      <div className='links-container'>
        <ul>
          <li>Dashboard</li>
          <li>Choose Locations</li>
          <li>Saved Trips</li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar